import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Capacitor } from "@capacitor/core";

interface CapacitorContextType {
  isNativeApp: boolean;
  platform: "ios" | "android" | "web";
  isLoading: boolean;
}

const CapacitorContext = createContext<CapacitorContextType>({
  isNativeApp: false,
  platform: "web",
  isLoading: true,
});

export const CapacitorProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CapacitorContextType>({
    isNativeApp: false,
    platform: "web",
    isLoading: true,
  });

  useEffect(() => {
    const isNative = Capacitor.isNativePlatform();
    const platform = Capacitor.getPlatform() as "ios" | "android" | "web";

    setState({
      isNativeApp: isNative,
      platform,
      isLoading: false,
    });
  }, []);

  return (
    <CapacitorContext.Provider value={state}>
      {children}
    </CapacitorContext.Provider>
  );
};

export const useCapacitor = () => {
  const context = useContext(CapacitorContext);
  if (!context) {
    throw new Error("useCapacitor must be used within a CapacitorProvider");
  }
  return context;
};
