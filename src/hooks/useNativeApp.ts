import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

interface NativeAppState {
  isNativeApp: boolean;
  platform: 'ios' | 'android' | 'web';
  isReady: boolean;
}

export const useNativeApp = (): NativeAppState => {
  const [state, setState] = useState<NativeAppState>({
    isNativeApp: false,
    platform: 'web',
    isReady: false,
  });

  useEffect(() => {
    const isNative = Capacitor.isNativePlatform();
    const platform = Capacitor.getPlatform() as 'ios' | 'android' | 'web';
    
    setState({
      isNativeApp: isNative,
      platform,
      isReady: true,
    });
  }, []);

  return state;
};

// Static helper for immediate checks (useful in components that need sync access)
export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

export const getPlatform = (): 'ios' | 'android' | 'web' => {
  return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
};
