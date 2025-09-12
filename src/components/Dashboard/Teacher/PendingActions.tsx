import React from 'react';
import { AlertTriangle } from 'lucide-react';
import SectionCard from '../Shared/SectionCard';

interface PendingAction {
  type: string;
  count: number;
  color: string;
  bg: string;
}

interface PendingActionsProps {
  actions: PendingAction[];
}

const PendingActions: React.FC<PendingActionsProps> = ({ actions }) => {
  return (
    <SectionCard
      title="Pending Actions"
      icon={AlertTriangle}
      iconColor="text-orange-600"
    >
      <div className="space-y-3">
        {actions.map((action, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${action.color.replace('text-', 'bg-')}`}></div>
              <span className="text-sm font-medium text-gray-900 capitalize">
                {action.type} to review
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${action.bg} ${action.color}`}>
              {action.count}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default PendingActions;
