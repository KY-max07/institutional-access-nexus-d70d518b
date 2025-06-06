
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: ''
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const createTeacherMutation = useMutation({
    mutationFn: async (teacherData: typeof formData) => {
      const { data, error } = await supabase
        .from('teachers')
        .insert([{
          ...teacherData,
          institution_id: user?.institutionId
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      resetForm();
      toast({
        title: "Success",
        description: "Teacher added successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add teacher: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTeacherMutation.mutate(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Teacher</CardTitle>
        <CardDescription>
          Add a new teacher to your institution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g., Mathematics, Science, English"
            />
          </div>

          <Button type="submit" disabled={createTeacherMutation.isPending} className="w-full">
            {createTeacherMutation.isPending ? 'Adding Teacher...' : 'Add Teacher'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTeacher;
