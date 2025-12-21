import { Link } from "react-router-dom";
import { Mail, FileText, Shield, DollarSign } from "lucide-react";

const Footer = () => {
  const allPages = [
    { path: "/", label: "Home" },
    { path: "/quran", label: "Qur'an" },
    { path: "/hadith", label: "Hadith" },
    { path: "/duas", label: "Duas" },
    { path: "/names", label: "99 Names of Allah" },
    { path: "/prayer-times", label: "Prayer Times" },
    { path: "/dhikr", label: "Dhikr" },
    { path: "/learning", label: "Learning" },
    { path: "/yasarna", label: "Yasarna" },
    { path: "/calendar", label: "Islamic Calendar" },
    { path: "/guides", label: "Guides" },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              About Rihlatul Hudah
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              رحلة الهدى (Journey of Guidance) is your comprehensive Islamic knowledge hub, 
              providing free access to the Qur'an, Hadith, prayers, and Islamic learning resources.
            </p>
          </div>

          {/* All Pages - Split into two columns */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Explore</h3>
            <ul className="space-y-2">
              {allPages.slice(0, 6).map((page) => (
                <li key={page.path}>
                  <Link 
                    to={page.path} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">More</h3>
            <ul className="space-y-2">
              {allPages.slice(6).map((page) => (
                <li key={page.path}>
                  <Link 
                    to={page.path} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Legal & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Support the Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Contact
            </h3>
            <p className="text-sm text-muted-foreground">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <a href="mailto:info@rihlatulhudah.com" className="text-sm text-primary hover:underline">
              info@rihlatulhudah.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              May Allah accept all our efforts and forgive our shortcomings. 🤲🏻🫡
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rihlatul Hudah. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
