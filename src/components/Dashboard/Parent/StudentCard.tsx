import React from 'react';

interface StudentCardProps {
  studentInfo: {
    name: string;
    class: string;
    rollNo: string;
    profilePhoto: string;
  };
  attendanceStatus: {
    parentStatus: { status: string; time: string };
    teacherStatus: { status: string; time: string };
  };
}

const StudentCard: React.FC<StudentCardProps> = ({ studentInfo, attendanceStatus }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white/20 rounded-2xl overflow-hidden">
          <img src={studentInfo.profilePhoto} alt={studentInfo.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{studentInfo.name}</h2>
          <p className="text-blue-100">{studentInfo.class} • Roll No: {studentInfo.rollNo}</p>
        </div>
        <div className="text-right">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
              <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
              <span className="text-xs font-medium">
                {attendanceStatus.parentStatus.status === 'LEFT' ? 'Left Home' : 'Not Left'}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
              <div className={`w-2 h-2 rounded-full ${attendanceStatus.teacherStatus.status === 'PRESENT' ? 'bg-blue-300' : 'bg-red-300'}`}></div>
              <span className="text-xs font-medium">
                {attendanceStatus.teacherStatus.status === 'PRESENT' ? 'Present at School' : 'Absent'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
