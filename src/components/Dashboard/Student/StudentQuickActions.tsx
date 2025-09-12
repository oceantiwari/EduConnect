import React from 'react';
import { FileText, Calendar, Trophy, TrendingUp } from 'lucide-react';

interface StudentQuickActionsProps {
  onNavigate?: (tab: string) => void;
}

const StudentQuickActions: React.FC<StudentQuickActionsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => onNavigate?.('tests')}
            className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">View Tests</p>
          </button>
          <button 
            onClick={() => onNavigate?.('events')}
            className="p-4 text-center bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Events</p>
          </button>
          <button 
            onClick={() => onNavigate?.('store')}
            className="p-4 text-center bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">School Store</p>
          </button>
          <button 
            onClick={() => onNavigate?.('performance')}
            className="p-4 text-center bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Performance</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentQuickActions;
