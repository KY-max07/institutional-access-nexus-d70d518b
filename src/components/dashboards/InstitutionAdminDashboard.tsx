
import React from 'react';
import Layout from '../Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, GraduationCap, BookOpen, BarChart3 } from 'lucide-react';
import AddTeacher from '../institution/AddTeacher';
import AddStudent from '../institution/AddStudent';
import CreateClass from '../institution/CreateClass';

const InstitutionAdminDashboard = () => {
  return (
    <Layout title="Institution Admin Dashboard">
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Users className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Institution Admin Dashboard</h1>
            <p className="text-gray-600">Manage your institution's users and classes</p>
          </div>
        </div>

        <Tabs defaultValue="add-teacher" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="add-teacher" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Add Teacher
            </TabsTrigger>
            <TabsTrigger value="add-student" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Add Student
            </TabsTrigger>
            <TabsTrigger value="create-class" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Create Class
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add-teacher">
            <AddTeacher />
          </TabsContent>

          <TabsContent value="add-student">
            <AddStudent />
          </TabsContent>

          <TabsContent value="create-class">
            <CreateClass />
          </TabsContent>

          <TabsContent value="reports">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Institution Reports</h3>
              <p className="text-gray-600">View reports for your institution</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InstitutionAdminDashboard;
