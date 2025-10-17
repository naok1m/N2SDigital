import { useEffect } from 'react';

const SEOHead = ({ 
  title = "N2S Digital - Soluções Digitais Inovadoras",
  description = "N2S Digital cria soluções digitais personalizadas que conectam pessoas, fortalecem marcas e impulsionam o crescimento. Especialistas em desenvolvimento web, apps móveis, e-commerces e marketing digital em Fortaleza, CE.",
  keywords = "desenvolvimento web, aplicativos móveis, e-commerce, marketing digital, landing pages, sites corporativos, cardápios digitais, Fortaleza, Ceará, Brasil, tecnologia, inovação",
  image = "https://n2sgroup.com.br/src/assets/logoN2S.png",
  url = "https://n2sgroup.com.br",
  type = "website"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    updateMetaTag('name', 'description', description);
    
    // Update meta keywords
    updateMetaTag('name', 'keywords', keywords);
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:type', type);
    
    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);
    
    // Update canonical URL
    updateCanonicalUrl(url);
    
  }, [title, description, keywords, image, url, type]);

  const updateMetaTag = (attribute, value, content) => {
    let metaTag = document.querySelector(`meta[${attribute}="${value}"]`);
    
    if (metaTag) {
      metaTag.setAttribute('content', content);
    } else {
      metaTag = document.createElement('meta');
      metaTag.setAttribute(attribute, value);
      metaTag.setAttribute('content', content);
      document.head.appendChild(metaTag);
    }
  };

  const updateCanonicalUrl = (url) => {
    let canonical = document.querySelector('link[rel="canonical"]');
    
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', url);
      document.head.appendChild(canonical);
    }
  };

  return null; // This component doesn't render anything
};

export default SEOHead;
