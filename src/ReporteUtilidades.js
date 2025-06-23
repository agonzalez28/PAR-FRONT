import React, { useState } from 'react';
import './ReporteInventario.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function ReporteUtilidades() {
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/par2025/reporte-utilidades/';

  const obtenerReporte = () => {
    if (!mesSeleccionado) {
      setError("Debe seleccionar un mes");
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

   // Función para generar el PDF
   const generarPdf = () => {
    const doc = new jsPDF();

    const titulo = 'Reporte de Utilidades';
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(titulo);
    const x = (pageWidth - textWidth) / 2;

    doc.setFontSize(16);
    doc.text(titulo, x, 15);

    doc.setFontSize(12);
    doc.text(`Reporte del Mes: ${mesSeleccionado}`, 14, 25);

    autoTable(doc, {
      startY: 35,
      head: [['Mes', 'Ventas Totales', 'Costos Totales', 'Utilidad']],
      body: [[
        datos.mes,
        `$${datos.ventas_totales.toFixed(2)}`,
        `$${datos.costos_totales.toFixed(2)}`,
        `$${datos.utilidad.toFixed(2)}`
      ]],
      theme: 'grid',
      headStyles: { 
        fillColor: [200, 200, 200], // Gris claro
        textColor: 0,              
        halign: 'center'           
      },
      styles: {
        textColor: datos.utilidad >= 0 ? [39, 174, 96] : [192, 57, 43] // Verde si utilidad positiva, rojo si negativa
      }
    });
    doc.save(`Utilidades_${mesSeleccionado}.pdf`);
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
        <button onClick={generarPdf}> PDF </button>
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
