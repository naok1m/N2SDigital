import React, { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassButton from './glassButton';
import CustomCursor from './CustomCursor';
import StackCarousel from './StackCarousel';
import Card3D from './Card3D';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHospital, faRocket, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from '../hooks/useDebounce';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [show, setShow] = useState(false);
  
  // Refs para animações GSAP
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const planetaRef = useRef(null);
  const correntesRef = useRef(null);
  const liquidosRef = useRef(null);
  const eclipseRef = useRef(null);
  const curveRef = useRef(null);
  
  // Refs para o tablet (sem animação)
  const tabletRef = useRef(null);
  
  // Refs para a seção de projetos
  const estelaRef = useRef(null);
  const projectsTitleRef = useRef(null);
  const projectsCardsRef = useRef(null);
  const projectsShapeRef = useRef(null);
  const projectsIndicatorsRef = useRef(null);
  
  // Estado para controlar se a animação já foi executada
  const [projectsAnimationPlayed, setProjectsAnimationPlayed] = useState(false);
  
  // Estado para controlar o carousel de projetos
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 5;
  const [carouselCanStart, setCarouselCanStart] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);

  // Funções para controlar pausa do carousel (otimizadas com useCallback)
  const pauseCarousel = useCallback(() => {
    setCarouselPaused(true);
  }, []);

  const resumeCarousel = useCallback(() => {
    setCarouselPaused(false);
  }, []);

  // Função para animação de transição horizontal (otimizada com useCallback)
  const animatePageTransition = useCallback((isManual = false) => {
    if (projectsCardsRef.current) {
      const cardsContainer = projectsCardsRef.current;
      
      // Animação simples de fade otimizada
      gsap.to(cardsContainer, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.fromTo(cardsContainer, 
            {
              opacity: 0
            },
            {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            }
          );
        }
      });
    }
  }, []);

  // Função para mudança manual de página com animação (otimizada)
  const handlePageChange = useCallback((newPage) => {
    if (newPage !== currentPage) {
      // Animação especial para clique manual
      if (projectsIndicatorsRef.current) {
        const indicators = projectsIndicatorsRef.current.children;
        
        // Animação de "bounce" para o indicador clicado
        gsap.to(indicators[newPage], {
          scale: 1.4,
          duration: 0.15,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      }

      // Executa animação de transição
      animatePageTransition(true);
      
      setCurrentPage(newPage);
    }
  }, [currentPage, animatePageTransition]);

  // Funções para navegação com setas (otimizadas)
  const handlePreviousPage = useCallback(() => {
    const newPage = currentPage === 0 ? totalPages - 1 : currentPage - 1;
    handlePageChange(newPage);
  }, [currentPage, handlePageChange]);

  const handleNextPage = useCallback(() => {
    const newPage = (currentPage + 1) % totalPages;
    handlePageChange(newPage);
  }, [currentPage, handlePageChange]);
  
  // Carousel automático - só inicia após animação de entrada (otimizado)
  useEffect(() => {
    if (!carouselCanStart || carouselPaused) return;

    const interval = setInterval(() => {
      // Executa animação de transição antes de mudar a página
      animatePageTransition(false);
      
      // Muda a página após um pequeno delay para sincronizar com a animação
      setTimeout(() => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
      }, 50);
    }, 3000); // Muda a cada 3 segundos

    return () => clearInterval(interval);
  }, [carouselCanStart, carouselPaused, animatePageTransition]);

  // Animação dos indicadores apenas (otimizada)
  useEffect(() => {
    if (projectsIndicatorsRef.current) {
      const indicators = projectsIndicatorsRef.current.children;
      
      // Apenas animação de pulse simples (sem breathing contínuo)
      gsap.to(indicators[currentPage], {
        scale: 1.1,
        duration: 0.15,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }
  }, [currentPage]);

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

    // Animação constante da estela - rotação lenta como o planeta
    if (estelaRef.current) {
      gsap.to(estelaRef.current, {
        rotation: "+=360",
        duration: 120, // 2 minutos para uma rotação completa (mais rápido que o planeta)
        ease: "none",
        repeat: -1
      });
    }


  };

  // Configuração da animação GSAP de scroll do tablet

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    
    // Configurar GSAP para melhor performance
    gsap.set([eclipseRef.current, planetaRef.current, correntesRef.current, liquidosRef.current], {
      force3D: true,
      willChange: "transform, opacity"
    });
    
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
        opacity: 0.7,
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
        opacity: 0.8,
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
        opacity: 0.7,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1.5"
    );

    // Configurar elementos de texto para melhor performance
    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
      force3D: true,
      willChange: "transform, opacity"
    });
    
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
        opacity: 0.9,
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
        opacity: 0.8,
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
        opacity: 0.9,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      }, "-=0.6"
    );


    // Iniciar animações constantes antes das animações de entrada terminarem
    const continuousTimeout = setTimeout(() => {
      startContinuousAnimations();
    }, 0); // Inicia 3s antes da curva terminar (delay 2 + duration 1 = 3s total, então 0s para iniciar junto com as animações de entrada)

    // ScrollTrigger para animações da seção de projetos
    ScrollTrigger.create({
      trigger: ".projects-section",
      start: "top 80%",
      end: "bottom 20%",
      once: true, // Executa apenas uma vez
      onEnter: () => {
        // Verifica se a animação já foi executada
        if (projectsAnimationPlayed) return;
        
        // Marca que a animação foi executada
        setProjectsAnimationPlayed(true);
        
        // Timeline de animações da seção de projetos
        const projectsTl = gsap.timeline();
        
        projectsTl
        // Animação da estela - entrada suave
        .fromTo(estelaRef.current,
          {
            y: -20,
            opacity: 0,
            scale: 0.7
          },
          {
            y: 0,
            opacity: 0.8,
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
          }, "-=0.8"
        )
        // Animação do título dos projetos - entrada de cima
        .fromTo(projectsTitleRef.current,
          {
            y: -50,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: "power2.out"
          }, "-=1.5"
        )
        // Animação dos cards 3D - entrada escalonada
        .fromTo(projectsCardsRef.current,
          {
            y: 80,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out"
          }, "-=2.5"
        )
        // Animação dos indicadores de slider - entrada suave
        .fromTo(projectsIndicatorsRef.current,
          {
            y: 30,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              // Ativa o carousel imediatamente após a animação de entrada terminar
              setCarouselCanStart(true);
            }
          },
        );
      }
    });

    // Scroll-triggered animations para elementos
    gsap.utils.toArray(".animate-on-scroll").forEach((element, index) => {
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
            start: "top 30%",
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
      <section id="hero" className="hero-section relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
        
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
        
        {/* Efeito de blur no background */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        
        {/* Noise texture visível */}
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: 'url("/noise.png")',
          backgroundSize: '256px 256px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}></div>
        
        {/* Overlay sutil para escurecer */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Vignette effect refinado */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/15"></div>
        
        {/* Grid pattern muito sutil */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.6) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Líquidos no background - Layer 1 */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <img 
            ref={liquidosRef}
            src="/liquidos.png" 
            alt="Efeito visual líquido no background" 
            className="w-full h-full object-cover opacity-[0.9] background-image"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{
              filter: 'contrast(1.3) brightness(1.1) blur(3px)',
              mixBlendMode: 'soft-light',
              willChange: 'transform'
            }}
          />
        </div>

        {/* Correntes no background - Layer 2 (reposicionadas à esquerda) */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          <img 
            ref={correntesRef}
            src="/correntes.png" 
            alt="Efeito visual de correntes no background" 
            className="w-full h-full object-cover opacity-[0.95] background-image"
            loading="lazy"
            decoding="async"
            style={{
              filter: 'contrast(1.4) brightness(1.0) blur(3px)',
              mixBlendMode: 'overlay',
              transform: 'translateX(-10%)',
              objectPosition: 'left center',
              willChange: 'transform'
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
              background: `radial-gradient(circle, rgba(196, 181, 253, 0.08) 0%, rgba(168, 85, 247, 0.06) 30%, rgba(139, 92, 246, 0.04) 60%, transparent 100%)`,
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
            alt="Planeta estilizado no background" 
            className="w-[700px] h-[700px] md:w-[900px] md:h-[900px] lg:w-[1100px] lg:h-[1100px] opacity-90 object-contain mix-blend-mode-screen background-image"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{
              filter: 'blur(2px)',
              willChange: 'transform'
            }}
          />
        </div>

        {/* Conteúdo principal centralizado */}
        <div className={`relative z-10 transition-opacity duration-700 ${show ? "opacity-100 animate-fade-down" : "opacity-0"} text-center px-4`}>
          
          {/* Título principal com gradiente */}
          <div className="mb-8">
            <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
              <span className="bg-gradient-to-r from-[#d8b4fe] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent">
                N2S GROUP
              </span>
            </h1>
          </div>

          {/* Descrição */}
          <div className="max-w-5xl mx-auto mb-8">
            <p ref={subtitleRef} className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
            Criamos soluções digitais personalizadas que conectam pessoas, fortalecem marcas e impulsionam o crescimento por meio de estratégias tecnológicas inovadoras.
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
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-[40px] md:h-[50px] lg:h-[60px]">
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Segunda seção - Tablet demonstrativo */}
      <section className="py-20 bg-[#0a0a0f] relative section-noise-blur flex flex-col items-center justify-center min-h-screen">
        
        {/* Faixa superior do carrossel - largura total da tela */}
        <div className="w-full mb-8">
          <StackCarousel position="top" />
        </div>
        
        {/* Container do Tablet */}
        <div className="relative w-full max-w-6xl flex justify-center py-12">
          {/* Eclipse glow esquerdo */}
          <div 
            className="absolute pointer-events-none z-[5]"
            style={{
              background: `radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.12) 30%, rgba(196, 181, 253, 0.08) 60%, transparent 85%)`,
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              filter: 'blur(40px)',
              mixBlendMode: 'screen',
              top: '20%',
              left: '-10%',
              transform: 'translateY(-50%)'
            }}
          />
          
          {/* Eclipse glow direito */}
          <div 
            className="absolute pointer-events-none z-[5]"
            style={{
              background: `radial-gradient(circle, rgba(196, 181, 253, 0.18) 0%, rgba(168, 85, 247, 0.15) 40%, rgba(139, 92, 246, 0.10) 70%, transparent 90%)`,
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              filter: 'blur(35px)',
              mixBlendMode: 'screen',
              top: '70%',
              right: '-5%',
              transform: 'translateY(-50%)'
            }}
          />
          
          <div ref={tabletRef} className="relative w-[95vw] max-w-6xl tablet-container z-10">
            <div className="relative">
              
              {/* Tablet Frame com design profissional */}
              <div className="relative bg-black rounded-2xl p-3 shadow-2xl overflow-hidden border border-gray-800">
                {/* Screen Content */}
                <div className="bg-gray-900 rounded-xl overflow-hidden relative">
                  {/* Browser Bar realista */}
                  <div className="bg-gray-800 px-6 py-4 flex items-center gap-3 border-b border-gray-700">
                    <div className="flex gap-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full shadow-sm"></div>
                      <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-sm"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                    </div>
                    <div className="flex-1 bg-gray-700 rounded-lg px-4 py-2 ml-6">
                      <div className="text-gray-400 text-sm text-left">n2sgroup.com.br</div>
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
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-white text-xl font-semibold bg-black/50 px-4 py-2 rounded">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Faixa inferior do carrossel - largura total da tela */}
        <div className="w-full mt-8">
          <StackCarousel position="bottom" />
        </div>

      </section>

      {/* Terceira seção - Projetos */}
      <section className="projects-section py-20 relative section-noise-blur flex flex-col items-center justify-center min-h-screen">
        
        {/* Background com arco.png e efeitos */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(rgba(10, 10, 15, 0.8), rgba(10, 10, 15, 0.8)),
              url('/arco.png')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(1px) brightness(0.7) contrast(1.1)'
          }}
        />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none" />
        
        {/* Sombra interna para profundidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
        
        {/* Shape divider curve no topo */}
        <div ref={projectsShapeRef} className="absolute top-0 left-0 w-full overflow-hidden leading-none z-[20]" style={{ marginTop: '-1px' }}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[50px] lg:h-[60px]" style={{ width: 'calc(100% + 1.3px)' }}>
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill" fill="#0A0A0F" fillOpacity="1"></path>
          </svg>
        </div>
        
        {/* Pattern.png como camada sobre o background - Layer 1 */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <img 
            src="/pattern.png" 
            alt="Pattern" 
            className="w-full h-full object-cover opacity-[0.4]"
            style={{
              filter: 'blur(1px) brightness(0.7) contrast(1.1)',
              mixBlendMode: 'overlay'
            }}
          />
        </div>

        {/* Iluminacao.mp4 invertida e quase transparente - Layer 2 */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          <video 
            src="/iluminacao.mp4" 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-[0.15]"
            style={{
              filter: 'blur(2px) brightness(0.3) contrast(1.2)',
              mixBlendMode: 'screen'
            }}
          />
        </div>

        
        <div className="max-w-7xl mx-auto w-full text-white text-center flex flex-col items-center justify-center px-8 relative z-10">
          {/* Estela pequena em cima do título */}
          <div className="relative mb-8">
            <img 
              ref={estelaRef}
              src="/estela.png" 
              alt="Estela" 
              className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] opacity-[0.8] object-contain mix-blend-mode-screen"
              style={{
                filter: 'contrast(1.3) brightness(1.1) blur(0.5px)'
              }}
            />
          </div>
          
          <h2 ref={projectsTitleRef} className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#d8b4fe] to-[#a855f7] bg-clip-text text-transparent leading-tight py-4">
            Nossos Projetos
          </h2>
          
          {/* Subtítulo e descrição */}
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Transformamos ideias em soluções digitais inovadoras que impulsionam negócios e conectam pessoas ao futuro da tecnologia.
            </p>
            
          </div>
          
          {/* Setas de navegação */}
          <div className="relative w-full max-w-6xl mx-auto flex items-center">
            {/* Seta esquerda */}
            <button
              onClick={handlePreviousPage}
              onMouseEnter={pauseCarousel}
              onMouseLeave={resumeCarousel}
              className="project-nav-arrow flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center group mr-6"
            >
              <FontAwesomeIcon 
                icon={faChevronLeft} 
                className="text-white text-lg group-hover:text-purple-200 transition-colors duration-300" 
              />
            </button>

            {/* Container dos cards */}
            <div className="flex-1">
              <div ref={projectsCardsRef} className="relative overflow-hidden py-16">
              {/* Página 1 - E-commerce */}
              {currentPage === 0 && (
                <div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center animate-fade-in px-8"
                  onMouseEnter={pauseCarousel}
                  onMouseLeave={resumeCarousel}
                >
                  <Card3D
                    icon={faShoppingCart}
                    title="E-commerce Avançado"
                    description="Plataforma completa de vendas online com microserviços, pagamentos integrados e dashboard administrativo avançado."
                    technologies="React, Node.js, AWS, Stripe"
                    image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="E-Commerce"
                  />
                  <Card3D
                    icon={faShoppingCart}
                    title="Marketplace Digital"
                    description="Plataforma de marketplace com sistema de comissões, gestão de vendedores e pagamentos automatizados."
                    technologies="Next.js, PostgreSQL, Stripe"
                    image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="Marketplace"
                  />
                  <Card3D
                    icon={faShoppingCart}
                    title="Loja Virtual Premium"
                    description="E-commerce de luxo com experiência imersiva, realidade aumentada e personalização avançada."
                    technologies="React, Three.js, AI"
                    image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="Luxury E-commerce"
                  />
                </div>
              )}

              {/* Página 2 - Apps Mobile */}
              {currentPage === 1 && (
                <div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center animate-fade-in px-8"
                  onMouseEnter={pauseCarousel}
                  onMouseLeave={resumeCarousel}
                >
                  <Card3D
                    icon={faHospital}
                    title="App Mobile para Saúde"
                    description="Aplicativo nativo para iOS/Android com integração IoT, telemedicina e monitoramento em tempo real."
                    technologies="React Native, Swift, Kotlin, IoT"
                    image="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="App Mobile"
                  />
                  <Card3D
                    icon={faHospital}
                    title="Telemedicina Avançada"
                    description="Plataforma completa de consultas online com IA para diagnóstico e integração com dispositivos médicos."
                    technologies="Flutter, AI, WebRTC"
                    image="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="Telemedicine"
                  />
                  <Card3D
                    icon={faHospital}
                    title="Monitoramento IoT"
                    description="Sistema de monitoramento de pacientes com dispositivos IoT e alertas em tempo real."
                    technologies="React Native, IoT, Cloud"
                    image="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="IoT Health"
                  />
                </div>
              )}

              {/* Página 3 - Landing Pages */}
              {currentPage === 2 && (
                <div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center animate-fade-in px-8"
                  onMouseEnter={pauseCarousel}
                  onMouseLeave={resumeCarousel}
                >
                  <Card3D
                    icon={faRocket}
                    title="Landing Page Imersiva"
                    description="Design responsivo focado em conversão com animações avançadas e otimização para SEO e performance."
                    technologies="Next.js, GSAP, Tailwind CSS"
                    image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="Landing Page"
                  />
                  <Card3D
                    icon={faRocket}
                    title="SaaS Dashboard"
                    description="Interface moderna para SaaS com métricas em tempo real, gráficos interativos e gestão de usuários."
                    technologies="React, D3.js, Chart.js"
                    image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="SaaS Platform"
                  />
                  <Card3D
                    icon={faRocket}
                    title="Portfolio Criativo"
                    description="Portfolio interativo com animações 3D, galeria dinâmica e integração com redes sociais."
                    technologies="Three.js, GSAP, CMS"
                    image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="Creative Portfolio"
                  />
                </div>
              )}

              {/* Página 4 - Banner */}
              {currentPage === 3 && (
                <div 
                  className="animate-fade-in w-full"
                  onMouseEnter={pauseCarousel}
                  onMouseLeave={resumeCarousel}
                >
                  <a 
                    href="#contact" 
                    className="block cursor-pointer"
                  >
                    <div 
                      className="relative rounded-2xl overflow-hidden w-full border border-white/20 shadow-2xl"
                      style={{
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <img 
                        src="/banner-cta.png" 
                        alt="Banner CTA - Clique para entrar em contato" 
                        className="w-full h-auto object-cover"
                      />
                      {/* Sombra interna para profundidade */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40 pointer-events-none" />
                    </div>
                  </a>
                </div>
              )}

              {/* Página 5 - Design & UX */}
              {currentPage === 4 && (
                <div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center animate-fade-in px-8"
                  onMouseEnter={pauseCarousel}
                  onMouseLeave={resumeCarousel}
                >
                  <Card3D
                    icon={faHospital}
                    title="Design System"
                    description="Sistema de design completo com componentes reutilizáveis, guias de estilo e documentação interativa."
                    technologies="Figma, Storybook, React"
                    image="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="Design System"
                  />
                  <Card3D
                    icon={faRocket}
                    title="UX Research"
                    description="Pesquisa de usuário completa com personas, jornadas e insights que direcionam decisões de produto."
                    technologies="Figma, Miro, Analytics"
                    image="https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="UX Research"
                  />
                  <Card3D
                    icon={faShoppingCart}
                    title="Prototipagem"
                    description="Protótipos interativos de alta fidelidade que validam conceitos antes do desenvolvimento."
                    technologies="Figma, Principle, Framer"
                    image="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    tag="Prototipagem"
                  />
                </div>
              )}
            </div>
          
            {/* Indicadores de slider */}
            <div ref={projectsIndicatorsRef} className="mt-12 flex justify-center gap-3 items-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`transition-all duration-500 ease-out rounded-full cursor-pointer relative ${
                    currentPage === index
                      ? 'w-5 h-2 bg-gradient-to-r from-[#d8b4fe] to-[#a855f7] shadow-lg shadow-purple-500/50'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Seta direita */}
          <button
            onClick={handleNextPage}
            onMouseEnter={pauseCarousel}
            onMouseLeave={resumeCarousel}
            className="project-nav-arrow flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center group ml-6"
          >
            <FontAwesomeIcon 
              icon={faChevronRight} 
              className="text-white text-lg group-hover:text-purple-200 transition-colors duration-300" 
            />
          </button>
        </div>
      </div>
      </section>

    </>
  );
}


