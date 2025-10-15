import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home';
import Services from './pages/Services';
<<<<<<< HEAD
import Contact from './pages/Contact';
=======
>>>>>>> origin/souzadev2

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contato" element={<Contact />} />
        
        {/* Rota para a página Services */}
        <Route path="/services" element={<Services />} />
<<<<<<< HEAD
=======

        {/* Adicione outras rotas aqui no futuro, como "/contato", etc. */}
>>>>>>> origin/souzadev2
      </Routes>
    </Router>
  </StrictMode>,
)