import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  DollarSign,
  UserCheck,
  MessageSquare,
  Calendar,
  ShoppingBag,
  BarChart3,
  AlertCircle,
  Plus,
  Eye,
  Settings,
  Bell,
  FileText
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate?: (tab: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [showQuickActions, setShowQuickActions] = useState(false);

  const schoolStats = {
    totalStudents: 450,
    totalTeachers: 25,
    totalClasses: 18,
    attendanceRate: 94,
    monthlyRevenue: 63000,
    pendingComplaints: 5,
    upcomingEvents: 3,
    lowStockItems: 3
  };

  const recentActivity = [
    { 
      type: 'attendance', 
      message: 'Grade 5-A attendance submitted', 
      time: '2 hours ago', 
      user: 'Mr. Smith',
      action: () => onNavigate?.('attendance')
    },
    { 
      type: 'complaint', 
      message: 'New complaint raised by parent', 
      time: '3 hours ago', 
      user: 'Sarah Johnson',
      action: () => onNavigate?.('praise')
    },
    { 
      type: 'test', 
      message: 'Math test results published', 
      time: '5 hours ago', 
      user: 'Ms. Davis',
      action: () => onNavigate?.('tests')
    },
    { 
      type: 'store', 
      message: 'New uniform order received', 
      time: '1 day ago', 
      user: 'Parent Portal',
      action: () => onNavigate?.('store')
    }
  ];

  const monthlyRevenue = [
    { month: 'Jan', fees: 45000, store: 12000 },
    { month: 'Feb', fees: 47000, store: 15000 },
    { month: 'Mar', fees: 46000, store: 18000 },
    { month: 'Apr', fees: 48000, store: 14000 }
  ];

  const quickStats = [
    { 
      label: 'Total Students', 
      value: schoolStats.totalStudents, 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      change: '+5%',
      action: () => onNavigate?.('students')
    },
    { 
      label: 'Teachers', 
      value: schoolStats.totalTeachers, 
      icon: GraduationCap, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      change: '+0%',
      action: () => onNavigate?.('students')
    },
    { 
      label: 'Attendance Rate', 
      value: `${schoolStats.attendanceRate}%`, 
      icon: UserCheck, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50', 
      change: '+2%',
      action: () => onNavigate?.('attendance')
    },
    { 
      label: 'Monthly Revenue', 
      value: '₹63K', 
      icon: DollarSign, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50', 
      change: '+12%',
      action: () => onNavigate?.('store')
    },
  ];

  const alerts = [
    { 
      type: 'warning', 
      message: 'Low attendance in Grade 3-B (78%)', 
      priority: 'high',
      action: () => onNavigate?.('attendance')
    },
    { 
      type: 'info', 
      message: '5 pending complaint responses', 
      priority: 'medium',
      action: () => onNavigate?.('praise')
    },
    { 
      type: 'success', 
      message: 'All fee reminders sent successfully', 
      priority: 'low',
      action: () => onNavigate?.('announcements')
    }
  ];

  const quickActions = [
    {
      icon: Users,
      title: 'Manage Students',
      description: 'Add, edit, or view student records',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-50',
      hoverBorder: 'hover:border-blue-200',
      action: () => onNavigate?.('students')
    },
    {
      icon: GraduationCap,
      title: 'Teacher Portal',
      description: 'Manage teachers and assignments',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      hoverBg: 'hover:bg-emerald-50',
      hoverBorder: 'hover:border-emerald-200',
      action: () => onNavigate?.('students')
    },
    {
      icon: MessageSquare,
      title: 'Messages',
      description: 'View and respond to messages',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      hoverBg: 'hover:bg-purple-50',
      hoverBorder: 'hover:border-purple-200',
      action: () => onNavigate?.('praise')
    },
    {
      icon: ShoppingBag,
      title: 'Store Orders',
      description: 'Manage store inventory and orders',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      hoverBg: 'hover:bg-orange-50',
      hoverBorder: 'hover:border-orange-200',
      action: () => onNavigate?.('store')
    },
    {
      icon: Bell,
      title: 'Send Announcement',
      description: 'Create and send announcements',
      color: 'text-red-600',
      bg: 'bg-red-50',
      hoverBg: 'hover:bg-red-50',
      hoverBorder: 'hover:border-red-200',
      action: () => onNavigate?.('announcements')
    },
    {
      icon: Calendar,
      title: 'Manage Events',
      description: 'Create and manage school events',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      hoverBg: 'hover:bg-indigo-50',
      hoverBorder: 'hover:border-indigo-200',
      action: () => onNavigate?.('events')
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'View detailed performance analytics',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      hoverBg: 'hover:bg-pink-50',
      hoverBorder: 'hover:border-pink-200',
      action: () => onNavigate?.('performance')
    },
    {
      icon: Settings,
      title: 'School Settings',
      description: 'Configure school preferences',
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      hoverBg: 'hover:bg-gray-50',
      hoverBorder: 'hover:border-gray-200',
      action: () => onNavigate?.('settings')
    }
  ];

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    // In a real app, this would fetch new data based on the timeframe
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Dashboard</h1>
          <p className="text-gray-600">Overview of your school's performance and activities</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => handleTimeframeChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">All Systems Active</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={stat.action}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg ${stat.bg} group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.change.includes('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue Overview</h3>
            </div>
            <button 
              onClick={() => onNavigate?.('performance')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
          <div className="h-64 flex items-end justify-between gap-4">
            {monthlyRevenue.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-1 w-full">
                  <div 
                    className="w-full bg-blue-500 rounded-t-lg relative hover:bg-blue-600 transition-colors cursor-pointer"
                    style={{ height: `${(data.fees / 50000) * 200}px` }}
                    title={`Fees: ₹${data.fees}`}
                  >
                    <div 
                      className="w-full bg-emerald-500 rounded-t-lg absolute bottom-0 hover:bg-emerald-600 transition-colors"
                      style={{ height: `${(data.store / data.fees) * 100}%` }}
                      title={`Store: ₹${data.store}`}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{data.month}</p>
                  <p className="text-xs text-gray-600">₹{(data.fees + data.store) / 1000}K</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Fees (₹{monthlyRevenue.reduce((sum, m) => sum + m.fees, 0) / 1000}K)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Store (₹{monthlyRevenue.reduce((sum, m) => sum + m.store, 0) / 1000}K)</span>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            </div>
            <button 
              onClick={() => onNavigate?.('notifications')}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border-l-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  alert.priority === 'high' ? 'bg-red-50 border-red-400' :
                  alert.priority === 'medium' ? 'bg-orange-50 border-orange-400' :
                  'bg-emerald-50 border-emerald-400'
                }`}
                onClick={alert.action}
              >
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                    alert.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {alert.priority}
                  </span>
                  <span className="text-xs text-gray-500">Click to view</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={activity.action}
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'attendance' ? 'bg-emerald-500' :
                  activity.type === 'complaint' ? 'bg-red-500' :
                  activity.type === 'test' ? 'bg-blue-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                  <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              {showQuickActions ? 'Show Less' : 'Show More'}
            </button>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${showQuickActions ? '' : 'max-h-32 overflow-hidden'}`}>
            {quickActions.slice(0, showQuickActions ? quickActions.length : 4).map((action, index) => (
              <button 
                key={index}
                onClick={action.action}
                className={`flex flex-col items-center gap-2 p-4 text-center border border-gray-200 rounded-lg transition-all duration-200 ${action.hoverBg} ${action.hoverBorder} hover:shadow-md group`}
              >
                <div className={`p-2 rounded-lg ${action.bg} group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900 block">{action.title}</span>
                  <span className="text-xs text-gray-600">{action.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onNavigate?.('praise')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Complaints</p>
              <p className="text-2xl font-bold text-red-600">{schoolStats.pendingComplaints}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div 
          className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onNavigate?.('events')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold text-blue-600">{schoolStats.upcomingEvents}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div 
          className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onNavigate?.('store')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-orange-600">{schoolStats.lowStockItems}</p>
            </div>
            <ShoppingBag className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <div 
          className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onNavigate?.('tests')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tests This Week</p>
              <p className="text-2xl font-bold text-purple-600">4</p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;