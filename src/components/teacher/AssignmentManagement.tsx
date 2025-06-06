
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Assignment {
  id: string;
  title: string;
  description?: string;
  class_id: string;
  due_date?: string;
  total_points: number;
  status: string;
  created_at: string;
  classes?: {
    name: string;
  };
}

interface Class {
  id: string;
  name: string;
}

const AssignmentManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class_id: '',
    due_date: '',
    total_points: 100
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Get teacher ID first
  const { data: teacherData } = useQuery({
    queryKey: ['current_teacher'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teachers' as any)
        .select('id')
        .eq('user_id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const { data: classes } = useQuery({
    queryKey: ['teacher_classes'],
    queryFn: async () => {
      if (!teacherData?.id) return [];
      
      const { data, error } = await supabase
        .from('classes' as any)
        .select('id, name')
        .eq('teacher_id', teacherData.id)
        .order('name');
      
      if (error) throw error;
      return data as Class[];
    },
    enabled: !!teacherData?.id
  });

  const { data: assignments, isLoading } = useQuery({
    queryKey: ['teacher_assignments'],
    queryFn: async () => {
      if (!teacherData?.id) return [];
      
      const { data, error } = await supabase
        .from('assignments' as any)
        .select(`
          *
        `)
        .eq('teacher_id', teacherData.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Assignment[];
    },
    enabled: !!teacherData?.id
  });

  const createMutation = useMutation({
    mutationFn: async (newAssignment: typeof formData) => {
      const { data, error } = await supabase
        .from('assignments' as any)
        .insert([{
          ...newAssignment,
          teacher_id: teacherData?.id,
          due_date: newAssignment.due_date || null
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher_assignments'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Assignment created successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create assignment: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: typeof formData }) => {
      const { data, error } = await supabase
        .from('assignments' as any)
        .update({
          ...updates,
          due_date: updates.due_date || null
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher_assignments'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Assignment updated successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update assignment: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('assignments' as any)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher_assignments'] });
      toast({
        title: "Success",
        description: "Assignment deleted successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete assignment: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      class_id: '',
      due_date: '',
      total_points: 100
    });
    setEditingAssignment(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAssignment) {
      updateMutation.mutate({ id: editingAssignment.id, updates: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description || '',
      class_id: assignment.class_id,
      due_date: assignment.due_date ? assignment.due_date.split('T')[0] : '',
      total_points: assignment.total_points
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div>Loading assignments...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Assignment Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
              </DialogTitle>
              <DialogDescription>
                {editingAssignment ? 'Update assignment details' : 'Create a new assignment for your class'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="class">Class</Label>
                  <Select
                    value={formData.class_id}
                    onValueChange={(value) => setFormData({ ...formData, class_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes?.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="total_points">Total Points</Label>
                    <Input
                      id="total_points"
                      type="number"
                      min="1"
                      value={formData.total_points}
                      onChange={(e) => setFormData({ ...formData, total_points: parseInt(e.target.value) || 100 })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingAssignment ? 'Update' : 'Create'} Assignment
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignments?.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-lg">{assignment.title}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(assignment)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(assignment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Class ID: {assignment.class_id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assignment.description && (
                <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
              )}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Points:</span>
                  <span className="text-sm">{assignment.total_points}</span>
                </div>
                {assignment.due_date && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Due:
                    </span>
                    <span className="text-sm">
                      {new Date(assignment.due_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge className={getStatusBadgeColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!assignments || assignments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No assignments created yet. Create your first assignment!</p>
        </div>
      ) : null}
    </div>
  );
};

export default AssignmentManagement;
