import React from 'react';
import {
  Shield,
  MessageSquare,
  BarChart3,
  ShoppingBag,
  Bell,
  Users,
} from 'lucide-react';

interface FeaturesSectionProps {
  sectionsRef: React.MutableRefObject<HTMLElement[]>;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ sectionsRef }) => {
  const features = [
    {
      icon: Shield,
      title: "Safe Attendance Tracking",
      description:
        "Parents mark when children leave for school, teachers confirm arrival. Complete transparency and safety.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: MessageSquare,
      title: "Praise & Communication",
      description:
        "Teachers can praise students and address concerns directly with parents in real-time.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description:
        "Monitor academic progress with detailed reports and analytics for better learning outcomes.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: ShoppingBag,
      title: "School Store",
      description:
        "Convenient online ordering for uniforms, books, and school supplies with easy payment.",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Stay updated with announcements, events, and important school information instantly.",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description:
        "Tailored dashboards for parents, teachers, and administrators with role-based permissions.",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <section
      className="py-20 opacity-0 transition-all duration-700"
      ref={(el) => el && sectionsRef.current.push(el)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for School Safety
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform brings together all the tools schools
            and parents need to ensure student safety and academic success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-500 group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon
                  className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
