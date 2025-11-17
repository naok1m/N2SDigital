import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReact, 
  faNodeJs, 
  faJs, 
  faPython, 
  faHtml5, 
  faCss3Alt, 
  faGitAlt, 
  faDocker,
  faGithub,
  faPhp,
  faLaravel,
  faVuejs,
  faAngular,
  faSass,
  faBootstrap,
  faWordpress,
  faFigma
} from '@fortawesome/free-brands-svg-icons';

const StackCarousel = ({ position = 'top' }) => {
  const bandRef = useRef(null);
  const bandInnerRef = useRef(null);
  const animationRef = useRef(null);
  const observerRef = useRef(null);

  // Memoizar stacks para evitar recriação desnecessária
  const stacks = useMemo(() => [
    { name: 'REACT', icon: faReact, color: '#61DAFB' },
    { name: 'NODE.JS', icon: faNodeJs, color: '#339933' },
    { name: 'JAVASCRIPT', icon: faJs, color: '#F7DF1E' },
    { name: 'PYTHON', icon: faPython, color: '#3776AB' },
    { name: 'HTML5', icon: faHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: faCss3Alt, color: '#1572B6' },
    { name: 'GIT', icon: faGitAlt, color: '#F05032' },
    { name: 'DOCKER', icon: faDocker, color: '#2496ED' },
    { name: 'GITHUB', icon: faGithub, color: '#181717' },
    { name: 'PHP', icon: faPhp, color: '#777BB4' },
    { name: 'LARAVEL', icon: faLaravel, color: '#FF2D20' },
    { name: 'VUE.JS', icon: faVuejs, color: '#4FC08D' },
    { name: 'ANGULAR', icon: faAngular, color: '#DD0031' },
    { name: 'SASS', icon: faSass, color: '#CC6699' },
    { name: 'BOOTSTRAP', icon: faBootstrap, color: '#7952B3' },
    { name: 'WORDPRESS', icon: faWordpress, color: '#21759B' },
    { name: 'FIGMA', icon: faFigma, color: '#F24E1E' }
  ], []);

  // Função otimizada para criar animação com CSS (muito mais performático)
  const createAnimation = useCallback(() => {
    if (!bandInnerRef.current || animationRef.current) return;

    const firstStackSet = bandInnerRef.current.querySelector('.stack-set');
    if (!firstStackSet) return;
    
    const stackSetWidth = firstStackSet.offsetWidth;
    const moveDistance = stackSetWidth;

    // Usar GSAP apenas para animação suave, sem ScrollTrigger pesado
    gsap.set(bandInnerRef.current, { x: 0, force3D: true });
    
    animationRef.current = gsap.to(bandInnerRef.current, {
      x: -moveDistance,
      duration: 40, // Mais lento = menos CPU
      ease: 'none',
      repeat: -1,
      immediateRender: true,
      force3D: true,
      lazy: false // Desabilitar lazy para melhor performance
    });
  }, []);

  // Pausar animação quando não visível (IntersectionObserver)
  useEffect(() => {
    if (!bandRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (animationRef.current) {
            if (entry.isIntersecting) {
              animationRef.current.play();
            } else {
              animationRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observerRef.current.observe(bandRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Inicializar animação após mount
  useEffect(() => {
    if (!bandInnerRef.current) return;

    // Aguardar próximo frame para garantir que DOM está pronto
    const timer = requestAnimationFrame(() => {
      createAnimation();
    });

    return () => {
      cancelAnimationFrame(timer);
      
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [createAnimation]);

  // Memoizar renderização dos stacks - reduzido para 2 cópias apenas
  const renderStacks = useMemo(() => {
    return [...Array(2)].map((_, copyIndex) => (
      <div 
        key={copyIndex} 
        className={`flex items-center gap-6 stack-set ${position === 'bottom' ? 'flex-row-reverse' : ''}`}
        style={{ contain: 'layout style paint' }} // Otimização CSS
      >
        {stacks.map((stack, index) => (
          <React.Fragment key={`${copyIndex}-${index}`}>
            <div 
              className="flex items-center gap-3 px-4 py-2 stack-item"
              style={{ 
                contain: 'layout style',
                willChange: 'auto' // Remover will-change desnecessário
              }}
            >
              <FontAwesomeIcon 
                icon={stack.icon} 
                className="text-xl"
                style={{ color: stack.color }}
              />
              <span 
                className="text-white font-bold text-base tracking-wide"
                style={{ 
                  fontFamily: 'Clash Grotesk, sans-serif'
                  // Removido textShadow para melhor performance
                }}
              >
                {stack.name}
              </span>
            </div>
            {index < stacks.length - 1 && (
              <div className="flex items-center justify-center w-4">
                <div 
                  className="w-1 h-1 rounded-full bg-gray-400"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    ));
  }, [stacks, position]);

  return (
    <div 
      ref={bandRef}
      className="relative w-full h-20 flex items-center overflow-hidden pointer-events-none z-[60]"
      style={{
        background: '#0A0A0F',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        // Removido backdropFilter - muito pesado
        transform: position === 'top' ? 'skewY(-1deg)' : 'skewY(1deg)',
        willChange: 'transform',
        contain: 'layout style paint', // Isolar rendering
        isolation: 'isolate' // Criar novo contexto de stacking
      }}
    >
      <div 
        ref={bandInnerRef}
        className="flex items-center whitespace-nowrap stack-band-inner"
        style={{
          willChange: 'transform',
          contain: 'layout style paint',
          backfaceVisibility: 'hidden', // Otimização para animações
          transform: 'translateZ(0)' // Forçar aceleração de hardware
        }}
      >
        {renderStacks}
      </div>
    </div>
  );
};

export default StackCarousel;