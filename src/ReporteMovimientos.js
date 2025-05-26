import React, { useState } from 'react';
import './ReporteInventario.css'; // Reutilizás el mismo CSS si querés

function ReporteMovimientos() {
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/par2025/reporte-mensual/';

  const obtenerReporte = () => {
    if (!mesSeleccionado) {
      setError("Seleccioná un mes primero");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_URL}?mes=${mesSeleccionado}`)
      .then(res => res.json())
      .then(data => {
        setDatos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="reporte-inventario-container">
      <h2>Reporte de Movimientos Mensuales</h2>

      <div className="filtro-mes">
        <label> Filtrar por Mes: </label>
        <input
            type="month"
            value={mesSeleccionado}
            onChange={e => setMesSeleccionado(e.target.value)}
        />
        <button onClick={obtenerReporte}>Generar Reporte</button>
    </div>

      {loading && <p>Cargando reporte mensual...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {datos && (
        <div>
          <h3>Total Ventas: {datos.total_ventas}</h3>
          <table className="tabla-inventario">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Cliente</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {datos.ventas.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.fecha}</td>
                  <td>{venta.producto}</td>
                  <td>{venta.cliente}</td>
                  <td>{venta.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: '2rem' }}>Total Compras: {datos.total_compras}</h3>
          <table className="tabla-inventario">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {datos.compras.map((compra, index) => (
                <tr key={index}>
                  <td>{compra.fecha}</td>
                  <td>{compra.producto}</td>
                  <td>{compra.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReporteMovimientos;
