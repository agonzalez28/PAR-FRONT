import React, { useState, useEffect } from 'react';
import './Compras.css';

const Compras = () => {
  const [fecha, setFecha] = useState('');
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [idProducto, setIdProducto] = useState('');
  const [idProveedor, setIdProveedor] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/par2025/productos/')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar productos:', error));

    fetch('http://localhost:8000/par2025/proveedores/')
      .then(response => response.json())
      .then(data => setProveedores(data))
      .catch(error => console.error('Error al cargar proveedores:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaCompra = {
      fecha,
      producto: idProducto,
      proveedor: idProveedor,
      cantidad: parseInt(cantidad),
    };

    fetch('http://localhost:8000/par2025/compras/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaCompra),
    })
      .then(response => {
        if (response.ok) {
          setMensajeExito('✅ Compra registrada correctamente.');
          setFecha('');
          setIdProducto('');
          setIdProveedor('');
          setCantidad(1);
        } else {
          return response.json().then(() => {
            setMensajeExito('❌ Error al registrar la compra.');
          });
        }
      })
      .catch(() => setMensajeExito('❌ Error de conexión.'));
  };

  const redirigirAProductos = () => {
    window.location.href = 'http://localhost:3000/productos';
  };

  const redirigirAProveedores = () => {
    window.location.href = 'http://localhost:3000/proveedores';  };

  return (
    <div className="compras-container">
      <h2>Registrar Nueva Compra</h2>

      <form onSubmit={handleSubmit} className="compras-form">
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
          Proveedor:
          <select value={idProveedor} onChange={(e) => setIdProveedor(e.target.value)} required>
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
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

        <button type="submit">Guardar Compra</button>
      </form>

      <div className="botones-agregar">
        <button onClick={redirigirAProductos}>➕ Agregar Producto</button>
        <button onClick={redirigirAProveedores}>➕ Agregar Proveedor</button>
      </div>

      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
    </div>
  );
};

export default Compras;
