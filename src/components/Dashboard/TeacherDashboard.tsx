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
    { type: 'praise', count: 3, color: 'text-teal-700', bg: 'bg-teal-100' },
    { type: 'complaints', count: 1, color: 'text-rose-700', bg: 'bg-rose-100' },
    { type: 'test results', count: 2, color: 'text-sky-700', bg: 'bg-sky-100' },
    { type: 'attendance', count: 0, color: 'text-stone-600', bg: 'bg-stone-100' }
  ];

  const quickStats = [
    { label: 'Total Students', value: '28', icon: Users, color: 'text-sky-700', bg: 'bg-sky-100' },
    { label: 'Present Today', value: '26', icon: CheckCircle, color: 'text-teal-700', bg: 'bg-teal-100' },
    { label: 'Tests This Week', value: '3', icon: BookOpen, color: 'text-violet-700', bg: 'bg-violet-100' },
    { label: 'Pending Reviews', value: '6', icon: Clock, color: 'text-amber-700', bg: 'bg-amber-100' },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Good Morning, Mr. Smith!</h1>
          <p className="mt-1 text-gray-500 text-sm md:text-base">Manage your class and track student progress</p>
        </div>
      </header>

      {/* Class Overview Card */}
      <section className="bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 rounded-2xl p-6 text-slate-800 shadow-md flex items-center gap-6">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-inner">
          <Users className="w-8 h-8 text-slate-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{classInfo.name}</h2>
          <p className="text-sm text-slate-500">Class Teacher</p>
        </div>
        <div className="text-right bg-white rounded-lg px-5 py-3 shadow-inner">
          <p className="text-3xl font-bold">{classInfo.presentToday}/{classInfo.totalStudents}</p>
          <p className="text-xs text-slate-500 tracking-wide">Present Today</p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow flex items-center gap-4"
          >
            <div className={`p-3 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <article className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <header className="flex items-center gap-2 mb-5 text-slate-700">
            <Calendar className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Today's Schedule</h3>
          </header>
          <div className="space-y-4">
            {todayTasks.map((task, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span 
                    className={`w-3 h-3 rounded-full ${
                      task.status === 'completed' ? 'bg-teal-600' :
                      task.status === 'pending' ? 'bg-amber-500' :
                      'bg-sky-500'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{task.task}</p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                </div>
                <span 
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    task.status === 'completed' ? 'bg-teal-100 text-teal-700' :
                    task.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-sky-100 text-sky-700'
                  } capitalize`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Attendance Status */}
        <article className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col items-center">
          <header className="flex items-center gap-2 mb-6 text-slate-700 self-start">
            <ClipboardList className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Attendance Status</h3>
          </header>
          
          <div className="relative w-36 h-36 mb-6">
            <svg className="transform -rotate-90 w-36 h-36">
              <circle
                cx="72"
                cy="72"
                r="62"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="72"
                cy="72"
                r="62"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${(classInfo.presentToday / classInfo.totalStudents) * 389.56} 389.56`}
                className="text-teal-600"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-gray-800">
                {Math.round((classInfo.presentToday / classInfo.totalStudents) * 100)}%
              </p>
              <p className="text-sm text-gray-500 tracking-wide">Present</p>
            </div>
          </div>

          <div className="flex justify-around w-full text-center text-sm text-gray-600">
            <div>
              <p className="text-2xl font-semibold text-teal-700">{classInfo.presentToday}</p>
              <p>Present</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-rose-600">{classInfo.totalStudents - classInfo.presentToday}</p>
              <p>Absent</p>
            </div>
          </div>
        </article>

        {/* Pending Actions */}
        <article className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <header className="flex items-center gap-2 mb-5 text-slate-700">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Pending Actions</h3>
          </header>
          <div className="space-y-4">
            {pendingActions.map((action, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${action.bg.replace('bg-', 'bg-')}`} />
                  <span className="text-sm font-medium text-gray-800 capitalize">
                    {action.type} to review
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${action.bg} ${action.color}`}>
                  {action.count}
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Quick Actions */}
        <article className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-teal-50 hover:border-teal-300 transition-colors text-teal-700 font-medium">
              <ClipboardList className="w-5 h-5" />
              Take Attendance
            </button>
            <button className="flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-sky-50 hover:border-sky-300 transition-colors text-sky-700 font-medium">
              <BookOpen className="w-5 h-5" />
              Add Test
            </button>
            <button className="flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-violet-50 hover:border-violet-300 transition-colors text-violet-700 font-medium">
              <MessageCircle className="w-5 h-5" />
              Send Praise
            </button>
            <button className="flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-amber-50 hover:border-amber-300 transition-colors text-amber-700 font-medium">
              <Bell className="w-5 h-5" />
              Send Update
            </button>
          </div>
        </article>
      </section>
    </div>
  );
};

export default TeacherDashboard;
