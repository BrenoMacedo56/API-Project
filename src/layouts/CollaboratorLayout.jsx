import React, { useContext, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';

const CollaboratorLayout = () => {
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
    backgroundColor: currentTheme.colors.secondary,
    transition: 'width 0.3s ease',
    borderRight: `1px solid ${currentTheme.colors.border}`,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
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
    borderBottom: `1px solid ${currentTheme.colors.border}`,
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
    color: isActive ? currentTheme.colors.primary : currentTheme.colors.text,
    backgroundColor: isActive ? `${currentTheme.colors.primary}20` : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderLeft: isActive ? `3px solid ${currentTheme.colors.primary}` : '3px solid transparent',
  });

  const userProfileStyles = {
    padding: '1.5rem',
    borderTop: `1px solid ${currentTheme.colors.border}`,
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
    backgroundColor: currentTheme.colors.primary,
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    boxShadow: currentTheme.shadows.medium,
  };

  const menuItems = [
    { icon: '🏠', label: 'Dashboard', path: '/' },
    { icon: '💰', label: 'Transações', path: '/transactions' },
    { icon: '📊', label: 'Relatórios', path: '/reports' },
    { icon: '👤', label: 'Perfil', path: '/profile' },
  ];

  const isActivePath = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
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
      {/* Sidebar */}
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
            color: currentTheme.colors.primary 
          }}>
            💼
          </div>
          {sidebarOpen && (
            <span style={{ 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              color: currentTheme.colors.primary 
            }}>
              FinanceApp
            </span>
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
                  e.target.style.backgroundColor = `${currentTheme.colors.primary}10`;
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
            backgroundColor: currentTheme.colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.2rem',
          }}>
            {user?.name?.charAt(0) || '👤'}
          </div>
          {sidebarOpen && (
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>
                {user?.name || 'Usuário'}
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: currentTheme.colors.text + '80',
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
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

export default CollaboratorLayout;