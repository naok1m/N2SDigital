import React, { useRef, useEffect } from 'react';
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
  faAws,
  faGoogle,
  faFigma,
  faGithub,
  faPhp,
  faLaravel,
  faVuejs,
  faAngular,
  faSass,
  faBootstrap,
  faWordpress
} from '@fortawesome/free-brands-svg-icons';

const StackCarousel = () => {
  const topBandRef = useRef(null);
  const bottomBandRef = useRef(null);
  const containerRef = useRef(null);

  // Stacks com ícones do Font Awesome
  const stacks = [
    { name: 'REACT', icon: faReact, color: '#61DAFB' },
    { name: 'NODE.JS', icon: faNodeJs, color: '#339933' },
    { name: 'JAVASCRIPT', icon: faJs, color: '#F7DF1E' },
    { name: 'PYTHON', icon: faPython, color: '#3776AB' },
    { name: 'HTML5', icon: faHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: faCss3Alt, color: '#1572B6' },
    { name: 'GIT', icon: faGitAlt, color: '#F05032' },
    { name: 'DOCKER', icon: faDocker, color: '#2496ED' },
    { name: 'AWS', icon: faAws, color: '#FF9900' },
    { name: 'GITHUB', icon: faGithub, color: '#181717' },
    { name: 'PHP', icon: faPhp, color: '#777BB4' },
    { name: 'LARAVEL', icon: faLaravel, color: '#FF2D20' },
    { name: 'VUE.JS', icon: faVuejs, color: '#4FC08D' },
    { name: 'ANGULAR', icon: faAngular, color: '#DD0031' },
    { name: 'SASS', icon: faSass, color: '#CC6699' },
    { name: 'BOOTSTRAP', icon: faBootstrap, color: '#7952B3' },
    { name: 'WORDPRESS', icon: faWordpress, color: '#21759B' },
    { name: 'FIGMA', icon: faFigma, color: '#F24E1E' }
  ];

  const separators = [
    { icon: 'circle', color: '#a0a0a0' },
    { icon: 'circle', color: '#a0a0a0' },
    { icon: 'circle', color: '#a0a0a0' },
    { icon: 'circle', color: '#a0a0a0' }
  ];

  useEffect(() => {
    if (!topBandRef.current || !bottomBandRef.current) return;

    // Aguarda o DOM ser completamente renderizado
    const timer = setTimeout(() => {
      const topBandInner = topBandRef.current.querySelector('.stack-band-inner');
      const bottomBandInner = bottomBandRef.current.querySelector('.stack-band-inner');

      if (!topBandInner || !bottomBandInner) return;

      const firstStackSet = topBandInner.querySelector('.stack-set');
      if (!firstStackSet) return;
      
      const stackSetWidth = firstStackSet.offsetWidth;

      const moveDistance = stackSetWidth;

      // Animação da banda superior (movimento da direita para esquerda) - REACT
      gsap.set(topBandInner, { x: 0 });
      gsap.to(topBandInner, {
        x: -moveDistance,
        duration: 25, // 25 segundos para movimento suave e contínuo
        ease: 'none',
        repeat: -1,
        immediateRender: true
      });

      // Animação da banda inferior (movimento da direita para esquerda - INVERTIDA) - VUE.JS
      gsap.set(bottomBandInner, { x: 0 });
      gsap.to(bottomBandInner, {
        x: -moveDistance, // INVERTIDO: movimento da direita para esquerda
        duration: 25, // 25 segundos para movimento suave e contínuo
        ease: 'none',
        repeat: -1,
        immediateRender: true
      });

    }, 200);

    // ScrollTrigger para fade out das faixas conforme o usuário scrolla
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // As faixas começam a sumir quando o usuário scrolla 30% da página
        const fadeStart = 0.3;
        const fadeEnd = 0.6;
        
        let opacity = 1;
        if (progress >= fadeStart) {
          // Calcula a opacidade baseada no progresso do scroll
          const fadeProgress = (progress - fadeStart) / (fadeEnd - fadeStart);
          opacity = Math.max(0, 1 - fadeProgress);
        }
        
        if (topBandRef.current && bottomBandRef.current) {
          gsap.set([topBandRef.current, bottomBandRef.current], {
            opacity: opacity,
            y: progress * -50 // Movimento sutil para cima conforme scrolla
          });
        }
      }
    });

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const renderBand = (direction) => {
    const isTopBand = direction === 'top';
    const ref = isTopBand ? topBandRef : bottomBandRef;
    
    return (
      <div 
        ref={ref}
        className={`relative w-full h-20 flex items-center overflow-hidden pointer-events-none z-[60] ${isTopBand ? 'mb-4' : 'mt-4'}`}
        style={{
          transform: isTopBand ? 'skewY(-2deg)' : 'skewY(2deg)',
          background: '#0A0A0F',
          borderTop: '1px solid rgba(255, 255, 255, 0.3)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(2px)'
        }}
      >
        <div className="flex items-center whitespace-nowrap stack-band-inner">
          {/* MÉTODO AVANÇADO: Cria um loop infinito perfeito */}
          {[...Array(4)].map((_, copyIndex) => (
            <div key={copyIndex} className={`flex items-center gap-8 stack-set ${!isTopBand ? 'flex-row-reverse' : ''}`}>
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
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center mb-8">
      {renderBand('top')}
      {renderBand('bottom')}
    </div>
  );
};

export default StackCarousel;