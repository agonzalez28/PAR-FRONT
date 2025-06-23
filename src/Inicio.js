// Inicio.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './logo-facturacion.png';

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="compras-container">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <img 
          src={logo} 
          alt="Logo del Sistema de Facturación" 
          style={{ width: '120px', marginBottom: '1rem' }} 
        />
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
          Inventario
        </button>
        <button onClick={() => navigate('/reporte-movimientos')}>
          Movimientos
        </button>
      { /* <button onClick={() => navigate('/reporte-top-clientes')}>
          Top 15 Clientes
        </button>
        <button onClick={() => navigate('/reporte-top-proveedores')}>
          Top 15 Proveedores
        </button>
        <button onClick={() => navigate('/reporte-utilidades')}>
          Reporte de Utilidades
        </button>
        <button onClick={() => navigate('/reporte-productos-vendidos/')}>
          Reporte de Productos
        </button>
        <button onClick={() => navigate('/reporte-compras-fechas/')}>
          Reporte de Compras
        </button>
        <button onClick={() => navigate('/reporte-ventas-fechas/')}>
          Reporte de Ventas
        </button>*/}
        <button onClick={() => navigate('/reportes/')}>
          Reportes del Sistema
        </button>

        
      </div>
    </div>
  );
}

export default Inicio;
