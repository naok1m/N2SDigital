import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTimes, faMicrochip, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FPSToast = ({ show, onClose, fps }) => {
  const toastRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (show && toastRef.current) {
      // Animação de entrada mais suave
      gsap.fromTo(toastRef.current, 
        { 
          opacity: 0, 
          y: -50, 
          scale: 0.95,
          filter: 'blur(10px)'
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: "power3.out"
        }
      );

      // Animação da barra de progresso
      if (progressRef.current) {
        gsap.fromTo(progressRef.current, 
          { width: '100%' },
          { 
            width: '0%',
            duration: 30,
            ease: "none",
            onComplete: onClose
          }
        );
      }
    }
  }, [show, onClose]);

  const handleClose = () => {
    if (toastRef.current) {
      // Animação de saída suave
      gsap.to(toastRef.current, {
        opacity: 0,
        y: -50,
        scale: 0.95,
        filter: 'blur(10px)',
        duration: 0.4,
        ease: "power2.in",
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  const handleDontShowAgain = () => {
    // Marcar para não mostrar novamente
    localStorage.setItem('fps-warning-dismissed', 'true');
    handleClose();
  };

  if (!show) return null;

  return (
    <div
      ref={toastRef}
      className="fixed top-6 right-6 z-[9999] max-w-md w-full mx-4"
    >
      <div className="bg-gradient-to-br from-[rgba(10,10,15,0.95)] via-[rgba(26,11,46,0.9)] to-[rgba(10,10,15,0.95)] backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent" />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group"
        >
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-purple-400/30">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-purple-400 text-2xl" />
            </div>
            <div>
              <h3 className="text-white font-black text-xl mb-1">
                Performance Baixa
              </h3>
              <p className="text-white/70 text-sm font-medium">
                Otimize sua experiência
              </p>
            </div>
          </div>

          {/* Main message */}
          <div className="mb-6">
            <p className="text-white/90 text-base leading-relaxed mb-4">
              Seu dispositivo está rodando em{' '}
              <span className="bg-purple-500/20 px-3 py-1 rounded-full text-purple-300 font-bold text-lg">
                {fps} FPS
              </span>
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Para uma experiência mais fluida, ative a aceleração de hardware do seu navegador:
            </p>
          </div>
          
          {/* Instructions */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/10">
            <div className="flex items-center gap-3 text-white/90 text-sm font-semibold mb-4">
              <FontAwesomeIcon icon={faMicrochip} className="w-5 h-5 text-purple-300" />
              <span>Como ativar:</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-300 text-xs font-bold">C</span>
                </div>
                <span className="flex-1">Chrome: <span className="text-white/90">Configurações → Avançado → Sistema → Acelerar</span></span>
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-white/40" />
              </div>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-300 text-xs font-bold">F</span>
                </div>
                <span className="flex-1">Firefox: <span className="text-white/90">about:config → layers.acceleration.force-enabled</span></span>
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-white/40" />
              </div>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-xs font-bold">E</span>
                </div>
                <span className="flex-1">Edge: <span className="text-white/90">Configurações → Sistema → Acelerar</span></span>
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-white/40" />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 py-3 px-6 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
            >
              Entendi
            </button>
            <button
              onClick={handleDontShowAgain}
              className="flex-1 py-3 px-6 bg-white/10 hover:bg-white/20 text-white/90 font-medium rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/10"
            >
              Não mostrar
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FPSToast;
