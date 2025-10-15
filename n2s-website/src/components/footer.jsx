import React from 'react';
import logo from '../assets/logoN2S.png';

export default function Footer() {
  return (
    <footer className="flex py-2 mt-30" style={{ background: 'transparent' }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top section: Logo e redes sociais */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="N2S Digital" className="w-12 h-12 sm:w-14 sm:h-14 filter drop-shadow-lg" />
            <span className="text-white font-semibold text-sm sm:text-base">N2S Digital</span>
          </div>

          {/* Redes sociais minimalistas */}
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-700/30 hover:border-purple-500/50 hover:bg-purple-600/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
              <span className="text-gray-400 group-hover:text-purple-400 transition-colors text-base">📧</span>
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-700/30 hover:border-purple-500/50 hover:bg-purple-600/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
              <span className="text-gray-400 group-hover:text-purple-400 transition-colors text-base">💼</span>
            </a>
            <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-700/30 hover:border-purple-500/50 hover:bg-purple-600/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
              <span className="text-gray-400 group-hover:text-purple-400 transition-colors text-base">📷</span>
            </a>
          </div>
        </div>

        {/* Divider sutil */}
        <div className="border-t border-gray-700/20 mb-4"></div>

        {/* Bottom section: Copyright + links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-xs sm:text-sm">
          <p>© 2025 N2S Digital. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
