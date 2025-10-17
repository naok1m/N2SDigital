import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Google Analytics 4
    const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 tracking ID
    
    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });
    `;
    document.head.appendChild(script2);

    // Google Tag Manager
    const GTM_ID = 'GTM-XXXXXXX'; // Replace with your GTM ID
    
    const gtmScript1 = document.createElement('script');
    gtmScript1.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(gtmScript1);

    // Facebook Pixel (optional)
    const FB_PIXEL_ID = 'XXXXXXXXXXXXXXX'; // Replace with your Facebook Pixel ID
    
    const fbScript = document.createElement('script');
    fbScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbScript);

    // Track page views on route changes
    const trackPageView = () => {
      if (typeof gtag !== 'undefined') {
        gtag('config', GA_TRACKING_ID, {
          page_title: document.title,
          page_location: window.location.href,
          send_page_view: true
        });
      }
      
      if (typeof fbq !== 'undefined') {
        fbq('track', 'PageView');
      }
    };

    // Track page view on initial load
    trackPageView();

    // Track page view on popstate (back/forward navigation)
    window.addEventListener('popstate', trackPageView);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', trackPageView);
    };
  }, []);

  return null;
};

// Utility functions for tracking events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }
  
  if (typeof fbq !== 'undefined') {
    fbq('track', eventName, parameters);
  }
};

export const trackConversion = (conversionId, value = 0, currency = 'BRL') => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': conversionId,
      'value': value,
      'currency': currency
    });
  }
};

export default Analytics;

