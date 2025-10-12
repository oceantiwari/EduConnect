import React, { useEffect, useRef, useState } from 'react';
import LandingHeader from './LandingHeader';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import LandingFooter from './LandingFooter';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    setIsVisible(true);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observerRef.current?.observe(section);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1.5s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .group:hover .group-hover-scale {
          transform: scale(1.1);
        }
      `}</style>

      <LandingHeader isVisible={isVisible} onGetStarted={onGetStarted} />
      <HeroSection isVisible={isVisible} onGetStarted={onGetStarted} />
      <StatsSection sectionsRef={sectionsRef} />
      <FeaturesSection sectionsRef={sectionsRef} />
      <HowItWorksSection sectionsRef={sectionsRef} />
      <TestimonialsSection sectionsRef={sectionsRef} />
      <FAQSection sectionsRef={sectionsRef} />
      <CTASection sectionsRef={sectionsRef} onGetStarted={onGetStarted} />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
