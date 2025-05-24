import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Clientes() {
  const { id } = useParams(); // obtiene el id si está en la url
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (id) {
      // Si hay id, pedir detalle del cliente
      fetch(`http://localhost:8000/par2025/clientes/${id}/`)
        .then(res => {
          if (!res.ok) throw new Error('Cliente no encontrado');
          return res.json();
        })
        .then(data => {
          setCliente(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      // Si no hay id, pedir lista completa
      fetch('http://localhost:8000/par2025/clientes/')
        .then(res => res.json())
        .then(data => {
          setClientes(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  if (id) {
    // Mostrar detalle cliente
    return (
      <div>
        <h2>Detalle del Cliente</h2>
        <p><strong>Nombre:</strong> {cliente.nombre}</p>
        <p><strong>Email:</strong> {cliente.email}</p>
        <Link to="/clientes">Volver a la lista</Link>
      </div>
    );
  }

  // Mostrar lista de clientes
  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map(c => (
          <li key={c.id}>
            <Link to={`/clientes/${c.id}`}>{c.nombre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
