import React, { useRef, useState } from 'react';

const InteractiveProjectCard = ({ title, description, technologies }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    // Pega as dimensões e a posição do card na tela
    const { left, top, width, height } = card.getBoundingClientRect();
    
    // Calcula a posição do mouse DENTRO do card (de 0 a width/height)
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Define a intensidade da rotação
    const rotationIntensity = 15; // em graus

    // Calcula a rotação nos eixos X e Y.
    // O valor vai de -rotationIntensity a +rotationIntensity.
    // O sinal negativo no rotateX faz o card inclinar na direção "natural".
    const rotateX = ((y - centerY) / centerY) * -rotationIntensity; 
    const rotateY = ((x - centerX) / centerX) * rotationIntensity;

    // Aplica o estilo dinâmico no estado
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out' // Transição rápida para seguir o mouse
    });
  };

  const handleMouseLeave = () => {
    // Reseta o card para a posição original de forma suave ao tirar o mouse
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' // Transição mais lenta para voltar
    });
  };

  return (
    <div
      ref={cardRef}
      className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-gray-200/80 shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transformStyle: 'preserve-3d' }}
    >
      <h3 className="text-3xl font-bold mb-3 text-violet-700" style={{ transform: 'translateZ(50px)' }}>
        {title}
      </h3>
      <p className="text-gray-700" style={{ transform: 'translateZ(30px)' }}>
        {description}
      </p>
      <span className="text-sm text-gray-600 block mt-4" style={{ transform: 'translateZ(20px)' }}>
        Tecnologias: {technologies}
      </span>
    </div>
  );
};

export default InteractiveProjectCard;