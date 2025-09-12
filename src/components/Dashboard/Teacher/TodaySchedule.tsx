import React from 'react';
import { Calendar } from 'lucide-react';
import SectionCard from '../Shared/SectionCard';

interface Task {
  task: string;
  status: 'completed' | 'pending' | 'scheduled';
  time: string;
}

interface TodayScheduleProps {
  tasks: Task[];
}

const TodaySchedule: React.FC<TodayScheduleProps> = ({ tasks }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500';
      case 'pending': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <SectionCard
      title="Today's Schedule"
      icon={Calendar}
      iconColor="text-blue-600"
    >
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
              <div>
                <p className="text-sm font-medium text-gray-900">{task.task}</p>
                <p className="text-xs text-gray-600">{task.time}</p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(task.status)}`}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default TodaySchedule;
