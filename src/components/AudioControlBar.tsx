import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, X, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AudioControlBarProps {
  isPlaying: boolean;
  isBuffering?: boolean;
  currentAyah: number;
  totalAyahs: number;
  surahName: string;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
}

const AudioControlBar = ({
  isPlaying,
  isBuffering = false,
  currentAyah,
  totalAyahs,
  surahName,
  onPlayPause,
  onNext,
  onPrevious,
  onClose,
}: AudioControlBarProps) => {
  return (
    <Card className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="flex flex-col min-w-[120px]">
          <span className="text-sm font-semibold text-foreground">{surahName}</span>
          <span className="text-xs text-muted-foreground">
            Ayah {currentAyah} of {totalAyahs}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            disabled={currentAyah === 1 || isBuffering}
            className="h-9 w-9"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            disabled={isBuffering}
            className="h-10 w-10"
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
            disabled={currentAyah === totalAyahs || isBuffering}
            className="h-9 w-9"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 ml-2"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default AudioControlBar;
