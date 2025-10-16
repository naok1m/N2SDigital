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

const StackCarousel = ({ position = 'top' }) => {
  const bandRef = useRef(null);

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
    if (!bandRef.current) return;

    const timer = setTimeout(() => {
      const bandInner = bandRef.current.querySelector('.stack-band-inner');

      if (!bandInner) return;

      const firstStackSet = bandInner.querySelector('.stack-set');
      if (!firstStackSet) return;
      
      const stackSetWidth = firstStackSet.offsetWidth;
      const moveDistance = stackSetWidth;

      gsap.set(bandInner, { x: 0 });
      gsap.to(bandInner, {
        x: -moveDistance,
        duration: 25,
        ease: 'none',
        repeat: -1,
        immediateRender: true
      });

    }, 200);

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
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
          gsap.set(bandRef.current, {
            opacity: opacity,
            y: progress * -50
          });
        }
      }
    });

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={bandRef}
      className="relative w-full h-20 flex items-center overflow-hidden pointer-events-none z-[60]"
      style={{
        background: '#0A0A0F',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(2px)',
        transform: position === 'top' ? 'skewY(-1deg)' : 'skewY(1deg)'
      }}
    >
      <div className="flex items-center whitespace-nowrap stack-band-inner">
        {[...Array(2)].map((_, copyIndex) => (
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
        ))}
      </div>
    </div>
  );
};

export default StackCarousel;