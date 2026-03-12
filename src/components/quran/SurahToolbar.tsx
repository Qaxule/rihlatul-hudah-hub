import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Play, Pause, Brain, Menu, Settings2, Type, BookOpenText } from "lucide-react";
import { HifzModePanel } from "./HifzModePanel";

interface SurahToolbarProps {
  // Audio
  isPlaying: boolean;
  isPaused: boolean;
  onPlaySurah: () => void;
  selectedReciter: string;
  onReciterChange: (reciter: string) => void;
  // Display modes
  wordByWordMode: boolean;
  onWordByWordChange: (value: boolean) => void;
  arabicOnlyMode: boolean;
  onArabicOnlyChange: (value: boolean) => void;
  // Navigation
  onNavigateOpen: () => void;
  // Hifz
  hifzProps: {
    surahNumber: number;
    surahName: string;
    totalAyahs: number;
    hiddenAyahs: Set<number>;
    onToggleHide: (ayahNumber: number) => void;
    onHideAll: () => void;
    onShowAll: () => void;
    onTestMode: (enabled: boolean) => void;
    testMode: boolean;
  };
}

const RECITERS = [
  { id: "ar.alafasy", name: "Mishary Alafasy" },
  { id: "ar.abdulsamad", name: "Abdul Basit" },
  { id: "ar.abdurrahmaansudais", name: "Al-Sudais" },
  { id: "ar.shaatree", name: "Al-Shatri" },
  { id: "ar.husary", name: "Al-Husary" },
  { id: "ar.minshawi", name: "Al-Minshawi" },
  { id: "ar.muhammadayyoub", name: "Muhammad Ayyub" },
  { id: "ar.muhammadjibreel", name: "Muhammad Jibreel" },
];

export function SurahToolbar({
  isPlaying,
  isPaused,
  onPlaySurah,
  selectedReciter,
  onReciterChange,
  wordByWordMode,
  onWordByWordChange,
  arabicOnlyMode,
  onArabicOnlyChange,
  onNavigateOpen,
  hifzProps,
}: SurahToolbarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between gap-2 px-1 py-2">
        {/* Left: Play + Reciter */}
        <div className="flex items-center gap-1.5 min-w-0">
          <Button
            onClick={onPlaySurah}
            variant={isPlaying ? "default" : "outline"}
            size="icon"
            className="h-9 w-9 shrink-0"
            title={isPlaying ? "Pause" : isPaused ? "Resume" : "Play Surah"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Select value={selectedReciter} onValueChange={onReciterChange}>
            <SelectTrigger className="h-9 w-[130px] sm:w-[160px] text-xs bg-background shrink-0">
              <SelectValue placeholder="Reciter" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {RECITERS.map((r) => (
                <SelectItem key={r.id} value={r.id} className="text-xs">
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Right: Quick toggles + Settings + Navigate */}
        <div className="flex items-center gap-1">
          {/* Word-by-Word quick toggle */}
          <Button
            variant={wordByWordMode ? "default" : "ghost"}
            size="icon"
            className="h-9 w-9"
            onClick={() => onWordByWordChange(!wordByWordMode)}
            title="Word-by-Word"
          >
            <Type className="h-4 w-4" />
          </Button>

          {/* Arabic Only quick toggle */}
          <Button
            variant={arabicOnlyMode ? "default" : "ghost"}
            size="icon"
            className="h-9 w-9"
            onClick={() => onArabicOnlyChange(!arabicOnlyMode)}
            title="Arabic Only"
          >
            <BookOpenText className="h-4 w-4" />
          </Button>

          {/* Hifz Mode */}
          <HifzModePanel {...hifzProps} />

          {/* Navigate */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={onNavigateOpen}
            title="Navigate"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
