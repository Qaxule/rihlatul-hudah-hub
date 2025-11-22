import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SplashScreen } from "./components/SplashScreen";
import { useState, useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Quran from "./pages/Quran";
import SurahReader from "./pages/SurahReader";
import Hadith from "./pages/Hadith";
import Duas from "./pages/Duas";
import Names from "./pages/Names";
import PrayerTimes from "./pages/PrayerTimes";
import Dhikr from "./pages/Dhikr";
import Learning from "./pages/Learning";
import LessonDetail from "./pages/LessonDetail";
import Calendar from "./pages/Calendar";
import Yasarna from "./pages/Yasarna";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Bookmarks from "./pages/Bookmarks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Disclaimer from "./pages/Disclaimer";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Only show splash screen on initial app load (PWA launch)
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('splashShown');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quran" element={<Quran />} />
              <Route path="/surah/:surahNumber" element={<SurahReader />} />
              <Route path="/hadith" element={<Hadith />} />
              <Route path="/duas" element={<Duas />} />
              <Route path="/names" element={<Names />} />
              <Route path="/prayer-times" element={<PrayerTimes />} />
              <Route path="/dhikr" element={<Dhikr />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/learning/:lessonId" element={<LessonDetail />} />
              <Route path="/yasarna" element={<Yasarna />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guides/:guideId" element={<GuideDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/support" element={<Support />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
