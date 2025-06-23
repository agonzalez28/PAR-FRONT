// ReporteInventario.js
import React, { useEffect, useState } from 'react';
import './ReporteInventario.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function ReporteInventario() {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8000/par2025/inventario/';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setInventario(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

    //Función para exportar PDF
    const generarPdf = () => {
      const doc = new jsPDF();
      const titulo = 'Reporte de Inventario';
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextWidth(titulo);
      const x = (pageWidth - textWidth) / 2;
    
      doc.setFontSize(16);
      doc.text(titulo, x, 15);
    
      autoTable(doc, {
        startY: 25,
        head: [['Producto', 'Stock Disponible']],
        body: inventario.map(item => [
          item.producto.nombre,
          item.stock
        ]),
        theme: 'grid',
        headStyles: {
          fillColor: [52, 152, 219],
          textColor: 0,
          halign: 'center'
        },
        styles: {
          halign: 'center',
          fontSize: 11,
          cellPadding: 4,
          textColor: [0, 0, 0]  
        },
      });
    
      doc.save(`Inventario.pdf`);
    };    
   

  if (loading) return <p>Cargando reporte de inventario...</p>;
  if (error) return <p>Error: {error}</p>;

  

  return (
    <div className="reporte-inventario-container">
      <h2> Inventario </h2>
      <table className="tabla-inventario">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock Disponible</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map(item => (
            <tr key={item.id}>
              <td>{item.producto.nombre}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table> 
      <div className="sin-filtro">
        <button onClick={generarPdf}> Exportar en PDF</button>
      </div>
    </div>

    
  );
}

export default ReporteInventario;
