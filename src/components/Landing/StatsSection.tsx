import React, { useEffect, useRef, useState } from 'react';

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}

interface StatsSectionProps {
  sectionsRef: React.MutableRefObject<HTMLElement[]>;
}

const StatsSection: React.FC<StatsSectionProps> = ({ sectionsRef }) => {
  const stats = [
    { number: "10000", label: "Students Protected" },
    { number: "500", label: "Schools Trust Us" },
    { number: "99", label: "Attendance Accuracy" },
    { number: "24", label: "Support Available" },
  ];

  return (
    <section
      className="py-16 bg-gray-50 opacity-0 transition-all duration-700"
      ref={(el) => el && sectionsRef.current.push(el)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group cursor-default"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                <CountUp end={parseInt(stat.number)} duration={2} />
                {stat.label === "Attendance Accuracy" ? ".9%" : stat.label === "Support Available" ? "/7" : "+"}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
