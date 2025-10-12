import React, { useState, useEffect } from 'react';
import GlassButton from './glassButton';

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#0b0b0f] via-[#1a0b2e] to-[#2d1b69] flex flex-col items-center relative overflow-visible">
      
      {/* Conteúdo principal */}
      <div className={`transition-opacity duration-700 ${show ? "opacity-100 animate-fade-down" : "opacity-0"}`} style={{ marginTop: '200px' }}>
        <h1 className="text-7xl font-bold text-white text-center p-2">N2S Digital</h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed text-center">
          Transformamos ideias em soluções digitais inovadoras. 
          Criamos experiências que conectam, inspiram e geram resultados.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <GlassButton>Comece Agora</GlassButton>
        </div>
      </div>

      {/* Espaço entre conteúdo e mockup */}
      <div className="h-45"></div>

      {/* Tablet/Browser Mockup */}
      <div className="relative w-[90vw] max-w-6xl mb-20">
        <div className="relative">
          {/* Tablet Frame */}
          <div className="bg-black rounded-2xl p-3 shadow-2xl overflow-hidden">
            {/* Screen */}
            <div className="bg-gray-900 rounded-xl overflow-hidden relative">
              {/* Browser Bar */}
              <div className="bg-gray-800 px-6 py-4 flex items-center gap-3 border-b border-gray-700">
                <div className="flex gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-gray-700 rounded-lg px-4 py-2 ml-6">
                  <div className="text-gray-400 text-sm">n2sdigital.com</div>
                </div>
              </div>
              
              {/* Video Container - 16:9 Aspect Ratio */}
              <div className="aspect-video bg-gray-900 relative">
                <video
                  src="/Noxus.mp4"
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover rounded-xl"
                />

                {/* Overlay opcional */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-white text-xl font-semibold bg-black/50 px-4 py-2 rounded">
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10 scale-110"></div>
        </div>
      </div>

    </section>
  );
}
