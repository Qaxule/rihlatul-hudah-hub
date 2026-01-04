import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, ScrollText, Clock, Heart, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AppMenu } from './AppMenu';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/quran', label: 'Quran', icon: BookOpen },
  { path: '/hadith', label: 'Hadith', icon: ScrollText },
  { path: '/prayer-times', label: 'Prayers', icon: Clock },
  { path: '/dhikr', label: 'Dhikr', icon: Heart },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full py-2 px-1 transition-colors",
                isActive(item.path)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 mb-1",
                isActive(item.path) && "scale-110"
              )} />
              <span className={cn(
                "text-xs font-medium",
                isActive(item.path) && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          ))}
          
          {/* More menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full py-2 px-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>

      <AppMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
