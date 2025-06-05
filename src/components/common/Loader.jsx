import React from 'react';

const Loader = ({ size = 'medium', color = '#3498db', fullScreen = false }) => {
  // Tamanhos disponíveis
  const sizes = {
    small: 20,
    medium: 30,
    large: 40,
  };
  
  // Estilos para o spinner
  const spinnerSize = sizes[size] || sizes.medium;
  
  const spinnerStyle = {
    border: `3px solid rgba(0, 0, 0, 0.1)`,
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    animation: 'spin 1s linear infinite',
  };
  
  // Estilo para o container
  const containerStyle = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
  } : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };
  
  // CSS para animação
  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  
  return (
    <div style={containerStyle}>
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loader;
