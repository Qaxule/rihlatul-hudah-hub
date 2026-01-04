import { ReactNode } from 'react';
import { useNativeAppContext } from '@/contexts/NativeAppContext';
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
 * based on whether the app is running as a native Capacitor app or in a browser.
 * 
 * - In native app: Navigation and Footer are hidden
 * - In web browser: Navigation and Footer are shown
 */
export const PageWrapper = ({ 
  children, 
  showNavigation = true, 
  showFooter = true,
  className 
}: PageWrapperProps) => {
  const { isNativeApp } = useNativeAppContext();

  return (
    <div className={cn("min-h-screen bg-background flex flex-col", className)}>
      {/* Show Navigation only on web */}
      {!isNativeApp && showNavigation && <Navigation />}
      
      {/* Main content */}
      <div className="flex-1">
        {children}
      </div>
      
      {/* Show Footer only on web */}
      {!isNativeApp && showFooter && <Footer />}
    </div>
  );
};

export default PageWrapper;
