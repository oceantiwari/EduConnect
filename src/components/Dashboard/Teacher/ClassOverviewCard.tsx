import React from 'react';
import { Users } from 'lucide-react';

interface ClassOverviewCardProps {
  classInfo: {
    name: string;
    totalStudents: number;
    presentToday: number;
  };
}

const ClassOverviewCard: React.FC<ClassOverviewCardProps> = ({ classInfo }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white/20 rounded-2xl overflow-hidden flex items-center justify-center">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{classInfo.name}</h2>
          <p className="text-emerald-100">Class Teacher</p>
        </div>
        <div className="text-right">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <p className="text-2xl font-bold">{classInfo.presentToday}/{classInfo.totalStudents}</p>
            <p className="text-sm text-emerald-100">Present Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassOverviewCard;
