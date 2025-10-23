import React from 'react';

const InteractiveProjectCard = ({ title, description, technologies }) => {

  return (
    <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-gray-200/80 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full max-w-xl" style={{ aspectRatio: '16/9' }}>
      <h3 className="text-3xl font-bold mb-3 text-violet-700">
        {title}
      </h3>
      <p className="text-gray-700">
        {description}
      </p>
      <span className="text-sm text-gray-600 block mt-4">
        Tecnologias: {technologies}
      </span>
    </div>
  );
};

export default InteractiveProjectCard;