// Em main.jsx ou index.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importe o BrowserRouter
import './index.css';

// Importe suas páginas
import Home from './pages/Home';
import Services from './pages/Services';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* PASSO 1: Envolva tudo com BrowserRouter */}
      <Routes>
        {/* PASSO 2: Defina a rota da Home para o caminho "/" */}
        <Route path="/" element={<Home />} />
        
        {/* Rota para a página Services */}
        <Route path="/services" element={<Services />} />

        {/* Adicione outras rotas aqui no futuro, como "/contato", etc. */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);