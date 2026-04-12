import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * A floating back button for mobile navigation.
 * Hidden on the home page and on desktop (where browser back works fine).
 */
export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === '/') return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
      onClick={() => navigate(-1)}
      className="fixed top-3 left-3 z-[60] md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-background/80 backdrop-blur-lg border border-border/50 shadow-sm text-foreground active:scale-95 transition-transform"
      aria-label="Go back"
    >
      <ChevronLeft className="w-5 h-5" />
    </motion.button>
  );
};
