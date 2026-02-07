import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ThemeSelector from '@/components/ThemeSelector';
import { useAuth } from '@/contexts/AuthContext';
import {
  BookOpen,
  ScrollText,
  Heart,
  Clock,
  GraduationCap,
  Calendar,
  Sparkles,
  BookMarked,
  LogIn,
  LogOut,
  User,
  FileText,
  Shield,
  DollarSign,
  Star,
  Compass,
  Settings,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface AppMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuSections = [
  {
    title: 'Explore',
    items: [
      { path: '/quran', label: 'Qur\'an', icon: BookOpen },
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

export const AppMenu = ({ open, onClose }: AppMenuProps) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] overflow-y-auto safe-area-top safe-area-bottom">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Menu & Settings
          </SheetTitle>
        </SheetHeader>

        {/* Theme Toggle */}
        <div className="py-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Theme</h3>
          <ThemeSelector />
        </div>

        <Separator />

        {/* User Section */}
        <div className="py-4">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Logged in</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full p-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span className="font-medium">Sign In</span>
            </Link>
          )}
        </div>

        <Separator />

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.title} className="py-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{section.title}</h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <Separator />

        {/* Legal */}
        <div className="py-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Legal</h3>
          <div className="space-y-1">
            {legalItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-sm"
              >
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="py-4 text-center text-xs text-muted-foreground">
          <p>Rihlatul Hudah</p>
          <p className="mt-1">رحلة الهدى</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
