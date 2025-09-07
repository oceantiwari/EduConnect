import React, { useState } from 'react';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import NotificationPanel from '../Notifications/NotificationPanel';

const theme = {
  bg: '#ffffff',
  primary: '#4a90e2',
  secondary: '#50c9ba',
  accent: '#f5a623',
  success: '#2ecc71',
  textDark: '#2d2d2d',
  textLight: '#fff',
  border: '#e6e6e6',
  hover: '#f2f7ff',
  badgeBg: '#ff6f61',
  badgeText: '#fff',
};

const keyframes = `
@keyframes fadePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.65; }
}
`;

const fontFamily = `'Inter', 'Segoe UI', sans-serif`;

const Header: React.FC<{ onMenuClick: () => void; isMobileMenuOpen: boolean }> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  if (!user) return null;

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'PARENT':
        return { backgroundColor: '#d9f0ff', color: '#1c3f5e' };
      case 'TEACHER':
        return { backgroundColor: '#e6ffed', color: '#1f4d2e' };
      case 'SCHOOL_ADMIN':
        return { backgroundColor: '#f3e6ff', color: '#3f1f5e' };
      case 'PLATFORM_ADMIN':
        return { backgroundColor: '#ffe6e6', color: '#5e1f1f' };
      default:
        return { backgroundColor: '#f0f0f0', color: '#555' };
    }
  };

  return (
    <header
      style={{
        backgroundColor: theme.bg,
        borderBottom: `1px solid ${theme.border}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        height: 64,
        fontFamily,
        position: 'relative',
        zIndex: 100,
      }}
    >
      <style>{keyframes}</style>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          userSelect: 'none',
        }}
      >
        {/* Left: Menu & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={onMenuClick}
            aria-label="Toggle menu"
            style={{
              backgroundColor: theme.primary,
              borderRadius: 12,
              border: 'none',
              padding: 8,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(74,144,226,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.textLight,
              width: 40,
              height: 40,
            }}
          >
            <Menu size={22} />
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                backgroundColor: theme.primary,
                borderRadius: 10,
                width: 42,
                height: 42,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.textLight,
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              KS
            </div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: theme.primary,
                margin: 0,
                letterSpacing: 1,
              }}
            >
              KidSafe
            </h1>
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Toggle notifications"
              style={{
                backgroundColor: theme.accent,
                borderRadius: 10,
                border: 'none',
                padding: 8,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(245,166,35,0.3)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.textLight,
                animation: 'fadePulse 3s infinite',
              }}
            >
              <Bell size={20} />
              <span
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  backgroundColor: theme.badgeBg,
                  color: theme.badgeText,
                  fontSize: 11,
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                3
              </span>
            </button>
            {showNotifications && (
              <div
                style={{
                  position: 'absolute',
                  top: 50,
                  right: 0,
                  width: 300,
                  backgroundColor: theme.bg,
                  borderRadius: 12,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  padding: 12,
                  zIndex: 200,
                }}
              >
                <NotificationPanel onClose={() => setShowNotifications(false)} />
              </div>
            )}
          </div>

          {/* Profile */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              aria-label="Toggle profile menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                backgroundColor: theme.secondary,
                borderRadius: 20,
                padding: '6px 12px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(80,201,186,0.3)',
                color: theme.textLight,
                fontWeight: 600,
                fontSize: 14,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6ad8c9')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.secondary)}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#f9f9f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <User size={20} color={theme.primary} />
                )}
              </div>
              <div style={{ textAlign: 'left', minWidth: 100 }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: 14,
                    color: theme.textDark,
                  }}
                >
                  {user.name}
                </p>
                <span
                  style={{
                    ...getRoleBadgeStyle(user.role),
                    padding: '2px 6px',
                    borderRadius: 10,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {user.role.replace('_', ' ')}
                </span>
              </div>
            </button>

            {showProfile && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 50,
                  width: 240,
                  backgroundColor: theme.bg,
                  borderRadius: 12,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                  padding: 14,
                  zIndex: 200,
                }}
              >
                <div
                  style={{
                    borderBottom: `1px solid ${theme.border}`,
                    paddingBottom: 10,
                    marginBottom: 10,
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600, color: theme.primary }}>{user.name}</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#777' }}>{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    logout();
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: theme.primary,
                    color: theme.textLight,
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 0',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
