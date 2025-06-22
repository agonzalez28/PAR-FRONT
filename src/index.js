// index.js (entry point real de React)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // ✅ Importando App correctamente

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
