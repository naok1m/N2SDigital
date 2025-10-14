// Servicos.jsx
import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // Importe seus ícones aqui
// import { RocketIcon, GlobeIcon, SmartphoneIcon } from './icons'; 

gsap.registerPlugin(ScrollTrigger);

const servicosData = [
  { id: 1, title: 'Landing Pages', description: 'Criamos Landing Pages ultrarrápidas, otimizadas para SEO e focadas em converter visitantes em clientes. Cada detalhe é pensado para maximizar seus resultados.', image: '/path/to/landing-page-image.jpg' },
  { id: 2, title: 'Websites Institucionais', description: 'Desenvolvemos websites completos que representam a identidade da sua marca, com arquitetura robusta, design responsivo e uma experiência de usuário impecável.', image: '/path/to/website-image.jpg' },
  { id: 3, title: 'Cardápios Digitais', description: 'Soluções modernas e interativas para restaurantes e deliverys. Facilite o pedido para seus clientes com um cardápio digital atraente e fácil de usar.', image: '/path/to/menu-image.jpg' },
];

export default function Servicos() {
  const [servicoAtivo, setServicoAtivo] = useState(servicosData[0]); // Começa com o primeiro serviço ativo

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const detailsRef = useRef(null);
  
  // Refs para os elementos dos detalhes que serão animados
  const detailsTitleRef = useRef(null);
  const detailsDescRef = useRef(null);
  const detailsImgRef = useRef(null);

  // ... As animações GSAP virão aqui ...
// Adicione dentro do componente Servicos, antes do return

useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%', // Começa quando 60% da seção está visível
          end: 'bottom 80%',
          toggleActions: 'play none none reverse',
        }
      });
  
      // Animação do título
      tl.from('.servicos-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });
  
      // Animação dos cards em sequência (stagger)
      tl.from('.service-card', {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2 // Atraso de 0.2s entre cada card
      }, '-=0.5'); // Começa 0.5s antes do fim da animação anterior
  
      // Animação inicial do painel de detalhes
      tl.from(detailsRef.current, {
          opacity: 0,
          x: 50,
          duration: 1,
          ease: 'power3.out'
      }, '-=0.8');
  
    }, sectionRef); // Escopo do contexto GSAP
  
    return () => ctx.revert(); // Limpeza
  }, []);
  // Adicione este novo useEffect ao seu componente

useEffect(() => {
    if (!servicoAtivo) return;
  
    // Timeline para animar a transição dos detalhes
    const tl = gsap.timeline();
  
    // 1. Anima a SAÍDA do conteúdo atual
    tl.to([detailsTitleRef.current, detailsDescRef.current, detailsImgRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.in',
    });
  
    // 2. Anima a ENTRADA do novo conteúdo (acontece depois)
    tl.fromTo([detailsImgRef.current, detailsTitleRef.current, detailsDescRef.current],
      { 
        opacity: 0, 
        y: -20 // Começa de cima
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.15, // Stagger na entrada
        ease: 'power2.out',
      }
    );
  
  }, [servicoAtivo]); // Dependência: Roda a animação toda vez que o serviço ativo mudar
  return (
    <section id="services" ref={sectionRef} className="servicos-section relative min-h-screen py-20 px-8 overflow-hidden">
      {/* Background com nébula animada (opcional, via CSS) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#120c1e] to-[#0a0a0f] z-0"></div>
      
      <div className="container mx-auto text-center mb-16">
        <h2 className="servicos-title text-5xl font-black text-white">
          Construindo Experiências Digitais Sob Medida
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
        {/* Grid de Cards */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:w-1/2">
          {servicosData.map((servico) => (
            <div 
              key={servico.id}
              className="service-card p-6 rounded-2xl cursor-pointer"
              onClick={() => setServicoAtivo(servico)}
            >
              <div className="text-purple-400 mb-4">{servico.icon}</div>
              <h3 className="text-2xl font-bold text-white">{servico.title}</h3>
            </div>
          ))}
        </div>

        {/* Painel de Detalhes */}
        <div ref={detailsRef} className="md:w-1/2 p-8 rounded-2xl service-details-panel">
          {servicoAtivo && (
            <>
              <img ref={detailsImgRef} src={servicoAtivo.image} alt={servicoAtivo.title} className="w-full h-64 object-cover rounded-lg mb-6"/>
              <h3 ref={detailsTitleRef} className="text-4xl font-bold text-white mb-4">{servicoAtivo.title}</h3>
              <p ref={detailsDescRef} className="text-lg text-gray-300">{servicoAtivo.description}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}