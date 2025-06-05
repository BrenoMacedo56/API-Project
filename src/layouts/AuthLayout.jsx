import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

const AuthLayout = () => {
  const { currentTheme, toggleTheme, theme } = useContext(ThemeContext);

  const layoutStyles = {
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: currentTheme.colors.background,
    position: 'relative',
  };

  const leftPanelStyles = {
    flex: '1',
    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, #667eea)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  };

  const rightPanelStyles = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    position: 'relative',
  };

  const themeToggleStyles = {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '50px',
    padding: '0.8rem',
    cursor: 'pointer',
    color: theme === 'light' ? currentTheme.colors.text : 'white',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  };

  const brandStyles = {
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const logoStyles = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    background: 'linear-gradient(45deg, #fff, #f0f0f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const taglineStyles = {
    fontSize: '1.2rem',
    opacity: 0.9,
    maxWidth: '400px',
    lineHeight: '1.6',
  };

  const decorationStyles = {
    position: 'absolute',
    top: '10%',
    right: '-5%',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    filter: 'blur(40px)',
  };

  const decoration2Styles = {
    position: 'absolute',
    bottom: '20%',
    left: '-10%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    filter: 'blur(60px)',
  };

  const contentCardStyles = {
    background: currentTheme.colors.background,
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: currentTheme.shadows.large,
    border: `1px solid ${currentTheme.colors.border}`,
    width: '100%',
    maxWidth: '400px',
    position: 'relative',
    backdropFilter: 'blur(10px)',
  };

  return (
    <div style={layoutStyles}>
      <button 
        style={themeToggleStyles}
        onClick={toggleTheme}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'scale(1)';
        }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div style={leftPanelStyles}>
        <div style={decorationStyles}></div>
        <div style={decoration2Styles}></div>
        
        <div style={brandStyles}>
          <div style={logoStyles}>FinanceApp</div>
          <p style={taglineStyles}>
            Gerencie suas finanças de forma inteligente e segura. 
            Controle total sobre suas transações e relatórios detalhados.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '3rem',
          opacity: 0.8,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
            <div style={{ fontSize: '0.9rem' }}>Relatórios</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔐</div>
            <div style={{ fontSize: '0.9rem' }}>Segurança</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
            <div style={{ fontSize: '0.9rem' }}>Velocidade</div>
          </div>
        </div>
      </div>

      <div style={rightPanelStyles}>
        <div style={contentCardStyles}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;