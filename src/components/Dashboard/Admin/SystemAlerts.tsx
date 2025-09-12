import React from 'react';
import { AlertCircle } from 'lucide-react';
import SectionCard from '../Shared/SectionCard';

interface Alert {
  type: 'warning' | 'info' | 'success';
  message: string;
  priority: 'high' | 'medium' | 'low';
  action: () => void;
}

interface SystemAlertsProps {
  alerts: Alert[];
  onViewAll: () => void;
}

const SystemAlerts: React.FC<SystemAlertsProps> = ({ alerts, onViewAll }) => {
  return (
    <SectionCard
      title="System Alerts"
      icon={AlertCircle}
      iconColor="text-orange-600"
      actionButton={
        <button 
          onClick={onViewAll}
          className="text-orange-600 hover:text-orange-700 text-sm font-medium"
        >
          View All
        </button>
      }
    >
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border-l-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              alert.priority === 'high' ? 'bg-red-50 border-red-400' :
              alert.priority === 'medium' ? 'bg-orange-50 border-orange-400' :
              'bg-emerald-50 border-emerald-400'
            }`}
            onClick={alert.action}
          >
            <p className="text-sm font-medium text-gray-900">{alert.message}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                alert.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {alert.priority}
              </span>
              <span className="text-xs text-gray-500">Click to view</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default SystemAlerts;
