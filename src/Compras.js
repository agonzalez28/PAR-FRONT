import React, { useState, useEffect } from 'react';
import './compras.css';

const Compras = () => {
  const [fecha, setFecha] = useState('');
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [idProducto, setIdProducto] = useState('');
  const [idProveedor, setIdProveedor] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/productos/')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar productos:', error));

    fetch('http://localhost:8000/api/proveedores/')
      .then(response => response.json())
      .then(data => setProveedores(data))
      .catch(error => console.error('Error al cargar proveedores:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaCompra = {
      fecha,
      id_producto: idProducto,
      id_proveedor: idProveedor,
    };

    console.log('Compra a enviar:', nuevaCompra);
    // Aquí se puede enviar la compra con fetch si ya está la API funcionando
  };

  return (
    <div className="compras-container">
      <h2>Registrar Nueva Compra</h2>
      <form onSubmit={handleSubmit} className="formulario-compras">
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

        <button type="submit">Guardar Compra</button>
      </form>
    </div>
  );
};

export default Compras;
