import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
  change?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  color,
  bg,
  change,
  onClick
}) => {
  return (
    <div 
      className={`bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 ${
        onClick ? 'cursor-pointer group' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg ${bg} ${onClick ? 'group-hover:scale-110 transition-transform duration-200' : ''}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {change && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            change.includes('+') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatCard;
