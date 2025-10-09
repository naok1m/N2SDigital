import React from 'react';

const Header = () => {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/10 py-4 fixed w-full top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-center gap-12">
        <a href="#inicio" className="text-gray-800 font-medium text-base hover:text-gray-600 transition-colors">
          Início
        </a>
        <a href="#servicos" className="text-gray-800 font-medium text-base hover:text-gray-600 transition-colors">
          Serviços
        </a>

        <div className="text-xl font-bold px-8">
          {/* Coloque aqui o nome ou logo */}
          N2S
        </div>

        <a href="#sobre" className="text-gray-800 font-medium text-base hover:text-gray-600 transition-colors">
          Sobre
        </a>
        <a href="#contato" className="text-gray-800 font-medium text-base hover:text-gray-600 transition-colors">
          Contato
        </a>
      </nav>
    </header>
  );
};

export default Header;
