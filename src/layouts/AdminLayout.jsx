import React, { useContext, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';

const AdminLayout = () => {
  const { currentTheme, toggleTheme, theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const layoutStyles = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: currentTheme.colors.background,
    color: currentTheme.colors.text,
  };

  const sidebarStyles = {
    width: sidebarOpen ? '280px' : '80px',
    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, #667eea)`,
    transition: 'width 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    color: 'white',
  };

  const headerStyles = {
    height: '70px',
    backgroundColor: currentTheme.colors.background,
    borderBottom: `1px solid ${currentTheme.colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    boxShadow: currentTheme.shadows.small,
  };

  const mainContentStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const contentAreaStyles = {
    flex: 1,
    padding: '2rem',
    overflow: 'auto',
  };

  const logoStyles = {
    padding: '1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const navStyles = {
    flex: 1,
    padding: '1rem 0',
  };

  const navItemStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    color: 'white',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderLeft: isActive ? '3px solid white' : '3px solid transparent',
  });

  const userProfileStyles = {
    padding: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const toggleButtonStyles = {
    position: 'absolute',
    top: '50%',
    right: '-15px',
    transform: 'translateY(-50%)',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: 'white',
    color: currentTheme.colors.primary,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    boxShadow: currentTheme.shadows.medium,
  };

  const adminBadgeStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
  };

  const menuItems = [
    { icon: '🏠', label: 'Dashboard', path: '/admin' },
    { icon: '👥', label: 'Usuários', path: '/admin/users' },
    { icon: '💰', label: 'Transações', path: '/admin/transactions' },
    { icon: '📊', label: 'Relatórios', path: '/admin/reports' },
    { icon: '⚙️', label: 'Configurações', path: '/admin/settings' },
  ];

  const isActivePath = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={layoutStyles}>
      {/* Admin Sidebar */}
      <div style={sidebarStyles}>
        <button
          style={toggleButtonStyles}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? '‹' : '›'}
        </button>

        {/* Logo */}
        <div style={logoStyles}>
          <div style={{ 
            fontSize: '1.5rem',
            color: 'white'
          }}>
            🛡️
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold',
                color: 'white'
              }}>
                Admin Panel
              </div>
              <div style={adminBadgeStyles}>
                Administrador
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={navStyles}>
          {menuItems.map((item) => (
            <div
              key={item.path}
              style={navItemStyles(isActivePath(item.path))}
              onClick={() => handleNavigation(item.path)}
              onMouseEnter={(e) => {
                if (!isActivePath(item.path)) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActivePath(item.path)) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div style={userProfileStyles}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.2rem',
            backdropFilter: 'blur(10px)',
          }}>
            {user?.name?.charAt(0) || '👤'}
          </div>
          {sidebarOpen && (
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>
                {user?.name || 'Administrador'}
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: '0.2rem' 
              }}>
                {user?.email}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContentStyles}>
        {/* Header */}
        <header style={headerStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ 
              fontSize: '1.5rem', 
              margin: 0,
              color: currentTheme.colors.text 
            }}>
              {menuItems.find(item => isActivePath(item.path))?.label || 'Dashboard'}
            </h1>
            <div style={{
              backgroundColor: currentTheme.colors.primary,
              color: 'white',
              padding: '0.3rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '500',
            }}>
              Admin
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Notifications */}
            <button
              style={{
                background: 'none',
                border: `1px solid ${currentTheme.colors.border}`,
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: currentTheme.colors.text,
                fontSize: '1.2rem',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = currentTheme.colors.secondary;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              🔔
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: currentTheme.colors.danger,
                color: 'white',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                3
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              style={{
                background: 'none',
                border: `1px solid ${currentTheme.colors.border}`,
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: currentTheme.colors.text,
                fontSize: '1.2rem',
                transition: 'all 0.2s ease',
              }}
              onClick={toggleTheme}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = currentTheme.colors.secondary;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Logout Button */}
            <button
              style={{
                background: currentTheme.colors.danger,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
              onClick={handleLogout}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.9';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Sair
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main style={contentAreaStyles}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;