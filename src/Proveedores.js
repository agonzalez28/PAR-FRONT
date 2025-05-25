// proveedores.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Proveedores.css';

function Proveedores() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proveedores, setProveedores] = useState([]);
  const [proveedor, setProveedor] = useState({ nombre: '', correo: '', telefono: '' }); // 📌 AÑADIDO telefono
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const API_URL = 'http://localhost:8000/par2025/proveedores/';

  const obtenerProveedores = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProveedores(data);
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
          if (!res.ok) throw new Error('Proveedor no encontrado');
          return res.json();
        })
        .then(data => {
          setProveedor(data);
          setModoEdicion(true);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      obtenerProveedores();
    }
  }, [id]);

  const handleChange = (e) => {
    setProveedor({ ...proveedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = modoEdicion ? 'PUT' : 'POST';
    const url = modoEdicion ? `${API_URL}${id}/` : API_URL;

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(proveedor)
    })
      .then(res => res.json())
      .then(() => {
        navigate('/proveedores');
        obtenerProveedores();
      })
      .catch(err => setError(err.message));
  };

  const handleDelete = (idProveedor) => {
    if (window.confirm('¿Deseas eliminar este proveedor?')) {
      fetch(`${API_URL}${idProveedor}/`, {
        method: 'DELETE'
      })
        .then(() => obtenerProveedores())
        .catch(err => setError(err.message));
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="proveedores-container">
      <h2>{modoEdicion ? 'Editar Proveedor' : 'Agregar Proveedor'}</h2>
      <form onSubmit={handleSubmit} className="proveedor-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={proveedor.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={proveedor.correo}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={proveedor.telefono}
          onChange={handleChange}
          required
        />
        <button type="submit">{modoEdicion ? 'Actualizar' : 'Crear'}</button>
        {modoEdicion && <button type="button" onClick={() => navigate('/proveedores')}>Cancelar</button>}
      </form>

      <h2>Lista de Proveedores</h2>
      <ul className="proveedores-list">
        {proveedores.map(p => (
          <li key={p.id} className="proveedor-item">
            <div>
              <Link to={`/proveedores/${p.id}`}>{p.nombre}</Link> - <span className="proveedor-email">{p.correo}</span> - <span className="proveedor-telefono">{p.telefono}</span>
            </div>
            <div>
              <button onClick={() => navigate(`/proveedores/${p.id}`)}>Editar</button>
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

export default Proveedores;
