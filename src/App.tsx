import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Quran from "./pages/Quran";
import Hadith from "./pages/Hadith";
import Duas from "./pages/Duas";
import Names from "./pages/Names";
import PrayerTimes from "./pages/PrayerTimes";
import Dhikr from "./pages/Dhikr";
import Learning from "./pages/Learning";
import Calendar from "./pages/Calendar";
import Community from "./pages/Community";
import Guides from "./pages/Guides";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/hadith" element={<Hadith />} />
          <Route path="/duas" element={<Duas />} />
          <Route path="/names" element={<Names />} />
          <Route path="/prayer-times" element={<PrayerTimes />} />
          <Route path="/dhikr" element={<Dhikr />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/community" element={<Community />} />
          <Route path="/guides" element={<Guides />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
