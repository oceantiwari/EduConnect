import React, { useState } from 'react';
import { X, UserPlus, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { childRequestService } from '../../services/childRequestService';

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  parentId: string;
  onSuccess?: () => void;
}

const AddChildModal: React.FC<AddChildModalProps> = ({
  isOpen,
  onClose,
  parentId,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    admissionNo: '',
    studentName: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    if (!formData.admissionNo.trim()) {
      setError('Admission number is required');
      return false;
    }

    if (!formData.studentName.trim()) {
      setError('Student name is required');
      return false;
    }

    if (formData.studentName.trim().length < 3) {
      setError('Student name must be at least 3 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await childRequestService.createRequest({
        parentId,
        studentAdmissionNo: formData.admissionNo,
        studentName: formData.studentName,
        requestReason: formData.reason
      });

      if (!result.success) {
        setError(result.error || 'Failed to submit request');
        return;
      }

      setSuccess(true);
      setFormData({ admissionNo: '', studentName: '', reason: '' });

      setTimeout(() => {
        onSuccess?.();
        onClose();
        setSuccess(false);
      }, 1500);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ admissionNo: '', studentName: '', reason: '' });
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add Child</h2>
              <p className="text-sm text-gray-500">Request to link your child's account</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">Error</p>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">Success</p>
                <p className="text-sm text-green-800">
                  Request submitted successfully! The admin will review it soon.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="admissionNo" className="block text-sm font-medium text-gray-700">
              Admission Number <span className="text-red-500">*</span>
            </label>
            <input
              id="admissionNo"
              type="text"
              value={formData.admissionNo}
              onChange={(e) => handleInputChange('admissionNo', e.target.value)}
              placeholder="e.g., STU2025001"
              disabled={loading || success}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
              autoComplete="off"
            />
            <p className="text-xs text-gray-500">
              Enter the student's admission number as provided by the school
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
              Student Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="studentName"
              type="text"
              value={formData.studentName}
              onChange={(e) => handleInputChange('studentName', e.target.value)}
              placeholder="e.g., John Smith"
              disabled={loading || success}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
              autoComplete="off"
            />
            <p className="text-xs text-gray-500">
              Enter the student's full name as registered in school records
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Additional Information (Optional)
            </label>
            <textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              placeholder="Any additional details that might help verify the request..."
              rows={3}
              disabled={loading || success}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
            />
            <p className="text-xs text-gray-500">
              Optional: Provide any additional context for this request
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading || success}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChildModal;
