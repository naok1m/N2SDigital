import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logoN2S.png";

const links = [
  { href: "#hero", label: "Início" },           
  { href: "#servicos", label: "Serviços" }, 
  { href: "#sobre", label: "Sobre" },     
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para lidar com cliques nos links
  const handleLinkClick = (href) => {
    setIsMenuOpen(false); // Fechar menu mobile
    
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
    setIsMenuOpen(false); // Fechar menu mobile
    
    if (location.pathname === '/') {
      // Se estamos na home, vai para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Se estamos em outra página, vai para home
      navigate('/');
    }
  };

  // Fechar menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll quando menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Header Desktop */}
      <header className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-down max-w-3xl px-4 opacity-90">
        <nav className="flex items-center justify-center gap-3
                        bg-gradient-to-r from-[rgba(255,255,255,0.25)] via-[rgba(255,255,255,0.18)] to-[rgba(255,255,255,0.25)]
                        border border-[rgba(255,255,255,0.3)]
                        backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                        rounded-full px-8 py-1.5 relative overflow-hidden
                        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(255,255,255,0.1)] before:to-transparent
                        before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">

          {/* Links da esquerda */}
          {links.slice(0, 2).map(link => (
            <button 
              key={link.href} 
              onClick={() => handleLinkClick(link.href)}
              className="text-white/90 hover:text-white transition-all duration-300 text-base font-medium px-3 py-1 rounded-full hover:bg-white/10 hover:scale-105 cursor-pointer relative z-20"
              style={{ pointerEvents: 'auto' }}
            >
              {link.label}
            </button>
          ))}

          {/* Logo central */}
          <button onClick={handleLogoClick} className="relative z-20" style={{ pointerEvents: 'auto' }}>
            <div className="w-10 h-8 flex items-center justify-center 
                            bg-gradient-to-br from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.15)]
                            border border-[rgba(255,255,255,0.4)] rounded-full
                            backdrop-blur-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]
                            transition-all duration-300 hover:scale-110 cursor-pointer group">
              <img src={logo} alt="Logo N2S Digital" className="w-8 h-8 filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
            </div>
          </button>

          {/* Links da direita */}
          {links.slice(2).map(link => (
            <button 
              key={link.href} 
              onClick={() => handleLinkClick(link.href)}
              className="text-white/90 hover:text-white transition-all duration-300 text-base font-medium px-3 py-1 rounded-full hover:bg-white/10 hover:scale-105 cursor-pointer relative z-20"
              style={{ pointerEvents: 'auto' }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Header Mobile */}
      <header className="md:hidden fixed top-4 left-4 right-4 z-50 animate-fade-down flex items-center justify-between">
        {/* Logo */}
        <button onClick={handleLogoClick} className="transition-all duration-300 hover:scale-110" style={{ pointerEvents: 'auto' }}>
          <img src={logo} alt="Logo N2S Digital" className="w-10 h-10 filter drop-shadow-lg transition-transform duration-300 hover:scale-110" />
        </button>

        {/* Menu hambúrguer */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 flex items-center justify-center
                       bg-gradient-to-br from-[rgba(255,255,255,0.25)] to-[rgba(255,255,255,0.15)]
                       border border-[rgba(255,255,255,0.3)]
                       backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                       rounded-full
                       transition-all duration-300 hover:scale-110 cursor-pointer group
                       relative overflow-hidden
                       before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(255,255,255,0.1)] before:to-transparent
                       before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
          style={{ pointerEvents: 'auto' }}
        >
          <FontAwesomeIcon 
            icon={isMenuOpen ? faTimes : faBars} 
            className="text-white text-xl transition-all duration-300 group-hover:scale-110 relative z-10" 
          />
        </button>

        {/* Menu mobile fullscreen */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm">
            {/* Menu content fullscreen */}
            <div className="fixed inset-0
                            bg-gradient-to-br from-[rgba(255,255,255,0.1)] via-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.1)]
                            backdrop-blur-[25px]
                            animate-slide-down">
              
              {/* Botão fechar */}
              <div className="absolute top-4 right-4 z-50">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-12 h-12 flex items-center justify-center
                             bg-gradient-to-br from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.1)]
                             border border-[rgba(255,255,255,0.3)]
                             backdrop-blur-[15px] shadow-[0_8px_25px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
                             rounded-full
                             transition-all duration-300 hover:scale-110 cursor-pointer group"
                >
                  <FontAwesomeIcon 
                    icon={faTimes} 
                    className="text-white text-xl transition-all duration-300 group-hover:scale-110" 
                  />
                </button>
              </div>

              {/* Logo no menu */}
              <div className="flex justify-center pt-20 mb-12">
                <button onClick={handleLogoClick} className="transition-all duration-300 hover:scale-110">
                  <img src={logo} alt="Logo N2S Digital" className="w-16 h-16 filter drop-shadow-lg transition-transform duration-300 hover:scale-110" />
                </button>
              </div>

              {/* Links do menu */}
              <div className="flex flex-col items-center space-y-6 px-8">
                {links.map((link, index) => (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="w-full max-w-sm text-center px-8 py-5
                               bg-gradient-to-r from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.08)]
                               border border-[rgba(255,255,255,0.2)]
                               backdrop-blur-[15px] rounded-2xl
                               text-white text-xl font-medium
                               transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.2)] hover:to-[rgba(255,255,255,0.12)]
                               hover:shadow-[0_15px_35px_rgba(255,255,255,0.1)]
                               animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 150}ms`
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Footer do menu */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-white/70 text-base">
                  N2S Group - Soluções Digitais
                </p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}