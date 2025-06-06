
import React from 'react';
import Layout from '../Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Zap, BarChart3, Settings } from 'lucide-react';
import UserRoleManagement from '../management/UserRoleManagement';
import QuickActions from '../management/QuickActions';

const ManagementDashboard = () => {
  return (
    <Layout title="Management Dashboard">
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <BarChart3 className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold">Management Dashboard</h1>
            <p className="text-gray-600">Institution oversight and management</p>
          </div>
        </div>

        <Tabs defaultValue="quick-actions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quick-actions" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Quick Actions
            </TabsTrigger>
            <TabsTrigger value="user-roles" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Roles
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quick-actions">
            <QuickActions />
          </TabsContent>

          <TabsContent value="user-roles">
            <UserRoleManagement />
          </TabsContent>

          <TabsContent value="reports">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Reports & Analytics</h3>
              <p className="text-gray-600">View detailed reports and analytics</p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Management Settings</h3>
              <p className="text-gray-600">Configure management preferences</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ManagementDashboard;
