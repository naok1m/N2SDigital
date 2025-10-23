import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGlobe, 
  faRocket, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import { OptimizedImage } from '../utils/imageOptimization.jsx';

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  category, 
  categoryIcon 
}) => {
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
        <button className="w-full text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 group text-sm service-cta-button">
          <span>Ver Projeto</span>
          <FontAwesomeIcon 
            icon={faArrowRight} 
            className="text-sm transform transition-transform duration-300 group-hover:translate-x-1" 
          />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
