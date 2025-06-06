
import React from 'react';
import Layout from '../Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, GraduationCap, TrendingUp, Calendar, Plus, Settings } from 'lucide-react';

const ManagementDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '156', icon: Users, color: 'text-blue-600' },
    { title: 'Active Teachers', value: '24', icon: GraduationCap, color: 'text-green-600' },
    { title: 'Student Enrollment', value: '1,247', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Active Classes', value: '18', icon: Calendar, color: 'text-orange-600' }
  ];

  const enrollmentData = [
    { month: 'Jan', students: 1100, teachers: 20 },
    { month: 'Feb', students: 1150, teachers: 21 },
    { month: 'Mar', students: 1200, teachers: 23 },
    { month: 'Apr', students: 1247, teachers: 24 }
  ];

  const performanceData = [
    { subject: 'Math', average: 85 },
    { subject: 'Science', average: 78 },
    { subject: 'English', average: 82 },
    { subject: 'History', average: 76 },
    { subject: 'Art', average: 88 }
  ];

  const recentActivities = [
    { action: 'New teacher assigned to Grade 10 Math', time: '2 hours ago', type: 'assignment' },
    { action: 'Student enrollment completed for Spring semester', time: '5 hours ago', type: 'enrollment' },
    { action: 'Performance report generated', time: '1 day ago', type: 'report' },
    { action: 'New class schedule approved', time: '2 days ago', type: 'schedule' }
  ];

  const userRoles = [
    { role: 'Institution Admin', count: 3, description: 'Full institution management' },
    { role: 'Teacher', count: 24, description: 'Class and student management' },
    { role: 'Academic Coordinator', count: 2, description: 'Custom role for coordination' }
  ];

  return (
    <Layout title="Management Dashboard">
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Trends</CardTitle>
                <CardDescription>Student and teacher growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="teachers" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
                <CardDescription>Average scores by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="average" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'assignment' ? 'bg-blue-500' :
                        activity.type === 'enrollment' ? 'bg-green-500' :
                        activity.type === 'report' ? 'bg-purple-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Roles</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Assign
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userRoles.map((role, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm">{role.role}</h3>
                        <Badge variant="secondary">{role.count}</Badge>
                      </div>
                      <p className="text-xs text-gray-600">{role.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Institution Settings
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManagementDashboard;
