import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/Auth/LoginPage';
import SignUpPage from './components/Auth/SignUpPage';
import Admin2FAVerification from './components/Auth/Admin2FAVerification';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import AttendanceManager from './components/Attendance/AttendanceManager';
import PraiseComplaintsManager from './components/PraiseComplaints/PraiseComplaintsManager';
import SchoolStore from './components/Store/SchoolStore';
import AnnouncementsManager from './components/Announcements/AnnouncementsManager';
import EventsManager from './components/Events/EventsManager';
import PerformanceTracker from './components/Performance/PerformanceTracker';
import TestsManager from './components/Tests/TestsManager';
import ChildRequestsManager from './components/Admin/ChildRequestsManager';
import UserRegistrationsManager from './components/Admin/UserRegistrationsManager';

type AuthView = 'landing' | 'login' | 'signup' | '2fa';

function App() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('landing');
  const [pendingUserId, setPendingUserId] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');

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
    switch (authView) {
      case 'landing':
        return <LandingPage onGetStarted={() => setAuthView('signup')} />;

      case 'signup':
        return (
          <SignUpPage
            onNavigateToLogin={() => setAuthView('login')}
            onNavigateTo2FA={(userId, email) => {
              setPendingUserId(userId);
              setPendingEmail(email);
              setAuthView('2fa');
            }}
          />
        );

      case '2fa':
        return (
          <Admin2FAVerification
            userId={pendingUserId}
            email={pendingEmail}
          />
        );

      case 'login':
      default:
        return <LoginPage onNavigateToSignUp={() => setAuthView('signup')} />;
    }
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContainer onNavigate={setActiveTab} />;
      
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
        return <TestsManager />;

      case 'child-requests':
        return <ChildRequestsManager adminId={user.id} />;

      case 'user-registrations':
        return <UserRegistrationsManager adminId={user.id} schoolId={user.schoolId} />;

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
        return <DashboardContainer onNavigate={setActiveTab} />;
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