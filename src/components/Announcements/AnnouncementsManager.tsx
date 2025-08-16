import React, { useState } from 'react';
import { Bell, Plus, Users, User, GraduationCap, Send, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AnnouncementsManager: React.FC = () => {
  const { user } = useAuth();
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('ALL');

  const announcements = [
    {
      id: '1',
      title: 'Parent-Teacher Meeting Scheduled',
      body: 'Parent-teacher meetings are scheduled for January 20-21, 2025. Please confirm your attendance with your child\'s class teacher.',
      audience: 'ALL',
      createdBy: 'School Administration',
      createdAt: '2025-01-14',
      priority: 'high',
      channels: ['PUSH', 'EMAIL', 'SMS']
    },
    {
      id: '2',
      title: 'Fee Payment Reminder',
      body: 'This is a friendly reminder that the quarterly fees are due by January 25, 2025. Please make the payment to avoid late charges.',
      audience: 'ALL',
      createdBy: 'Accounts Department',
      createdAt: '2025-01-13',
      priority: 'medium',
      channels: ['PUSH', 'EMAIL']
    },
    {
      id: '3',
      title: 'Grade 5 Science Exhibition',
      body: 'Grade 5 students will be presenting their science projects on January 18. Parents are welcome to attend from 2:00 PM to 4:00 PM.',
      audience: 'CLASS',
      targetClass: 'Grade 5-A',
      createdBy: 'Ms. Smith',
      createdAt: '2025-01-12',
      priority: 'medium',
      channels: ['PUSH', 'EMAIL']
    },
    {
      id: '4',
      title: 'School Closure - Republic Day',
      body: 'School will remain closed on January 26, 2025, in observance of Republic Day. Regular classes will resume on January 27.',
      audience: 'ALL',
      createdBy: 'Principal',
      createdAt: '2025-01-11',
      priority: 'high',
      channels: ['PUSH', 'EMAIL', 'SMS']
    }
  ];

  const stats = {
    totalSent: 248,
    delivered: 235,
    opened: 198,
    clicked: 87
  };

  const submitAnnouncement = (data: any) => {
    console.log('New announcement:', data);
    setShowNewAnnouncement(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case 'ALL': return Users;
      case 'CLASS': return GraduationCap;
      case 'STUDENT': return User;
      default: return Users;
    }
  };

  if (user?.role === 'PARENT') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Updates & Announcements</h1>
            <p className="text-gray-600">Stay updated with school news and announcements</p>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => {
            const AudienceIcon = getAudienceIcon(announcement.audience);
            return (
              <div key={announcement.id} className={`bg-white border rounded-xl p-6 ${getPriorityColor(announcement.priority)}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${announcement.priority === 'high' ? 'bg-red-100' : announcement.priority === 'medium' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                    <Bell className={`w-6 h-6 ${announcement.priority === 'high' ? 'text-red-600' : announcement.priority === 'medium' ? 'text-orange-600' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                          announcement.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {announcement.priority}
                        </span>
                        <AudienceIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{announcement.body}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{announcement.createdBy}</span>
                      <span>•</span>
                      <span>{announcement.createdAt}</span>
                      {announcement.targetClass && (
                        <>
                          <span>•</span>
                          <span>{announcement.targetClass}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600">Send updates and announcements to parents and students</p>
          </div>
        </div>
        <button
          onClick={() => setShowNewAnnouncement(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Send className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSent}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Opened</p>
              <p className="text-2xl font-bold text-gray-900">{stats.opened}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Clicked</p>
              <p className="text-2xl font-bold text-gray-900">{stats.clicked}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Announcements */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {announcements.map((announcement) => {
            const AudienceIcon = getAudienceIcon(announcement.audience);
            return (
              <div key={announcement.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${announcement.priority === 'high' ? 'bg-red-100' : announcement.priority === 'medium' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                    <Bell className={`w-6 h-6 ${announcement.priority === 'high' ? 'text-red-600' : announcement.priority === 'medium' ? 'text-orange-600' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{announcement.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                          announcement.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {announcement.priority}
                        </span>
                        <AudienceIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{announcement.body}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{announcement.createdBy}</span>
                        <span>•</span>
                        <span>{announcement.createdAt}</span>
                        {announcement.targetClass && (
                          <>
                            <span>•</span>
                            <span>{announcement.targetClass}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {announcement.channels.map((channel, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Announcement Modal */}
      {showNewAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">New Announcement</h3>
            </div>
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Audience</label>
                  <select 
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Parents</option>
                    <option value="CLASS">Specific Class</option>
                    <option value="STUDENT">Specific Student</option>
                  </select>
                </div>
              </div>

              {selectedAudience === 'CLASS' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Grade 1-A</option>
                    <option>Grade 2-A</option>
                    <option>Grade 3-A</option>
                    <option>Grade 4-A</option>
                    <option>Grade 5-A</option>
                  </select>
                </div>
              )}

              {selectedAudience === 'STUDENT' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Emma Johnson</option>
                    <option>Liam Smith</option>
                    <option>Olivia Davis</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter announcement title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Enter your announcement message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Channels</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded mr-2" />
                    Push Notification
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded mr-2" />
                    Email
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded mr-2" />
                    SMS
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => submitAnnouncement({})}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Announcement
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewAnnouncement(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsManager;