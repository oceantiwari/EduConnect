import React from 'react';
import { Calendar } from 'lucide-react';
import SectionCard from '../Shared/SectionCard';

interface Test {
  subject: string;
  date: string;
  syllabus: string;
}

interface UpcomingTestsProps {
  upcomingTests: Test[];
}

const UpcomingTests: React.FC<UpcomingTestsProps> = ({ upcomingTests }) => {
  return (
    <SectionCard
      title="Upcoming Tests"
      icon={Calendar}
      iconColor="text-purple-600"
    >
      <div className="space-y-3">
        {upcomingTests.map((test, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">{test.subject}</p>
              <p className="text-xs text-gray-600">{test.syllabus}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-purple-600">{test.date}</p>
              <p className="text-xs text-gray-500">4 days left</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default UpcomingTests;
