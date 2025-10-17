// Google Analytics 4 utility
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Substituir pelo ID real

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Eventos específicos para N2S Digital
export const trackWhatsAppClick = () => {
  event({
    action: 'whatsapp_click',
    category: 'engagement',
    label: 'whatsapp_button',
    value: 1
  });
};

export const trackFormSubmit = (formType) => {
  event({
    action: 'form_submit',
    category: 'conversion',
    label: formType,
    value: 1
  });
};

export const trackServiceClick = (serviceName) => {
  event({
    action: 'service_click',
    category: 'engagement',
    label: serviceName,
    value: 1
  });
};

export const trackProjectModalOpen = () => {
  event({
    action: 'project_modal_open',
    category: 'engagement',
    label: 'project_modal',
    value: 1
  });
};

export const trackScrollDepth = (depth) => {
  event({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${depth}%`,
    value: depth
  });
};

export const trackPageView = (pageName) => {
  event({
    action: 'page_view',
    category: 'navigation',
    label: pageName,
    value: 1
  });
};

// Função para inicializar GA4
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Carregar script do GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Inicializar gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
  }
};
