import React from 'react';
import { Target, CheckCircle, BookOpen, AlertCircle } from 'lucide-react';
import StatCard from '../Shared/StatCard';
import StudentHeaderCard from './StudentHeaderCard';
import RecentGrades from './RecentGrades';
import UpcomingEvents from './UpcomingEvents';
import AnnouncementsList from './AnnouncementsList';
import StudentQuickActions from './StudentQuickActions';

interface StudentDashboardProps {
  onNavigate?: (tab: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const studentInfo = {
    name: 'Alex Johnson',
    class: 'Grade 10-B',
    rollNo: '23',
    profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const academicStats = {
    currentGPA: 3.8,
    attendanceRate: 96,
    assignmentsCompleted: 24,
    totalAssignments: 26,
    upcomingTests: 3,
    pendingAssignments: 2
  };

  const recentGrades = [
    { subject: 'Mathematics', grade: 'A', score: 92, date: '2023-10-15' },
    { subject: 'Physics', grade: 'A-', score: 88, date: '2023-10-12' },
    { subject: 'Chemistry', grade: 'B+', score: 85, date: '2023-10-10' },
    { subject: 'English', grade: 'A', score: 94, date: '2023-10-08' }
  ];

  const upcomingEvents = [
    { title: 'Math Quiz', date: '2023-10-20', time: '10:00 AM', type: 'test' as const },
    { title: 'Science Fair', date: '2023-10-25', time: '2:00 PM', type: 'event' as const },
    { title: 'History Assignment Due', date: '2023-10-22', time: '11:59 PM', type: 'assignment' as const }
  ];

  const announcements = [
    { title: 'School Holiday Notice', content: 'School will be closed on October 30th for Diwali celebrations.', time: '2 hours ago' },
    { title: 'Library Hours Extended', content: 'Library will now be open until 8 PM on weekdays.', time: '1 day ago' },
    { title: 'Sports Day Registration', content: 'Register for annual sports day events by October 25th.', time: '2 days ago' }
  ];

  const quickStats = [
    {
      label: 'Current GPA',
      value: academicStats.currentGPA,
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Attendance',
      value: `${academicStats.attendanceRate}%`,
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Assignments',
      value: `${academicStats.assignmentsCompleted}/${academicStats.totalAssignments}`,
      icon: BookOpen,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Pending Tasks',
      value: academicStats.pendingAssignments,
      icon: AlertCircle,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <StudentHeaderCard studentInfo={studentInfo} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentGrades 
          grades={recentGrades}
          onViewAll={() => onNavigate?.('performance')}
        />
        <UpcomingEvents 
          events={upcomingEvents}
          onViewAll={() => onNavigate?.('events')}
        />
      </div>

      <AnnouncementsList 
        announcements={announcements}
        onViewAll={() => onNavigate?.('announcements')}
      />

      <StudentQuickActions onNavigate={onNavigate} />
    </div>
  );
};

export default StudentDashboard;
