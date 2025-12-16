import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Loader2 } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  isPlaying: boolean;
  onPlay?: () => void;
  onEnded?: () => void;
  onBufferingChange?: (isBuffering: boolean) => void;
}

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
}

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ audioUrl, isPlaying, onPlay, onEnded, onBufferingChange }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isBuffering, setIsBuffering] = useState(false);

  // Notify parent of buffering state changes
  useEffect(() => {
    onBufferingChange?.(isBuffering);
  }, [isBuffering, onBufferingChange]);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    },
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setIsBuffering(true);
      audio.play().catch(console.error);
    } else {
      audio.pause();
      setIsBuffering(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsBuffering(false);
      onEnded?.();
    };
    
    const handleError = (e: Event) => {
      const audioEl = e.target as HTMLAudioElement;
      console.error("Audio error:", audioEl?.error?.code, audioEl?.error?.message, "URL:", audioUrl);
      setIsBuffering(false);
      onEnded?.();
    };

    const handleCanPlay = () => {
      setIsBuffering(false);
    };

    const handleWaiting = () => {
      if (isPlaying) {
        setIsBuffering(true);
      }
    };

    const handlePlaying = () => {
      setIsBuffering(false);
    };
    
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
    };
  }, [onEnded, audioUrl, isPlaying]);

  const togglePlay = () => {
    onPlay?.();
  };

    return (
      <div className="inline-flex items-center">
        <audio ref={audioRef} src={audioUrl} preload="none" crossOrigin="anonymous" />
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="h-8 w-8"
          disabled={isBuffering}
        >
          {isBuffering ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </div>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
