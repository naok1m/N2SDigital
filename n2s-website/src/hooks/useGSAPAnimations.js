import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Animação de entrada com scroll trigger
    const animation = gsap.fromTo(element,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: 15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
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

    // Animação de hover para elementos interativos
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Adicionar listeners se for um elemento interativo
    if (element.classList.contains('interactive-element')) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      animation.kill();
      if (element.classList.contains('interactive-element')) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return elementRef;
};

// Hook para animações de texto com efeito de digitação
export const useTypingAnimation = (text, speed = 100) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.textContent = '';
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };

    // Iniciar animação quando elemento estiver visível
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [text, speed]);

  return elementRef;
};

// Hook para animações de partículas/floating elements
export const useFloatingAnimation = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Animação de flutuação contínua
    gsap.to(element, {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-5, 5)",
      duration: "random(3, 6)",
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true
    });

  }, []);

  return elementRef;
};
