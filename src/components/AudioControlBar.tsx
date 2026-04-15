import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, X, Loader2, Repeat, Square, SkipForward as NextIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EndAction } from "@/hooks/useQuranAudioPlayer";

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5];

const END_ACTION_LABELS: Record<EndAction, string> = {
  stop: "Stop",
  repeat_surah: "Repeat",
  next_surah: "Next Surah",
};

const END_ACTION_ICONS: Record<EndAction, React.ReactNode> = {
  stop: <Square className="h-3 w-3" />,
  repeat_surah: <Repeat className="h-3 w-3" />,
  next_surah: <SkipForward className="h-3 w-3" />,
};

interface AudioControlBarProps {
  isPlaying: boolean;
  isBuffering?: boolean;
  currentAyah: number;
  totalAyahs: number;
  surahName: string;
  reciterName?: string;
  repeatCount?: number;
  currentRepeatIndex?: number;
  mode?: 'idle' | 'surah' | 'ayah';
  playbackSpeed?: number;
  endAction?: EndAction;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onSpeedChange?: (speed: number) => void;
  onEndActionChange?: (action: EndAction) => void;
}

const AudioControlBar = ({
  isPlaying,
  isBuffering = false,
  currentAyah,
  totalAyahs,
  surahName,
  reciterName,
  repeatCount = 0,
  currentRepeatIndex = 0,
  mode = 'ayah',
  playbackSpeed = 1,
  endAction = 'stop',
  onPlayPause,
  onNext,
  onPrevious,
  onClose,
  onSpeedChange,
  onEndActionChange,
}: AudioControlBarProps) => {
  const isSurahMode = mode === 'surah';

  const cycleSpeed = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
    onSpeedChange?.(SPEED_OPTIONS[nextIndex]);
  };

  return (
    <Card className="fixed bottom-20 md:bottom-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="flex flex-col min-w-[100px]">
          <span className="text-sm font-semibold text-foreground truncate">{surahName}</span>
          <span className="text-xs text-muted-foreground truncate">
            {isSurahMode ? (
              reciterName || "Playing full surah"
            ) : (
              <>
                Ayah {currentAyah}/{totalAyahs}
                {reciterName && ` • ${reciterName}`}
                {repeatCount > 0 && ` • ${currentRepeatIndex + 1}/${repeatCount + 1}`}
              </>
            )}
          </span>
        </div>
        
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            disabled={isSurahMode || currentAyah === 1 || isBuffering}
            className="h-8 w-8"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            disabled={isBuffering}
            className="h-9 w-9"
          >
            {isBuffering ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={isSurahMode || currentAyah === totalAyahs || isBuffering}
            className="h-8 w-8"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={cycleSpeed}
          className="h-7 px-1.5 text-xs font-semibold min-w-[40px] tabular-nums"
          title="Playback speed"
        >
          {playbackSpeed}x
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-1.5 text-xs gap-1"
              title="When surah ends"
            >
              {END_ACTION_ICONS[endAction]}
              <span className="hidden sm:inline">{END_ACTION_LABELS[endAction]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[140px]">
            {(Object.keys(END_ACTION_LABELS) as EndAction[]).map((action) => (
              <DropdownMenuItem
                key={action}
                onClick={() => onEndActionChange?.(action)}
                className={endAction === action ? "bg-accent" : ""}
              >
                <span className="mr-2">{END_ACTION_ICONS[action]}</span>
                {END_ACTION_LABELS[action]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default AudioControlBar;
