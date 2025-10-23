import { useState, useEffect, useRef } from 'react';

export const useFPSDetection = () => {
  const [fps, setFps] = useState(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsHistory = useRef([]);
  const autoHideTimeout = useRef(null);
  const detectionStarted = useRef(false);
  const animationFrameId = useRef(null);

  useEffect(() => {
    // Verificar se é um dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768 || 
                     'ontouchstart' in window;
    
    // Se for mobile, não mostrar o aviso
    if (isMobile) {
      setIsDetecting(false);
      return;
    }

    // Verificar se o usuário já dispensou o aviso
    const dismissed = localStorage.getItem('fps-warning-dismissed');
    
    if (dismissed === 'true') {
      setIsDetecting(false);
      return;
    }

    // Função para calcular FPS
    const calculateFPS = (timestamp) => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime.current;
      
      if (deltaTime >= 1000) { // A cada segundo
        const currentFPS = Math.round((frameCount.current * 1000) / deltaTime);
        
        fpsHistory.current.push(currentFPS);
        
        // Manter apenas os últimos 5 valores para média
        if (fpsHistory.current.length > 5) {
          fpsHistory.current.shift();
        }
        
        frameCount.current = 0;
        lastTime.current = currentTime;
        
        // Calcular média dos últimos FPS
        const averageFPS = Math.round(
          fpsHistory.current.reduce((sum, f) => sum + f, 0) / fpsHistory.current.length
        );
        
        setFps(averageFPS);
        
        // Se já temos dados suficientes (5 segundos)
        if (fpsHistory.current.length >= 5) {
          setIsDetecting(false);
          
          // Parar a detecção
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
          }
          
          // Se FPS é menor que 30, mostrar toast
          if (averageFPS < 30) {
            setShowToast(true);
            
            // Auto-hide toast após 30 segundos
            autoHideTimeout.current = setTimeout(() => {
              setShowToast(false);
            }, 30000);
          }
          
          return; // Parar a detecção
        }
      }
      
      frameCount.current++;
      animationFrameId.current = requestAnimationFrame(calculateFPS);
    };

    // Iniciar detecção de FPS
    const startDetection = () => {
      if (!detectionStarted.current) {
        detectionStarted.current = true;
        animationFrameId.current = requestAnimationFrame(calculateFPS);
      }
    };

    // Iniciar detecção após um delay
    const timeout = setTimeout(startDetection, 1000);

    // Cleanup
    return () => {
      clearTimeout(timeout);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (autoHideTimeout.current) {
        clearTimeout(autoHideTimeout.current);
      }
    };
  }, []);

  const hideToast = () => {
    setShowToast(false);
    if (autoHideTimeout.current) {
      clearTimeout(autoHideTimeout.current);
    }
  };

  return {
    fps,
    isDetecting,
    showToast,
    hideToast
  };
};
