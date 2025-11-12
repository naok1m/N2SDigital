import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGlobe, 
  faRocket, 
  faArrowRight,
  faTimes,
  faCheck,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { OptimizedImage } from '../utils/imageOptimization.jsx';

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  category, 
  categoryIcon 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevenir scroll do body
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  // Função para obter o ícone da categoria
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Sites':
        return faGlobe;
      case 'Landing Pages':
        return faRocket;
      default:
        return faGlobe;
    }
  };

  // Tecnologias utilizadas (pode ser customizado por projeto)
  const getTechnologies = (title) => {
    // Tecnologias padrão baseadas no tipo de projeto
    if (category === 'Landing Pages') {
      return ['React', 'Tailwind CSS', 'GSAP', 'Vite'];
    } else if (category === 'Sites') {
      return ['React', 'Node.js', 'MySQL', 'GSAP'];
    } else {
      return ['React', 'JavaScript', 'CSS3', 'HTML5'];
    }
  };

  // Características do projeto
  const characteristics = [
    'Design Responsivo',
    'SEO Friendly',
    'Performance Otimizada',
    'Código Limpo'
  ];


  return (
    <div className="w-full max-w-2xl mx-auto bg-[rgba(255,255,255,0.03)] backdrop-blur-[20px] rounded-2xl border border-white/8 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col hover:bg-[rgba(255,255,255,0.06)] hover:border-purple-500/30">
      {/* Seção Visual - 60-70% da altura */}
      <div className="relative w-full flex-shrink-0" style={{ aspectRatio: '16/9' }}>
        <OptimizedImage 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Tag da Categoria - Canto superior direito */}
        <div className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-purple-800 backdrop-blur-md border border-purple-500/30 text-white">
          <FontAwesomeIcon 
            icon={getCategoryIcon(category)} 
            className="text-xs" 
          />
          {category}
        </div>
      </div>

      {/* Seção de Informações - 30-40% da altura */}
      <div className="p-8 flex flex-col flex-grow">
        {/* Título */}
        <h3 className="text-xl font-bold text-white leading-tight mb-3">
          {title}
        </h3>

        {/* Descrição */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
          {description}
        </p>

        {/* Botão Ver Projeto - Sempre na parte inferior */}
        <button 
          onClick={openModal}
          className="w-full text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 group text-sm service-cta-button"
        >
          <span>Ver Projeto</span>
          <FontAwesomeIcon 
            icon={faArrowRight} 
            className="text-sm transform transition-transform duration-300 group-hover:translate-x-1" 
          />
        </button>
      </div>

      {/* Modal de Projeto Detalhado - Renderizado via Portal no body */}
      {isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={handleOverlayClick}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          {/* Container do Modal */}
          <div 
            className="relative bg-gradient-to-br from-[#0a0a0f] to-[#1a0b2e] rounded-2xl border border-purple-500/30 shadow-2xl max-w-3xl w-full my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
          >
            {/* Botão Fechar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[10000] w-10 h-10 rounded-full bg-white/10 hover:bg-purple-600/50 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:rotate-90"
              aria-label="Fechar modal"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>

            {/* Container com scroll - Inclui imagem e conteúdo */}
            <div className="overflow-y-auto flex-1" style={{ maxHeight: '85vh' }}>
              {/* Imagem do Projeto - Faz parte do scroll */}
              <div className="relative w-full h-48 sm:h-64 lg:h-72 overflow-hidden">
                <OptimizedImage 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-contain bg-[#0a0a0f]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-6 sm:p-8 space-y-6">
              {/* Título e Metadados */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    {title}
                  </h2>
                </div>
                
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Categoria */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium">
                    <FontAwesomeIcon 
                      icon={getCategoryIcon(category)} 
                      className="text-sm" 
                    />
                    {category}
                  </div>
                  
                  {/* Data */}
                  <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                    <FontAwesomeIcon icon={faCalendar} className="text-sm" />
                    <span>{new Date().toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Sobre o Projeto */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Sobre o Projeto</h3>
                <p className="text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Tecnologias Utilizadas */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Tecnologias Utilizadas</h3>
                <div className="flex flex-wrap gap-3">
                  {getTechnologies(title).map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium hover:bg-purple-500/20 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Características */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Características</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {characteristics.map((char, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={faCheck} className="text-xs text-white" />
                      </div>
                      <span className="text-sm">{char}</span>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProjectCard;
