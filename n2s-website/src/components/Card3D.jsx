import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gsap } from 'gsap';
import { OptimizedImage } from '../utils/imageOptimization.jsx';

const Card3D = ({ title, description, technologies, icon, image, tag }) => {
  const tagRef = useRef(null);
  const tagContentRef = useRef(null);

  const handleMouseEnter = () => {
    // Expande a tag - mostra o texto e ajusta o background
    const tagElement = tagRef.current;
    const tagIconCenter = tagElement?.querySelector('.tag-icon-center');
    const tagContent = tagElement?.querySelector('.tag-content');
    if (tagElement && tagIconCenter && tagContent) {
      gsap.to(tagIconCenter, { 
        opacity: 0, 
        scale: 0.8,
        duration: 0.3, 
        ease: "power2.out" 
      });
      gsap.to(tagContent, { 
        opacity: 1, 
        x: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      });
      // Usa a largura calculada dinamicamente
      const calculatedWidth = tagContent.dataset.calculatedWidth || '120px';
      gsap.to(tagElement, { 
        width: calculatedWidth,
        height: '30px',
        paddingLeft: '8px',
        paddingRight: '8px',
        duration: 0.4, 
        ease: "back.out(1.1)" 
      });
    }
  };

  const handleMouseLeave = () => {
    // Retrai a tag - esconde o texto e encolhe o background
    const tagElement = tagRef.current;
    const tagIconCenter = tagElement?.querySelector('.tag-icon-center');
    const tagContent = tagElement?.querySelector('.tag-content');
    if (tagElement && tagIconCenter && tagContent) {
      gsap.to(tagIconCenter, { 
        opacity: 1, 
        scale: 1,
        duration: 0.3, 
        ease: "power2.in" 
      });
      gsap.to(tagContent, { 
        opacity: 0, 
        x: "100%", 
        duration: 0.3, 
        ease: "power2.in" 
      });
      gsap.to(tagElement, { 
        width: '30px',
        height: '30px',
        paddingLeft: '0px',
        paddingRight: '0px',
        duration: 0.4, 
        ease: "back.out(1.2)" 
      });
    }
  };

  // Calcula a largura dinâmica do tag baseado no conteúdo
  useEffect(() => {
    if (tagContentRef.current) {
      // Temporariamente mostra o conteúdo para medir
      const tagContent = tagContentRef.current;
      const originalStyle = tagContent.style.cssText;
      
      tagContent.style.opacity = '1';
      tagContent.style.transform = 'translateX(0)';
      tagContent.style.position = 'absolute';
      tagContent.style.visibility = 'hidden';
      
      const contentWidth = tagContent.scrollWidth;
      
      // Restaura o estilo original
      tagContent.style.cssText = originalStyle;
      
      // Calcula a largura total necessária (conteúdo + padding + ícone)
      const totalWidth = Math.max(contentWidth + 24, 30); // Mínimo 30px, padding 24px
      
      // Armazena a largura calculada para uso nas animações
      tagContent.dataset.calculatedWidth = totalWidth;
    }
  }, [tag]);

  return (
    <div 
      className="w-full max-w-xl mx-auto rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl cursor-pointer overflow-hidden hover:shadow-3xl hover:scale-105"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.05)',
        aspectRatio: '16/9'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Container da imagem principal */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Imagem do projeto */}
        <OptimizedImage 
          src={image} 
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          loading="lazy"
          style={{
            minHeight: '100%',
            minWidth: '100%'
          }}
        />
        
        {/* Overlay gradiente para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Tag flutuante no canto superior direito */}
        <div ref={tagRef} className="absolute top-3 right-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 overflow-hidden transition-all duration-300 ease-out" style={{ 
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="flex items-center justify-center w-full h-full relative">
            {/* Ícone centralizado (desaparece no hover) */}
            <FontAwesomeIcon 
              icon={icon} 
              className="text-white text-xs flex-shrink-0 tag-icon-center absolute" 
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
            
            {/* Ícone à esquerda + texto (aparece no hover) */}
            <div ref={tagContentRef} className="tag-content flex items-center opacity-0 transform translate-x-full">
              <FontAwesomeIcon icon={icon} className="text-white text-xs flex-shrink-0 mr-2" />
              <span className="text-white text-xs font-medium tracking-wide whitespace-nowrap">
                {tag}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sombra interna para profundidade */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default Card3D;
