// GenerarFactura.jsx
import React, { useState } from 'react';
import './GenerarFactura.css';  // <-- Importas el CSS aquí

function GenerarFactura({ tipo, id }) {
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const generarFactura = () => {
    setLoading(true);
    setMensaje('');
    setError('');

    const url =
    tipo === 'compra'
        ? `http://localhost:8000/par2025/factura/compra/${id}/`
        : `http://localhost:8000/par2025/factura/venta/${id}/`;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al generar factura');
      return res.json();
    })
    .then(data => {
      setMensaje(data.mensaje || 'Factura generada con éxito');
    })
    .catch(err => {
      setError(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      <button
        onClick={generarFactura}
        disabled={loading}
        className="generar-factura-button"
      >
      {loading ? 'Generando...' : `Generar factura de ${tipo}`}
      </button>
{mensaje && <p className="generar-factura-mensaje-exito">{mensaje}</p>}
{error && <p className="generar-factura-mensaje-error">{error}</p>}
    </div>
  );
}

export default GenerarFactura;
