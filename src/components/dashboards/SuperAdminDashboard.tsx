
import React, { useState } from 'react';
import Layout from '../Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, Users, Shield, Activity, Plus, Search, Edit, Trash2 } from 'lucide-react';

const SuperAdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
                  <Button>
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
                  {institutions.map((institution) => (
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
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
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
                  <Button>View All Users</Button>
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
                  <Button>
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
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
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
    </Layout>
  );
};

export default SuperAdminDashboard;
