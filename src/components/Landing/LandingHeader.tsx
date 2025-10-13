import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LandingHeaderProps {
  isVisible: boolean;
  onGetStarted: () => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ isVisible, onGetStarted }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 transition-all duration-300 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className={`flex items-center gap-3 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">KidSafe</h1>
              <p className="text-xs text-gray-600">
                Kids Safety Attendance System
              </p>
            </div>
          </div>
          <button
            onClick={onGetStarted}
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
