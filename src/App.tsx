import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Quran from "./pages/Quran";
import SurahReader from "./pages/SurahReader";
import Hadith from "./pages/Hadith";
import Duas from "./pages/Duas";
import Names from "./pages/Names";
import PrayerTimes from "./pages/PrayerTimes";
import Dhikr from "./pages/Dhikr";
import Learning from "./pages/Learning";
import Calendar from "./pages/Calendar";
import Guides from "./pages/Guides";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Bookmarks from "./pages/Bookmarks";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Disclaimer from "./pages/Disclaimer";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/guides" element={<Guides />} />
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

export default App;
