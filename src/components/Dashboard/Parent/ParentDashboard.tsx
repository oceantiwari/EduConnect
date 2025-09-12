import React, { useState } from 'react';
import { UserCheck, BarChart3, Star, ShoppingBag } from 'lucide-react';
import DashboardHeader from '../Shared/DashboardHeader';
import StatCard from '../Shared/StatCard';
import StudentCard from './StudentCard';
import AttendanceStatus from './AttendanceStatus';
import RecentPraise from './RecentPraise';
import UpcomingTests from './UpcomingTests';
import ParentQuickActions from './ParentQuickActions';

interface ParentDashboardProps {
  onNavigate?: (tab: string) => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ onNavigate }) => {
  const studentInfo = {
    name: 'Emma Johnson',
    class: 'Grade 5-A',
    rollNo: '15',
    profilePhoto: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400'
  };
  
  const [todayAttendance, setTodayAttendance] = useState({
    parentStatus: {
      status: 'NOT_LEFT',
      time: '7:30 AM',
      reason: ''
    },
    teacherStatus: {
      status: 'PRESENT',
      time: '8:30 AM'
    },
    mismatch: false
  });
  
  const [leftReason, setLeftReason] = useState('');
  
  const handleLeftHome = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (!leftReason.trim()) {
      alert('Please provide a reason for leaving');
      return;
    }
    
    setTodayAttendance(prev => ({
      ...prev,
      parentStatus: {
        status: 'LEFT',
        time: timeString,
        reason: leftReason
      },
      mismatch: prev.teacherStatus.status === 'ABSENT'
    }));
    
    setLeftReason('');
    alert('Marked as Left Home successfully!');
  };

  const recentPraise = [
    { subject: 'Mathematics', teacher: 'Ms. Smith', message: 'Excellent problem solving!', date: '2025-01-14' },
    { subject: 'English', teacher: 'Mr. Davis', message: 'Great reading comprehension', date: '2025-01-12' }
  ];

  const upcomingTests = [
    { subject: 'Science', date: '2025-01-18', syllabus: 'Chapter 3-4' },
    { subject: 'History', date: '2025-01-22', syllabus: 'Ancient Civilizations' }
  ];

  const quickStats = [
    { label: 'Attendance Rate', value: '96%', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Average Score', value: '88%', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Praise Points', value: '24', icon: Star, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Pending Items', value: '2', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader
        title="Welcome Back!"
        subtitle={`Here's what's happening with ${studentInfo.name} today`}
      />

      <StudentCard 
        studentInfo={studentInfo}
        attendanceStatus={todayAttendance}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceStatus
          todayAttendance={todayAttendance}
          leftReason={leftReason}
          onLeftReasonChange={setLeftReason}
          onMarkLeftHome={handleLeftHome}
        />
        
        <div className="space-y-6">
          <RecentPraise recentPraise={recentPraise} />
          <UpcomingTests upcomingTests={upcomingTests} />
          <ParentQuickActions onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
