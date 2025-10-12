import React, { useState, useEffect } from 'react';
import GlassButton from './glassButton';

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0b0b0f] via-[#1a0b2e] to-[#2d1b69] flex justify-center relative overflow-hidden">
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
    </section>
  );
}
