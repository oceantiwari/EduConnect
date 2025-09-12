import React from 'react';
import { UserCheck, Clock, AlertCircle } from 'lucide-react';
import SectionCard from '../Shared/SectionCard';

interface AttendanceStatus {
  parentStatus: { status: string; time: string; reason: string };
  teacherStatus: { status: string; time: string };
  mismatch: boolean;
}

interface AttendanceStatusProps {
  todayAttendance: AttendanceStatus;
  leftReason: string;
  onLeftReasonChange: (reason: string) => void;
  onMarkLeftHome: () => void;
}

const AttendanceStatus: React.FC<AttendanceStatusProps> = ({
  todayAttendance,
  leftReason,
  onLeftReasonChange,
  onMarkLeftHome
}) => {
  return (
    <SectionCard
      title="Today's Attendance"
      icon={UserCheck}
      iconColor="text-blue-600"
    >
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
                  onChange={(e) => onLeftReasonChange(e.target.value)}
                  placeholder="Please provide a reason (e.g., School bus, Parent drop-off, Walking)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={2}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={onMarkLeftHome} 
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

              <div className="mt-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${todayAttendance.teacherStatus.status === 'PRESENT' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                  {todayAttendance.teacherStatus.status === 'PRESENT' ? 'Marked Present' : 'Marked Absent'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Alert */}
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
    </SectionCard>
  );
};

export default AttendanceStatus;
