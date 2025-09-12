import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
  hoverBg: string;
  hoverBorder: string;
  onClick: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  bg,
  hoverBg,
  hoverBorder,
  onClick
}) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 text-center border border-gray-200 rounded-lg transition-all duration-200 ${hoverBg} ${hoverBorder} hover:shadow-md group`}
    >
      <div className={`p-2 rounded-lg ${bg} group-hover:scale-110 transition-transform duration-200`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-900 block">{title}</span>
        <span className="text-xs text-gray-600">{description}</span>
      </div>
    </button>
  );
};

export default QuickActionCard;
