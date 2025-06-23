// ReporteTopClientes.js
import React, { useState } from 'react';
import './ReporteInventario.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

    // Función para generar el PDF
    const generarPdf = () => {
      const doc = new jsPDF();
  
      const titulo = 'Top 15 Clientes - Ventas Mensuales';
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextWidth(titulo);
      const x = (pageWidth - textWidth) / 2;
  
      doc.setFontSize(16);
      doc.text(titulo, x, 15);
  
      doc.setFontSize(12);
      doc.text(`Mes: ${mesSeleccionado}`, 14, 25);
  
      autoTable(doc, {
        startY: 35,
        head: [['#', 'Cliente', 'Total Ventas']],
        body: datos.top_clientes.map((cliente, index) => [
          index + 1,
          cliente.nombre_cliente,
          `$${cliente.total_ventas.toFixed(2)}`
        ]),
        theme: 'grid',
        headStyles: {
          fillColor: [200, 200, 200], // Gris claro
          textColor: 0,               // Letras negras
          halign: 'center'
        },
        styles: {
          halign: 'center',
          fontSize: 11,
          cellPadding: 4
        },
      });
  
      doc.save(`TopClientes_${mesSeleccionado}.pdf`);
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
        <button onClick={generarPdf}> PDF </button>
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
