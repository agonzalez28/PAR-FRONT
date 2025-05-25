// ReporteInventario.js
import React, { useEffect, useState } from 'react';
import './ReporteInventario.css';

function ReporteInventario() {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/par2025/inventario/';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setInventario(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando reporte de inventario...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="reporte-inventario-container">
      <h2>Reporte de Inventario</h2>
      <table className="tabla-inventario">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock Disponible</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map(item => (
            <tr key={item.id}>
              <td>{item.producto.nombre}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReporteInventario;
