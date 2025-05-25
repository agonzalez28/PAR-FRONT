import './App.css';
import Clientes from './Clientes';
import Proveedores from './Proveedores'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="app-container">
      <main className="app-main">
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/:id" element={<Clientes />} />
          <Route path="/proveedores" element={<Proveedores />} /> 
          <Route path="/proveedores/:id" element={<Proveedores />} /> 
        </Routes>
      </main>
    </div>
  </Router>
  );
}

export default App;
