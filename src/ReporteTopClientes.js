// ReporteTopClientes.js
import React, { useState } from 'react';
import './ReporteInventario.css';

function ReporteTopClientes() {
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/par2025/reporte-top-clientes/';

  const obtenerReporte = () => {
    if (!mesSeleccionado) {
      setError("Seleccioná un mes primero");
      return;
    }

    setLoading(true);
    setError(null);
    setDatos(null);

    fetch(`${API_URL}?mes=${mesSeleccionado}`)
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
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
      <h2>Reporte Top 15 Clientes - Ventas Mensuales</h2>

      <div className="filtro-mes">
        <label> Filtrar por Mes: </label>
        <input
          type="month"
          value={mesSeleccionado}
          onChange={e => setMesSeleccionado(e.target.value)}
        />
        <button onClick={obtenerReporte}>Generar Reporte</button>
      </div>

      {loading && <p>Cargando reporte de clientes...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {datos && datos.top_clientes && (
        <table className="tabla-inventario" style={{ marginTop: '1.5rem' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Total Ventas</th>
            </tr>
          </thead>
          <tbody>
            {datos.top_clientes.length === 0 && (
              <tr><td colSpan="3" style={{textAlign: 'center'}}>No hay datos para el mes seleccionado</td></tr>
            )}
            {datos.top_clientes.map((cliente, index) => (
              <tr key={cliente.cliente_id}>
                <td>{index + 1}</td>
                <td>{cliente.nombre_cliente}</td>
                <td>${cliente.total_ventas.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReporteTopClientes;
