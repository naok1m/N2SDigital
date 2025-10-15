import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    // Animação inicial do cursor
    gsap.set(cursor, { opacity: 0 });

    // Timeline de entrada - apenas cursor principal
    const enterTl = gsap.timeline({ delay: 1 });
    enterTl.to(cursor, { opacity: 0.8, duration: 0.5, ease: "power2.out" });

    let mouseX = 0;
    let mouseY = 0;

    // Seguir o mouse com cursor principal
    const updateCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Garantir que o cursor sempre esteja visível durante o movimento
      gsap.set(cursor, { opacity: 0.4 });
      
      gsap.to(cursor, {
        x: mouseX - 8,
        y: mouseY - 8,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    // Event listeners para hover
    const handleMouseEnter = (e) => {
      const element = e.target;
      
      // Verificar se o elemento existe e tem classList
      if (!element || !element.classList) {
        gsap.set(cursor, { opacity: 0.4 });
        return;
      }
      
      // Ignorar imagens de background
      if (element.tagName === 'IMG' || 
          element.classList.contains('background-image') ||
          (element.parentElement && element.parentElement.classList && element.parentElement.classList.contains('background-image'))) {
        return;
      }
      
      // Garantir que o cursor sempre esteja visível
      gsap.set(cursor, { opacity: 0.4 });
      
      // Botões e elementos interativos
      if (element.tagName === 'BUTTON' || 
          element.classList.contains('glass-button') ||
          element.classList.contains('interactive-element')) {
        
        setIsHovering(true);
        gsap.to(cursor, { scale: 2, duration: 0.3, ease: "back.out(1.7)" });
        
        // Efeito de ripple
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = mouseX + 'px';
        ripple.style.top = mouseY + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(168, 85, 247, 0.3)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        
        document.body.appendChild(ripple);
        
        gsap.fromTo(ripple,
          { width: '0px', height: '0px', opacity: 1 },
          { 
            width: '100px', 
            height: '100px', 
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => document.body.removeChild(ripple)
          }
        );
      }
      
      // Links
      else if (element.tagName === 'A') {
        setIsHovering(true);
        gsap.to(cursor, { scale: 1.5, rotation: 45, duration: 0.3, ease: "power2.out" });
      }
      
      // Texto
      else if (element.tagName === 'P' || element.tagName === 'H1' || element.tagName === 'H2') {
        setIsHovering(true);
        gsap.to(cursor, { scale: 0.5, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseLeave = (e) => {
      const element = e.target;
      
      // Verificar se o elemento existe e tem classList
      if (!element || !element.classList) {
        setIsHovering(false);
        gsap.to(cursor, { 
          scale: 1, 
          rotation: 0, 
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.set(cursor, { opacity: 0.4 });
        return;
      }
      
      // Ignorar imagens de background
      if (element.tagName === 'IMG' || 
          element.classList.contains('background-image') ||
          (element.parentElement && element.parentElement.classList && element.parentElement.classList.contains('background-image'))) {
        return;
      }
      
      setIsHovering(false);
      gsap.to(cursor, { 
        scale: 1, 
        rotation: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      });
      
      // Garantir que o cursor permaneça visível
      gsap.set(cursor, { opacity: 0.4 });
    };

    // Event listeners para clique
    const handleMouseDown = () => {
      setIsClicking(true);
      gsap.to(cursor, { scale: 0.8, duration: 0.1, ease: "power2.out" });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      gsap.to(cursor, { scale: isHovering ? 2 : 1, duration: 0.2, ease: "back.out(1.7)" });
    };

    // Função para garantir visibilidade do cursor
    const ensureCursorVisibility = () => {
      gsap.set(cursor, { opacity: 0.4 });
    };

    // Adicionar event listeners
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Garantir visibilidade em intervalos regulares
    const visibilityInterval = setInterval(ensureCursorVisibility, 100);

    // Esconder cursor padrão em elementos interativos
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
      
      button, a, input, textarea, select {
        cursor: none !important;
      }
      
      /* Manter cursor padrão em imagens de background */
      img[src*="planeta.png"],
      img[src*="correntes.png"], 
      img[src*="liquidos.png"] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      clearInterval(visibilityInterval);
      document.head.removeChild(style);
    };
  }, [isHovering]);

  return (
    <>
      {/* Cursor principal */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999]"
        style={{
          background: 'rgba(255, 255, 255, 0.4)',
          boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)',
          filter: 'blur(0.8px)'
        }}
      />
      
    </>
  );
}
