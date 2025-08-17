import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/Auth/LoginPage';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import ParentDashboard from './components/Dashboard/ParentDashboard';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import AttendanceManager from './components/Attendance/AttendanceManager';
import PraiseComplaintsManager from './components/PraiseComplaints/PraiseComplaintsManager';
import SchoolStore from './components/Store/SchoolStore';
import AnnouncementsManager from './components/Announcements/AnnouncementsManager';
import EventsManager from './components/Events/EventsManager';
import PerformanceTracker from './components/Performance/PerformanceTracker';

function App() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSidebarClose = () => {
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    if (showLanding) {
      return <LandingPage onGetStarted={() => setShowLanding(false)} />;
    }
    return <LoginPage />;
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (user.role === 'PARENT') return <ParentDashboard />;
        if (user.role === 'TEACHER') return <TeacherDashboard />;
        if (user.role === 'SCHOOL_ADMIN') return <AdminDashboard />;
        return <ParentDashboard />;
      
      case 'attendance':
        return <AttendanceManager />;
      
      case 'praise':
        return <PraiseComplaintsManager />;
      
      case 'performance':
        return <PerformanceTracker />;
      
      case 'store':
        return <SchoolStore />;
      
      case 'announcements':
        return <AnnouncementsManager />;
      
      case 'events':
        return <EventsManager />;
      
      case 'tests':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tests & Results</h1>
            <p className="text-gray-600">Test management functionality coming soon...</p>
          </div>
        );
      
      case 'students':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Student Management</h1>
            <p className="text-gray-600">Student management functionality coming soon...</p>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h1>
            <p className="text-gray-600">Notification center coming soon...</p>
          </div>
        );
      
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      
      default:
        return <ParentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={isMobileMenuOpen}
          onClose={handleSidebarClose}
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onMenuClick={handleMenuClick}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          
          <main className="flex-1 overflow-auto">
            {renderMainContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;