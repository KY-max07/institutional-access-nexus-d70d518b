
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import SuperAdminDashboard from '../components/dashboards/SuperAdminDashboard';
import ManagementDashboard from '../components/dashboards/ManagementDashboard';
import InstitutionAdminDashboard from '../components/dashboards/InstitutionAdminDashboard';
import TeacherDashboard from '../components/dashboards/TeacherDashboard';

const Index = () => {
  const { user } = useAuth();

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
