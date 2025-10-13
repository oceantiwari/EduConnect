import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

const LandingFooter: React.FC = () => {
  const [notification, setNotification] = useState('');

  const footerColumns = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Security", "API"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "Training", "Status"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Privacy"],
    },
  ];

  const handleLinkClick = (link: string) => {
    setNotification(`${link} - Coming Soon!`);
    setTimeout(() => setNotification(''), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          {notification}
        </div>
      )}

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="hover:scale-[1.02] transition-transform duration-300">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-3 mb-4 text-left"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">KidSafe</h3>
                  <p className="text-xs text-gray-400">
                    Kids Safety Attendance System
                  </p>
                </div>
              </button>
              <p className="text-gray-400">
                Keeping children safe through smart technology and seamless
                communication.
              </p>
            </div>
            {footerColumns.map((column) => (
              <div
                key={column.title}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <h4 className="font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {column.links.map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => handleLinkClick(link)}
                        className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 KidSafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingFooter;
