
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Teacher {
  id: string;
  name: string;
  email: string;
}

const CreateClass = () => {
  const [formData, setFormData] = useState({
    name: '',
    teacher_id: '',
    schedule: '',
    room: '',
    max_students: 30
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: teachers, isLoading: teachersLoading } = useQuery({
    queryKey: ['institution_teachers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teachers')
        .select('id, name, email')
        .eq('institution_id', user?.institutionId)
        .eq('status', 'active')
        .order('name');
      
      if (error) throw error;
      return data as Teacher[];
    },
    enabled: !!user?.institutionId
  });

  const createClassMutation = useMutation({
    mutationFn: async (classData: typeof formData) => {
      const { data, error } = await supabase
        .from('classes')
        .insert([{
          ...classData,
          institution_id: user?.institutionId
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      resetForm();
      toast({
        title: "Success",
        description: "Class created successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create class: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      teacher_id: '',
      schedule: '',
      room: '',
      max_students: 30
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createClassMutation.mutate(formData);
  };

  if (teachersLoading) {
    return <div>Loading teachers...</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Class</CardTitle>
        <CardDescription>
          Create a new class in your institution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Class Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Mathematics Grade 10"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="teacher">Assign Teacher</Label>
            <Select
              value={formData.teacher_id}
              onValueChange={(value) => setFormData({ ...formData, teacher_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers?.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name} ({teacher.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="schedule">Schedule</Label>
            <Textarea
              id="schedule"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              placeholder="e.g., Monday 9:00 AM - 10:30 AM, Wednesday 2:00 PM - 3:30 PM"
            />
          </div>

          <div>
            <Label htmlFor="room">Room</Label>
            <Input
              id="room"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              placeholder="e.g., Room 101, Lab A"
            />
          </div>

          <div>
            <Label htmlFor="max_students">Maximum Students</Label>
            <Input
              id="max_students"
              type="number"
              min="1"
              max="100"
              value={formData.max_students}
              onChange={(e) => setFormData({ ...formData, max_students: parseInt(e.target.value) || 30 })}
            />
          </div>

          <Button type="submit" disabled={createClassMutation.isPending} className="w-full">
            {createClassMutation.isPending ? 'Creating Class...' : 'Create Class'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateClass;
