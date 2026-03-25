import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { surahList, juzList, getSurahsByJuz, type SurahInfo } from "@/data/quranMetadata";

interface QuranNavigatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentSurah?: number;
  currentAyah?: number;
  onAyahSelect?: (ayahNumber: number) => void;
}

export function QuranNavigator({
  open,
  onOpenChange,
  currentSurah,
  currentAyah,
  onAyahSelect,
}: QuranNavigatorProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(currentSurah || null);
  const [ayahCount, setAyahCount] = useState<number>(0);
  const [selectedAyah, setSelectedAyah] = useState<number | null>(currentAyah || 1);

  const juzScrollRef = useRef<HTMLDivElement>(null);
  const surahScrollRef = useRef<HTMLDivElement>(null);
  const ayahScrollRef = useRef<HTMLDivElement>(null);

  // Scroll selected item into view within a column
  const scrollToSelected = useCallback((container: HTMLDivElement | null, index: number) => {
    if (!container) return;
    const viewport = container.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
    if (!viewport) return;
    const items = viewport.querySelectorAll('[data-nav-item]');
    const target = items[index];
    if (target) {
      target.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  }, []);

  // Initialize with current surah's juz if available
  useEffect(() => {
    if (currentSurah && !selectedJuz) {
      const surah = surahList.find(s => s.number === currentSurah);
      if (surah) {
        setSelectedJuz(surah.juz[0]);
        setSelectedSurah(currentSurah);
        setAyahCount(surah.numberOfAyahs);
      }
    }
  }, [currentSurah, selectedJuz]);

  // Scroll to selected items when dialog opens
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      if (selectedJuz) scrollToSelected(juzScrollRef.current, selectedJuz - 1);
      if (selectedSurah) scrollToSelected(surahScrollRef.current, selectedSurah - 1);
      if (selectedAyah) scrollToSelected(ayahScrollRef.current, selectedAyah - 1);
    }, 100);
    return () => clearTimeout(timer);
  }, [open, scrollToSelected, selectedJuz, selectedSurah, selectedAyah]);

  const handleJuzSelect = (juzNumber: number) => {
    setSelectedJuz(juzNumber);
    const surahs = getSurahsByJuz(juzNumber);
    if (surahs.length > 0) {
      setSelectedSurah(surahs[0].number);
      setAyahCount(surahs[0].numberOfAyahs);
      setSelectedAyah(1);
      // Scroll surah column to selection
      setTimeout(() => scrollToSelected(surahScrollRef.current, surahs[0].number - 1), 50);
    }
  };

  const handleSurahSelect = (surah: SurahInfo) => {
    setSelectedSurah(surah.number);
    setAyahCount(surah.numberOfAyahs);
    setSelectedAyah(1);
    if (surah.juz && surah.juz.length > 0) {
      setSelectedJuz(surah.juz[0]);
      setTimeout(() => scrollToSelected(juzScrollRef.current, surah.juz[0] - 1), 50);
    }
    // Scroll ayah column to top
    setTimeout(() => scrollToSelected(ayahScrollRef.current, 0), 50);
  };

  const handleGo = () => {
    if (!selectedSurah || !selectedAyah) return;
    if (onAyahSelect && selectedSurah === currentSurah) {
      onAyahSelect(selectedAyah);
      onOpenChange(false);
    } else {
      navigate(`/surah/${selectedSurah}#ayah-${selectedAyah}`);
      onOpenChange(false);
    }
  };

  const NavigatorContent = () => (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 h-[50vh] md:h-[440px]">
        {/* Juz Column */}
        <div className="flex flex-col min-h-0 overflow-hidden rounded-lg border border-border">
          <div className="text-xs font-semibold px-2 py-1.5 bg-muted/60 border-b border-border text-center">
            Juz
          </div>
          <ScrollArea className="flex-1" ref={juzScrollRef}>
            <div className="p-1">
              {juzList.map((juz) => (
                <div
                  key={juz.number}
                  data-nav-item
                  className={cn(
                    "px-2 py-1.5 text-xs text-center rounded cursor-pointer transition-colors",
                    selectedJuz === juz.number
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => handleJuzSelect(juz.number)}
                >
                  {juz.number}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Surah Column */}
        <div className="flex flex-col min-h-0 overflow-hidden rounded-lg border border-border">
          <div className="text-xs font-semibold px-2 py-1.5 bg-muted/60 border-b border-border text-center">
            Surah
          </div>
          <ScrollArea className="flex-1" ref={surahScrollRef}>
            <div className="p-1">
              {surahList.map((surah) => (
                <div
                  key={surah.number}
                  data-nav-item
                  className={cn(
                    "px-1.5 py-1.5 rounded cursor-pointer transition-colors",
                    selectedSurah === surah.number
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => handleSurahSelect(surah)}
                >
                  <div className="text-[11px] font-medium leading-tight truncate">
                    {surah.number}. {surah.englishName}
                  </div>
                  <div className={cn(
                    "text-[9px] leading-tight truncate",
                    selectedSurah === surah.number ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {surah.name}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Ayah Column */}
        <div className="flex flex-col min-h-0 overflow-hidden rounded-lg border border-border">
          <div className="text-xs font-semibold px-2 py-1.5 bg-muted/60 border-b border-border text-center">
            Ayah
          </div>
          <ScrollArea className="flex-1" ref={ayahScrollRef}>
            {selectedSurah ? (
              <div className="p-1">
                {Array.from({ length: ayahCount }, (_, i) => i + 1).map((ayahNum) => (
                  <div
                    key={ayahNum}
                    data-nav-item
                    className={cn(
                      "px-2 py-1.5 text-xs text-center rounded cursor-pointer transition-colors",
                      selectedAyah === ayahNum
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedAyah(ayahNum)}
                  >
                    {ayahNum}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-xs text-muted-foreground text-center">
                Select a surah
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Go Button */}
      <Button
        onClick={handleGo}
        disabled={!selectedSurah || !selectedAyah}
        className="w-full"
      >
        Go to {selectedSurah ? `Surah ${selectedSurah}` : "..."} : Ayah {selectedAyah || "..."}
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-base">Navigate Quran</DrawerTitle>
          </DrawerHeader>
          <div className="px-3 pb-4">
            <NavigatorContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Navigate Quran</DialogTitle>
        </DialogHeader>
        <NavigatorContent />
      </DialogContent>
    </Dialog>
  );
}
