import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from './Admin/AdminDashboard';
import TeacherDashboard from './Teacher/TeacherDashboard';
import ParentDashboard from './Parent/ParentDashboard';
import StudentDashboard from './Student/StudentDashboard';

interface DashboardContainerProps {
  onNavigate?: (tab: string) => void;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ onNavigate }) => {
  const navigate = useNavigate();

  const handleNavigate = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
    } else {
      navigate(`/${tab}`);
    }
  };
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
        return <AdminDashboard onNavigate={handleNavigate} />;

      case 'TEACHER':
        return <TeacherDashboard onNavigate={handleNavigate} />;

      case 'PARENT':
        return <ParentDashboard onNavigate={handleNavigate} />;

      case 'STUDENT':
        return <StudentDashboard onNavigate={handleNavigate} />;

      default:
        return <ParentDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="dashboard-container">
      {renderDashboard()}
    </div>
  );
};

export default DashboardContainer;
