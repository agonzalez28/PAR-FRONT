import React, { useState } from 'react';
import './ReporteInventario.css';

function ReporteTopProveedores() {
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/par2025/reporte-top-proveedores/';

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
      <h2>Reporte Top 15 Proveedores</h2>

      <div className="filtro-mes">
        <label> Filtrar por Mes: </label>
        <input
          type="month"
          value={mesSeleccionado}
          onChange={e => setMesSeleccionado(e.target.value)}
        />
        <button onClick={obtenerReporte}>Generar Reporte</button>
      </div>

      {loading && <p>Cargando reporte de proveedores...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {datos && (
        <div>
          <h3>Mes: {datos.mes}</h3>
          <table className="tabla-inventario">
            <thead>
              <tr>
                <th>#</th>
                <th>Proveedor</th>
                <th>Total Compras</th>
              </tr>
            </thead>
            <tbody>
              {datos.top_proveedores.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>
                    No hay datos para el mes seleccionado
                  </td>
                </tr>
              )}
              {datos.top_proveedores.map((item, index) => (
                <tr key={item.proveedor_id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre_proveedor}</td>
                  <td>
                    ${item.total_compras.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReporteTopProveedores;
