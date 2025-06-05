import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = 'text', 
  label, 
  error, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  disabled = false,
  fullWidth = true,
  ...props 
}, ref) => {
  // Estilos base
  const containerStyle = {
    marginBottom: '16px',
    width: fullWidth ? '100%' : 'auto',
  };
  
  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    fontSize: '16px',
    border: `1px solid ${error ? '#e74c3c' : '#ddd'}`,
    borderRadius: '4px',
    transition: 'border-color 0.2s ease',
    backgroundColor: disabled ? '#f9f9f9' : '#fff',
    color: disabled ? '#999' : '#333',
  };
  
  const errorStyle = {
    color: '#e74c3c',
    fontSize: '12px',
    marginTop: '4px',
  };
  
  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        style={inputStyle}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        {...props}
      />
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
});

export default Input;
