import React from 'react';

interface StudentHeaderCardProps {
  studentInfo: {
    name: string;
    class: string;
    rollNo: string;
    profilePhoto: string;
  };
}

const StudentHeaderCard: React.FC<StudentHeaderCardProps> = ({ studentInfo }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
          <img 
            src={studentInfo.profilePhoto} 
            alt={studentInfo.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {studentInfo.name}!</h1>
          <p className="text-gray-600">{studentInfo.class} • Roll No: {studentInfo.rollNo}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Today's Date</p>
        <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default StudentHeaderCard;
