import React from 'react';

interface Grade {
  subject: string;
  grade: string;
  score: number;
  date: string;
}

interface RecentGradesProps {
  grades: Grade[];
  onViewAll: () => void;
}

const RecentGrades: React.FC<RecentGradesProps> = ({ grades, onViewAll }) => {
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Grades</h3>
          <button 
            onClick={onViewAll}
            className="text-purple-600 text-sm font-medium hover:text-purple-800"
          >
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {grades.map((grade, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{grade.subject}</p>
                <p className="text-sm text-gray-600">{grade.date}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.grade)}`}>
                  {grade.grade}
                </span>
                <p className="text-sm text-gray-600 mt-1">{grade.score}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentGrades;
