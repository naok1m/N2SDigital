import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Analytics from './components/Analytics';

// Import pages
import Home from './pages/Home';
import Services from './pages/Services';

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
    <Analytics />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        {/* Add 404 redirect */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);