// Reportes.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Reporte.css';  // nuevo archivo CSS para este componente

function Reportes() {
  const navigate = useNavigate();

  return (
    <div className="reportes-container">
      <h2> Reportes </h2>
      <p style={{ color: '#333', fontSize: '16px', marginBottom: '1.5rem' }}>
      Accedé a los distintos reportes disponibles del sistema. Cada informe puede visualizarse en pantalla o exportarse en formato PDF.
      </p>
      <div className="reportes-buttons">
        <button onClick={() => navigate('/reporte-compras-fechas/')}>Reporte de Compras</button>
        <button onClick={() => navigate('/reporte-ventas-fechas/')}>Reporte de Ventas</button>
        <button onClick={() => navigate('/reporte-top-clientes')}>Top 15 Clientes</button>
        <button onClick={() => navigate('/reporte-top-proveedores')}>Top 15 Proveedores</button>
        <button onClick={() => navigate('/reporte-utilidades')}>Reporte de Utilidades</button>
        <button onClick={() => navigate('/reporte-productos-vendidos/')}>Reporte de Productos</button>
       
        {/* Botón para volver a Inicio */}
        <button className="volver-button" onClick={() => navigate('/')}>
        ← Volver al Inicio
        </button>
      </div>
    </div>
  );
}

export default Reportes;
