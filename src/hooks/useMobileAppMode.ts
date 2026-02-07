import { useIsMobile } from './use-mobile';
import { useNativeAppContext } from '@/contexts/NativeAppContext';

/**
 * Hook that determines if the app should display in mobile app mode.
 * This is true when:
 * 1. Running as a native Capacitor app (iOS/Android)
 * 2. Viewing on a mobile-sized screen (web browser on mobile)
 * 
 * This enables the native-like bottom navigation and mobile UI patterns
 * for both native apps AND mobile web browsers.
 */
export const useMobileAppMode = () => {
  const isMobile = useIsMobile();
  const { isNativeApp, platform, isReady } = useNativeAppContext();

  // Show mobile app mode for native apps OR mobile web browsers
  const isMobileAppMode = isNativeApp || isMobile;

  return {
    isMobileAppMode,
    isNativeApp,
    isMobileWeb: isMobile && !isNativeApp,
    platform,
    isReady,
  };
};
