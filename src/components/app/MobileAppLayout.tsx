import { ReactNode } from 'react';
import { MobileBottomNav } from './MobileBottomNav';
import { cn } from '@/lib/utils';

interface MobileAppLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * Layout wrapper for mobile app mode.
 * Provides bottom navigation and proper spacing for mobile devices.
 */
export const MobileAppLayout = ({ 
  children, 
  className 
}: MobileAppLayoutProps) => {
  return (
    <div className={cn("min-h-screen flex flex-col bg-background", className)}>
      {/* Main content with bottom padding for nav bar */}
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      {/* Fixed bottom navigation */}
      <MobileBottomNav />
    </div>
  );
};
