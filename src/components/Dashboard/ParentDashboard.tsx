import React from 'react';
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

const ParentDashboard: React.FC = () => {
  const studentInfo = {
    name: 'Emma Johnson',
    class: 'Grade 5-A',
    rollNo: '15',
    profilePhoto: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const todayAttendance = {
    marked: true,
    status: 'LEFT',
    time: '08:30 AM'
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
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {todayAttendance.marked ? 'Marked Present' : 'Not Marked Yet'}
              </span>
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
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-medium text-emerald-800">Child Departure Marked</p>
                <p className="text-xs text-emerald-600">Left for school at {todayAttendance.time}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
              {todayAttendance.status}
            </span>
          </div>
        </div>

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
            <button className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">View Messages</span>
            </button>
            <button className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">School Store</span>
            </button>
            <button className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">Performance</span>
            </button>
            <button className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors">
              <Bell className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Updates</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;