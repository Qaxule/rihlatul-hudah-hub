import { useState, useEffect } from "react";
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

  const handleJuzSelect = (juzNumber: number) => {
    setSelectedJuz(juzNumber);
    // Auto-select first surah in the juz
    const surahs = getSurahsByJuz(juzNumber);
    if (surahs.length > 0) {
      handleSurahSelect(surahs[0]);
    }
  };

  const handleSurahSelect = (surah: SurahInfo) => {
    setSelectedSurah(surah.number);
    setAyahCount(surah.numberOfAyahs);
    
    // If we're not on the same surah page, navigate to it
    if (currentSurah !== surah.number) {
      navigate(`/surah/${surah.number}`);
      onOpenChange(false);
    }
  };

  const handleAyahSelect = (ayahNumber: number) => {
    if (onAyahSelect && selectedSurah === currentSurah) {
      // Same surah, just scroll to ayah
      onAyahSelect(ayahNumber);
      onOpenChange(false);
    } else if (selectedSurah) {
      // Different surah, navigate with hash
      navigate(`/surah/${selectedSurah}#ayah-${ayahNumber}`);
      onOpenChange(false);
    }
  };

  const NavigatorContent = () => (
    <div className="grid grid-cols-3 gap-2 h-[60vh] md:h-[500px]">
      {/* Juz Column */}
      <div className="flex flex-col min-h-0">
        <div className="text-sm font-semibold mb-2 px-2 py-1 bg-muted rounded-t-md">Juz</div>
        <ScrollArea className="flex-1 rounded-b-md border">
          <div className="p-2 space-y-1">
            {juzList.map((juz) => (
              <Button
                key={juz.number}
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start text-xs",
                  selectedJuz === juz.number && "bg-primary text-primary-foreground"
                )}
                onClick={() => handleJuzSelect(juz.number)}
              >
                {juz.number}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Surah Column */}
      <div className="flex flex-col min-h-0">
        <div className="text-sm font-semibold mb-2 px-2 py-1 bg-muted rounded-t-md">Surah</div>
        <ScrollArea className="flex-1 rounded-b-md border">
          <div className="p-2 space-y-1">
            {(selectedJuz ? getSurahsByJuz(selectedJuz) : surahList).map((surah) => (
              <Button
                key={surah.number}
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start text-xs flex-col items-start h-auto py-2",
                  selectedSurah === surah.number && "bg-primary text-primary-foreground"
                )}
                onClick={() => handleSurahSelect(surah)}
              >
                <div className="font-semibold">{surah.number}. {surah.englishName}</div>
                <div className="text-[10px] opacity-70">{surah.name}</div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Ayah Column */}
      <div className="flex flex-col min-h-0">
        <div className="text-sm font-semibold mb-2 px-2 py-1 bg-muted rounded-t-md">Ayah</div>
        <ScrollArea className="flex-1 rounded-b-md border">
          {selectedSurah ? (
            <div className="p-2 space-y-1">
              {Array.from({ length: ayahCount }, (_, i) => i + 1).map((ayahNum) => (
                <Button
                  key={ayahNum}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-center text-xs",
                    currentSurah === selectedSurah && currentAyah === ayahNum && 
                    "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleAyahSelect(ayahNum)}
                >
                  {ayahNum}
                </Button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-xs text-muted-foreground text-center">
              Select a surah first
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Navigate Quran</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
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
