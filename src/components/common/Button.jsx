import React from 'react';

const Button = ({ children, onClick, variant = 'primary', disabled = false, fullWidth = false, type = 'button' }) => {
  // Estilos base
  const baseStyle = {
    padding: '10px 16px',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.7 : 1,
  };
  
  // Variantes de estilo
  const variants = {
    primary: {
      backgroundColor: '#3498db',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#f1f1f1',
      color: '#333',
    },
    danger: {
      backgroundColor: '#e74c3c',
      color: 'white',
    },
    success: {
      backgroundColor: '#2ecc71',
      color: 'white',
    },
  };
  
  // Combinar estilos
  const style = {
    ...baseStyle,
    ...variants[variant],
  };
  
  return (
    <button 
      style={style}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
