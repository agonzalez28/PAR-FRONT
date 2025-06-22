// App.js
import './App.css';
import Clientes from './Clientes';
import Proveedores from './Proveedores'; 
import Compras from './Compras';
import Ventas from './Ventas';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Productos from './Productos';
import ReporteInventario from './ReporteInventario';
import ReporteMovimientos from './ReporteMovimientos';
import Inicio from './Inicio'; // ✅ Usamos el nuevo componente renombrado
import ReporteProductosMasVendidos from './ReporteProductosMasVendidos';
import ReporteTopClientes from './ReporteTopClientes';
import ReporteTopProveedores from './ReporteTopProveedores';
import ReporteUtilidades from './ReporteUtilidades';


function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/:id" element={<Clientes />} />
            <Route path="/proveedores" element={<Proveedores />} /> 
            <Route path="/proveedores/:id" element={<Proveedores />} /> 
            <Route path="/compras" element={<Compras />} />        
            <Route path="/productos" element={<Productos />} />       
            <Route path="/productos/:id" element={<Productos />} />   
            <Route path="/ventas" element={<Ventas />} />              
            <Route path="/reporte-inventario" element={<ReporteInventario />} />
            <Route path="/reporte-movimientos" element={<ReporteMovimientos />} />
            <Route path="/reporte-productos-vendidos" element={<ReporteProductosMasVendidos />} />    
            <Route path="/reporte-top-clientes" element={<ReporteTopClientes />} />   
            <Route path="/reporte-top-proveedores" element={<ReporteTopProveedores />} /> 
            <Route path="/reporte-utilidades" element={<ReporteUtilidades />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
