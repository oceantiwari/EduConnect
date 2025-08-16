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
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {getMenuItems().map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`
                  flex items-center gap-3 w-full px-3 py-2 text-left rounded-lg transition-all duration-200
                  ${activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;