import React, { useState, useEffect } from 'react';
import GlassButton from './glassButton';

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Primeira seção - Hero com headline centralizada */}
      <section className="hero-section relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
        
        {/* Background profissional com gradiente ultra suave */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(135deg, 
              #0a0a0f 0%, 
              #0b0b12 15%, 
              #0d0d16 25%, 
              #0f0a1a 40%, 
              #120c1e 55%, 
              #150d22 70%, 
              #170e26 85%, 
              #1a0b2e 100%
            )
          `
        }}></div>
        
        {/* Efeito de blur sutil */}
        <div className="absolute inset-0 backdrop-blur-[0.5px]"></div>
        
        {/* Noise texture visível */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("/noise.png")',
          backgroundSize: '256px 256px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}></div>
        
        {/* Overlay sutil para escurecer */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Vignette effect refinado */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30"></div>
        
        {/* Grid pattern muito sutil */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.4) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Conteúdo principal centralizado */}
        <div className={`relative z-10 transition-opacity duration-700 ${show ? "opacity-100 animate-fade-down" : "opacity-0"} text-center px-4`}>
          
          {/* Título principal com gradiente */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
              <span className="bg-gradient-to-r from-[#d8b4fe] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent">
                N2S DIGITAL
              </span>
            </h1>
          </div>

          {/* Descrição */}
          <div className="max-w-5xl mx-auto mb-8">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
              Criamos experiências digitais que conectam, inspiram e geram resultados extraordinários para o seu negócio
            </p>
          </div>

          {/* Botão de ação */}
          <div className="flex justify-center">
            <GlassButton>Comece Sua Jornada</GlassButton>
          </div>
        </div>

        {/* Shape divider curve */}
        <div className="custom-shape-divider-bottom">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Segunda seção - Vídeo demonstrativo */}
      <section className="py-20 bg-[#0a0a0f] relative section-noise-blur">
        <div className="relative w-[95vw] max-w-6xl mx-auto z-10">
          <div className="relative">
            {/* Tablet Frame com design profissional */}
            <div className="bg-black rounded-2xl p-3 shadow-2xl overflow-hidden border border-gray-800">
              {/* Screen */}
              <div className="bg-gray-900 rounded-xl overflow-hidden relative">
                {/* Browser Bar realista */}
                <div className="bg-gray-800 px-6 py-4 flex items-center gap-3 border-b border-gray-700">
                  <div className="flex gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-lg px-4 py-2 ml-6">
                    <div className="text-gray-400 text-sm text-left">n2sdigital.com</div>
                  </div>
                </div>
                
                {/* Video Container - 16:9 Aspect Ratio */}
                <div className="aspect-video bg-gray-900 relative">
                  <video
                    src="/Noxus.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-xl"
                  />

                  {/* Overlay sutil para melhor contraste */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-white text-xl font-semibold bg-black/50 px-4 py-2 rounded">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
