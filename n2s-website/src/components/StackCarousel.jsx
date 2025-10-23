import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  const animationRef = useRef(null);
  const scrollTriggerRef = useRef(null);

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

  // Memoizar separadores
  const separators = useMemo(() => [
    { icon: 'circle', color: '#a0a0a0' },
    { icon: 'circle', color: '#a0a0a0' },
    { icon: 'circle', color: '#a0a0a0' },
    { icon: 'circle', color: '#a0a0a0' }
  ], []);

  // Função otimizada para criar animação
  const createAnimation = useCallback(() => {
    if (!bandRef.current || animationRef.current) return;

    const bandInner = bandRef.current.querySelector('.stack-band-inner');
    if (!bandInner) return;

    const firstStackSet = bandInner.querySelector('.stack-set');
    if (!firstStackSet) return;
    
    const stackSetWidth = firstStackSet.offsetWidth;
    const moveDistance = stackSetWidth;

    // Usar transform3d para aceleração de hardware
    gsap.set(bandInner, { x: 0, force3D: true });
    
    animationRef.current = gsap.to(bandInner, {
      x: -moveDistance,
      duration: 30, // Aumentar duração para suavizar
      ease: 'none',
      repeat: -1,
      immediateRender: true,
      force3D: true // Forçar aceleração de hardware
    });
  }, []);

  // Função otimizada para scroll trigger
  const createScrollTrigger = useCallback(() => {
    if (!bandRef.current || scrollTriggerRef.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Suavizar scrub
      onUpdate: (self) => {
        const progress = self.progress;
        const fadeStart = 0.3;
        const fadeEnd = 0.6;
        
        let opacity = 1;
        if (progress >= fadeStart) {
          const fadeProgress = (progress - fadeStart) / (fadeEnd - fadeStart);
          opacity = Math.max(0, 1 - fadeProgress);
        }
        
        if (bandRef.current) {
          // Usar transform3d para melhor performance
          gsap.set(bandRef.current, {
            opacity: opacity,
            y: progress * -30, // Reduzir movimento para suavizar
            force3D: true
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!bandRef.current) return;

    // Usar requestAnimationFrame para melhor performance
    const timer = requestAnimationFrame(() => {
      createAnimation();
      createScrollTrigger();
    });

    return () => {
      cancelAnimationFrame(timer);
      
      // Limpar animações
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [createAnimation, createScrollTrigger]);

  // Memoizar renderização dos stacks
  const renderStacks = useMemo(() => {
    return [...Array(2)].map((_, copyIndex) => (
      <div key={copyIndex} className={`flex items-center gap-8 stack-set ${position === 'bottom' ? 'flex-row-reverse' : ''}`}>
        {stacks.map((stack, index) => {
          const separator = separators[index % separators.length];
          return (
            <React.Fragment key={`${copyIndex}-${index}`}>
              <div className="flex items-center gap-3 px-4 py-2 stack-item">
                <FontAwesomeIcon 
                  icon={stack.icon} 
                  className="text-2xl"
                  style={{ color: stack.color }}
                />
                <span 
                  className="text-white font-bold text-lg tracking-wider"
                  style={{ 
                    fontFamily: 'Clash Grotesk, sans-serif',
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {stack.name}
                </span>
              </div>
              <div className="flex items-center justify-center w-6">
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: separator.color }}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    ));
  }, [stacks, separators, position]);

  return (
    <div 
      ref={bandRef}
      className="relative w-full h-20 flex items-center overflow-hidden pointer-events-none z-[60]"
      style={{
        background: '#0A0A0F',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(2px)',
        transform: position === 'top' ? 'skewY(-1deg)' : 'skewY(1deg)',
        willChange: 'transform, opacity' // Otimizar para animações
      }}
    >
      <div className="flex items-center whitespace-nowrap stack-band-inner">
        {renderStacks}
      </div>
    </div>
  );
};

export default StackCarousel;