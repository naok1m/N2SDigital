import React, { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  width,
  height,
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Erro ao carregar imagem</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gray-800 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
