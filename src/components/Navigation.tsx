import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bookmark, LogIn, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSelector from "./ThemeSelector";
import { useAuth } from "@/contexts/AuthContext";
import { useCapacitor } from "@/hooks/useCapacitor";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isNativeApp } = useCapacitor();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/quran", label: "Qur'an" },
    { path: "/hadith", label: "Hadith" },
    { path: "/duas", label: "Duas" },
    { path: "/names", label: "99 Names" },
    { path: "/dhikr", label: "Dhikr" },
    { path: "/learning", label: "Learn" },
    { path: "/yasarna", label: "Yasarna" },
    { path: "/calendar", label: "Calendar" },
    { path: "/guides", label: "Guides" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // In native app, only show the minimal mobile header (no desktop nav)
  if (isNativeApp) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-top">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Rihlatul Hudah" className="h-7 w-7" />
              <span className="text-base font-semibold text-foreground">Rihlatul Hudah</span>
            </Link>
            <ThemeSelector />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Desktop Header - Full */}
        <div className="hidden md:flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Rihlatul Hudah" className="h-8 w-8" />
            <div className="text-xl font-bold bg-gradient-emerald bg-clip-text text-transparent">
              Rihlatul Hudah
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link to="/support">
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                <Heart className="h-4 w-4 mr-2" />
                Donate
              </Button>
            </Link>
            <ThemeSelector />
            {user ? (
              <>
                <Link to="/bookmarks">
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => signOut()}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Header - Minimal */}
        <div className="md:hidden flex h-12 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Rihlatul Hudah" className="h-7 w-7" />
            <span className="text-base font-semibold text-foreground">Rihlatul Hudah</span>
          </Link>
          <ThemeSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
