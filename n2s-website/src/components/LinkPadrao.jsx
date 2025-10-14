// components/LinkPadrao.jsx
import React from "react";
import { Link } from 'react-router-dom'; // 1. Importe o Link do react-router-dom

export default function LinkPadrao({ href, children }) {
  return (
    // 2. Substitua a tag <a> pelo componente <Link>
    // 3. A prop 'href' que você recebe agora é passada para a prop 'to' do Link
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