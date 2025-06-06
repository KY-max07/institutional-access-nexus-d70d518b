
import React, { useState } from 'react';
import Layout from '../Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Users, Settings, Shield } from 'lucide-react';
import InstitutionManagement from '../admin/InstitutionManagement';
import CustomRoleManagement from '../admin/CustomRoleManagement';

const SuperAdminDashboard = () => {
  return (
    <Layout title="Super Admin Dashboard">
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Shield className="h-8 w-8 text-red-600" />
          <div>
            <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
            <p className="text-gray-600">Complete system control and management</p>
          </div>
        </div>

        <Tabs defaultValue="institutions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="institutions" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Institutions
            </TabsTrigger>
            <TabsTrigger value="custom-roles" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Custom Roles
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="institutions">
            <InstitutionManagement />
          </TabsContent>

          <TabsContent value="custom-roles">
            <CustomRoleManagement />
          </TabsContent>

          <TabsContent value="users">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">User Management</h3>
              <p className="text-gray-600">Manage all users across all institutions</p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">System Settings</h3>
              <p className="text-gray-600">Configure global system settings</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;
