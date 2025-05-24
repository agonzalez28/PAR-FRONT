import './App.css';
import Clientes from './Clientes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="app-container">
      <main className="app-main">
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/:id" element={<Clientes />} />
        </Routes>
      </main>
    </div>
  </Router>
  );
}

export default App;
