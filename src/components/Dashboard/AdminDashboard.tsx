import React from 'react';
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
  AlertCircle
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const schoolStats = {
    totalStudents: 450,
    totalTeachers: 25,
    totalClasses: 18,
    attendanceRate: 94
  };

  const recentActivity = [
    { type: 'attendance', message: 'Grade 5-A attendance submitted', time: '2 hours ago', user: 'Mr. Smith' },
    { type: 'complaint', message: 'New complaint raised by parent', time: '3 hours ago', user: 'Sarah Johnson' },
    { type: 'test', message: 'Math test results published', time: '5 hours ago', user: 'Ms. Davis' },
    { type: 'store', message: 'New uniform order received', time: '1 day ago', user: 'Parent Portal' }
  ];

  const monthlyRevenue = [
    { month: 'Jan', fees: 45000, store: 12000 },
    { month: 'Feb', fees: 47000, store: 15000 },
    { month: 'Mar', fees: 46000, store: 18000 },
    { month: 'Apr', fees: 48000, store: 14000 }
  ];

  const quickStats = [
    { label: 'Total Students', value: schoolStats.totalStudents, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', change: '+5%' },
    { label: 'Teachers', value: schoolStats.totalTeachers, icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '+0%' },
    { label: 'Attendance Rate', value: `${schoolStats.attendanceRate}%`, icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-50', change: '+2%' },
    { label: 'Monthly Revenue', value: '₹63K', icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-50', change: '+12%' },
  ];

  const alerts = [
    { type: 'warning', message: 'Low attendance in Grade 3-B (78%)', priority: 'high' },
    { type: 'info', message: '5 pending complaint responses', priority: 'medium' },
    { type: 'success', message: 'All fee reminders sent successfully', priority: 'low' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Dashboard</h1>
          <p className="text-gray-600">Overview of your school's performance and activities</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-lg">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">All Systems Active</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
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
        {/* Attendance Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue Overview</h3>
          </div>
          <div className="h-64 flex items-end justify-between gap-4">
            {monthlyRevenue.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-1 w-full">
                  <div 
                    className="w-full bg-blue-500 rounded-t-lg relative"
                    style={{ height: `${(data.fees / 50000) * 200}px` }}
                  >
                    <div 
                      className="w-full bg-emerald-500 rounded-t-lg absolute bottom-0"
                      style={{ height: `${(data.store / data.fees) * 100}%` }}
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
              <span className="text-sm text-gray-600">Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Store</span>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                alert.priority === 'high' ? 'bg-red-50 border-red-400' :
                alert.priority === 'medium' ? 'bg-orange-50 border-orange-400' :
                'bg-emerald-50 border-emerald-400'
              }`}>
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                    alert.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {alert.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 text-center border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium">Manage Students</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 text-center border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
              <GraduationCap className="w-8 h-8 text-emerald-600" />
              <span className="text-sm font-medium">Teacher Portal</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 text-center border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors">
              <MessageSquare className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium">Messages</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 text-center border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors">
              <ShoppingBag className="w-8 h-8 text-orange-600" />
              <span className="text-sm font-medium">Store Orders</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;