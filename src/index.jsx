import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Estilos globais
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

// Injetar os estilos no head
const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);

// Renderizar a aplicação
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
