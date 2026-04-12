import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const PAGE_TITLES: Record<string, string> = {
  '/quran': 'Quran',
  '/hadith': 'Hadith',
  '/duas': 'Duas',
  '/names': '99 Names',
  '/prayer-times': 'Prayer Times',
  '/dhikr': 'Dhikr',
  '/learning': 'Learn',
  '/yasarna': 'Yasarna',
  '/calendar': 'Calendar',
  '/guides': 'Guides',
  '/bookmarks': 'Bookmarks',
  '/profile': 'Profile',
  '/reflections': 'Reflections',
  '/support': 'Support',
  '/menu': 'More',
  '/login': 'Login',
  '/signup': 'Sign Up',
  '/popular': 'Popular',
  '/privacy-policy': 'Privacy',
  '/terms-of-use': 'Terms',
  '/disclaimer': 'Disclaimer',
};

const getPageTitle = (pathname: string): string | null => {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith('/names/')) return '99 Names';
  if (pathname.startsWith('/learning/')) return 'Lesson';
  if (pathname.startsWith('/guides/')) return 'Guide';
  return null;
};

/**
 * A floating back button with page title for mobile navigation.
 * Hidden on home page, surah reader (has its own back link), and desktop.
 */
export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page or surah reader pages
  if (location.pathname === '/' || location.pathname.startsWith('/surah/')) return null;

  const title = getPageTitle(location.pathname);

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
      onClick={() => navigate(-1)}
      className="fixed top-3 left-3 z-[60] md:hidden flex items-center gap-1 h-9 pl-2 pr-3 rounded-full bg-background/80 backdrop-blur-lg border border-border/50 shadow-sm text-foreground active:scale-95 transition-transform"
      aria-label="Go back"
    >
      <ChevronLeft className="w-4 h-4" />
      {title && (
        <span className="text-xs font-medium truncate max-w-[100px]">{title}</span>
      )}
    </motion.button>
  );
};
