import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Clientes.css';

function Clientes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({ nombre: '', correo: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const API_URL = 'http://localhost:8000/par2025/clientes/';

  const obtenerClientes = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setClientes(data);
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
          if (!res.ok) throw new Error('Cliente no encontrado');
          return res.json();
        })
        .then(data => {
          setCliente(data);
          setModoEdicion(true);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      obtenerClientes();
    }
  }, [id]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const method = modoEdicion ? 'PUT' : 'POST';
  const url = modoEdicion ? `${API_URL}${cliente.id}/` : API_URL;

  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  })
    .then(res => res.json())
    .then(() => {
      navigate('/clientes');   // Esto borra el :id de la URL
      obtenerClientes();
      setModoEdicion(false);   // 🔄 Resetear modo edición
      setCliente({ nombre: '', correo: '' }); // Limpiar formulario
    })
    .catch(err => setError(err.message));
};

  const handleDelete = (idCliente) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      fetch(`${API_URL}${idCliente}/`, {
        method: 'DELETE'
      })
        .then(() => obtenerClientes())
        .catch(err => setError(err.message));
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="clientes-container">
      <h2>{modoEdicion ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
      <form onSubmit={handleSubmit} className="cliente-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={cliente.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="correo"
          name="correo"
          placeholder="correo"
          value={cliente.correo}
          onChange={handleChange}
          required
        />
        <button type="submit">{modoEdicion ? 'Actualizar' : 'Crear'}</button>
        {modoEdicion && <button type="button" onClick={() => navigate('/clientes')}>Cancelar</button>}
      </form>

      <h2>Lista de Clientes</h2>
      <ul className="clientes-list">
        {clientes.map(c => (
          <li key={c.id} className="cliente-item">
            <Link to={`/clientes/${c.id}`}>{c.nombre}</Link> - <span className="cliente-email">{c.correo}</span>
            <button onClick={() => navigate(`/clientes/${c.id}`)}>Editar</button>
            <button onClick={() => handleDelete(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
  <button
    className="volver-button"
    style={{ backgroundColor: 'blue', color: 'white', marginTop: '20px' }}
    onClick={() => navigate('/ventas')}
  >
    ← Volver a Ventas
  </button>
    </div>
  );
}

export default Clientes;
