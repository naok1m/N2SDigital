import React from 'react';
import logo from '../assets/logoN2S.png';
const Header = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-start justify-center pt-10 " >
  <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-down">
    <nav className="flex items-center gap-6 
                    bg-gradient-to-r from-[rgba(255,255,255,0.12)] via-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.12)]
                    border border-[rgba(255,255,255,0.15)] 
                    backdrop-blur-[20px] 
                    shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                    rounded-full px-6 py-2
                    relative overflow-hidden
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(255,255,255,0.1)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
      
      <a href="#inicio" className="text-gray-100 font-medium hover:text-white transition-all duration-300 hover-scale relative z-10 px-2 py-1 rounded-full hover:bg-[rgba(255,255,255,0.1)] text-sm">Início</a>
      <a href="#servicos" className="text-gray-100 font-medium hover:text-white transition-all duration-300 hover-scale relative z-10 px-2 py-1 rounded-full hover:bg-[rgba(255,255,255,0.1)] text-sm">Serviços</a>
      
      <div className="w-10 h-10 flex items-center justify-center 
                      bg-gradient-to-br from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.05)]
                      border border-[rgba(255,255,255,0.2)] 
                      rounded-full 
                      backdrop-blur-[15px] 
                      shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]
                      relative z-10
                      hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]
                      transition-all duration-300
                      hover:scale-105">
        <img src={logo} alt="Logo" className="w-6 h-6 filter drop-shadow-sm" />
      </div>

      <a href="#sobre" className="text-gray-100 font-medium hover:text-white transition-all duration-300 hover-scale relative z-10 px-2 py-1 rounded-full hover:bg-[rgba(255,255,255,0.1)] text-sm">Sobre</a>
      <a href="#contato" className="text-gray-100 font-medium hover:text-white transition-all duration-300 hover-scale relative z-10 px-2 py-1 rounded-full hover:bg-[rgba(255,255,255,0.1)] text-sm">Contato</a>
    </nav>
  </header>
</div>

  );
};

export default Header;
