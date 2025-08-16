import React, { useState } from 'react';
import { MessageSquare, Heart, AlertTriangle, Send, User, Calendar, Reply } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PraiseComplaintsManager: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('praise');
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const mockPraise = [
    {
      id: '1',
      studentName: 'Emma Johnson',
      fromUserName: 'Mr. Smith',
      fromUserRole: 'Teacher',
      title: 'Excellent Math Performance',
      body: 'Emma showed exceptional problem-solving skills in today\'s algebra class. She helped other students understand complex concepts.',
      createdAt: '2025-01-14',
      subject: 'Mathematics',
      replies: [
        {
          id: '1',
          userName: 'Sarah Johnson',
          message: 'Thank you so much! We\'re very proud of Emma\'s progress.',
          createdAt: '2025-01-14'
        }
      ]
    },
    {
      id: '2',
      studentName: 'Emma Johnson',
      fromUserName: 'Ms. Davis',
      fromUserRole: 'Teacher',
      title: 'Outstanding Reading Comprehension',
      body: 'Emma\'s analysis of the story was thoughtful and showed deep understanding of the characters.',
      createdAt: '2025-01-12',
      subject: 'English',
      replies: []
    }
  ];

  const mockComplaints = [
    {
      id: '1',
      studentName: 'Emma Johnson',
      raisedBy: 'STAFF' as const,
      raisedByUserName: 'Mr. Smith',
      title: 'Disruptive Behavior in Class',
      body: 'Emma was talking during the lesson and disturbing other students despite multiple warnings.',
      status: 'OPEN' as const,
      createdAt: '2025-01-13',
      replies: [
        {
          id: '1',
          userName: 'Sarah Johnson',
          message: 'I apologize for Emma\'s behavior. We will discuss this at home and ensure it doesn\'t happen again.',
          createdAt: '2025-01-13'
        }
      ]
    }
  ];

  const handleReply = (itemId: string) => {
    // In real app, this would submit to backend
    console.log('Reply submitted for item:', itemId, 'Message:', replyText);
    setReplyingTo(null);
    setReplyText('');
  };

  const submitComplaint = (data: any) => {
    // In real app, this would submit to backend
    console.log('New complaint submitted:', data);
    setShowNewComplaint(false);
  };

  const tabs = [
    { id: 'praise', label: 'Praise Received', icon: Heart, count: mockPraise.length },
    { id: 'complaints-received', label: 'Complaints Received', icon: AlertTriangle, count: mockComplaints.filter(c => c.raisedBy === 'STAFF').length },
    { id: 'complaints-sent', label: 'My Complaints', icon: MessageSquare, count: mockComplaints.filter(c => c.raisedBy === 'PARENT').length }
  ];

  if (user?.role === 'TEACHER' || user?.role === 'SCHOOL_ADMIN') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Praise & Complaints</h1>
              <p className="text-gray-600">Manage student feedback and communication with parents</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Give Praise
            </button>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Raise Complaint
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Praise Given</h3>
            <div className="space-y-4">
              {mockPraise.map((praise) => (
                <div key={praise.id} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                  <Heart className="w-5 h-5 text-emerald-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{praise.studentName}</p>
                    <p className="text-xs text-gray-600 mb-1">{praise.title}</p>
                    <p className="text-xs text-gray-500">{praise.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Complaints</h3>
            <div className="space-y-4">
              {mockComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{complaint.studentName}</p>
                    <p className="text-xs text-gray-600 mb-1">{complaint.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{complaint.createdAt}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        complaint.status === 'OPEN' ? 'bg-red-100 text-red-800' :
                        complaint.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Praise & Complaints</h1>
            <p className="text-gray-600">View feedback about your child and raise concerns</p>
          </div>
        </div>
        <button
          onClick={() => setShowNewComplaint(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          New Complaint
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'praise' && (
            <div className="space-y-6">
              {mockPraise.map((praise) => (
                <div key={praise.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 rounded-full">
                      <Heart className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{praise.title}</h3>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                          {praise.subject}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{praise.body}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {praise.fromUserName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {praise.createdAt}
                        </div>
                      </div>

                      {/* Replies */}
                      {praise.replies.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <h4 className="text-sm font-medium text-gray-900">Replies</h4>
                          {praise.replies.map((reply) => (
                            <div key={reply.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">{reply.userName}</span>
                                <span className="text-xs text-gray-500">{reply.createdAt}</span>
                              </div>
                              <p className="text-sm text-gray-700">{reply.message}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Form */}
                      {replyingTo === praise.id ? (
                        <div className="mt-4 space-y-3">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleReply(praise.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                              <Send className="w-4 h-4" />
                              Send Reply
                            </button>
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setReplyingTo(praise.id)}
                          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Reply className="w-4 h-4" />
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(activeTab === 'complaints-received' || activeTab === 'complaints-sent') && (
            <div className="space-y-6">
              {mockComplaints
                .filter(complaint => 
                  activeTab === 'complaints-received' 
                    ? complaint.raisedBy === 'STAFF'
                    : complaint.raisedBy === 'PARENT'
                )
                .map((complaint) => (
                  <div key={complaint.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-100 rounded-full">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            complaint.status === 'OPEN' ? 'bg-red-100 text-red-800' :
                            complaint.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {complaint.status}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{complaint.body}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {complaint.raisedByUserName}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {complaint.createdAt}
                          </div>
                        </div>

                        {/* Replies section similar to praise */}
                        {complaint.replies.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <h4 className="text-sm font-medium text-gray-900">Replies</h4>
                            {complaint.replies.map((reply) => (
                              <div key={reply.id} className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900">{reply.userName}</span>
                                  <span className="text-xs text-gray-500">{reply.createdAt}</span>
                                </div>
                                <p className="text-sm text-gray-700">{reply.message}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* New Complaint Modal */}
      {showNewComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Raise New Complaint</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Academic Issue</option>
                  <option>Behavioral Issue</option>
                  <option>Facility Issue</option>
                  <option>Staff Issue</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Brief description of the issue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                <textarea
                  rows={4}
                  placeholder="Please provide detailed information about the issue..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => submitComplaint({})}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit Complaint
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewComplaint(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
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

export default PraiseComplaintsManager;