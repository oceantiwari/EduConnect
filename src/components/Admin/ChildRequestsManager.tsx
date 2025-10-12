import React, { useState, useEffect } from 'react';
import { UserPlus, CheckCircle, XCircle, Clock, Search, Filter, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import type { ChildRequest } from '../../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ChildRequestsManagerProps {
  adminId: string;
}

const ChildRequestsManager: React.FC<ChildRequestsManagerProps> = ({ adminId }) => {
  const [requests, setRequests] = useState<ChildRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('child_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'ALL') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;

      const formattedRequests: ChildRequest[] = (data || []).map((req: any) => ({
        id: req.id,
        parentId: req.parent_id,
        studentAdmissionNo: req.student_admission_no,
        studentName: req.student_name,
        status: req.status,
        requestReason: req.request_reason,
        adminResponse: req.admin_response,
        reviewedBy: req.reviewed_by,
        reviewedAt: req.reviewed_at,
        createdAt: req.created_at,
        updatedAt: req.updated_at
      }));

      setRequests(formattedRequests);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: string, admissionNo: string) => {
    setProcessingId(requestId);
    try {
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('id, school_id')
        .eq('admission_no', admissionNo)
        .maybeSingle();

      if (studentError) throw studentError;

      if (!student) {
        alert('Student not found with this admission number');
        return;
      }

      const request = requests.find(r => r.id === requestId);
      if (!request) return;

      const { error: linkError } = await supabase
        .from('parent_student_links')
        .insert({
          parent_id: request.parentId,
          student_id: student.id
        });

      if (linkError) {
        if (linkError.code === '23505') {
          alert('This parent is already linked to this student');
        } else {
          throw linkError;
        }
        return;
      }

      const { error: updateError } = await supabase
        .from('child_requests')
        .update({
          status: 'APPROVED',
          admin_response: responseText[requestId] || 'Request approved and child linked successfully',
          reviewed_by: adminId,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (updateError) throw updateError;

      await fetchRequests();
      setResponseText({ ...responseText, [requestId]: '' });
    } catch (err) {
      console.error('Error approving request:', err);
      alert('Failed to approve request. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (requestId: string) => {
    if (!responseText[requestId]?.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    setProcessingId(requestId);
    try {
      const { error } = await supabase
        .from('child_requests')
        .update({
          status: 'REJECTED',
          admin_response: responseText[requestId],
          reviewed_by: adminId,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      await fetchRequests();
      setResponseText({ ...responseText, [requestId]: '' });
    } catch (err) {
      console.error('Error rejecting request:', err);
      alert('Failed to reject request. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredRequests = requests.filter(req =>
    req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.studentAdmissionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 rounded-xl">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Child Requests</h2>
            <p className="text-sm text-gray-500">Review and manage parent-child linking requests</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student name or admission number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('PENDING')}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              filter === 'PENDING'
                ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('APPROVED')}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              filter === 'APPROVED'
                ? 'bg-green-100 text-green-800 border-2 border-green-300'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('REJECTED')}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              filter === 'REJECTED'
                ? 'bg-red-100 text-red-800 border-2 border-red-300'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Rejected
          </button>
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              filter === 'ALL'
                ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Requests Found</h3>
          <p className="text-gray-500">
            {filter === 'ALL'
              ? 'No child linking requests have been submitted yet.'
              : `No ${filter.toLowerCase()} requests at the moment.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.studentName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Admission No:</span> {request.studentAdmissionNo}
                  </p>
                  <p className="text-xs text-gray-500">
                    Requested on {new Date(request.createdAt).toLocaleDateString()} at{' '}
                    {new Date(request.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {request.requestReason && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Request Reason:</p>
                  <p className="text-sm text-gray-600">{request.requestReason}</p>
                </div>
              )}

              {request.status === 'PENDING' && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Response (Optional)
                    </label>
                    <textarea
                      value={responseText[request.id] || ''}
                      onChange={(e) => setResponseText({ ...responseText, [request.id]: e.target.value })}
                      placeholder="Add a response message..."
                      rows={2}
                      disabled={processingId === request.id}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-50"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(request.id, request.studentAdmissionNo)}
                      disabled={processingId !== null}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {processingId === request.id ? 'Processing...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      disabled={processingId !== null}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      <XCircle className="w-4 h-4" />
                      {processingId === request.id ? 'Processing...' : 'Reject'}
                    </button>
                  </div>
                </div>
              )}

              {request.status !== 'PENDING' && request.adminResponse && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-900 mb-1">Admin Response:</p>
                  <p className="text-sm text-blue-800">{request.adminResponse}</p>
                  {request.reviewedAt && (
                    <p className="text-xs text-blue-600 mt-2">
                      Reviewed on {new Date(request.reviewedAt).toLocaleDateString()} at{' '}
                      {new Date(request.reviewedAt).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChildRequestsManager;
