import React from 'react';
import { ClipboardList, AlertTriangle } from 'lucide-react';
import SectionCard from '../Shared/SectionCard';

interface StudentAttendance {
  id: number;
  name: string;
  parentStatus: { status: string; time: string };
  teacherStatus: { status: string; time: string };
  mismatch: boolean;
}

interface AttendanceTrackerProps {
  classInfo: {
    name: string;
    totalStudents: number;
    presentToday: number;
  };
  studentsAttendance: StudentAttendance[];
  onMarkAttendance: (studentId: number, status: string) => void;
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ 
  classInfo, 
  studentsAttendance, 
  onMarkAttendance 
}) => {
  return (
    <div id="attendance-section">
      <SectionCard
        title="Attendance Status"
        icon={ClipboardList}
        iconColor="text-emerald-600"
      >
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

        <div className="flex justify-between text-sm mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{classInfo.presentToday}</div>
            <div className="text-gray-600">Present</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{classInfo.totalStudents - classInfo.presentToday}</div>
            <div className="text-gray-600">Absent</div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Student Status</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {studentsAttendance.map(student => (
              <div key={student.id} className={`p-3 rounded-lg border ${student.mismatch ? 'border-amber-300 bg-amber-50' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{student.name}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onMarkAttendance(student.id, 'PRESENT')}
                      className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${student.teacherStatus.status === 'PRESENT' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-blue-50'}`}
                    >
                      Present
                    </button>
                    <button 
                      onClick={() => onMarkAttendance(student.id, 'ABSENT')}
                      className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${student.teacherStatus.status === 'ABSENT' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800 hover:bg-red-50'}`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${student.parentStatus.status === 'LEFT' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                    <span className="text-gray-600">Parent:</span>
                    <span className="font-medium">{student.parentStatus.status === 'LEFT' ? 'Left Home' : 'Not Left'}</span>
                    {student.parentStatus.status === 'LEFT' && (
                      <span className="text-gray-500 ml-1">({student.parentStatus.time})</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${student.teacherStatus.status === 'PRESENT' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">{student.teacherStatus.status === 'PRESENT' ? 'Present' : 'Absent'}</span>
                    <span className="text-gray-500 ml-1">({student.teacherStatus.time})</span>
                  </div>
                </div>
                
                {student.mismatch && (
                  <div className="mt-2 text-xs text-amber-700 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                    <span>Parent marked as LEFT but student is ABSENT</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default AttendanceTracker;
