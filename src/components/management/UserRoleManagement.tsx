
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  institution_id?: string;
  created_at: string;
}

interface Institution {
  id: string;
  name: string;
}

const USER_ROLES = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'management', label: 'Management' },
  { value: 'institution_admin', label: 'Institution Admin' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'custom', label: 'Custom Role' }
];

const UserRoleManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [newRole, setNewRole] = useState('');
  const [newInstitution, setNewInstitution] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

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

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['user_profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          institutions(name)
        `)
        .neq('id', user?.id) // Exclude current user
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (Profile & { institutions: { name: string } | null })[];
    }
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role, institutionId }: { userId: string; role: string; institutionId?: string }) => {
      const updates: any = { role };
      if (institutionId) {
        updates.institution_id = institutionId;
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_profiles'] });
      setIsDialogOpen(false);
      setSelectedUser(null);
      setNewRole('');
      setNewInstitution('');
      toast({
        title: "Success",
        description: "User role updated successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update user role: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const handleUpdateRole = () => {
    if (!selectedUser || !newRole) return;

    updateRoleMutation.mutate({
      userId: selectedUser.id,
      role: newRole,
      institutionId: newInstitution || undefined
    });
  };

  const openRoleDialog = (profile: Profile) => {
    setSelectedUser(profile);
    setNewRole(profile.role);
    setNewInstitution(profile.institution_id || '');
    setIsDialogOpen(true);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'management': return 'bg-purple-100 text-purple-800';
      case 'institution_admin': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div>Loading user profiles...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Role Management</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          {profiles?.length || 0} users
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles?.map((profile) => (
          <Card key={profile.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-lg">{profile.name}</span>
                <Badge className={getRoleBadgeColor(profile.role)}>
                  {USER_ROLES.find(r => r.value === profile.role)?.label || profile.role}
                </Badge>
              </CardTitle>
              <CardDescription>{profile.email}</CardDescription>
            </CardHeader>
            <CardContent>
              {profile.institutions && (
                <p className="text-sm text-gray-600 mb-3">
                  Institution: {profile.institutions.name}
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => openRoleDialog(profile)}
                className="w-full"
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Update Role
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update User Role</DialogTitle>
            <DialogDescription>
              Change the role and institution for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="institution">Institution (Optional)</Label>
              <Select value={newInstitution} onValueChange={setNewInstitution}>
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
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateRole} disabled={updateRoleMutation.isPending}>
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserRoleManagement;
