import React, { useState, useEffect } from 'react';
import { UserCheck, CheckCircle, XCircle, Search, Loader2, AlertCircle, RefreshCw, Users, BookOpen } from 'lucide-react';
import { userRegistrationService, type UserRegistrationRequest } from '../../services/userRegistrationService';

interface UserRegistrationsManagerProps {
  adminId: string;
  schoolId: string;
}

const UserRegistrationsManager: React.FC<UserRegistrationsManagerProps> = ({ adminId, schoolId }) => {
  const [requests, setRequests] = useState<UserRegistrationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, [filter, schoolId]);

  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const data = filter === 'ALL'
        ? await userRegistrationService.getRequestsByStatus(schoolId)
        : await userRegistrationService.getRequestsByStatus(schoolId, filter);

      setRequests(data);
    } catch (err) {
      setError('Failed to load requests. Please try again.');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    if (!requestId) return;

    setProcessingId(requestId);
    setError('');

    try {
      const result = await userRegistrationService.approveRequest(
        requestId,
        adminId,
        responseText[requestId]
      );

      if (!result.success) {
        setError(result.error || 'Failed to approve request');
        return;
      }

      await fetchRequests();
      setResponseText(prev => {
        const newState = { ...prev };
        delete newState[requestId];
        return newState;
      });
    } catch (err) {
      setError('An unexpected error occurred while approving the request');
      console.error('Error approving request:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (requestId: string) => {
    if (!requestId) return;

    const response = responseText[requestId]?.trim();
    if (!response) {
      setError('Please provide a reason for rejection');
      return;
    }

    setProcessingId(requestId);
    setError('');

    try {
      const result = await userRegistrationService.rejectRequest(
        requestId,
        adminId,
        response
      );

      if (!result.success) {
        setError(result.error || 'Failed to reject request');
        return;
      }

      await fetchRequests();
      setResponseText(prev => {
        const newState = { ...prev };
        delete newState[requestId];
        return newState;
      });
    } catch (err) {
      setError('An unexpected error occurred while rejecting the request');
      console.error('Error rejecting request:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredRequests = requests.filter(req =>
    req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getRoleIcon = (role: string) => {
    return role === 'PARENT' ? Users : BookOpen;
  };

  const getRoleColor = (role: string) => {
    return role === 'PARENT' ? 'text-blue-600 bg-blue-50' : 'text-green-600 bg-green-50';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 rounded-xl">
            <UserCheck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Registration Requests</h2>
            <p className="text-sm text-gray-500">Approve or reject new user registrations</p>
          </div>
        </div>
        <button
          onClick={fetchRequests}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">Error</p>
            <p className="text-sm text-red-800">{error}</p>
          </div>
          <button
            onClick={() => setError('')}
            className="text-red-600 hover:text-red-800"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {(['PENDING', 'APPROVED', 'REJECTED', 'ALL'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                filter === status
                  ? status === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                    : status === 'APPROVED'
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : status === 'REJECTED'
                    ? 'bg-red-100 text-red-800 border-2 border-red-300'
                    : 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Requests Found</h3>
          <p className="text-gray-500">
            {searchTerm
              ? 'No requests match your search criteria.'
              : filter === 'ALL'
              ? 'No registration requests have been submitted yet.'
              : `No ${filter.toLowerCase()} requests at the moment.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const RoleIcon = getRoleIcon(request.role);
            return (
              <div
                key={request.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.name}
                      </h3>
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getRoleColor(request.role)}`}>
                        <RoleIcon className="w-3.5 h-3.5" />
                        {request.role}
                      </span>
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Email:</span>{' '}
                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                          {request.email}
                        </span>
                      </p>
                      {request.phone && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Phone:</span> {request.phone}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Requested on {new Date(request.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}{' '}
                        at {new Date(request.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {request.requestReason && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-1.5">Request Reason:</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{request.requestReason}</p>
                  </div>
                )}

                {request.status === 'PENDING' && (
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div>
                      <label htmlFor={`response-${request.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Response (Optional for approval, required for rejection)
                      </label>
                      <textarea
                        id={`response-${request.id}`}
                        value={responseText[request.id] || ''}
                        onChange={(e) => setResponseText({ ...responseText, [request.id]: e.target.value })}
                        placeholder="Provide feedback or reason for your decision..."
                        rows={3}
                        disabled={processingId !== null}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(request.id)}
                        disabled={processingId !== null}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow"
                      >
                        {processingId === request.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Approve & Create Account
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        disabled={processingId !== null}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow"
                      >
                        {processingId === request.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            Reject Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {request.status !== 'PENDING' && request.adminResponse && (
                  <div className={`mt-4 p-4 rounded-lg border ${
                    request.status === 'APPROVED'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <p className={`text-sm font-medium mb-1.5 ${
                      request.status === 'APPROVED' ? 'text-green-900' : 'text-red-900'
                    }`}>
                      Admin Response:
                    </p>
                    <p className={`text-sm leading-relaxed ${
                      request.status === 'APPROVED' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {request.adminResponse}
                    </p>
                    {request.reviewedAt && (
                      <p className={`text-xs mt-2 ${
                        request.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        Reviewed on {new Date(request.reviewedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}{' '}
                        at {new Date(request.reviewedAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserRegistrationsManager;
