import React, { useState } from 'react';
import { BookOpen, Plus, Calendar, Users, BarChart3, FileText, Edit, Trash2, Eye, Award, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const TestsManager: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showNewTest, setShowNewTest] = useState(false);
  const [showResults, setShowResults] = useState<string | null>(null);
  const [showAddResults, setShowAddResults] = useState<string | null>(null);

  const tests = [
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Algebra and Geometry',
      scheduledOn: '2025-01-18',
      time: '10:00 AM',
      duration: '2 hours',
      totalMarks: 50,
      syllabus: 'Chapter 3: Algebraic Expressions, Chapter 4: Basic Geometry',
      status: 'SCHEDULED' as const,
      createdBy: 'Mr. Smith',
      studentsCount: 28,
      resultsPublished: false
    },
    {
      id: '2',
      subject: 'Science',
      title: 'Light and Sound',
      scheduledOn: '2025-01-15',
      time: '11:00 AM',
      duration: '1.5 hours',
      totalMarks: 40,
      syllabus: 'Chapter 5: Light, Chapter 6: Sound Waves',
      status: 'DONE' as const,
      createdBy: 'Ms. Davis',
      studentsCount: 28,
      resultsPublished: false
    },
    {
      id: '3',
      subject: 'English',
      title: 'Reading Comprehension',
      scheduledOn: '2025-01-10',
      time: '09:00 AM',
      duration: '2 hours',
      totalMarks: 50,
      syllabus: 'Reading passages, Grammar, Vocabulary',
      status: 'PUBLISHED' as const,
      createdBy: 'Mr. Johnson',
      studentsCount: 28,
      resultsPublished: true,
      averageScore: 42,
      highestScore: 48,
      lowestScore: 32
    }
  ];

  const students = [
    { id: '1', name: 'Emma Johnson', rollNo: '15', photo: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '2', name: 'Liam Smith', rollNo: '12', photo: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '3', name: 'Olivia Davis', rollNo: '08', photo: 'https://images.pexels.com/photos/1101527/pexels-photo-1101527.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '4', name: 'Noah Wilson', rollNo: '22', photo: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '5', name: 'Sophia Brown', rollNo: '19', photo: 'https://images.pexels.com/photos/1674666/pexels-photo-1674666.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ];

  const testResults = [
    { studentId: '1', studentName: 'Emma Johnson', rollNo: '15', obtainedMarks: 46, rankInClass: 2, grade: 'A' },
    { studentId: '2', studentName: 'Liam Smith', rollNo: '12', obtainedMarks: 48, rankInClass: 1, grade: 'A+' },
    { studentId: '3', studentName: 'Olivia Davis', rollNo: '08', obtainedMarks: 42, rankInClass: 4, grade: 'A' },
    { studentId: '4', studentName: 'Noah Wilson', rollNo: '22', obtainedMarks: 38, rankInClass: 6, grade: 'B+' },
    { studentId: '5', studentName: 'Sophia Brown', rollNo: '19', obtainedMarks: 44, rankInClass: 3, grade: 'A' }
  ];

  const [studentMarks, setStudentMarks] = useState<Record<string, string>>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800';
      case 'DONE': return 'bg-orange-100 text-orange-800';
      case 'PUBLISHED': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const calculateGrade = (marks: number, total: number) => {
    const percentage = (marks / total) * 100;
    if (percentage >= 95) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 75) return 'B+';
    if (percentage >= 65) return 'B';
    if (percentage >= 50) return 'C';
    return 'D';
  };

  const handleMarkChange = (studentId: string, marks: string) => {
    setStudentMarks(prev => ({ ...prev, [studentId]: marks }));
  };

  const submitResults = (testId: string) => {
    console.log('Submitting results for test:', testId, studentMarks);
    setShowAddResults(null);
    setStudentMarks({});
  };

  const publishResults = (testId: string) => {
    console.log('Publishing results for test:', testId);
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Tests', count: tests.filter(t => t.status === 'SCHEDULED').length },
    { id: 'completed', label: 'Completed Tests', count: tests.filter(t => t.status === 'DONE').length },
    { id: 'published', label: 'Published Results', count: tests.filter(t => t.status === 'PUBLISHED').length }
  ];

  const filteredTests = tests.filter(test => {
    switch (activeTab) {
      case 'upcoming': return test.status === 'SCHEDULED';
      case 'completed': return test.status === 'DONE';
      case 'published': return test.status === 'PUBLISHED';
      default: return true;
    }
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tests & Results</h1>
            <p className="text-gray-600">Manage tests and track student performance</p>
          </div>
        </div>
        <button
          onClick={() => setShowNewTest(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Test
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Results</p>
              <p className="text-2xl font-bold text-gray-900">{tests.filter(t => t.status === 'DONE').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{tests.filter(t => t.status === 'PUBLISHED').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900">84%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredTests.map((test) => (
              <div key={test.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(test.status)}`}>
                        {test.status}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {test.subject}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{test.syllabus}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{test.scheduledOn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{test.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span>{test.totalMarks} marks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{test.studentsCount} students</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {test.status === 'DONE' && (
                      <button
                        onClick={() => setShowAddResults(test.id)}
                        className="px-3 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                      >
                        Add Results
                      </button>
                    )}
                    {test.status === 'PUBLISHED' && (
                      <button
                        onClick={() => setShowResults(test.id)}
                        className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View Results
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {test.status === 'PUBLISHED' && (
                  <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Average Score:</span>
                        <span className="ml-2 font-medium">{test.averageScore}/{test.totalMarks}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Highest Score:</span>
                        <span className="ml-2 font-medium text-emerald-600">{test.highestScore}/{test.totalMarks}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Lowest Score:</span>
                        <span className="ml-2 font-medium text-red-600">{test.lowestScore}/{test.totalMarks}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create New Test Modal */}
      {showNewTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Create New Test</h3>
            </div>
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>Social Studies</option>
                    <option>Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
                <input
                  type="text"
                  placeholder="Enter test title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Syllabus</label>
                <textarea
                  rows={3}
                  placeholder="Enter syllabus details"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>1 hour</option>
                    <option>1.5 hours</option>
                    <option>2 hours</option>
                    <option>2.5 hours</option>
                    <option>3 hours</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewTest(false)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Test
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewTest(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Results Modal */}
      {showAddResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Add Test Results</h3>
              <p className="text-gray-600">Enter marks for each student</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        placeholder="Marks"
                        min="0"
                        max="50"
                        value={studentMarks[student.id] || ''}
                        onChange={(e) => handleMarkChange(student.id, e.target.value)}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-600">/ 50</span>
                      {studentMarks[student.id] && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(calculateGrade(parseInt(studentMarks[student.id]), 50))}`}>
                          {calculateGrade(parseInt(studentMarks[student.id]), 50)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => submitResults(showAddResults)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Results
                </button>
                <button
                  onClick={() => publishResults(showAddResults)}
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Save & Publish
                </button>
                <button
                  onClick={() => setShowAddResults(null)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Test Results</h3>
              <p className="text-gray-600">English - Reading Comprehension</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={result.studentId} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                        #{result.rankInClass}
                      </div>
                      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                        <img src={students.find(s => s.id === result.studentId)?.photo} alt={result.studentName} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{result.studentName}</h4>
                      <p className="text-sm text-gray-600">Roll No: {result.rollNo}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">{result.obtainedMarks}/50</p>
                        <p className="text-sm text-gray-600">{Math.round((result.obtainedMarks / 50) * 100)}%</p>
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </span>
                      {result.rankInClass <= 3 && (
                        <Award className={`w-6 h-6 ${
                          result.rankInClass === 1 ? 'text-yellow-500' :
                          result.rankInClass === 2 ? 'text-gray-400' :
                          'text-orange-500'
                        }`} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowResults(null)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsManager;