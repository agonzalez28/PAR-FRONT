import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './ReporteInventario.css';

function ReporteVentasPorFecha() {
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:8000/par2025/reporte-ventas-fechas/';

  const obtenerReporte = () => {
    if (!fechaDesde || !fechaHasta) {
      setError('Debe seleccionar ambas fechas');
      return;
    }

    setLoading(true);
    setError('');
    setVentas([]);

    fetch(`${API_URL}?desde=${fechaDesde}&hasta=${fechaHasta}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
      })
      .then(data => {
        // Asumimos que el backend responde con { ventas: [...] }
        const listaVentas = data.ventas || data;
        setVentas(listaVentas);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    const titulo = 'Reporte de Ventas';
    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - doc.getTextWidth(titulo)) / 2;

    doc.setFontSize(16);
    doc.text(titulo, x, 15);
    doc.setFontSize(12);
    doc.text(`Desde: ${fechaDesde}  Hasta: ${fechaHasta}`, 14, 25);

    autoTable(doc, {
      startY: 35,
      head: [['Fecha', 'Producto', 'Cliente', 'Cantidad']],
      body: ventas.map(item => [
        item.fecha ? item.fecha.split('T')[0] : '—',
        item['producto__nombre'] || item.producto || '—',
        item['cliente__nombre'] || item.cliente || '—',
        item.cantidad,
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: 0,
        halign: 'center'
      },
      styles: {
        halign: 'center',
        fontSize: 11,
        cellPadding: 4
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    doc.save(`Reporte_Ventas_${fechaDesde}_a_${fechaHasta}.pdf`);
  };

  return (
    <div className="reporte-inventario-container">
      <h2>Reporte de Ventas</h2>

      <div className="filtro-mes">
        <label>Desde: </label>
        <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
        <label>Hasta: </label>
        <input type="date" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} />
        <button onClick={obtenerReporte}>Buscar</button>
        <button onClick={generarPDF} style={{ marginLeft: '1rem' }}>
          Exportar PDF
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Cargando ventas...</p>}

      {ventas.length > 0 ? (
        <table className="tabla-inventario" style={{ marginTop: '2rem' }}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Cliente</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((item, idx) => (
              <tr key={idx}>
                <td>{item.fecha ? item.fecha.split('T')[0] : '—'}</td>
                <td>{item['producto__nombre'] || item.producto || '—'}</td>
                <td>{item['cliente__nombre'] || item.cliente || '—'}</td>
                <td>{item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No hay ventas para mostrar.</p>
      )}
    </div>
  );
}

export default ReporteVentasPorFecha;
