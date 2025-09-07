import React from 'react';
import { X, Bell, MessageSquare, Calendar, ShoppingBag, UserCheck, BookOpen } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const notifications = [
    {
      id: '1',
      type: 'ATTENDANCE',
      title: 'Attendance Alert',
      message: 'Emma was marked absent today. Please confirm if this is correct.',
      isRead: false,
      createdAt: '2025-01-14 09:30:00',
      priority: 'high'
    },
    {
      id: '2',
      type: 'PRAISE',
      title: 'New Praise Received',
      message: 'Mr. Smith praised Emma for excellent math performance.',
      isRead: false,
      createdAt: '2025-01-14 08:15:00',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'EVENT',
      title: 'Upcoming Event',
      message: 'Science Exhibition is tomorrow at 10:00 AM.',
      isRead: true,
      createdAt: '2025-01-13 18:00:00',
      priority: 'medium'
    },
    {
      id: '4',
      type: 'ANNOUNCEMENT',
      title: 'Fee Reminder',
      message: 'Quarterly fees are due by January 25, 2025.',
      isRead: true,
      createdAt: '2025-01-13 16:30:00',
      priority: 'low'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ATTENDANCE': return UserCheck;
      case 'PRAISE': return MessageSquare;
      case 'EVENT': return Calendar;
      case 'ANNOUNCEMENT': return Bell;
      case 'TEST': return BookOpen;
      case 'STORE': return ShoppingBag;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-red-500 bg-red-100';
    if (type === 'ATTENDANCE') return 'text-sky-600 bg-sky-100';
    if (type === 'PRAISE') return 'text-emerald-600 bg-emerald-100';
    if (type === 'EVENT') return 'text-violet-600 bg-violet-100';
    return 'text-gray-600 bg-gray-100';
  };

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-gradient-to-br from-white via-blue-50 to-emerald-50 rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white/70 backdrop-blur">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Notification List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No new notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-blue-50/40 transition-all cursor-pointer ${
                    !notification.isRead ? 'bg-sky-50/60' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`p-2 rounded-xl shadow-sm ${getNotificationColor(notification.type, notification.priority)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{notification.message}</p>
                      <p className="text-xs text-gray-500">{formatTime(notification.createdAt)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-white/70 backdrop-blur">
          <button className="w-full text-sky-600 text-sm font-medium hover:text-sky-700 transition-colors">
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
