import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedRoutesProps {
  children: ReactNode;
}

export const AnimatedRoutes = ({ children }: AnimatedRoutesProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
