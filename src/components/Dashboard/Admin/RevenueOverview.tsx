import React from 'react';
import { BarChart3, Eye } from 'lucide-react';
import SectionCard from '../Shared/SectionCard';

interface RevenueData {
  month: string;
  fees: number;
  store: number;
}

interface RevenueOverviewProps {
  data: RevenueData[];
  onViewDetails: () => void;
}

const RevenueOverview: React.FC<RevenueOverviewProps> = ({ data, onViewDetails }) => {
  const totalFees = data.reduce((sum, m) => sum + m.fees, 0);
  const totalStore = data.reduce((sum, m) => sum + m.store, 0);

  return (
    <div className="lg:col-span-2">
      <SectionCard
        title="Monthly Revenue Overview"
        icon={BarChart3}
        iconColor="text-blue-600"
        actionButton={
          <button 
            onClick={onViewDetails}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        }
      >
        <div className="h-64 flex items-end justify-between gap-4">
          {data.map((monthData, index) => (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div className="flex flex-col items-center gap-1 w-full">
                <div 
                  className="w-full bg-blue-500 rounded-t-lg relative hover:bg-blue-600 transition-colors cursor-pointer"
                  style={{ height: `${(monthData.fees / 50000) * 200}px` }}
                  title={`Fees: ₹${monthData.fees}`}
                >
                  <div 
                    className="w-full bg-emerald-500 rounded-t-lg absolute bottom-0 hover:bg-emerald-600 transition-colors"
                    style={{ height: `${(monthData.store / monthData.fees) * 100}%` }}
                    title={`Store: ₹${monthData.store}`}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{monthData.month}</p>
                <p className="text-xs text-gray-600">₹{(monthData.fees + monthData.store) / 1000}K</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Fees (₹{totalFees / 1000}K)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Store (₹{totalStore / 1000}K)</span>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default RevenueOverview;
