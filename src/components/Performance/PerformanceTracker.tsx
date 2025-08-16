import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, BookOpen, Calendar, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PerformanceTracker: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const studentPerformance = {
    student: {
      name: 'Emma Johnson',
      class: 'Grade 5-A',
      rollNo: '15',
      overallGrade: 'A',
      overallPercentage: 88,
      rank: 3,
      totalStudents: 28
    },
    subjects: [
      { name: 'Mathematics', currentGrade: 'A', percentage: 92, trend: 'up', lastTest: { score: 46, total: 50, date: '2025-01-10' } },
      { name: 'English', currentGrade: 'A', percentage: 89, trend: 'up', lastTest: { score: 44, total: 50, date: '2025-01-08' } },
      { name: 'Science', currentGrade: 'B+', percentage: 85, trend: 'stable', lastTest: { score: 42, total: 50, date: '2025-01-12' } },
      { name: 'Social Studies', currentGrade: 'A', percentage: 90, trend: 'up', lastTest: { score: 45, total: 50, date: '2025-01-05' } },
      { name: 'Hindi', currentGrade: 'B', percentage: 82, trend: 'down', lastTest: { score: 41, total: 50, date: '2025-01-07' } }
    ],
    recentTests: [
      { id: '1', subject: 'Mathematics', date: '2025-01-10', score: 46, total: 50, percentage: 92, rank: 2 },
      { id: '2', subject: 'Science', date: '2025-01-12', score: 42, total: 50, percentage: 84, rank: 5 },
      { id: '3', subject: 'English', date: '2025-01-08', score: 44, total: 50, percentage: 88, rank: 4 },
      { id: '4', subject: 'Social Studies', date: '2025-01-05', score: 45, total: 50, percentage: 90, rank: 3 },
      { id: '5', subject: 'Hindi', date: '2025-01-07', score: 41, total: 50, percentage: 82, rank: 8 }
    ],
    monthlyProgress: [
      { month: 'Sep', percentage: 82 },
      { month: 'Oct', percentage: 85 },
      { month: 'Nov', percentage: 87 },
      { month: 'Dec', percentage: 86 },
      { month: 'Jan', percentage: 88 }
    ]
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'text-emerald-700 bg-emerald-100';
      case 'A': return 'text-emerald-600 bg-emerald-50';
      case 'B+': return 'text-blue-600 bg-blue-50';
      case 'B': return 'text-orange-600 bg-orange-50';
      case 'C': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const filteredSubjects = selectedSubject === 'all' 
    ? studentPerformance.subjects 
    : studentPerformance.subjects.filter(subject => subject.name.toLowerCase().includes(selectedSubject.toLowerCase()));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performance Tracker</h1>
            <p className="text-gray-600">
              {user?.role === 'PARENT' 
                ? "Track your child's academic progress and test results" 
                : "Monitor student performance and track improvements"
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="current">Current Term</option>
            <option value="previous">Previous Term</option>
            <option value="year">Full Year</option>
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
            <option value="social">Social Studies</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>
      </div>

      {/* Overall Performance Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">{studentPerformance.student.name}</h2>
            <p className="text-blue-100">{studentPerformance.student.class} • Roll No: {studentPerformance.student.rollNo}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{studentPerformance.student.overallGrade}</div>
            <div className="text-blue-100">Overall Grade</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{studentPerformance.student.overallPercentage}%</div>
            <div className="text-sm text-blue-100">Average Score</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">#{studentPerformance.student.rank}</div>
            <div className="text-sm text-blue-100">Class Rank</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{studentPerformance.student.totalStudents}</div>
            <div className="text-sm text-blue-100">Total Students</div>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <div key={subject.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{subject.name}</h4>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(subject.trend)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(subject.currentGrade)}`}>
                      {subject.currentGrade}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{subject.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        subject.percentage >= 90 ? 'bg-emerald-500' :
                        subject.percentage >= 80 ? 'bg-blue-500' :
                        subject.percentage >= 70 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  <p>Last Test: {subject.lastTest.score}/{subject.lastTest.total} ({Math.round((subject.lastTest.score / subject.lastTest.total) * 100)}%)</p>
                  <p>Date: {subject.lastTest.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Progress</h3>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-end justify-between gap-4">
            {studentPerformance.monthlyProgress.map((month, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-1 w-full">
                  <span className="text-sm font-medium text-gray-700">{month.percentage}%</span>
                  <div 
                    className="w-full bg-blue-500 rounded-t-lg"
                    style={{ height: `${(month.percentage / 100) * 200}px` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{month.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Test Results */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Test Results</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {studentPerformance.recentTests.slice(0, 5).map((test) => (
            <div key={test.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{test.subject}</h4>
                  <p className="text-sm text-gray-600">{test.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-gray-900">{test.score}/{test.total}</p>
                    <p className="text-sm text-gray-600">{test.percentage}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">Rank #{test.rank}</p>
                    <div className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      test.percentage >= 90 ? 'bg-emerald-100 text-emerald-800' :
                      test.percentage >= 80 ? 'bg-blue-100 text-blue-800' :
                      test.percentage >= 70 ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {test.percentage >= 90 ? 'A' : test.percentage >= 80 ? 'B' : test.percentage >= 70 ? 'C' : 'D'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceTracker;