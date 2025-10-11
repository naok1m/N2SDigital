import React, { useState, useEffect } from 'react';
import GlassButton from './glassButton';

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="min-h-screen bg-[#0b0b0f] flex items-center justify-center relative overflow-hidden">
      <div className={`transition-opacity duration-700 ${show ? "opacity-100 animate-fade-down" : "opacity-0"}`}>
        <h1 className="text-5xl font-bold text-white text-center">N2S Digital</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed text-center">
          Transformamos ideias em soluções digitais inovadoras. 
          Criamos experiências que conectam, inspiram e geram resultados.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <GlassButton>Começar Projeto</GlassButton>
        </div>
      </div>
    </section>
  );
}
