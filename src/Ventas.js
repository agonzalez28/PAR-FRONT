import React, { useState, useEffect } from 'react';
import './Ventas.css';

const Ventas = () => {
  const [fecha, setFecha] = useState('');
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [idProducto, setIdProducto] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/par2025/productos/')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));

    fetch('http://localhost:8000/par2025/clientes/')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error('Error al cargar clientes:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaVenta = {
      fecha,
      producto_id: idProducto,
      cliente_id: idCliente,
      cantidad: parseInt(cantidad),
    };

    fetch('http://localhost:8000/par2025/ventas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaVenta),
    })
.then(response => {
  if (response.ok) {
    setMensajeExito('✅ Venta registrada correctamente.');
    setFecha('');
    setIdProducto('');
    setIdCliente('');
    setCantidad(1);
  } else {
    return response.json().then(data => {
      if (data.error) {
        setMensajeExito(`❌ ${data.error}`);
      } else {
        setMensajeExito('❌ Error al registrar la venta.');
      }
    });
  }
})
      .catch(() => setMensajeExito('❌ Error de conexión.'));
  };

  const redirigirAClientes = () => {
    window.location.href = 'http://localhost:3000/clientes';
  };

  return (
    <div className="ventas-container">
      <h2>Registrar Nueva Venta</h2>

      <form onSubmit={handleSubmit} className="ventas-form">
        <label>
          Fecha:
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        </label>

        <label>
          Producto:
          <select value={idProducto} onChange={(e) => setIdProducto(e.target.value)} required>
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cliente:
          <select value={idCliente} onChange={(e) => setIdCliente(e.target.value)} required>
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cantidad:
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </label>

        <button type="submit">Guardar Venta</button>
      </form>

      <div className="botones-agregar">
        <button onClick={redirigirAClientes}>➕ Agregar Cliente</button>
      </div>

      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
    </div>
  );
};

export default Ventas;
