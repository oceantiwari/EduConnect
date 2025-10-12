import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  sectionsRef: React.MutableRefObject<HTMLElement[]>;
  onGetStarted: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ sectionsRef, onGetStarted }) => {
  return (
    <section
      className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 transition-all duration-700"
      ref={(el) => el && sectionsRef.current.push(el)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Keep Your Children Safe?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of families and schools who trust KidSafe for student
          safety and communication.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transform transition-all duration-300 text-lg">
            Schedule Demo
          </button>
        </div>
        <p className="text-blue-100 mt-6">
          No credit card required • 30-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTASection;
