import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './components/contact';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contato" element={<Contact />} />
        
        {/* Rota para a página Services */}
        <Route path="/services" element={<Services />} />

        {/* Adicione outras rotas aqui no futuro, como "/contato", etc. */}
      </Routes>
    </Router>
  </StrictMode>,
) 