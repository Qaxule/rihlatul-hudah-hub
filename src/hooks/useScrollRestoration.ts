import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const scrollPositions = new Map<string, number>();

/**
 * Saves scroll position when leaving a page and restores it when returning.
 */
export const useScrollRestoration = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Save scroll position of previous page
    const prevPath = prevPathRef.current;
    if (prevPath !== location.pathname) {
      scrollPositions.set(prevPath, window.scrollY);
    }
    prevPathRef.current = location.pathname;

    // Restore scroll position if we have one saved (slight delay for render)
    const saved = scrollPositions.get(location.pathname);
    if (saved !== undefined) {
      requestAnimationFrame(() => {
        window.scrollTo(0, saved);
      });
    }
  }, [location.pathname]);
};

export const clearScrollPosition = (path: string) => {
  scrollPositions.delete(path);
};
