import { ReactNode } from 'react';
import { useNativeAppContext } from '@/contexts/NativeAppContext';
import { BottomNavigation } from './BottomNavigation';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const AppLayout = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  className 
}: AppLayoutProps) => {
  const { isNativeApp } = useNativeAppContext();

  if (!isNativeApp) {
    // Web: render children as-is (pages handle their own Navigation/Footer)
    return <>{children}</>;
  }

  // Native app: wrap with app-specific layout
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      <main className="flex-1 pb-20">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};
