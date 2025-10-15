import React, { useState, useEffect } from 'react';

// Utilitário para otimização de imagens
export const supportsWebP = () => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Componente de imagem otimizada (versão simplificada)
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  width,
  height,
  placeholder = true,
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleLoad = () => {
    setImageLoaded(true);
  };
  
  const handleError = () => {
    setImageError(true);
    setImageLoaded(true);
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder blur */}
      {placeholder && !imageLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C53E3' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}
        />
      )}
      
      {/* Imagem */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          willChange: 'opacity',
          ...props.style
        }}
        {...props}
      />
      
      {/* Fallback para erro */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <span className="text-sm">Erro ao carregar imagem</span>
        </div>
      )}
    </div>
  );
};

// Hook para lazy loading de imagens
export const useLazyImage = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  
  useEffect(() => {
    if (!src || !imageRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );
    
    observer.observe(imageRef);
    
    return () => observer.disconnect();
  }, [src, imageRef, options]);
  
  return [imageSrc, setImageRef];
};

// Função para comprimir imagens
export const compressImage = (file, quality = 0.8, maxWidth = 1920) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calcular novas dimensões mantendo proporção
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, width, height);
      
      // Converter para blob
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Preload de imagens críticas
export const preloadImage = (src) => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

// Preload de múltiplas imagens
export const preloadImages = (srcs) => {
  srcs.forEach(preloadImage);
};