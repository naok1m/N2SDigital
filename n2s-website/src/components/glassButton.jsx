import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function GlassButton({ children, onClick }) {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const ripple = rippleRef.current;

    if (!button || !ripple) return;

    // Animação de hover com GSAP
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        rotationY: 5,
        boxShadow: "0 12px 40px rgba(196,181,253,0.5), inset 0 1px 0 rgba(255,255,255,0.5)",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(ripple, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        rotationY: 0,
        boxShadow: "0 8px 32px rgba(196,181,253,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(ripple, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Animação de clique
    const handleClick = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Criar efeito de ripple
      const clickRipple = document.createElement('div');
      clickRipple.style.position = 'absolute';
      clickRipple.style.left = x + 'px';
      clickRipple.style.top = y + 'px';
      clickRipple.style.width = '0px';
      clickRipple.style.height = '0px';
      clickRipple.style.borderRadius = '50%';
      clickRipple.style.background = 'rgba(255, 255, 255, 0.3)';
      clickRipple.style.transform = 'translate(-50%, -50%)';
      clickRipple.style.pointerEvents = 'none';
      clickRipple.style.zIndex = '1';

      button.appendChild(clickRipple);

      gsap.fromTo(clickRipple,
        { width: '0px', height: '0px', opacity: 1 },
        { 
          width: '200px', 
          height: '200px', 
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => button.removeChild(clickRipple)
        }
      );

      // Animação de "bounce" no clique
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });

      // Executar função onClick se fornecida
      if (onClick) {
        onClick(e);
      }
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="flex items-center gap-3
                 bg-gradient-to-r from-[rgba(196,181,253,0.4)] via-[rgba(196,181,253,0.25)] to-[rgba(196,181,253,0.4)]
                 border border-[rgba(196,181,253,0.6)]
                 backdrop-blur-[20px]
                 shadow-[0_8px_32px_rgba(196,181,253,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
                 rounded-full px-6 py-2
                 relative overflow-hidden
                 text-white font-semibold
                 cursor-pointer"
    >
      {/* Efeito de ripple no hover */}
      <div 
        ref={rippleRef}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(196,181,253,0.15)] to-transparent opacity-0 scale-75"
      />
      
      {/* Conteúdo do botão */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
  