  import './App.css';
  import Clientes from './Clientes';
  import Proveedores from './Proveedores'; 
  import Compras from './Compras';
  import Ventas from './Ventas';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Productos from './Productos';
  import ReporteInventario from './ReporteInventario';

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
            <Route path="/compras" element={<Compras />} />        
            <Route path="/productos" element={<Productos />} />       
            <Route path="/productos/:id" element={<Productos />} />   
            <Route path="/ventas" element={<Ventas />} />              
            <Route path="/reporte-inventario" element={<ReporteInventario />} />

          </Routes>
        </main>
      </div>
    </Router>
    );
  }

  export default App;
