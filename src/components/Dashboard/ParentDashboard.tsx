import React, { useState } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  ShoppingBag, 
  Bell, 
  BarChart3,
  UserCheck,
  Clock,
  AlertCircle,
  TrendingUp,
  Star
} from 'lucide-react';

interface ParentDashboardProps {
  onNavigate?: (tab: string) => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ onNavigate }) => {
  const studentInfo = {
    name: 'Emma Johnson',
    class: 'Grade 5-A',
    rollNo: '15',
    profilePhoto: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400'
  };
  
  const [todayAttendance, setTodayAttendance] = useState({
    parentStatus: {
      status: 'NOT_LEFT',
      time: '7:30 AM',
      reason: ''
    },
    teacherStatus: {
      status: 'PRESENT',
      time: '8:30 AM'
    },
    mismatch: false
  });
  
  const [leftReason, setLeftReason] = useState('');
  
  const handleLeftHome = () => {
    // In a real app, this would call an API to update the status
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (!leftReason.trim()) {
      alert('Please provide a reason for leaving');
      return;
    }
    
    setTodayAttendance(prev => ({
      ...prev,
      parentStatus: {
        status: 'LEFT',
        time: timeString,
        reason: leftReason
      },
      // Check for mismatch with teacher's status
      mismatch: prev.teacherStatus.status === 'ABSENT'
    }));
    
    setLeftReason('');
    alert('Marked as Left Home successfully!');
  };

  const recentPraise = [
    { subject: 'Mathematics', teacher: 'Ms. Smith', message: 'Excellent problem solving!', date: '2025-01-14' },
    { subject: 'English', teacher: 'Mr. Davis', message: 'Great reading comprehension', date: '2025-01-12' }
  ];

  const upcomingTests = [
    { subject: 'Science', date: '2025-01-18', syllabus: 'Chapter 3-4' },
    { subject: 'History', date: '2025-01-22', syllabus: 'Ancient Civilizations' }
  ];

  const quickStats = [
    { label: 'Attendance Rate', value: '96%', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Average Score', value: '88%', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Praise Points', value: '24', icon: Star, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Pending Items', value: '2', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600">Here's what's happening with {studentInfo.name} today</p>
        </div>
      </div>

      {/* Student Card */}
      <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl overflow-hidden">
            <img src={studentInfo.profilePhoto} alt={studentInfo.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{studentInfo.name}</h2>
            <p className="text-blue-100">{studentInfo.class} • Roll No: {studentInfo.rollNo}</p>
          </div>
          <div className="text-right">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                <span className="text-xs font-medium">
                  {todayAttendance.parentStatus.status === 'LEFT' ? 'Left Home' : 'Not Left'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                <div className={`w-2 h-2 rounded-full ${todayAttendance.teacherStatus.status === 'PRESENT' ? 'bg-blue-300' : 'bg-red-300'}`}></div>
                <span className="text-xs font-medium">
                  {todayAttendance.teacherStatus.status === 'PRESENT' ? 'Present at School' : 'Absent'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Today's Status */}
  <div className="bg-white rounded-xl p-6 border border-gray-100">
    <div className="flex items-center gap-2 mb-4">
      <UserCheck className="w-5 h-5 text-blue-600" />
      <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
    </div>

    <div className="space-y-4">
      {/* Parent Status */}
      <div className="p-4 bg-emerald-50 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <div>
            <p className="text-sm font-medium text-emerald-800">Parent Status</p>
            <p className="text-xs text-emerald-600">
              {todayAttendance.parentStatus.status === 'LEFT'
                ? `Left for school at ${todayAttendance.parentStatus.time}`
                : 'Not marked yet'}
            </p>
          </div>
        </div>
        
        {todayAttendance.parentStatus.status === 'LEFT' ? (
          <div className="mt-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
              Marked Left Home
            </span>
            {todayAttendance.parentStatus.reason && (
              <div className="mt-2 p-2 bg-white rounded border border-emerald-100">
                <p className="text-xs font-medium text-gray-600">Reason:</p>
                <p className="text-sm text-gray-800">{todayAttendance.parentStatus.reason}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="leftReason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for leaving
              </label>
              <textarea 
                id="leftReason"
                value={leftReason}
                onChange={(e) => setLeftReason(e.target.value)}
                placeholder="Please provide a reason (e.g., School bus, Parent drop-off, Walking)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={2}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleLeftHome} 
                type="button"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                disabled={todayAttendance.parentStatus.status === 'LEFT'}
              >
                <Clock className="w-4 h-4" />
                Mark Left for School
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Teacher Status */}
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${todayAttendance.teacherStatus.status === 'PRESENT' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
          <div>
            <p className="text-sm font-medium text-blue-800">Teacher Status</p>
            <p className="text-xs text-blue-600">
              Marked at {todayAttendance.teacherStatus.time}
            </p>

            {/* Status */}
            <div className="mt-2">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${todayAttendance.teacherStatus.status === 'PRESENT' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                {todayAttendance.teacherStatus.status === 'PRESENT' ? 'Marked Present' : 'Marked Absent'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Alert - Only show if there's a mismatch */}
      {todayAttendance.parentStatus.status === 'LEFT' && todayAttendance.teacherStatus.status === 'ABSENT' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">Attendance Mismatch</p>
            <p className="text-xs text-red-600">You marked your child as LEFT but they were marked ABSENT at school.</p>
          </div>
        </div>
      )}
    </div>
  </div>
        {/* Second Column */}
  <div className="space-y-6">
    {/* Recent Praise */}
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-900">Recent Praise</h3>
      </div>
      <div className="space-y-3">
        {recentPraise.map((praise, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{praise.subject}</p>
              <p className="text-xs text-gray-600 mb-1">{praise.teacher}</p>
              <p className="text-sm text-gray-700">{praise.message}</p>
            </div>
            <span className="text-xs text-gray-500">{praise.date}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Upcoming Tests */}
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Tests</h3>
      </div>
      <div className="space-y-3">
        {upcomingTests.map((test, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">{test.subject}</p>
              <p className="text-xs text-gray-600">{test.syllabus}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-purple-600">{test.date}</p>
              <p className="text-xs text-gray-500">4 days left</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onNavigate?.('praise')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
        >
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium">View Messages</span>
        </button>
        <button 
          onClick={() => onNavigate?.('store')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
        >
          <ShoppingBag className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">School Store</span>
        </button>
        <button 
          onClick={() => onNavigate?.('performance')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors"
        >
          <BarChart3 className="w-5 h-5 text-orange-600" />
          <span className="text-sm font-medium">Performance</span>
        </button>
        <button 
          onClick={() => onNavigate?.('announcements')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors"
        >
          <Bell className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium">Updates</span>
        </button>
      </div>
    </div>
  </div>
  </div>
</div>
  );
};

export default ParentDashboard;
