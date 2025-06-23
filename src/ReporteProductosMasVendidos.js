import React, { useState } from 'react';
import './ReporteInventario.css'; // Reutilizás el mismo CSS
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function ReporteProductosMasVendidos() {
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/par2025/reporte-productos-mas-vendidos/';

  const obtenerReporte = () => {
    if (!mesSeleccionado) {
      setError("Seleccioná un mes válido");
      setProductos([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_URL}?mes=${mesSeleccionado}`)
      .then(res => res.json())
      .then(data => {
        setProductos(data.productos_mas_vendidos || []);
        setLoading(false);
      })
      .catch(err => {
        setError( "Error al obtener el reporte");
        setLoading(false);
      });
  };

    // Exportar a PDF
    const generarPdf = () => {
      const doc = new jsPDF();
  
      doc.setFontSize(16);
      doc.text('Reporte de Productos Más Vendidos', 14, 15);
  
      doc.setFontSize(12);
      doc.text(`Mes: ${mesSeleccionado}`, 14, 25);
  
      autoTable(doc, {
        startY: 35,
        head: [['Producto', 'Cantidad Vendida']],
        body: productos.map(item => [item.producto, item.cantidad_total]),
        theme: 'grid',
        headStyles: { fillColor: [231, 76, 60] } // rojo
      });
  
      doc.save(`ProductosMasVendidos_${mesSeleccionado}.pdf`);
    };

  return (
    <div className="reporte-inventario-container">
      <h2>Productos Más Vendidos</h2>

      <div className="filtro-mes">
        <label>Filtrar por Mes:</label>
        <input
          type="month"
          value={mesSeleccionado}
          onChange={e => setMesSeleccionado(e.target.value)}
        />
        <button onClick={obtenerReporte}>Búsqueda</button>
        <button onClick={generarPdf}> PDF </button>
      </div>

      {loading && <p>Cargando reporte...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {productos.length > 0 && (
        <div>
          <h3>Top Productos Vendidos</h3>
          <table className="tabla-inventario">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad Vendida</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((item, index) => (
                <tr key={index}>
                  <td>{item.producto}</td>
                  <td>{item.cantidad_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       {/* Mostrar mensaje si no hay productos */}
    {!loading && productos.length === 0 && mesSeleccionado && (
      <p style={{ color: '#888', marginTop: '1rem' }}>
        No se encontraron productos vendidos en el mes seleccionado.
      </p>
    )}
    </div>
  );
}

export default ReporteProductosMasVendidos;