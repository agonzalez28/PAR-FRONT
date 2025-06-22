import React, { useState } from 'react';
import './ReporteInventario.css';

function ReporteUtilidades() {
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/par2025/reporte-utilidades/';

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
      <h2>Reporte de Utilidades</h2>

      <div className="filtro-mes">
        <label> Filtrar por Mes: </label>
        <input
          type="month"
          value={mesSeleccionado}
          onChange={e => setMesSeleccionado(e.target.value)}
        />
        <button onClick={obtenerReporte}>Generar Reporte</button>
      </div>

      {loading && <p>Cargando reporte de utilidades...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {datos && (
        <div style={{ marginTop: '1.5rem' }}>
          <table className="tabla-inventario">
            <thead>
              <tr>
                <th>Mes</th>
                <th>Ventas Totales</th>
                <th>Costos Totales</th>
                <th>Utilidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{datos.mes}</td>
                <td>${datos.ventas_totales.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td>${datos.costos_totales.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td style={{ color: datos.utilidad >= 0 ? 'green' : 'red' }}>
                  ${datos.utilidad.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ReporteUtilidades;
