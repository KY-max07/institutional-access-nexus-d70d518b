import React, { useState } from 'react';
import Layout from '../Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Users, Shield, Activity, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

const SuperAdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddInstitutionOpen, setIsAddInstitutionOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [newInstitution, setNewInstitution] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const stats = [
    { title: 'Total Institutions', value: '24', icon: Building2, color: 'text-blue-600' },
    { title: 'Total Users', value: '1,247', icon: Users, color: 'text-green-600' },
    { title: 'Custom Roles', value: '8', icon: Shield, color: 'text-purple-600' },
    { title: 'System Activity', value: '98%', icon: Activity, color: 'text-orange-600' }
  ];

  const institutions = [
    { id: 1, name: 'Riverside High School', users: 156, admins: 3, status: 'Active' },
    { id: 2, name: 'Central University', users: 2340, admins: 8, status: 'Active' },
    { id: 3, name: 'Maple Elementary', users: 89, admins: 2, status: 'Pending' },
    { id: 4, name: 'Tech Academy', users: 445, admins: 5, status: 'Active' }
  ];

  const customRoles = [
    { id: 1, name: 'Academic Coordinator', permissions: ['read_reports', 'manage_schedules'], institutions: 12 },
    { id: 2, name: 'Support Staff', permissions: ['basic_access', 'student_info'], institutions: 8 },
    { id: 3, name: 'Department Head', permissions: ['manage_teachers', 'view_analytics'], institutions: 15 }
  ];

  const auditLogs = [
    { time: '2024-01-15 10:30', user: 'Sarah Wilson', action: 'Created institution: Tech Academy', severity: 'info' },
    { time: '2024-01-15 09:45', user: 'System', action: 'Automated backup completed', severity: 'success' },
    { time: '2024-01-15 09:12', user: 'David Chen', action: 'Modified user permissions', severity: 'warning' }
  ];

  const handleAddInstitution = async () => {
    try {
      const { data, error } = await supabase
        .from('institutions')
        .insert([{
          name: newInstitution.name,
          contact_email: newInstitution.email,
          contact_phone: newInstitution.phone,
          address: newInstitution.address,
          status: 'Active'
        }]);

      if (error) throw error;

      toast.success('Institution added successfully!');
      setIsAddInstitutionOpen(false);
      setNewInstitution({ name: '', email: '', phone: '', address: '' });
    } catch (error) {
      toast.error('Failed to add institution');
      console.error('Error:', error);
    }
  };

  const handleAddCustomRole = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_roles')
        .insert([{
          name: newRole.name,
          description: newRole.description,
          permissions: newRole.permissions
        }]);

      if (error) throw error;

      toast.success('Custom role added successfully!');
      setIsAddRoleOpen(false);
      setNewRole({ name: '', description: '', permissions: [] });
    } catch (error) {
      toast.error('Failed to add custom role');
      console.error('Error:', error);
    }
  };

  const handleEditInstitution = (id: number) => {
    toast.info(`Edit institution ${id} - Feature coming soon!`);
  };

  const handleDeleteInstitution = (id: number) => {
    toast.info(`Delete institution ${id} - Feature coming soon!`);
  };

  const handleEditRole = (id: number) => {
    toast.info(`Edit role ${id} - Feature coming soon!`);
  };

  const handleDeleteRole = (id: number) => {
    toast.info(`Delete role ${id} - Feature coming soon!`);
  };

  const handleViewAllUsers = () => {
    toast.info('Global user management feature coming soon!');
  };

  return (
    <Layout title="Super Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="institutions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="institutions">Institutions</TabsTrigger>
            <TabsTrigger value="users">Global Users</TabsTrigger>
            <TabsTrigger value="roles">Custom Roles</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="institutions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Institution Management</CardTitle>
                    <CardDescription>Manage all institutions in the system</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddInstitutionOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Institution
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search institutions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  {institutions
                    .filter(inst => inst.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((institution) => (
                      <div key={institution.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{institution.name}</h3>
                          <p className="text-sm text-gray-600">
                            {institution.users} users • {institution.admins} admins
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={institution.status === 'Active' ? 'default' : 'secondary'}>
                            {institution.status}
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => handleEditInstitution(institution.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteInstitution(institution.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Global User Management</CardTitle>
                <CardDescription>Manage users across all institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Global User Management</h3>
                  <p className="text-gray-600 mb-4">View and manage all users across institutions</p>
                  <Button onClick={handleViewAllUsers}>View All Users</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Custom Roles</CardTitle>
                    <CardDescription>Create and manage custom roles for institutions</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddRoleOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Role
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customRoles.map((role) => (
                    <div key={role.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{role.name}</h3>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditRole(role.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteRole(role.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {role.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline">{permission}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">Used by {role.institutions} institutions</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Audit Logs</CardTitle>
                <CardDescription>Monitor all system activities and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        log.severity === 'success' ? 'bg-green-500' :
                        log.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{log.action}</p>
                        <p className="text-xs text-gray-500">{log.time} • {log.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Institution Dialog */}
      <Dialog open={isAddInstitutionOpen} onOpenChange={setIsAddInstitutionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Institution</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Institution Name</Label>
              <Input
                id="name"
                value={newInstitution.name}
                onChange={(e) => setNewInstitution({ ...newInstitution, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={newInstitution.email}
                onChange={(e) => setNewInstitution({ ...newInstitution, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input
                id="phone"
                value={newInstitution.phone}
                onChange={(e) => setNewInstitution({ ...newInstitution, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newInstitution.address}
                onChange={(e) => setNewInstitution({ ...newInstitution, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddInstitutionOpen(false)}>Cancel</Button>
            <Button onClick={handleAddInstitution}>Add Institution</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Custom Role Dialog */}
      <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Custom Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input
                id="roleName"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleDescription">Description</Label>
              <Input
                id="roleDescription"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCustomRole}>Create Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default SuperAdminDashboard;