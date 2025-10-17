import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

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

export const useThrottle = (callback, delay) => {
  const [throttledCallback, setThrottledCallback] = useState(callback);
  const lastRun = useRef(Date.now());

  useEffect(() => {
    if (Date.now() >= lastRun.current + delay) {
      lastRun.current = Date.now();
      setThrottledCallback(callback);
    } else {
      const timer = setTimeout(() => {
        lastRun.current = Date.now();
        setThrottledCallback(callback);
      }, delay - (Date.now() - lastRun.current));

      return () => clearTimeout(timer);
    }
  }, [callback, delay]);

  return throttledCallback;
};
