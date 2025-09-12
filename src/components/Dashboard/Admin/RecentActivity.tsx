import React from 'react';
import { Calendar } from 'lucide-react';
import SectionCard from '../Shared/SectionCard';

interface Activity {
  type: string;
  message: string;
  time: string;
  user: string;
  action: () => void;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'attendance': return 'bg-emerald-500';
      case 'complaint': return 'bg-red-500';
      case 'test': return 'bg-blue-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <SectionCard
      title="Recent Activity"
      icon={Calendar}
      iconColor="text-purple-600"
      actionButton={
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          View All
        </button>
      }
    >
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={activity.action}
          >
            <div className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(activity.type)}`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{activity.message}</p>
              <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default RecentActivity;
