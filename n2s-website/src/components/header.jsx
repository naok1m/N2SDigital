import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoN2S.png";
import LinkPadrao from "./LinkPadrao";

const linksEsquerda = [
  { href: "#hero", label: "Início" },           
  { href: "#servicos", label: "Serviços" }, 
];

const linksDireita = [
  { href: "#sobre", label: "Sobre" },     
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Função para lidar com cliques nos links
  const handleLinkClick = (href) => {
    console.log('Link clicado:', href, 'Página atual:', location.pathname);
    
    // Se estamos na página inicial, apenas faz scroll para a seção
    if (location.pathname === '/') {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - 80; // Offset para o header fixo
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Se estamos em outra página, redireciona para home com hash
      navigate(`/${href}`);
    }
  };

  // Função para lidar com clique na logo
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      // Se estamos na home, vai para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Se estamos em outra página, vai para home
      navigate('/');
    }
  };

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-down max-w-3xl px-2 md:px-4 opacity-90">
      <nav className="flex items-center justify-center gap-2 md:gap-3
                      bg-gradient-to-r from-[rgba(255,255,255,0.25)] via-[rgba(255,255,255,0.18)] to-[rgba(255,255,255,0.25)]
                      border border-[rgba(255,255,255,0.3)]
                      backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                      rounded-full px-3 md:px-8 py-1.5 relative overflow-hidden
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(255,255,255,0.1)] before:to-transparent
                      before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">

        {/* Links da esquerda */}
        {linksEsquerda.map(link => (
          <button 
            key={link.href} 
            onClick={() => handleLinkClick(link.href)}
            className="text-white/90 hover:text-white transition-all duration-300 text-sm md:text-base font-medium px-2 md:px-3 py-1 rounded-full hover:bg-white/10 hover:scale-105 cursor-pointer relative z-20"
            style={{ pointerEvents: 'auto' }}
          >
            {link.label}
          </button>
        ))}

        {/* Logo central */}
        <button onClick={handleLogoClick} className="relative z-20" style={{ pointerEvents: 'auto' }}>
          <div className="w-8 md:w-10 h-6 md:h-8 flex items-center justify-center 
                          bg-gradient-to-br from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.15)]
                          border border-[rgba(255,255,255,0.4)] rounded-full
                          backdrop-blur-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]
                          transition-all duration-300 hover:scale-110 cursor-pointer group">
            <img src={logo} alt="Logo N2S Digital" className="w-5 h-5 md:w-8 md:h-8 filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
          </div>
        </button>

        {/* Links da direita */}
        {linksDireita.map(link => (
          <button 
            key={link.href} 
            onClick={() => handleLinkClick(link.href)}
            className="text-white/90 hover:text-white transition-all duration-300 text-sm md:text-base font-medium px-2 md:px-3 py-1 rounded-full hover:bg-white/10 hover:scale-105 cursor-pointer relative z-20"
            style={{ pointerEvents: 'auto' }}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}