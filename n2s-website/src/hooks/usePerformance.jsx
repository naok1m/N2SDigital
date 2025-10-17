import React, { useEffect, useRef } from 'react';
import { trackScrollDepth, trackPageView } from '../utils/analytics';

// Hook para monitorar Core Web Vitals
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitorar Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        const lcp = lastEntry.startTime;
        console.log('LCP:', lcp);
        
        // Enviar para analytics se necessário
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'LCP',
            value: Math.round(lcp)
          });
        }
      }
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitorar First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fid = entry.processingStart - entry.startTime;
        console.log('FID:', fid);
        
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Performance',
            event_label: 'FID',
            value: Math.round(fid)
          });
        }
      });
    });
    
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Monitorar Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      console.log('CLS:', clsValue);
      
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'CLS',
          value: Math.round(clsValue * 1000)
        });
      }
    });
    
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Cleanup
    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);
};

// Hook para monitorar scroll depth
export const useScrollTracking = () => {
  const scrollDepths = useRef(new Set());
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      // Track milestones de 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollDepths.current.has(milestone)) {
          scrollDepths.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Hook para monitorar tempo de permanência na página
export const usePageTimeTracking = (pageName) => {
  const startTime = useRef(Date.now());
  
  useEffect(() => {
    trackPageView(pageName);
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      
      if (window.gtag) {
        window.gtag('event', 'page_time', {
          event_category: 'Engagement',
          event_label: pageName,
          value: timeSpent
        });
      }
    };
  }, [pageName]);
};

// Componente para monitorar performance de componentes
export const PerformanceMonitor = ({ children, componentName }) => {
  const startTime = useRef(Date.now());
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    const renderTime = Date.now() - startTime.current;
    
    if (renderTime > 100) { // Log apenas renders lentos
      console.warn(`Slow render detected in ${componentName}:`, renderTime, 'ms');
    }
    
    startTime.current = Date.now();
  });
  
  return children;
};

// Função para medir performance de funções
export const measurePerformance = (fn, name) => {
  return (...args) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  };
};

// Hook para otimizar re-renders
export const useOptimizedCallback = (callback, deps) => {
  return React.useCallback(callback, deps);
};

// Hook para otimizar valores computados
export const useOptimizedMemo = (factory, deps) => {
  return React.useMemo(factory, deps);
};

// Função para debounce
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// Função para throttle
export const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastExecuted = useRef(Date.now());
  
  useEffect(() => {
    const now = Date.now();
    
    if (now - lastExecuted.current >= delay) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay - (now - lastExecuted.current));
      
      return () => clearTimeout(timer);
    }
  }, [value, delay]);
  
  return throttledValue;
};
