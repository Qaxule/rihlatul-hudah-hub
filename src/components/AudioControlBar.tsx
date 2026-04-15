import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, X, Loader2, Repeat, Square } from "lucide-react";
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

  const cycleEndAction = () => {
    const actions: EndAction[] = ['stop', 'repeat_surah', 'next_surah'];
    const currentIndex = actions.indexOf(endAction);
    const nextIndex = (currentIndex + 1) % actions.length;
    onEndActionChange?.(actions[nextIndex]);
  };

  const endActionIcon = endAction === 'stop' 
    ? <Square className="h-3.5 w-3.5" /> 
    : endAction === 'repeat_surah' 
      ? <Repeat className="h-3.5 w-3.5" /> 
      : <SkipForward className="h-3.5 w-3.5" />;

  return (
    <Card className="fixed bottom-20 md:bottom-4 left-2 right-2 md:left-auto md:right-auto md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-lg z-50 shadow-lg border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 px-2.5 py-2">
        {/* Surah info - flexible width */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-semibold text-foreground truncate">{surahName}</span>
          <span className="text-[10px] text-muted-foreground truncate">
            {isSurahMode ? (
              reciterName || "Full surah"
            ) : (
              <>
                {currentAyah}/{totalAyahs}
                {reciterName && ` · ${reciterName}`}
                {repeatCount > 0 && ` · ${currentRepeatIndex + 1}/${repeatCount + 1}`}
              </>
            )}
          </span>
        </div>
        
        {/* Transport controls */}
        <div className="flex items-center gap-0 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            disabled={isSurahMode || currentAyah === 1 || isBuffering}
            className="h-7 w-7"
          >
            <SkipBack className="h-3.5 w-3.5" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            disabled={isBuffering}
            className="h-8 w-8"
          >
            {isBuffering ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={isSurahMode || currentAyah === totalAyahs || isBuffering}
            className="h-7 w-7"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Speed toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={cycleSpeed}
          className="h-7 px-1.5 text-[10px] font-bold min-w-[34px] tabular-nums shrink-0"
          title="Playback speed"
        >
          {playbackSpeed}x
        </Button>

        {/* End action toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={cycleEndAction}
          className="h-7 w-7 p-0 shrink-0"
          title={`When done: ${END_ACTION_LABELS[endAction]}`}
        >
          {endActionIcon}
        </Button>

        {/* Close */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 shrink-0"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
};

export default AudioControlBar;
