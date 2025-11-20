import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip scroll-to-top for Surah Reader as it has its own scroll restoration
    if (pathname.startsWith('/surah/')) {
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
