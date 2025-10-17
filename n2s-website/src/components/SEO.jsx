import React, { useEffect } from 'react';
import { initGA } from '../utils/analytics';

const SEO = ({
  title = "N2S Digital - Desenvolvimento Web e Marketing Digital em Fortaleza",
  description = "Agência digital especializada em desenvolvimento web, aplicativos mobile, design UI/UX e marketing digital. Transformamos ideias em realidade digital em Fortaleza, CE.",
  keywords = "desenvolvimento web, aplicativo mobile, design UI/UX, marketing digital, Fortaleza, agência digital, website, e-commerce, landing page",
  image = "/og-image.jpg",
  url = "https://n2sdigital.com",
  type = "website",
  siteName = "N2S Digital",
  locale = "pt_BR",
  structuredData = null
}) => {
  const fullTitle = title.includes("N2S Digital") ? title : `${title} | N2S Digital`;
  const fullUrl = url.startsWith("http") ? url : `https://n2sdigital.com${url}`;
  const fullImage = image.startsWith("http") ? image : `https://n2sdigital.com${image}`;

  useEffect(() => {
    // Inicializar Google Analytics
    initGA();
    
    // Atualizar título da página
    document.title = fullTitle;
    
    // Função para atualizar ou criar meta tag
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Meta tags básicas
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'N2S Digital');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('theme-color', '#9C53E3');
    
    // Open Graph
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', locale, true);
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', fullUrl);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImage);
    updateMetaTag('twitter:site', '@n2sdigital');
    updateMetaTag('twitter:creator', '@n2sdigital');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
    
    // Structured Data
    if (structuredData) {
      // Remover structured data anterior
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [fullTitle, description, keywords, fullUrl, fullImage, type, siteName, locale, structuredData]);

  return null; // Este componente não renderiza nada visualmente
};

export default SEO;
