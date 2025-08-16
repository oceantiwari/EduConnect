import React, { useState } from 'react';
import { UserCheck, Users, Clock, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AttendanceManager: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMarked, setAttendanceMarked] = useState<Record<string, string>>({});
  
  const students = [
    { id: '1', name: 'Emma Johnson', rollNo: '15', parentMarked: 'LEFT', photo: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '2', name: 'Liam Smith', rollNo: '12', parentMarked: 'LEFT', photo: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '3', name: 'Olivia Davis', rollNo: '08', parentMarked: 'NOT_LEFT', photo: 'https://images.pexels.com/photos/1101527/pexels-photo-1101527.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '4', name: 'Noah Wilson', rollNo: '22', parentMarked: 'LEFT', photo: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '5', name: 'Sophia Brown', rollNo: '19', parentMarked: 'LEFT', photo: 'https://images.pexels.com/photos/1674666/pexels-photo-1674666.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '6', name: 'Mason Miller', rollNo: '07', parentMarked: null, photo: 'https://images.pexels.com/photos/1486861/pexels-photo-1486861.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ];

  const attendanceHistory = [
    { date: '2025-01-14', present: 26, absent: 2 },
    { date: '2025-01-13', present: 27, absent: 1 },
    { date: '2025-01-12', present: 25, absent: 3 },
    { date: '2025-01-11', present: 28, absent: 0 }
  ];

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendanceMarked(prev => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = () => {
    // In real app, this would submit to backend
    alert('Attendance submitted successfully!');
  };

  const getParentStatusColor = (status: string | null) => {
    if (status === 'LEFT') return 'text-emerald-600 bg-emerald-50';
    if (status === 'NOT_LEFT') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getMismatchWarning = (studentId: string, parentStatus: string | null) => {
    const teacherStatus = attendanceMarked[studentId];
    if (parentStatus === 'LEFT' && teacherStatus === 'ABSENT') {
      return 'MISMATCH - Parent marked LEFT but teacher marked ABSENT!';
    }
    if (parentStatus === 'NOT_LEFT' && teacherStatus === 'PRESENT') {
      return 'REVIEW - Parent marked NOT_LEFT but teacher marked PRESENT';
    }
    return null;
  };

  if (user?.role === 'PARENT') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <UserCheck className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
            <p className="text-gray-600">Mark your child's departure and view attendance history</p>
          </div>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
              <img src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Emma" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Emma Johnson</h3>
              <p className="text-gray-600">Grade 5-A • Roll No: 15</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Today's Status</p>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                Left for School
              </span>
            </div>
          </div>
        </div>

        {/* Today's Attendance */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Attendance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-emerald-800">Parent Check</p>
                <p className="text-xs text-emerald-600">Marked at 8:30 AM</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-800">Teacher Check</p>
                <p className="text-xs text-blue-600">Marked at 9:15 AM</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance History</h3>
          <div className="space-y-3">
            {attendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{record.date}</p>
                  <p className="text-xs text-gray-600">Regular Day</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                    Present
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-emerald-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600">Take attendance for your class</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Class Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.values(attendanceMarked).filter(status => status === 'PRESENT').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <X className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.values(attendanceMarked).filter(status => status === 'ABSENT').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Not Marked</p>
              <p className="text-2xl font-bold text-gray-900">
                {students.length - Object.keys(attendanceMarked).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Grade 5-A Students</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {students.map((student) => {
            const mismatchWarning = getMismatchWarning(student.id, student.parentMarked);
            return (
              <div key={student.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{student.name}</h4>
                    <p className="text-xs text-gray-600">Roll No: {student.rollNo}</p>
                    {student.parentMarked && (
                      <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${getParentStatusColor(student.parentMarked)}`}>
                        Parent: {student.parentMarked === 'LEFT' ? 'Left for School' : 'Not Left'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'PRESENT')}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        attendanceMarked[student.id] === 'PRESENT'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'border border-gray-300 text-gray-700 hover:bg-emerald-50'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'ABSENT')}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        attendanceMarked[student.id] === 'ABSENT'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'border border-gray-300 text-gray-700 hover:bg-red-50'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
                {mismatchWarning && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-800">{mismatchWarning}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={submitAttendance}
            disabled={Object.keys(attendanceMarked).length !== students.length}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Attendance ({Object.keys(attendanceMarked).length}/{students.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManager;