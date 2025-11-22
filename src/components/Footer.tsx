import { Link } from "react-router-dom";
import { Mail, FileText, Shield, DollarSign } from "lucide-react";
const Footer = () => {
  return <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/quran" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Qur'an
                </Link>
              </li>
              <li>
                <Link to="/hadith" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Hadith
                </Link>
              </li>
              <li>
                <Link to="/names" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  99 Names of Allah
                </Link>
              </li>
              <li>
                <Link to="/duas" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Duas
                </Link>
              </li>
              <li>
                <Link to="/learning" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link to="/prayer-times" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Prayer Times
                </Link>
              </li>
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Rihlatul Hudah. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              May Allah accept our effort and forgive our shortcomings.            for the Ummah
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;