import { ReactNode } from 'react';
import { useMobileAppMode } from '@/hooks/useMobileAppMode';
import { MobileAppLayout } from './MobileAppLayout';

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

/**
 * Main app layout that switches between:
 * - Mobile app mode: Bottom navigation, no header/footer (mobile web + native)
 * - Desktop mode: Traditional navigation and footer (desktop web)
 */
export const AppLayout = ({ 
  children, 
  className 
}: AppLayoutProps) => {
  const { isMobileAppMode } = useMobileAppMode();

  // Mobile app mode: use mobile-specific layout with bottom nav
  if (isMobileAppMode) {
    return (
      <MobileAppLayout className={className}>
        {children}
      </MobileAppLayout>
    );
  }

  // Desktop: render children as-is (pages handle their own Navigation/Footer)
  return <>{children}</>;
};
