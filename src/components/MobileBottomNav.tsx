import { Link, useLocation } from "react-router-dom";
import { Home, Book, Heart, User, Menu, X, BookOpen, Calendar, GraduationCap, Compass, Gem, HandHeart, FileText, Shield, Mail, Settings, LogOut, LogIn, Bookmark } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const MobileBottomNav = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const mainNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/quran", label: "Qur'an", icon: Book },
    { path: "/dhikr", label: "Dhikr", icon: Heart },
  ];

  const menuItems = [
    { section: "Content", items: [
      { path: "/hadith", label: "Hadith", icon: BookOpen },
      { path: "/duas", label: "Duas", icon: Heart },
      { path: "/names", label: "99 Names", icon: Gem },
      { path: "/popular", label: "Popular", icon: Book },
    ]},
    { section: "Learn", items: [
      { path: "/learning", label: "Learning", icon: GraduationCap },
      { path: "/yasarna", label: "Yasarna", icon: BookOpen },
      { path: "/guides", label: "Guides", icon: Compass },
    ]},
    { section: "Tools", items: [
      { path: "/prayer-times", label: "Prayer Times", icon: Compass },
      { path: "/calendar", label: "Calendar", icon: Calendar },
    ]},
    { section: "Support", items: [
      { path: "/support", label: "Donate", icon: HandHeart },
    ]},
    { section: "Legal", items: [
      { path: "/privacy-policy", label: "Privacy Policy", icon: FileText },
      { path: "/terms-of-use", label: "Terms of Use", icon: FileText },
      { path: "/disclaimer", label: "Disclaimer", icon: Shield },
    ]},
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {mainNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors ${
              isActive(item.path)
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className={`h-5 w-5 ${isActive(item.path) ? "stroke-[2.5]" : ""}`} />
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </Link>
        ))}

        {/* Profile/Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button
              className={`flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors ${
                isMenuOpen ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Menu className={`h-5 w-5 ${isMenuOpen ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-medium mt-1">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-lg">Menu</SheetTitle>
            </SheetHeader>
            
            <div className="overflow-y-auto h-full pb-20 -mx-6 px-6">
              {/* User Section */}
              <div className="mb-6">
                {user ? (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Welcome back!</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-3 bg-primary text-primary-foreground rounded-xl"
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="font-medium">Sign in to your account</span>
                  </Link>
                )}
              </div>

              {/* Quick Actions */}
              {user && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Link
                    to="/bookmarks"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl"
                  >
                    <Bookmark className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Bookmarks</span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl text-left"
                  >
                    <LogOut className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Sign out</span>
                  </button>
                </div>
              )}

              {/* Menu Sections */}
              {menuItems.map((section, idx) => (
                <div key={section.section} className="mb-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                    {section.section}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                          isActive(item.path)
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                  {idx < menuItems.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}

              {/* Contact */}
              <div className="mt-6 p-4 bg-muted/30 rounded-xl text-center">
                <Mail className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground mb-1">Questions or feedback?</p>
                <a href="mailto:info@rihlatulhudah.com" className="text-sm text-primary">
                  info@rihlatulhudah.com
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
