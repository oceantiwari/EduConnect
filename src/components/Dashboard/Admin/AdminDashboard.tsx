import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  DollarSign,
  UserCheck,
  MessageSquare,
  Calendar,
  ShoppingBag,
  BarChart3,
  Bell,
  Settings,
  FileText,
  UserPlus
} from 'lucide-react';
import DashboardHeader from '../Shared/DashboardHeader';
import StatCard from '../Shared/StatCard';
import RevenueOverview from './RevenueOverview';
import SystemAlerts from './SystemAlerts';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import { childRequestService } from '../../../services/childRequestService';
import { userRegistrationService } from '../../../services/userRegistrationService';

interface AdminDashboardProps {
  onNavigate?: (tab: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [pendingRegistrationsCount, setPendingRegistrationsCount] = useState(0);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    const childRequestsCount = await childRequestService.getPendingRequestsCount();
    setPendingRequestsCount(childRequestsCount);

    const registrationsCount = await userRegistrationService.getPendingRequestsCount('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
    setPendingRegistrationsCount(registrationsCount);
  };

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

  const revenueData = [
    { month: 'Jan', fees: 45000, store: 12000 },
    { month: 'Feb', fees: 47000, store: 15000 },
    { month: 'Mar', fees: 46000, store: 18000 },
    { month: 'Apr', fees: 48000, store: 14000 }
  ];

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
      type: 'warning' as const, 
      message: 'Low attendance in Grade 3-B (78%)', 
      priority: 'high' as const,
      action: () => onNavigate?.('attendance')
    },
    { 
      type: 'info' as const, 
      message: '5 pending complaint responses', 
      priority: 'medium' as const,
      action: () => onNavigate?.('praise')
    },
    { 
      type: 'success' as const, 
      message: 'All fee reminders sent successfully', 
      priority: 'low' as const,
      action: () => onNavigate?.('announcements')
    }
  ];

  const quickActions = [
    {
      icon: UserCheck,
      title: 'User Registrations',
      description: `${pendingRegistrationsCount} pending ${pendingRegistrationsCount === 1 ? 'registration' : 'registrations'}`,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-50',
      hoverBorder: 'hover:border-blue-200',
      action: () => onNavigate?.('user-registrations')
    },
    {
      icon: UserPlus,
      title: 'Child Requests',
      description: `${pendingRequestsCount} pending ${pendingRequestsCount === 1 ? 'request' : 'requests'}`,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      hoverBg: 'hover:bg-teal-50',
      hoverBorder: 'hover:border-teal-200',
      action: () => onNavigate?.('child-requests')
    },
    {
      icon: Users,
      title: 'Manage Students',
      description: 'Add, edit, or view student records',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      hoverBg: 'hover:bg-teal-50',
      hoverBorder: 'hover:border-teal-200',
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
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <DashboardHeader
        title="School Dashboard"
        subtitle="Overview of your school's performance and activities"
      >
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
      </DashboardHeader>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <StatCard key={index} {...stat} onClick={stat.action} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueOverview 
          data={revenueData} 
          onViewDetails={() => onNavigate?.('performance')} 
        />
        <SystemAlerts 
          alerts={alerts} 
          onViewAll={() => onNavigate?.('notifications')} 
        />
        <RecentActivity activities={recentActivity} />
        <QuickActions 
          actions={quickActions}
          showAll={showQuickActions}
          onToggleShowAll={() => setShowQuickActions(!showQuickActions)}
        />
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Pending Complaints"
          value={schoolStats.pendingComplaints}
          icon={MessageSquare}
          color="text-red-600"
          bg="bg-red-50"
          onClick={() => onNavigate?.('praise')}
        />
        <StatCard
          label="Upcoming Events"
          value={schoolStats.upcomingEvents}
          icon={Calendar}
          color="text-blue-600"
          bg="bg-blue-50"
          onClick={() => onNavigate?.('events')}
        />
        <StatCard
          label="Low Stock Items"
          value={schoolStats.lowStockItems}
          icon={ShoppingBag}
          color="text-orange-600"
          bg="bg-orange-50"
          onClick={() => onNavigate?.('store')}
        />
        <StatCard
          label="Tests This Week"
          value={4}
          icon={FileText}
          color="text-purple-600"
          bg="bg-purple-50"
          onClick={() => onNavigate?.('tests')}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
