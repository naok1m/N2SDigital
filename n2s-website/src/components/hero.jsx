import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassButton from './glassButton';
import CustomCursor from './CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [show, setShow] = useState(false);
  
  // Refs para animações GSAP
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const planetaRef = useRef(null);
  const correntesRef = useRef(null);
  const liquidosRef = useRef(null);
  const eclipseRef = useRef(null);
  const curveRef = useRef(null);

  // Função para iniciar animações constantes
  const startContinuousAnimations = () => {
    // Animação constante do planeta - rotação muito lenta
    gsap.to(planetaRef.current, {
      rotation: "+=360",
      duration: 180, // 3 minutos para uma rotação completa
      ease: "none",
      repeat: -1
    });

    // Animação constante das correntes - movimento horizontal suave
    gsap.to(correntesRef.current, {
      x: "+=30",
      duration: 8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });

    // Animação constante dos líquidos - movimento vertical suave
    gsap.to(liquidosRef.current, {
      y: "+=20",
      duration: 6,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });

    // Animação constante do eclipse - pulso suave
    gsap.to(eclipseRef.current, {
      scale: 1.1,
      duration: 8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    
    // Timeline principal para animações de entrada
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animação do eclipse primeiro (atrás do planeta)
    tl.fromTo(eclipseRef.current,
      {
        scale: 0.3,
        opacity: 0,
        y: 50
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: "power2.out"
      }
    )
    // Animação do background (planeta, correntes, líquidos)
    .fromTo(planetaRef.current, 
      { 
        scale: 0.5, 
        rotation: 0, 
        opacity: 0,
        y: 100
      },
      { 
        scale: 1, 
        rotation: 0, 
        opacity: 0.3,
        y: 0,
        duration: 2,
        ease: "power3.out"
      }, "-=1.5"
    )
    .fromTo(correntesRef.current,
      {
        x: -200,
        opacity: 0,
        scale: 1.2
      },
      {
        x: 0,
        opacity: 0.4,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1.5"
    )
    .fromTo(liquidosRef.current,
      {
        x: 200,
        opacity: 0,
        scale: 0.8
      },
      {
        x: 0,
        opacity: 0.3,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1.5"
    );

    // Animação dos elementos de texto
    const textTl = gsap.timeline({ delay: 1 });
    
    textTl.fromTo(titleRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.8,
        rotationX: 90
      },
      {
        y: 0,
        opacity: 0.5,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      }
    )
    .fromTo(subtitleRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 0.4,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8"
    )
    .fromTo(buttonRef.current,
      {
        y: 30,
        opacity: 0,
        scale: 0.8,
        rotation: -5
      },
      {
        y: 0,
        opacity: 0.5,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      }, "-=0.6"
    );

    // Animação da curva
    gsap.fromTo(curveRef.current,
      {
        y: 100,
        opacity: 0,
        scaleY: 0
      },
      {
        y: 0,
        opacity: 1,
        scaleY: 1,
        duration: 1,
        ease: "power2.out",
        delay: 2
      }
    );

    // Iniciar animações constantes antes das animações de entrada terminarem
    const continuousTimeout = setTimeout(() => {
      startContinuousAnimations();
    }, 0); // Inicia 3s antes da curva terminar (delay 2 + duration 1 = 3s total, então 0s para iniciar junto com as animações de entrada)

    // Scroll-triggered animations para elementos
    gsap.utils.toArray(".animate-on-scroll").forEach((element) => {
      gsap.fromTo(element,
        {
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false
          }
        }
      );
    });

    return () => {
      clearTimeout(timeout);
      clearTimeout(continuousTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Cursor customizado */}
      <CustomCursor />
      
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

        {/* Líquidos no background - Layer 1 */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <img 
            ref={liquidosRef}
            src="/liquidos.png" 
            alt="Líquidos" 
            className="w-full h-full object-cover opacity-[0.3] background-image"
            style={{
              filter: 'contrast(1.1) brightness(0.9)',
              mixBlendMode: 'soft-light'
            }}
          />
        </div>

        {/* Correntes no background - Layer 2 (reposicionadas à esquerda) */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          <img 
            ref={correntesRef}
            src="/correntes.png" 
            alt="Correntes" 
            className="w-full h-full object-cover opacity-[0.4] background-image"
            style={{
              filter: 'contrast(1.2) brightness(0.8)',
              mixBlendMode: 'overlay',
              transform: 'translateX(-10%)',
              objectPosition: 'left center'
            }}
          />
        </div>

        {/* Eclipse de iluminação atrás do planeta - Layer 3 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]">
          {/* Eclipse de iluminação atrás do planeta */}
          <div 
            ref={eclipseRef}
            className="absolute pointer-events-none eclipse-glow"
            style={{
              background: `radial-gradient(circle, rgba(196, 181, 253, 0.04) 0%, rgba(168, 85, 247, 0.03) 30%, rgba(139, 92, 246, 0.02) 60%, transparent 100%)`,
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              filter: 'blur(25px)',
              mixBlendMode: 'screen',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>

        {/* Planeta no background - Layer 4 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[4]">
          <img 
            ref={planetaRef}
            src="/planeta.png" 
            alt="Planeta" 
            className="w-[700px] h-[700px] md:w-[900px] md:h-[900px] lg:w-[1100px] lg:h-[1100px] opacity-30 object-contain mix-blend-mode-screen background-image"
          />
        </div>

        {/* Conteúdo principal centralizado */}
        <div className={`relative z-10 transition-opacity duration-700 ${show ? "opacity-100 animate-fade-down" : "opacity-0"} text-center px-4`}>
          
          {/* Título principal com gradiente */}
          <div className="mb-8">
            <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
              <span className="bg-gradient-to-r from-[#d8b4fe] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent">
                N2S DIGITAL
              </span>
            </h1>
          </div>

          {/* Descrição */}
          <div className="max-w-5xl mx-auto mb-8">
            <p ref={subtitleRef} className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
              Criamos experiências digitais que conectam, inspiram e geram resultados extraordinários para o seu negócio
            </p>
          </div>

          {/* Botão de ação */}
          <div className="flex justify-center">
            <div ref={buttonRef} className="interactive-element">
              <GlassButton>Comece Sua Jornada</GlassButton>
            </div>
          </div>
      </div>

        {/* Shape divider curve */}
        <div ref={curveRef} className="custom-shape-divider-bottom relative z-[5]">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Segunda seção - Vídeo demonstrativo */}
      <section id="video-section" className="py-20 bg-[#0a0a0f] relative section-noise-blur">
        <div className="relative w-[95vw] max-w-6xl mx-auto z-10 animate-on-scroll">
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
      <section className="bg-gray-900 text-white flex flex-col items-center justify-center py-20 overflow-hidden">

      <div className="overflow-hidden w-full max-w-6xl">
        <div className="flex animate-scroll">
          {/* Primeiro grupo */}
          <div className="flex gap-16 px-8">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-16 h-16" alt="HTML" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-16 h-16" alt="CSS" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-16 h-16" alt="JavaScript" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-16 h-16" alt="Node.js" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-16 h-16" alt="React" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-16 h-16" alt="Python" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" className="w-16 h-16" alt="PHP" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className="w-16 h-16" alt="MySQL" />
          </div>

          {/* Segundo grupo (pra fazer o loop contínuo) */}
          <div className="flex gap-16 px-8">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-16 h-16" alt="HTML" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-16 h-16" alt="CSS" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-16 h-16" alt="JavaScript" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-16 h-16" alt="Node.js" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-16 h-16" alt="React" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-16 h-16" alt="Python" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" className="w-16 h-16" alt="PHP" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className="w-16 h-16" alt="MySQL" />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
