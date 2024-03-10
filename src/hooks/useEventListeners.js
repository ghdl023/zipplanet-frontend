import { useEffect } from 'react';

export const useEventListeners = (eventName, handler, options) => {
  useEffect(() => {
    window.addEventListener(eventName, handler, options);

    return () => {
      window.removeEventListener(eventName, handler, options);
    };
  }, [eventName, handler, options]);
};
