import React, { createContext, useContext, ReactNode } from 'react';
import { useNativeApp } from '@/hooks/useNativeApp';

interface NativeAppContextType {
  isNativeApp: boolean;
  platform: 'ios' | 'android' | 'web';
  isReady: boolean;
}

const NativeAppContext = createContext<NativeAppContextType>({
  isNativeApp: false,
  platform: 'web',
  isReady: false,
});

export const useNativeAppContext = () => useContext(NativeAppContext);

interface NativeAppProviderProps {
  children: ReactNode;
}

export const NativeAppProvider = ({ children }: NativeAppProviderProps) => {
  const nativeAppState = useNativeApp();

  return (
    <NativeAppContext.Provider value={nativeAppState}>
      {children}
    </NativeAppContext.Provider>
  );
};
