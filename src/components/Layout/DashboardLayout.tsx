import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSidebarClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleTabChange = (tab: string) => {
    navigate(`/${tab}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <Sidebar
          activeTab=""
          onTabChange={handleTabChange}
          isOpen={isMobileMenuOpen}
          onClose={handleSidebarClose}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onMenuClick={handleMenuClick}
            isMobileMenuOpen={isMobileMenuOpen}
          />

          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
