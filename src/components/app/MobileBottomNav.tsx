import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Sparkles, MoreHorizontal, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AppMenu } from './AppMenu';
import { motion } from 'framer-motion';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/quran', label: 'Quran', icon: BookOpen },
  { path: '/reflections', label: 'Reflections', icon: Sparkles },
  { path: '/bookmarks', label: 'Profile', icon: User },
];

export const MobileBottomNav = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Frosted glass background */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl border-t border-border/40 shadow-[0_-2px_20px_rgba(0,0,0,0.06)]" />
        
        {/* Safe area padding for notched devices */}
        <div className="relative flex items-center justify-around h-[4.5rem] px-3 pb-[env(safe-area-inset-bottom,8px)]">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center flex-1 h-full py-2 px-1 relative"
              >
                <motion.div
                  className="flex flex-col items-center justify-center"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  
                  <div className={cn(
                    "p-2 rounded-2xl transition-all duration-200",
                    active 
                      ? "bg-primary/10" 
                      : "bg-transparent"
                  )}>
                    <item.icon className={cn(
                      "w-5 h-5 transition-all duration-200",
                      active
                        ? "text-primary"
                        : "text-muted-foreground"
                    )} />
                  </div>
                  
                  <span className={cn(
                    "text-[10px] mt-0.5 font-medium transition-all duration-200",
                    active 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
          
          {/* More menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full py-2 px-1"
          >
            <motion.div
              className="flex flex-col items-center justify-center"
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="p-2 rounded-2xl bg-transparent">
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-[10px] mt-0.5 font-medium text-muted-foreground">
                More
              </span>
            </motion.div>
          </button>
        </div>
      </nav>

      <AppMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
