import React, { createContext, useState } from 'react';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Definição de cores e estilos para cada tema
  const themes = {
    light: {
      colors: {
        primary: '#3498db',
        secondary: '#f1f1f1',
        background: '#ffffff',
        text: '#333333',
        danger: '#e74c3c',
        success: '#2ecc71',
        warning: '#f39c12',
        border: '#e1e1e1',
      },
      shadows: {
        small: '0 2px 4px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
        large: '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
    },
    dark: {
      colors: {
        primary: '#2980b9',
        secondary: '#2c3e50',
        background: '#1a1a1a',
        text: '#f1f1f1',
        danger: '#c0392b',
        success: '#27ae60',
        warning: '#d35400',
        border: '#2c3e50',
      },
      shadows: {
        small: '0 2px 4px rgba(0, 0, 0, 0.3)',
        medium: '0 4px 6px rgba(0, 0, 0, 0.3)',
        large: '0 10px 15px rgba(0, 0, 0, 0.3)',
      },
    },
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
