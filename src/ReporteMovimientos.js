import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './ReporteInventario.css'; // mismo css que el de Inventario

function ReporteMovimientos() {
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/par2025/reporte-mensual/';

  //Para filtrar reporte por mes
  const obtenerReporte = () => {
    if (!mesSeleccionado) {
      setError("Debe seleccionar un mes");
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

  //Exportar en formato pdf 
  const generarPdf = () => {
    const doc = new jsPDF();

     // Título del reporte
     doc.setFontSize(16);
     doc.text('Movimientos Mensuales',14, 15);
 
     // Subtítulo con el mes filtrado
     doc.setFontSize(12);
     doc.text(`Reporte del mes: ${mesSeleccionado}`, 14, 25);
 
     // Tabla de ventas
     autoTable(doc, {
       startY: 35,
       head: [['Fecha', 'Producto', 'Cliente', 'Cantidad']], // Encabezado
       body: datos.ventas.map(v => [v.fecha, v.producto, v.cliente, v.cantidad]), // Filas
       theme: 'grid',
      headStyles: { fillColor: [52, 152, 219] }, // Azul
     });
 
     let y = doc.lastAutoTable.finalY + 10;
     doc.text(`Total Ventas: ${datos.total_ventas}`, 14, y);
 
     // Tabla de las compras
     y += 10;
     autoTable(doc, {
       startY: y,
       head: [['Fecha', 'Producto', 'Cantidad']],
       body: datos.compras.map(c => [c.fecha, c.producto, c.cantidad]),
       theme: 'grid',
       headStyles: { fillColor: [46, 204, 113],}
  });
 
     y = doc.lastAutoTable.finalY + 10;
     doc.text(`Total Compras: ${datos.total_compras}`, 14, y);
 
     // Descarga el pdf
     doc.save(`Movimientos_${mesSeleccionado}.pdf`);
   };
  return (
    <div className="reporte-inventario-container">
      <h2> Movimientos Mensuales </h2>

      <div className="filtro-mes">
        <label> Filtrar por Mes: </label>
        <input
            type="month"
            value={mesSeleccionado}
            onChange={e => setMesSeleccionado(e.target.value)}
        />
        <button onClick={obtenerReporte}>Búsqueda</button>
        <button onClick={generarPdf}> PDF </button>
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
