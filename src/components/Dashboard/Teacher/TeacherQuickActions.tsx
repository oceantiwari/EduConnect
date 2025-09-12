import React from 'react';
import { ClipboardList, BookOpen, MessageCircle, Bell } from 'lucide-react';

interface TeacherQuickActionsProps {
  onNavigate?: (tab: string) => void;
}

const TeacherQuickActions: React.FC<TeacherQuickActionsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => document.getElementById('attendance-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
        >
          <ClipboardList className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">Take Attendance</span>
        </button>
        <button 
          onClick={() => onNavigate?.('tests')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
        >
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium">Add Test</span>
        </button>
        <button 
          onClick={() => onNavigate?.('praise')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium">Send Praise</span>
        </button>
        <button 
          onClick={() => onNavigate?.('announcements')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors"
        >
          <Bell className="w-5 h-5 text-orange-600" />
          <span className="text-sm font-medium">Send Update</span>
        </button>
      </div>
    </div>
  );
};

export default TeacherQuickActions;
