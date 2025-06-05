import React from 'react';

const Card = ({ children, title, footer, variant = 'default' }) => {
  // Estilos base
  const baseStyle = {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    marginBottom: '20px',
  };
  
  // Variantes de estilo
  const variants = {
    default: {
      border: '1px solid #e1e1e1',
    },
    primary: {
      border: '1px solid #3498db',
    },
    success: {
      border: '1px solid #2ecc71',
    },
    danger: {
      border: '1px solid #e74c3c',
    },
  };
  
  // Estilos para o cabeçalho
  const headerStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid #e1e1e1',
    backgroundColor: '#f9f9f9',
  };
  
  // Estilos para o conteúdo
  const contentStyle = {
    padding: '20px',
  };
  
  // Estilos para o rodapé
  const footerStyle = {
    padding: '16px 20px',
    borderTop: '1px solid #e1e1e1',
    backgroundColor: '#f9f9f9',
  };
  
  // Combinar estilos
  const style = {
    ...baseStyle,
    ...variants[variant],
  };
  
  return (
    <div style={style}>
      {title && (
        <div style={headerStyle}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{title}</h3>
        </div>
      )}
      <div style={contentStyle}>{children}</div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  );
};

export default Card;
