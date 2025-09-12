import React from 'react';
import { Star } from 'lucide-react';
import SectionCard from '../Shared/SectionCard';

interface Praise {
  subject: string;
  teacher: string;
  message: string;
  date: string;
}

interface RecentPraiseProps {
  recentPraise: Praise[];
}

const RecentPraise: React.FC<RecentPraiseProps> = ({ recentPraise }) => {
  return (
    <SectionCard
      title="Recent Praise"
      icon={Star}
      iconColor="text-orange-600"
    >
      <div className="space-y-3">
        {recentPraise.map((praise, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{praise.subject}</p>
              <p className="text-xs text-gray-600 mb-1">{praise.teacher}</p>
              <p className="text-sm text-gray-700">{praise.message}</p>
            </div>
            <span className="text-xs text-gray-500">{praise.date}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default RecentPraise;
