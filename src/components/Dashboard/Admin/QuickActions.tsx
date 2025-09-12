import React from 'react';
import { LucideIcon } from 'lucide-react';
import QuickActionCard from '../Shared/QuickActionCard';

interface QuickAction {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
  hoverBg: string;
  hoverBorder: string;
  action: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  showAll: boolean;
  onToggleShowAll: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, showAll, onToggleShowAll }) => {
  const displayedActions = showAll ? actions : actions.slice(0, 4);

  return (
    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <button
          onClick={onToggleShowAll}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${showAll ? '' : 'max-h-32 overflow-hidden'}`}>
        {displayedActions.map((action, index) => (
          <QuickActionCard 
            key={index} 
            icon={action.icon}
            title={action.title}
            description={action.description}
            color={action.color}
            bg={action.bg}
            hoverBg={action.hoverBg}
            hoverBorder={action.hoverBorder}
            onClick={action.action}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
