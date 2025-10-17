// components/LinkPadrao.jsx
import React from "react";
import { Link, useLocation } from 'react-router-dom';

export default function LinkPadrao({ href, children }) {
  const location = useLocation();

  // Função para scroll para seções
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Scroll normal com offset para header fixo
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 80; // 80px de offset para header fixo
      
      window.scrollTo(0, offsetPosition);
    }
  };

  // Se é um link para seção (começa com #)
  if (href.startsWith('#')) {
    const sectionId = href.substring(1); // Remove o #
    
    return (
      <button
        onClick={() => scrollToSection(sectionId)}
        className="text-white/80 hover:text-white font-medium
        transition-all duration-300 transform hover:scale-105 relative z-10 
        px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-[rgba(255,255,255,0.1)] 
        text-sm md:text-base cursor-pointer"
      >
        {children}
      </button>
    );
  }

  // Se é um link para página (começa com /)
  return (
    <Link
      to={href} 
      className="text-white/80 hover:text-white font-medium
      transition-all duration-300 transform hover:scale-105 relative z-10 
      px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-[rgba(255,255,255,0.1)] 
      text-sm md:text-base"
    >
      {children}
    </Link>
  );
}