
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import SuperAdminDashboard from '../components/dashboards/SuperAdminDashboard';
import ManagementDashboard from '../components/dashboards/ManagementDashboard';
import InstitutionAdminDashboard from '../components/dashboards/InstitutionAdminDashboard';
import TeacherDashboard from '../components/dashboards/TeacherDashboard';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  switch (user.role) {
    case 'super_admin':
      return <SuperAdminDashboard />;
    case 'management':
      return <ManagementDashboard />;
    case 'institution_admin':
      return <InstitutionAdminDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'custom':
      return <TeacherDashboard />; // Default to teacher dashboard for custom roles
    default:
      return <LoginForm />;
  }
};

export default Index;
