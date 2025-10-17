<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
=======
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Analytics from './components/Analytics';

// Import pages
>>>>>>> a28db1b7ad5a39add824902dd69db824ba305994
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './components/contact';

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration.scope);
      })
      .catch((error) => {
        console.log('Falha ao registrar Service Worker:', error);
      });
  });
}

// Performance monitoring
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contato" element={<Contact />} />
        
        {/* Rota para a página Services */}
=======
    <Analytics />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
>>>>>>> a28db1b7ad5a39add824902dd69db824ba305994
        <Route path="/services" element={<Services />} />
        {/* Add 404 redirect */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  </StrictMode>,
) 