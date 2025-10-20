import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useCounterAnimation = (targetValue, duration = 2, trigger = null) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    // Criar ScrollTrigger para detectar quando o elemento entra na viewport
    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger,
      start: "top 80%",
      once: true, // Executa apenas uma vez
      onEnter: () => {
        if (!isVisible) {
          setIsVisible(true);
          startCounterAnimation();
        }
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [trigger, isVisible]);

  const startCounterAnimation = () => {
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Extrair número do valor alvo (remover símbolos como +, %)
    const numericValue = parseFloat(targetValue.replace(/[^\d.]/g, ''));
    
    if (isNaN(numericValue)) {
      setCount(targetValue);
      return;
    }

    // Configurar animação GSAP para o contador
    animationRef.current = gsap.to({ value: 0 }, {
      value: numericValue,
      duration: duration,
      ease: "power2.out",
      onUpdate: function() {
        const currentValue = this.targets()[0].value;
        
        // Formatar o número baseado no tipo original
        if (targetValue.includes('+')) {
          setCount(Math.round(currentValue) + '+');
        } else if (targetValue.includes('%')) {
          setCount(Math.round(currentValue) + '%');
        } else {
          setCount(Math.round(currentValue));
        }
      },
      onComplete: () => {
        setCount(targetValue); // Garantir que termine com o valor exato
      }
    });
  };

  // Se não há trigger, animar imediatamente
  useEffect(() => {
    if (!trigger && !isVisible) {
      setIsVisible(true);
      startCounterAnimation();
    }
  }, [trigger, isVisible]);

  return { count, counterRef };
};
