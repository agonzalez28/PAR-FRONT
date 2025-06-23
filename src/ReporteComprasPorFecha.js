import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './ReporteInventario.css';

function ReporteComprasPorFecha() {
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [compras, setCompras] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:8000/par2025/reporte-compras-fechas/';

  const obtenerReporte = () => {
    if (!fechaDesde || !fechaHasta) {
      setError('Debe seleccionar ambas fechas');
      return;
    }

    setLoading(true);
    setError('');
    setCompras([]);

    fetch(`${API_URL}?desde=${fechaDesde}&hasta=${fechaHasta}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
      })
      .then(data => {
        // Si tu backend responde: { compras: [...] }
        const listaCompras = data.compras || data; 
        setCompras(listaCompras);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    const titulo = 'Reporte de Compras';
    const pageWidth = doc.internal.pageSize.getWidth();
    const x = (pageWidth - doc.getTextWidth(titulo)) / 2;

    doc.setFontSize(16);
    doc.text(titulo, x, 15);
    doc.setFontSize(12);
    doc.text(`Desde: ${fechaDesde}  Hasta: ${fechaHasta}`, 14, 25);

    autoTable(doc, {
      startY: 35,
      head: [['Fecha', 'Producto', 'Proveedor', 'Cantidad', 'Total Compra']],
      body: compras.map(item => [
        item.fecha,
        item['producto__nombre'] || item.producto || '—',
        item['proveedor__nombre'] || item.proveedor || '—',
        item.cantidad,
        `$${(item.total_compra || item.total_comprado || 0).toFixed(2)}`
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

    doc.save(`Reporte_Compras_${fechaDesde}_a_${fechaHasta}.pdf`);
  };

  return (
    <div className="reporte-inventario-container">
      <h2>Reporte de Compras</h2>

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
      {loading && <p>Cargando compras...</p>}

      {compras.length > 0 ? (
        <table className="tabla-inventario" style={{ marginTop: '2rem' }}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Proveedor</th>
              <th>Cantidad</th>
              <th>Total Compra</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((item, idx) => (
              <tr key={idx}>
                <td>{item.fecha ? item.fecha.split('T')[0] : '—'}</td>
                <td>{item['producto__nombre'] || item.producto || '—'}</td>
                <td>{item['proveedor__nombre'] || item.proveedor || '—'}</td>
                <td>{item.cantidad}</td>
                <td>${(item.total_compra || item.total_comprado || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No hay compras para mostrar.</p>
      )}
    </div>
  );
}

export default ReporteComprasPorFecha;
