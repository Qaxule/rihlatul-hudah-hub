import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Store scroll positions per route
const scrollPositions = new Map<string, number>();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Save scroll position of the page we're leaving
    const prevPath = prevPathRef.current;
    if (prevPath !== pathname) {
      scrollPositions.set(prevPath, window.scrollY);
    }
    prevPathRef.current = pathname;

    // Skip scroll restoration for Surah Reader
    if (pathname.startsWith('/surah/')) {
      return;
    }

    // Restore saved position or scroll to top
    const saved = scrollPositions.get(pathname);
    if (saved !== undefined) {
      requestAnimationFrame(() => {
        window.scrollTo(0, saved);
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
