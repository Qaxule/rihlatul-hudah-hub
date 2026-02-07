import { ReactNode } from 'react';
import { useMobileAppMode } from '@/hooks/useMobileAppMode';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFooter?: boolean;
  className?: string;
}

/**
 * PageWrapper handles the conditional rendering of Navigation and Footer
 * based on whether the app is in mobile app mode or desktop mode.
 * 
 * - Mobile app mode (mobile web + native): Navigation and Footer are hidden
 * - Desktop mode: Navigation and Footer are shown
 */
export const PageWrapper = ({ 
  children, 
  showNavigation = true, 
  showFooter = true,
  className 
}: PageWrapperProps) => {
  const { isMobileAppMode } = useMobileAppMode();

  return (
    <div className={cn("min-h-screen bg-background flex flex-col", className)}>
      {/* Show Navigation only on desktop */}
      {!isMobileAppMode && showNavigation && <Navigation />}
      
      {/* Main content */}
      <div className="flex-1">
        {children}
      </div>
      
      {/* Show Footer only on desktop */}
      {!isMobileAppMode && showFooter && <Footer />}
    </div>
  );
};

export default PageWrapper;
