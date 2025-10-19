import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from './LandingHeader';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import LandingFooter from './LandingFooter';
import VideoModal from './VideoModal';

interface LandingPageProps {
  onGetStarted?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      navigate('/signup');
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showDemoScheduled, setShowDemoScheduled] = useState(false);
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

  const handleWatchDemo = () => {
    setShowVideoModal(true);
  };

  const handleScheduleDemo = () => {
    setShowDemoScheduled(true);
    setTimeout(() => setShowDemoScheduled(false), 3000);
  };

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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .group:hover .group-hover-scale {
          transform: scale(1.1);
        }
      `}</style>

      {showDemoScheduled && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in">
          <p className="font-semibold">Demo Scheduled!</p>
          <p className="text-sm">We'll contact you shortly.</p>
        </div>
      )}

      <LandingHeader isVisible={isVisible} onGetStarted={handleGetStarted} />
      <HeroSection isVisible={isVisible} onGetStarted={handleGetStarted} onWatchDemo={handleWatchDemo} />
      <StatsSection sectionsRef={sectionsRef} />
      <FeaturesSection sectionsRef={sectionsRef} />
      <HowItWorksSection sectionsRef={sectionsRef} />
      <TestimonialsSection sectionsRef={sectionsRef} />
      <FAQSection sectionsRef={sectionsRef} />
      <CTASection sectionsRef={sectionsRef} onGetStarted={handleGetStarted} onScheduleDemo={handleScheduleDemo} />
      <LandingFooter />
      <VideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />
    </div>
  );
};

export default LandingPage;
