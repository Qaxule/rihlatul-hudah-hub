import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bookmark, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSelector from "./ThemeSelector";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/quran", label: "Qur'an" },
    { path: "/hadith", label: "Hadith" },
    { path: "/duas", label: "Duas" },
    { path: "/names", label: "99 Names" },
    { path: "/prayer-times", label: "Prayer" },
    { path: "/dhikr", label: "Dhikr" },
    { path: "/learning", label: "Learn" },
    { path: "/yasarna", label: "Yasarna" },
    { path: "/calendar", label: "Calendar" },
    { path: "/guides", label: "Guides" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Rihlatul Hudah" className="h-8 w-8" />
            <div className="text-xl font-bold bg-gradient-emerald bg-clip-text text-transparent">
              Rihlatul Hudah
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/bookmarks"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted"
                >
                  Bookmarks
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
