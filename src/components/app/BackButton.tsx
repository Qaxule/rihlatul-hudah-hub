import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

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
  '/support': 'Support',
  '/menu': 'More',
  '/login': 'Login',
  '/signup': 'Sign Up',
  '/popular': 'Popular',
  '/privacy-policy': 'Privacy',
  '/terms-of-use': 'Terms',
  '/disclaimer': 'Disclaimer',
};

// Pages that already have their own back button — don't show ours
const PAGES_WITH_OWN_BACK = [
  '/reflections',
  '/surah/',
  '/guides/',
];

const getPageTitle = (pathname: string): string | null => {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith('/names/')) return '99 Names';
  if (pathname.startsWith('/learning/')) return 'Lesson';
  if (pathname.startsWith('/guides/')) return 'Guide';
  return null;
};

const shouldHideBackButton = (pathname: string): boolean => {
  if (pathname === '/') return true;
  return PAGES_WITH_OWN_BACK.some(p => 
    p.endsWith('/') ? pathname.startsWith(p) : pathname === p
  );
};

/**
 * A floating back button with page title for mobile navigation.
 * Hidden on home page and pages that have their own back navigation.
 */
export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (shouldHideBackButton(location.pathname)) return null;

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

/**
 * Swipe-right-to-go-back gesture layer for mobile.
 * Renders an invisible edge zone on the left side of the screen.
 */
export const SwipeBackGesture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 100], [0, 0.3]);
  const iconX = useTransform(x, [0, 100], [-20, 10]);
  const iconOpacity = useTransform(x, [20, 60], [0, 1]);

  // Don't enable on home page
  if (location.pathname === '/') return null;

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 80 && info.velocity.x > 100) {
      navigate(-1);
    }
  };

  return (
    <>
      {/* Visual feedback overlay */}
      <motion.div
        className="fixed inset-y-0 left-0 w-16 z-[55] pointer-events-none md:hidden flex items-center"
        style={{ opacity }}
      >
        <motion.div
          className="ml-2 w-8 h-8 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center"
          style={{ x: iconX, opacity: iconOpacity }}
        >
          <ChevronLeft className="w-4 h-4 text-foreground/60" />
        </motion.div>
      </motion.div>

      {/* Invisible drag zone on left edge */}
      <motion.div
        className="fixed inset-y-0 left-0 w-5 z-[55] md:hidden touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x }}
      />
    </>
  );
};
