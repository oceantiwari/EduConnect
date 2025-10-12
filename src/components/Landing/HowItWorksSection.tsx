import React from 'react';

interface HowItWorksSectionProps {
  sectionsRef: React.MutableRefObject<HTMLElement[]>;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ sectionsRef }) => {
  const steps = [
    {
      number: 1,
      title: "Parent Marks Departure",
      description:
        "Parents use the app to mark when their child leaves for school, creating the first safety checkpoint.",
      color: "bg-blue-600",
    },
    {
      number: 2,
      title: "Teacher Confirms Arrival",
      description:
        "Teachers take attendance and confirm safe arrival, with automatic notifications to parents.",
      color: "bg-emerald-600",
    },
    {
      number: 3,
      title: "Continuous Communication",
      description:
        "Ongoing updates about academic progress, events, and any concerns throughout the day.",
      color: "bg-purple-600",
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 transition-all duration-700"
      ref={(el) => el && sectionsRef.current.push(el)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How KidSafe Works
          </h2>
          <p className="text-xl text-blue-100">
            Simple, secure, and effective in just three steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="text-center group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`w-20 h-20 ${step.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
              >
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-blue-100">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
