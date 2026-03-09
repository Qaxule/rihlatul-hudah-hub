import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ThemeSelector from '@/components/ThemeSelector';
import PageWrapper from '@/components/app/PageWrapper';
import {
  BookOpen, ScrollText, Heart, Clock, GraduationCap, Calendar,
  Sparkles, BookMarked, LogIn, LogOut, User, FileText, Shield,
  DollarSign, Star, Compass, Palette, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const menuSections = [
  {
    title: 'Explore',
    items: [
      { path: '/quran', label: "Qur'an", icon: BookOpen },
      { path: '/hadith', label: 'Hadith', icon: ScrollText },
      { path: '/duas', label: 'Duas', icon: Heart },
      { path: '/names', label: '99 Names of Allah', icon: Sparkles },
      { path: '/popular', label: 'Popular Verses', icon: Star },
    ],
  },
  {
    title: 'Practice',
    items: [
      { path: '/prayer-times', label: 'Prayer Times', icon: Clock },
      { path: '/dhikr', label: 'Dhikr Counter', icon: Heart },
      { path: '/calendar', label: 'Islamic Calendar', icon: Calendar },
    ],
  },
  {
    title: 'Learn',
    items: [
      { path: '/learning', label: 'Learn Islam', icon: GraduationCap },
      { path: '/yasarna', label: 'Yasarna', icon: BookMarked },
      { path: '/guides', label: 'Guides', icon: Compass },
    ],
  },
  {
    title: 'Community',
    items: [
      { path: '/reflections', label: 'Reflections', icon: Sparkles },
      { path: '/bookmarks', label: 'Bookmarks', icon: BookMarked },
      { path: '/support', label: 'Support Us', icon: DollarSign },
    ],
  },
];

const legalItems = [
  { path: '/privacy-policy', label: 'Privacy Policy', icon: FileText },
  { path: '/terms-of-use', label: 'Terms of Use', icon: FileText },
  { path: '/disclaimer', label: 'Disclaimer', icon: Shield },
];

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

const Menu = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  let globalIndex = 0;

  return (
    <PageWrapper showNavigation={false} showFooter={false}>
      <div className="px-4 py-6 space-y-5 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-lg font-semibold text-foreground tracking-tight">Menu</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Navigate & customize</p>
        </div>

        {/* User Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {user ? (
            <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{user.email}</p>
                  <p className="text-[11px] text-muted-foreground">Signed in</p>
                </div>
              </div>
              <button
                onClick={signOut}
                className="mt-3 flex items-center gap-2 text-xs font-medium text-destructive hover:text-destructive/80 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-all group"
            >
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <LogIn className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Sign In</p>
                <p className="text-[11px] text-muted-foreground">Access your bookmarks & progress</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          )}
        </motion.div>

        {/* Theme */}
        <div className="rounded-2xl bg-muted/40 border border-border/40 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Theme</span>
          </div>
          <ThemeSelector />
        </div>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.title}>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
              {section.title}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {section.items.map((item) => {
                const currentIndex = globalIndex++;
                const active = isActive(item.path);
                return (
                  <motion.div
                    key={item.path}
                    custom={currentIndex}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    <Link
                      to={item.path}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-center",
                        active
                          ? "bg-primary/8 border-primary/20 text-primary"
                          : "bg-card/50 border-border/40 text-foreground hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                        active ? "bg-primary/15" : "bg-muted/60"
                      )}>
                        <item.icon className={cn(
                          "w-5 h-5",
                          active ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                      <span className={cn(
                        "text-xs leading-tight",
                        active ? "font-semibold" : "font-medium"
                      )}>
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Legal */}
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
            Legal
          </p>
          <div className="rounded-2xl border border-border/40 overflow-hidden bg-card/50">
            {legalItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
                  idx < legalItems.length - 1 && "border-b border-border/30"
                )}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground font-medium">Rihlatul Hudah</p>
          <p className="text-xs text-muted-foreground/70 mt-0.5">رحلة الهدى</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Menu;
