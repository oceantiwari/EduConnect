import React from 'react';
import { MessageSquare, ShoppingBag, BarChart3, Bell } from 'lucide-react';

interface ParentQuickActionsProps {
  onNavigate?: (tab: string) => void;
}

const ParentQuickActions: React.FC<ParentQuickActionsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onNavigate?.('praise')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
        >
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium">View Messages</span>
        </button>
        <button 
          onClick={() => onNavigate?.('store')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
        >
          <ShoppingBag className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">School Store</span>
        </button>
        <button 
          onClick={() => onNavigate?.('performance')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors"
        >
          <BarChart3 className="w-5 h-5 text-orange-600" />
          <span className="text-sm font-medium">Performance</span>
        </button>
        <button 
          onClick={() => onNavigate?.('announcements')}
          className="flex items-center gap-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors"
        >
          <Bell className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium">Updates</span>
        </button>
      </div>
    </div>
  );
};

export default ParentQuickActions;
