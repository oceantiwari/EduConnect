import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, BookOpen } from 'lucide-react';
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
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-2 h-2 bg-gray-300 rounded-full"></div>;
    }
  };

  const filteredSubjects = selectedSubject === 'all' 
    ? studentPerformance.subjects 
    : studentPerformance.subjects.filter(subject => subject.name.toLowerCase().includes(selectedSubject.toLowerCase()));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Performance Tracker</h1>
            <p className="text-gray-600 text-sm">
              {user?.role === 'PARENT' 
                ? "Track your child's academic journey with ease." 
                : "Monitor student performance and improvements."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 text-sm focus:ring-2 focus:ring-indigo-400"
          >
            <option value="current">Current Term</option>
            <option value="previous">Previous Term</option>
            <option value="year">Full Year</option>
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 text-sm focus:ring-2 focus:ring-indigo-400"
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

      {/* Overall Performance */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{studentPerformance.student.name}</h2>
            <p className="text-gray-500 text-sm">{studentPerformance.student.class} • Roll No: {studentPerformance.student.rollNo}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-600">{studentPerformance.student.overallGrade}</div>
            <div className="text-gray-500 text-sm">Overall Grade</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-gray-900">{studentPerformance.student.overallPercentage}%</div>
            <div className="text-sm text-gray-500">Average Score</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-gray-900">#{studentPerformance.student.rank}</div>
            <div className="text-sm text-gray-500">Class Rank</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-gray-900">{studentPerformance.student.totalStudents}</div>
            <div className="text-sm text-gray-500">Total Students</div>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <div key={subject.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
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
                  <span className="font-medium text-gray-900">{subject.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      subject.percentage >= 90 ? 'bg-emerald-500' :
                      subject.percentage >= 80 ? 'bg-indigo-500' :
                      subject.percentage >= 70 ? 'bg-orange-400' :
                      'bg-red-400'
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

      {/* Monthly Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Progress</h3>
        </div>
        <div className="p-6 flex h-64 items-end gap-6">
          {studentPerformance.monthlyProgress.map((month, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <span className="text-sm text-gray-700 mb-1">{month.percentage}%</span>
              <div
                className="w-full bg-indigo-400 rounded-t-md"
                style={{ height: `${(month.percentage / 100) * 200}px` }}
              ></div>
              <span className="text-sm text-gray-500 mt-2">{month.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tests */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Test Results</h3>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View All</button>
        </div>
        <div className="divide-y divide-gray-100">
          {studentPerformance.recentTests.map((test) => (
            <div key={test.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{test.subject}</h4>
                  <p className="text-sm text-gray-600">{test.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-gray-900">{test.score}/{test.total}</p>
                    <p className="text-sm text-gray-600">{test.percentage}%</p>
                  </div>
                  <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                    test.percentage >= 90 ? 'bg-emerald-100 text-emerald-700' :
                    test.percentage >= 80 ? 'bg-indigo-100 text-indigo-700' :
                    test.percentage >= 70 ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {test.percentage >= 90 ? 'A' : test.percentage >= 80 ? 'B' : test.percentage >= 70 ? 'C' : 'D'}
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
