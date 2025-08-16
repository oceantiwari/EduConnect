import React from 'react';
import { 
  Users, 
  ClipboardList, 
  BookOpen, 
  MessageCircle, 
  Bell,
  Calendar,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const classInfo = {
    name: 'Grade 5-A',
    totalStudents: 28,
    presentToday: 26,
    profilePhoto: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const todayTasks = [
    { task: 'Take Attendance', status: 'completed', time: '09:00 AM' },
    { task: 'Math Test - Grade 5A', status: 'pending', time: '10:30 AM' },
    { task: 'Submit Result - Science', status: 'pending', time: '02:00 PM' },
    { task: 'Parent Meeting - Emma', status: 'scheduled', time: '03:30 PM' }
  ];

  const pendingActions = [
    { type: 'praise', count: 3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { type: 'complaints', count: 1, color: 'text-red-600', bg: 'bg-red-50' },
    { type: 'test results', count: 2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { type: 'attendance', count: 0, color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  const quickStats = [
    { label: 'Total Students', value: '28', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Present Today', value: '26', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Tests This Week', value: '3', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending Reviews', value: '6', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good Morning, Mr. Smith!</h1>
          <p className="text-gray-600">Manage your class and track student progress</p>
        </div>
      </div>

      {/* Class Overview Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl overflow-hidden flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{classInfo.name}</h2>
            <p className="text-emerald-100">Class Teacher</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <p className="text-2xl font-bold">{classInfo.presentToday}/{classInfo.totalStudents}</p>
              <p className="text-sm text-emerald-100">Present Today</p>
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
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
          </div>
          <div className="space-y-3">
            {todayTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.status === 'completed' ? 'bg-emerald-500' :
                    task.status === 'pending' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-600">{task.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  task.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                  task.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Status */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">Attendance Status</h3>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${(classInfo.presentToday / classInfo.totalStudents) * 351.86} 351.86`}
                  className="text-emerald-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round((classInfo.presentToday / classInfo.totalStudents) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Present</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{classInfo.presentToday}</div>
              <div className="text-gray-600">Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{classInfo.totalStudents - classInfo.presentToday}</div>
              <div className="text-gray-600">Absent</div>
            </div>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Pending Actions</h3>
          </div>
          <div className="space-y-3">
            {pendingActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${action.color.replace('text-', 'bg-')}`}></div>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {action.type} to review
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${action.bg} ${action.color}`}>
                  {action.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
              <ClipboardList className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">Take Attendance</span>
            </button>
            <button className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Add Test</span>
            </button>
            <button className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Send Praise</span>
            </button>
            <button className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors">
              <Bell className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">Send Update</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;