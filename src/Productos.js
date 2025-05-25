// Productos.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Productos.css';

function Productos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    nombre: '',
    precio_compra: '',
    precio_venta: '',
    descripcion: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const API_URL = 'http://localhost:8000/par2025/productos/';

  const obtenerProductos = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (id) {
      fetch(`${API_URL}${id}/`)
        .then(res => {
          if (!res.ok) throw new Error('Producto no encontrado');
          return res.json();
        })
        .then(data => {
          setProducto({
            nombre: data.nombre,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            descripcion: data.descripcion
          });
          setModoEdicion(true);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      obtenerProductos();
    }
  }, [id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = modoEdicion ? 'PUT' : 'POST';
    const url = modoEdicion ? `${API_URL}${id}/` : API_URL;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    })
      .then(res => res.json())
      .then(() => {
        navigate('/productos');
        obtenerProductos();
      })
      .catch(err => setError(err.message));
  };

  const handleDelete = (idProducto) => {
    if (window.confirm('¿Deseas eliminar este producto?')) {
      fetch(`${API_URL}${idProducto}/`, {
        method: 'DELETE'
      })
        .then(() => obtenerProductos())
        .catch(err => setError(err.message));
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="productos-container">
      <h2>{modoEdicion ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit} className="producto-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio_compra"
          placeholder="Precio Compra"
          value={producto.precio_compra}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
        <input
          type="number"
          name="precio_venta"
          placeholder="Precio Venta"
          value={producto.precio_venta}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />
        <button type="submit">{modoEdicion ? 'Actualizar' : 'Crear'}</button>
        {modoEdicion && (
          <button type="button" onClick={() => navigate('/productos')}>
            Cancelar
          </button>
        )}
      </form>

      <h2>Lista de Productos</h2>
      <ul className="productos-list">
        {productos.map(p => (
          <li key={p.id} className="producto-item">
            <div>
              <Link to={`/productos/${p.id}`}>{p.nombre}</Link> - 
              <span className="producto-precio-compra">Compra: ${p.precio_compra}</span> - 
              <span className="producto-precio-venta">Venta: ${p.precio_venta}</span> - 
              <span className="producto-descripcion">{p.descripcion}</span>
            </div>
            <div>
              <button onClick={() => navigate(`/productos/${p.id}`)}>Editar</button>
              <button onClick={() => handleDelete(p.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Botón para volver a compras */}
      <button className="volver-button" onClick={() => navigate('/compras')}>
        ← Volver a Compras
      </button>
    </div>
  );
}

export default Productos;
