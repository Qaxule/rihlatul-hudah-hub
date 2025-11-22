import { useEffect, useState } from "react";
import logoFull from "@/assets/logo-full.jpg";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload the logo
    const img = new Image();
    img.src = logoFull;
    img.onload = () => setIsLoaded(true);

    // Minimum display time of 2 seconds for branding
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade-out animation to complete
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible && !isLoaded) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6 px-8">
        <div
          className={`transition-all duration-700 ${
            isLoaded 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 translate-y-4"
          }`}
        >
          <img
            src={logoFull}
            alt="Rihlatul Hudah"
            className="w-64 h-64 object-contain drop-shadow-2xl"
          />
        </div>
        
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-700 delay-300 ${
            isLoaded 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "200ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "400ms" }}></div>
          </div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
};
