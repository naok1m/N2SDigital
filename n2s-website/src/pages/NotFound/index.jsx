import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faArrowRotateLeft,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import GlassButton from '../../components/glassButton';
import SEOHead from '../../components/SEOHead';

export default function NotFound() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  
  // Refs para animações
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const liquidGlobeRef = useRef(null);
  const liquidVerticalRef = useRef(null);
  const eclipseRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!show) return;

    // Configurar elementos iniciais
    gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonsRef.current], {
      opacity: 0,
      y: 30
    });

    // Configurar liquid globe inicial
    gsap.set(liquidGlobeRef.current, {
      opacity: 0,
      scale: 0.8,
      rotation: 0
    });

    // Configurar liquid vertical inicial
    gsap.set(liquidVerticalRef.current, {
      opacity: 0,
      scale: 0.8,
      rotation: 0
    });

    // Configurar eclipse inicial
    gsap.set(eclipseRef.current, {
      opacity: 0,
      scale: 0.3,
      y: 50
    });

    // Timeline principal com animações escalonadas
    const tl = gsap.timeline({ delay: 0.3 });

    // Eclipse entra primeiro (atrás do liquid globe)
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
    // Liquid globe entra depois
    .to(liquidGlobeRef.current, {
      opacity: 0.04,
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1.2")
    .to(liquidVerticalRef.current, {
      opacity: 0.04,
      scale: 1,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1.5")
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=1.2")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

    // Animações contínuas sutis
    // Pulso suave no título
    gsap.to(titleRef.current, {
      scale: 1.02,
      duration: 3,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });

    // Rotação constante do liquid globe (mesmo efeito do planeta)
    gsap.to(liquidGlobeRef.current, {
      rotation: "+=360",
      duration: 30,
      ease: "none",
      repeat: -1
    });

    // Animação constante do eclipse - pulso suave
    gsap.to(eclipseRef.current, {
      scale: 1.1,
      duration: 8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });


    // Efeito LED com defeito - piscadas aleatórias
    const createLEDEffect = () => {
      if (!subtitleRef.current) return;
      
      const flicker = () => {
        // Chance de piscada simples (70%) ou múltiplas piscadas (30%)
        const isMultipleFlicker = Math.random() < 0.3;
        
        if (isMultipleFlicker) {
          // Sequência de múltiplas piscadas rápidas (como LED com defeito)
          const flickerCount = Math.floor(Math.random() * 3) + 2; // 2-4 piscadas
          
          const doMultipleFlicker = (count) => {
            if (count <= 0) return;
            
            gsap.to(subtitleRef.current, {
              opacity: 0.1,
              duration: 0.08,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(subtitleRef.current, {
                  opacity: 0.8,
                  duration: 0.08,
                  ease: "power2.out",
                  onComplete: () => {
                    // Delay aleatório entre piscadas (50-150ms)
                    const delay = Math.random() * 100 + 50;
                    setTimeout(() => doMultipleFlicker(count - 1), delay);
                  }
                });
              }
            });
          };
          
          doMultipleFlicker(flickerCount);
        } else {
          // Piscada simples
          gsap.to(subtitleRef.current, {
            opacity: 0.2,
            duration: 0.1,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(subtitleRef.current, {
                opacity: 0.8,
                duration: 0.1,
                ease: "power2.out"
              });
            }
          });
        }
        
        // Intervalo aleatório para próxima piscada (3-10 segundos)
        const nextFlicker = Math.random() * 7000 + 3000;
        setTimeout(flicker, nextFlicker);
      };
      
      // Iniciar o efeito após um delay aleatório inicial
      const initialDelay = Math.random() * 4000 + 2000;
      setTimeout(flicker, initialDelay);
    };
    
    createLEDEffect();

    // Animação sutil da lâmpada - brilho intermitente
    const lightbulbElement = subtitleRef.current?.querySelector('.fa-lightbulb');
    if (lightbulbElement) {
      const lightbulbFlicker = () => {
        gsap.to(lightbulbElement, {
          opacity: 0.4,
          duration: 0.15,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(lightbulbElement, {
              opacity: 0.8,
              duration: 0.15,
              ease: "power2.out"
            });
          }
        });
        
        // Intervalo aleatório para próxima piscada da lâmpada (4-12 segundos)
        const nextFlicker = Math.random() * 8000 + 4000;
        setTimeout(lightbulbFlicker, nextFlicker);
      };
      
      // Iniciar o efeito após um delay aleatório inicial
      const initialDelay = Math.random() * 5000 + 2000;
      setTimeout(lightbulbFlicker, initialDelay);
    }

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [show]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <SEOHead 
        title="404 - Página Não Encontrada | N2S Digital"
        description="Página não encontrada."
        keywords="404, página não encontrada, erro, N2S Digital"
      />
      
      <div 
        ref={containerRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #0a0a0f 100%)'
        }}
      >
        {/* Efeito de brilho sutil no fundo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Eclipse de iluminação atrás do liquid globe */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <div 
            ref={eclipseRef}
            className="absolute pointer-events-none eclipse-glow"
            style={{
              background: `radial-gradient(circle, rgba(196, 181, 253, 0.02) 0%, rgba(168, 85, 247, 0.015) 30%, rgba(139, 92, 246, 0.01) 60%, transparent 100%)`,
              width: '650px',
              height: '650px',
              borderRadius: '50%',
              filter: 'blur(3px)'
            }}
          />
        </div>

        {/* Liquid Globe Background */}
        <div 
          ref={liquidGlobeRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]"
          style={{
            opacity: 0.04
          }}
        >
          <img 
            src="/liquid-globe.webp" 
            alt="Liquid Globe"
            className="w-[900px] h-[900px] object-contain"
            style={{
              filter: 'blur(3px) brightness(0.7) contrast(0.8)'
            }}
          />
        </div>

        {/* Liquid Vertical Background */}
        <div 
          ref={liquidVerticalRef}
          className="absolute inset-0 flex items-start justify-start pointer-events-none"
          style={{
            opacity: 0.04
          }}
        >
          <img 
            src="/liquido-vertical.png" 
            alt="Liquid Vertical"
            className="w-full h-full object-cover"
            style={{
              filter: 'blur(3px) brightness(0.7) contrast(0.8)'
            }}
          />
        </div>

        {/* Stars Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="star star-small star-1" style={{top: '10%', left: '20%'}}></div>
          <div className="star star-medium star-2" style={{top: '15%', left: '80%'}}></div>
          <div className="star star-large star-3" style={{top: '25%', left: '60%'}}></div>
          <div className="star star-small star-4" style={{top: '35%', left: '10%'}}></div>
          <div className="star star-medium star-5" style={{top: '45%', left: '90%'}}></div>
          <div className="star star-small star-1" style={{top: '55%', left: '30%'}}></div>
          <div className="star star-large star-2" style={{top: '65%', left: '70%'}}></div>
          <div className="star star-medium star-3" style={{top: '75%', left: '15%'}}></div>
          <div className="star star-small star-4" style={{top: '85%', left: '85%'}}></div>
          <div className="star star-large star-5" style={{top: '20%', left: '50%'}}></div>
          <div className="star star-medium star-1" style={{top: '40%', left: '40%'}}></div>
          <div className="star star-small star-2" style={{top: '60%', left: '5%'}}></div>
          <div className="star star-large star-3" style={{top: '80%', left: '95%'}}></div>
          <div className="star star-medium star-4" style={{top: '30%', left: '25%'}}></div>
          <div className="star star-small star-5" style={{top: '50%', left: '75%'}}></div>
        </div>

        {/* Meteors Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="meteor meteor-1"></div>
          <div className="meteor meteor-2"></div>
          <div className="meteor meteor-3"></div>
          <div className="meteor meteor-4"></div>
          <div className="meteor meteor-5"></div>
          <div className="meteor meteor-6"></div>
          <div className="meteor meteor-7"></div>
          <div className="meteor meteor-8"></div>
          <div className="meteor meteor-9"></div>
          <div className="meteor meteor-10"></div>
        </div>

        <div className="text-center px-4 max-w-4xl mx-auto relative z-10">

          {/* Título 404 - Aumentado */}
          <div ref={titleRef} className="mb-6">
            <h1 className="text-9xl md:text-[12rem] lg:text-[14rem] font-black bg-gradient-to-r from-white via-purple-100 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl leading-none">
              404
            </h1>
          </div>
          
          {/* Subtítulo - Simplificado */}
          <div ref={subtitleRef} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white/80 tracking-tight flex items-center justify-center gap-3">
              <FontAwesomeIcon 
                icon={faLightbulb} 
                className="text-2xl md:text-3xl text-white/80"
              />
              Página Não Encontrada
            </h2>
          </div>
          
          {/* Descrição - Simplificada */}
          <div ref={descriptionRef} className="mb-12">
            <p className="text-lg md:text-xl text-gray-300/70 leading-relaxed max-w-xl mx-auto">
              A página que você está procurando não existe ou foi movida.
            </p>
          </div>
          
          {/* Botões - Estilização profissional */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <GlassButton 
              onClick={handleGoHome} 
              className="group min-w-[200px] h-14 text-lg font-semibold"
            >
              <FontAwesomeIcon 
                icon={faHouse} 
                className="text-base mr-3 group-hover:scale-110 transition-transform duration-300" 
              />
              <span>Voltar ao Início</span>
            </GlassButton>
            
            <GlassButton 
              onClick={handleGoBack} 
              className="group min-w-[200px] h-14 text-lg font-semibold"
            >
              <FontAwesomeIcon 
                icon={faArrowRotateLeft} 
                className="text-base mr-3 group-hover:scale-110 transition-transform duration-300" 
              />
              <span>Página Anterior</span>
            </GlassButton>
          </div>

        </div>

      </div>

      <style jsx>{`
        /* Meteors Animation Styles */
        .meteor {
          position: absolute;
          background: linear-gradient(45deg, transparent, transparent, rgba(255, 255, 255, 0.15), rgba(168, 85, 247, 0.15), transparent);
          border-radius: 2px;
          opacity: 0;
          animation: meteor-fall 3s linear infinite;
          transform: rotate(45deg);
        }

        .meteor:before {
          content: '';
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 3px;
          height: 1.5px;
          background: linear-gradient(45deg, #ffffff, #a855f7);
          border-radius: 50%;
          box-shadow: 0 0 4px 1px rgba(168, 85, 247, 0.3);
        }

        .meteor-1 {
          width: 300px;
          height: 2px;
          top: -50px;
          right: -300px;
          animation-duration: 4s;
          animation-delay: 0s;
        }

        .meteor-2 {
          width: 200px;
          height: 1px;
          top: 10%;
          right: -200px;
          animation-duration: 3.5s;
          animation-delay: 1s;
        }

        .meteor-3 {
          width: 250px;
          height: 1.5px;
          top: 30%;
          right: -250px;
          animation-duration: 4.5s;
          animation-delay: 2s;
        }

        .meteor-4 {
          width: 180px;
          height: 1px;
          top: 50%;
          right: -180px;
          animation-duration: 3s;
          animation-delay: 1.5s;
        }

        .meteor-5 {
          width: 220px;
          height: 1.5px;
          top: 20%;
          right: -220px;
          animation-duration: 4s;
          animation-delay: 0.5s;
        }

        .meteor-6 {
          width: 150px;
          height: 1px;
          top: 60%;
          right: -150px;
          animation-duration: 3.2s;
          animation-delay: 2.5s;
        }

        .meteor-7 {
          width: 280px;
          height: 1.5px;
          top: 40%;
          right: -280px;
          animation-duration: 4.2s;
          animation-delay: 3s;
        }

        .meteor-8 {
          width: 160px;
          height: 1px;
          top: 70%;
          right: -160px;
          animation-duration: 3.8s;
          animation-delay: 1.2s;
        }

        .meteor-9 {
          width: 240px;
          height: 2px;
          top: 80%;
          right: -240px;
          animation-duration: 4.8s;
          animation-delay: 3.5s;
        }

        .meteor-10 {
          width: 190px;
          height: 1px;
          top: 5%;
          right: -190px;
          animation-duration: 3.6s;
          animation-delay: 2.8s;
        }

                @keyframes meteor-fall {
                  0% {
                    opacity: 0;
                    transform: translateX(0) translateY(0) rotate(-200deg);
                  }
                  10% {
                    opacity: 0.4;
                  }
                  90% {
                    opacity: 0.4;
                  }
                  100% {
                    opacity: 0;
                    transform: translateX(-100vw) translateY(100vh) rotate(-200deg);
                  }
                }

                /* Stars Animation Styles */
                .star {
                  position: absolute;
                  background: linear-gradient(45deg, #ffffff, #a855f7);
                  border-radius: 50%;
                  opacity: 0;
                  animation: twinkle 4s linear infinite;
                }

                .star-small {
                  width: 1px;
                  height: 1px;
                  box-shadow: 0 0 6px 1px rgba(168, 85, 247, 0.3);
                }

                .star-medium {
                  width: 2px;
                  height: 2px;
                  box-shadow: 0 0 8px 2px rgba(168, 85, 247, 0.4);
                }

                .star-large {
                  width: 3px;
                  height: 3px;
                  box-shadow: 0 0 10px 3px rgba(168, 85, 247, 0.5);
                }

                /* Different twinkling animations for variety */
                @keyframes twinkle {
                  0%, 100% { opacity: 0.1; transform: scale(0.8); }
                  50% { opacity: 0.4; transform: scale(1.2); }
                }

                @keyframes twinkle-slow {
                  0%, 100% { opacity: 0.05; transform: scale(0.9); }
                  50% { opacity: 0.4; transform: scale(1.1); }
                }

                @keyframes twinkle-fast {
                  0%, 100% { opacity: 0.15; transform: scale(0.7); }
                  50% { opacity: 0.4; transform: scale(1.3); }
                }

                .star-1 { animation: twinkle 3s linear infinite; animation-delay: 0s; }
                .star-2 { animation: twinkle-slow 5s linear infinite; animation-delay: 1s; }
                .star-3 { animation: twinkle-fast 2s linear infinite; animation-delay: 0.5s; }
                .star-4 { animation: twinkle 4s linear infinite; animation-delay: 2s; }
                .star-5 { animation: twinkle-slow 6s linear infinite; animation-delay: 1.5s; }
              `}</style>
    </>
  );
}
