
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
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomRole {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  institution_id?: string;
  created_at: string;
}

interface Institution {
  id: string;
  name: string;
}

const AVAILABLE_PERMISSIONS = [
  'manage_users',
  'manage_classes',
  'manage_assignments',
  'view_reports',
  'manage_grades',
  'send_notifications'
];

const CustomRoleManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<CustomRole | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    institution_id: '',
    permissions: [] as string[]
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: institutions } = useQuery({
    queryKey: ['institutions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('institutions')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data as Institution[];
    }
  });

  const { data: customRoles, isLoading } = useQuery({
    queryKey: ['custom_roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('custom_roles')
        .select(`
          *,
          institutions!inner(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (CustomRole & { institutions: { name: string } })[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newRole: typeof formData) => {
      const { data, error } = await supabase
        .from('custom_roles')
        .insert([{
          ...newRole,
          institution_id: newRole.institution_id || null
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom_roles'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Custom role created successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create custom role: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: typeof formData }) => {
      const { data, error } = await supabase
        .from('custom_roles')
        .update({
          ...updates,
          institution_id: updates.institution_id || null
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom_roles'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Custom role updated successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update custom role: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('custom_roles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom_roles'] });
      toast({
        title: "Success",
        description: "Custom role deleted successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete custom role: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const resetForm = () => {
    setFormData({ name: '', description: '', institution_id: '', permissions: [] });
    setEditingRole(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRole) {
      updateMutation.mutate({ id: editingRole.id, updates: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (role: CustomRole) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description || '',
      institution_id: role.institution_id || '',
      permissions: role.permissions
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this custom role?')) {
      deleteMutation.mutate(id);
    }
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permission]
        : prev.permissions.filter(p => p !== permission)
    }));
  };

  if (isLoading) {
    return <div>Loading custom roles...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Custom Role Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Custom Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingRole ? 'Edit Custom Role' : 'Add New Custom Role'}
              </DialogTitle>
              <DialogDescription>
                {editingRole ? 'Update custom role details' : 'Create a new custom role'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="institution">Institution (Optional)</Label>
                  <Select
                    value={formData.institution_id}
                    onValueChange={(value) => setFormData({ ...formData, institution_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select institution (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No specific institution</SelectItem>
                      {institutions?.map((institution) => (
                        <SelectItem key={institution.id} value={institution.id}>
                          {institution.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {AVAILABLE_PERMISSIONS.map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission}
                          checked={formData.permissions.includes(permission)}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(permission, checked as boolean)
                          }
                        />
                        <Label htmlFor={permission} className="text-sm">
                          {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingRole ? 'Update' : 'Create'} Role
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customRoles?.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{role.name}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(role)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(role.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                {role.institutions?.name || 'Global role'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {role.description && (
                <p className="text-sm text-gray-600 mb-3">{role.description}</p>
              )}
              <div>
                <h4 className="font-medium mb-2">Permissions:</h4>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {permission.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomRoleManagement;
