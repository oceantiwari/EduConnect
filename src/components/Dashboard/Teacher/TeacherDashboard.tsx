import React, { useState } from 'react';
import { Users, CheckCircle, BookOpen, Clock } from 'lucide-react';
import DashboardHeader from '../Shared/DashboardHeader';
import StatCard from '../Shared/StatCard';
import ClassOverviewCard from './ClassOverviewCard';
import TodaySchedule from './TodaySchedule';
import AttendanceTracker from './AttendanceTracker';
import PendingActions from './PendingActions';
import TeacherQuickActions from './TeacherQuickActions';

interface TeacherDashboardProps {
  onNavigate?: (tab: string) => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const classInfo = {
    name: 'Grade 5-A',
    totalStudents: 28,
    presentToday: 26,
    profilePhoto: 'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=400'
  };
  
  const [studentsAttendance, setStudentsAttendance] = useState([
    { 
      id: 1, 
      name: 'Emma Johnson', 
      parentStatus: { status: 'LEFT', time: '7:30 AM' },
      teacherStatus: { status: 'PRESENT', time: '8:15 AM' },
      mismatch: false
    },
    { 
      id: 2, 
      name: 'Noah Williams', 
      parentStatus: { status: 'LEFT', time: '7:45 AM' },
      teacherStatus: { status: 'PRESENT', time: '8:10 AM' },
      mismatch: false
    },
    { 
      id: 3, 
      name: 'Olivia Brown', 
      parentStatus: { status: 'LEFT', time: '7:20 AM' },
      teacherStatus: { status: 'ABSENT', time: '9:00 AM' },
      mismatch: true
    },
    { 
      id: 4, 
      name: 'Liam Davis', 
      parentStatus: { status: 'NOT_LEFT', time: '' },
      teacherStatus: { status: 'ABSENT', time: '9:00 AM' },
      mismatch: false
    }
  ]);
  
  const markAttendance = (studentId: number, status: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setStudentsAttendance(prev => 
      prev.map(student => {
        if (student.id === studentId) {
          const newStatus = {
            ...student,
            teacherStatus: {
              status: status,
              time: timeString
            },
            mismatch: status === 'ABSENT' && student.parentStatus.status === 'LEFT'
          };
          return newStatus;
        }
        return student;
      })
    );
  };

  const todayTasks = [
    { task: 'Take Attendance', status: 'completed' as const, time: '09:00 AM' },
    { task: 'Math Test - Grade 5A', status: 'pending' as const, time: '10:30 AM' },
    { task: 'Submit Result - Science', status: 'pending' as const, time: '02:00 PM' },
    { task: 'Parent Meeting - Emma', status: 'scheduled' as const, time: '03:30 PM' }
  ];

  const pendingActions = [
    { type: 'praise', count: 3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { type: 'complaints', count: 1, color: 'text-red-600', bg: 'bg-red-50' },
    { type: 'test results', count: 2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { type: 'attendance', count: 0, color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  const quickStats = [
    { label: 'Total Students', value: '28', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Present Today', value: '26', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Tests This Week', value: '3', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending Reviews', value: '6', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Good Morning, Mr. Smith!"
        subtitle="Manage your class and track student progress"
      />

      <ClassOverviewCard classInfo={classInfo} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaySchedule tasks={todayTasks} />
        <AttendanceTracker 
          classInfo={classInfo}
          studentsAttendance={studentsAttendance}
          onMarkAttendance={markAttendance}
        />
        <PendingActions actions={pendingActions} />
        <TeacherQuickActions onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default TeacherDashboard;
