import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from './Admin/AdminDashboard';
import TeacherDashboard from './Teacher/TeacherDashboard';
import ParentDashboard from './Parent/ParentDashboard';
import StudentDashboard from './Student/StudentDashboard';

interface DashboardContainerProps {
  onNavigate?: (tab: string) => void;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          <p>Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'SCHOOL_ADMIN':
        return <AdminDashboard onNavigate={onNavigate} />;
      
      case 'TEACHER':
        return <TeacherDashboard onNavigate={onNavigate} />;
      
      case 'PARENT':
        return <ParentDashboard onNavigate={onNavigate} />;
      
      case 'STUDENT':
        return <StudentDashboard onNavigate={onNavigate} />;
      
      default:
        // Default to parent dashboard for unknown roles
        return <ParentDashboard onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="dashboard-container">
      {renderDashboard()}
    </div>
  );
};

export default DashboardContainer;