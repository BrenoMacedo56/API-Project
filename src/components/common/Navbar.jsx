import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Estilos
  const navbarStyle = {
    backgroundColor: '#3498db',
    padding: '12px 20px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
  
  const logoStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };
  
  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
  };
  
  const linkStyle = {
    color: 'white',
    margin: '0 10px',
    textDecoration: 'none',
    cursor: 'pointer',
  };
  
  const profileContainerStyle = {
    position: 'relative',
    display: 'inline-block',
  };
  
  const profileButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  };
  
  const avatarStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#2980b9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '8px',
  };
  
  const dropdownStyle = {
    position: 'absolute',
    right: 0,
    top: '45px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    width: '200px',
    zIndex: 1000,
    display: menuOpen ? 'block' : 'none',
  };
  
  const dropdownItemStyle = {
    padding: '12px 16px',
    color: '#333',
    cursor: 'pointer',
    borderBottom: '1px solid #f1f1f1',
  };
  
  const mobileMenuButtonStyle = {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  };
  
  // Determinar links com base no perfil do usuário
  const renderLinks = () => {
    if (!user) return null;
    
    if (user.role === 'admin') {
      return (
        <>
          <div 
            style={linkStyle} 
            onClick={() => navigate('/admin')}
          >
            Dashboard
          </div>
          <div 
            style={linkStyle} 
            onClick={() => navigate('/admin/users')}
          >
            Usuários
          </div>
        </>
      );
    }
    
    return (
      <>
        <div 
          style={linkStyle} 
          onClick={() => navigate('/')}
        >
          Dashboard
        </div>
        <div 
          style={linkStyle} 
          onClick={() => navigate('/transactions')}
        >
          Transações
        </div>
      </>
    );
  };
  
  return (
    <nav style={navbarStyle}>
      <div 
        style={logoStyle}
        onClick={() => navigate(user?.role === 'admin' ? '/admin' : '/')}
      >
        Finance App
      </div>
      
      <div style={navLinksStyle}>
        {renderLinks()}
        
        {user && (
          <div style={profileContainerStyle}>
            <div 
              style={profileButtonStyle}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div style={avatarStyle}>
                {user.firstName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span>{user.firstName || 'Usuário'}</span>
            </div>
            
            {menuOpen && (
              <div style={dropdownStyle}>
                <div 
                  style={dropdownItemStyle}
                  onClick={() => {
                    navigate('/profile');
                    setMenuOpen(false);
                  }}
                >
                  Meu Perfil
                </div>
                <div 
                  style={{...dropdownItemStyle, color: '#e74c3c'}}
                  onClick={handleLogout}
                >
                  Sair
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
