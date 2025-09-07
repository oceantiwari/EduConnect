import React from 'react';
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  ShoppingBag,
  Bell,
  ClipboardList,
  BarChart3,
  Settings,
  UserCheck,
  GraduationCap,
  BookOpen,
  Gift,
  FileText,
  CalendarDays,
  X,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const calmTheme = {
  bg: '#fdfdfd',
  primary: '#3f72af',   // Calm muted blue
  secondary: '#112d4e', // Dark navy
  accent: '#dbe2ef',    // Soft grey-blue
  textDark: '#222',
  textLight: '#fff',
  border: '#e0e0e0',
  hoverBg: '#f0f4fa',
  activeBg: '#e3ecf7',
};

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen, onClose }) => {
  const { user } = useAuth();

  if (!user) return null;

  const getMenuItems = () => {
    switch (user.role) {
      case 'PARENT':
        return [
          { id: 'landing', label: 'About KidSafe', icon: Home },
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'attendance', label: 'Attendance', icon: UserCheck },
          { id: 'praise', label: 'Praise & Complaints', icon: MessageSquare },
          { id: 'performance', label: 'Performance', icon: BarChart3 },
          { id: 'store', label: 'School Store', icon: ShoppingBag },
          { id: 'announcements', label: 'Updates', icon: Bell },
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ];
      case 'TEACHER':
        return [
          { id: 'landing', label: 'About KidSafe', icon: Home },
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'attendance', label: 'Take Attendance', icon: ClipboardList },
          { id: 'tests', label: 'Tests & Results', icon: BookOpen },
          { id: 'praise', label: 'Praise & Complaints', icon: Gift },
          { id: 'announcements', label: 'Send Updates', icon: FileText },
          { id: 'events', label: 'Events', icon: CalendarDays },
          { id: 'performance', label: 'Performance Reports', icon: BarChart3 },
        ];
      case 'SCHOOL_ADMIN':
        return [
          { id: 'landing', label: 'About KidSafe', icon: Home },
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'students', label: 'Students', icon: Users },
          { id: 'attendance', label: 'Attendance Overview', icon: UserCheck },
          { id: 'tests', label: 'Tests Management', icon: GraduationCap },
          { id: 'praise', label: 'Praise & Complaints', icon: MessageSquare },
          { id: 'store', label: 'Store Management', icon: ShoppingBag },
          { id: 'announcements', label: 'Announcements', icon: Bell },
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'performance', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 40,
            backdropFilter: 'blur(3px)',
            cursor: 'pointer',
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: 280,
          backgroundColor: calmTheme.bg,
          borderRight: `1px solid ${calmTheme.border}`,
          boxShadow: '3px 0 10px rgba(0,0,0,0.05)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 20,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px 20px',
            borderBottom: `1px solid ${calmTheme.border}`,
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: calmTheme.secondary,
              letterSpacing: 1,
            }}
          >
            Menu
          </h2>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            style={{
              backgroundColor: calmTheme.primary,
              borderRadius: '50%',
              border: 'none',
              width: 34,
              height: 34,
              color: calmTheme.textLight,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu items */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0 10px' }}>
          {getMenuItems().map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  width: '100%',
                  padding: '12px 20px',
                  marginBottom: 8,
                  borderRadius: 10,
                  border: isActive
                    ? `1px solid ${calmTheme.primary}`
                    : '1px solid transparent',
                  backgroundColor: isActive ? calmTheme.activeBg : calmTheme.bg,
                  color: isActive ? calmTheme.primary : calmTheme.textDark,
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = calmTheme.hoverBg;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = calmTheme.bg;
                }}
              >
                <item.icon
                  size={20}
                  style={{
                    flexShrink: 0,
                    color: isActive ? calmTheme.primary : calmTheme.secondary,
                  }}
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
