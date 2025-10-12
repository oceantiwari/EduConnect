import React from 'react';
import { Shield, CheckCircle, Clock, Heart, Bell, Star, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  isVisible: boolean;
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isVisible, onGetStarted }) => {
  const students = [
    {
      name: "Emma Johnson",
      status: "Arrived Safely",
      icon: CheckCircle,
      color: "emerald",
    },
    {
      name: "Liam Smith",
      status: "Arrived Safely",
      icon: CheckCircle,
      color: "emerald",
    },
    {
      name: "Olivia Davis",
      status: "En Route",
      icon: Clock,
      color: "blue",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 hover:bg-blue-200 transition-colors duration-500">
              <Shield className="w-4 h-4" />
              Trusted by 500+ Schools
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Keep Your Children
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {" "}
                Safe & Connected
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              The complete school management platform that ensures student
              safety through smart attendance tracking, seamless
              parent-teacher communication, and comprehensive academic
              monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:scale-105 transform transition-all duration-300 text-lg">
                Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 text-yellow-400 fill-current transition-all duration-300 hover:scale-125`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  />
                ))}
              </div>
              <p className="text-gray-600">
                <span className="font-semibold">4.9/5</span> from 2,000+
                reviews
              </p>
            </div>
          </div>
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group">
                  <Shield className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Today's Safety Status
                  </h3>
                  <p className="text-sm text-gray-600">
                    All students accounted for
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {students.map((student, index) => (
                  <div
                    key={student.name}
                    className={`flex items-center justify-between p-3 bg-${student.color}-50 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <student.icon
                        className={`w-5 h-5 text-${student.color}-600`}
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {student.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs text-${student.color}-600 font-medium`}
                    >
                      {student.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-xl shadow-lg animate-float">
              <Heart className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-3 rounded-xl shadow-lg animate-bounce-gentle">
              <Bell className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
