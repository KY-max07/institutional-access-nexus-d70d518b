
import React from 'react';
import Layout from '../Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardList, Users, BarChart3, Calendar } from 'lucide-react';
import AssignmentManagement from '../teacher/AssignmentManagement';

const TeacherDashboard = () => {
  return (
    <Layout title="Teacher Dashboard">
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <ClipboardList className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-gray-600">Manage your classes and assignments</p>
          </div>
        </div>

        <Tabs defaultValue="assignments" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Grades
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assignments">
            <AssignmentManagement />
          </TabsContent>

          <TabsContent value="students">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">My Students</h3>
              <p className="text-gray-600">View and manage students in your classes</p>
            </div>
          </TabsContent>

          <TabsContent value="grades">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Grade Management</h3>
              <p className="text-gray-600">Grade assignments and track student progress</p>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Class Schedule</h3>
              <p className="text-gray-600">View your teaching schedule</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;
