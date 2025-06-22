// Inicio.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Reutilizando tus estilos existentes
import logo from './logo-facturacion.png'; // si luego querés usar logo

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="compras-container">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {
        <img 
          src={logo} 
          alt="Logo del Sistema de Facturación" 
          style={{ width: '120px', marginBottom: '1rem' }} 
        />
        }
        <h2>Bienvenido al Sistema de Facturación</h2>
        <p style={{ color: '#333', maxWidth: '600px', margin: '0 auto' }}>
          Esta plataforma te permite registrar y gestionar compras y ventas de manera eficiente, 
          consultar el inventario actual de productos y visualizar los movimientos realizados en el sistema. 
          Utilizá los accesos rápidos para navegar por los distintos módulos.
        </p>
      </div>

      <div className="botones-agregar">
        <button onClick={() => navigate('/compras')}>
          Registrar Compra
        </button>
        <button onClick={() => navigate('/ventas')}>
          Registrar Venta
        </button>
        <button onClick={() => navigate('/reporte-inventario')}>
          Reporte de Inventario
        </button>
        <button onClick={() => navigate('/reporte-movimientos')}>
          Reporte de Movimientos
        </button>
      </div>
    </div>
  );
}

export default Inicio;
