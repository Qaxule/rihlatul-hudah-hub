import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Play, Pause, Menu, Type, BookOpenText, Repeat } from "lucide-react";
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
  // Repeat
  repeatCount: number;
  onRepeatCountChange: (count: number) => void;
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
  repeatCount,
  onRepeatCountChange,
  onNavigateOpen,
  hifzProps,
}: SurahToolbarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const REPEAT_OPTIONS = [0, 1, 2, 3, 5, 10, 15, 20];

  return (
    <TooltipProvider delayDuration={300}>
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-2 sm:px-3 py-2">
          {/* Left: Play + Reciter */}
          <div className="flex items-center gap-2 sm:gap-2 min-w-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onPlaySurah}
                  variant={isPlaying ? "default" : "outline"}
                  size="icon"
                  className="h-9 w-9 shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? "Pause" : isPaused ? "Resume" : "Play Surah"}</p>
              </TooltipContent>
            </Tooltip>
            <Select value={selectedReciter} onValueChange={onReciterChange}>
              <SelectTrigger className="h-9 w-[100px] sm:w-[160px] text-xs bg-background shrink-0 truncate">
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

          {/* Right: Quick toggles + Navigate */}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={wordByWordMode ? "default" : "ghost"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => onWordByWordChange(!wordByWordMode)}
                >
                  <Type className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Word-by-Word</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={arabicOnlyMode ? "default" : "ghost"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => onArabicOnlyChange(!arabicOnlyMode)}
                >
                  <BookOpenText className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Arabic Only</p>
              </TooltipContent>
            </Tooltip>

            <Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      variant={repeatCount > 0 ? "default" : "ghost"}
                      size="icon"
                      className="h-9 w-9 relative"
                    >
                      <Repeat className="h-4 w-4" />
                      {repeatCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                          {repeatCount}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Repeat Ayah {repeatCount > 0 ? `(${repeatCount}×)` : ""}</p>
                </TooltipContent>
              </Tooltip>
              <PopoverContent className="w-48 p-2" align="end">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Repeat each ayah</p>
                <div className="grid grid-cols-4 gap-1">
                  {REPEAT_OPTIONS.map((count) => (
                    <Button
                      key={count}
                      variant={repeatCount === count ? "default" : "outline"}
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => onRepeatCountChange(count)}
                    >
                      {count === 0 ? "Off" : `${count}×`}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <HifzModePanel {...hifzProps} />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={onNavigateOpen}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Navigate Surahs</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
