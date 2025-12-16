import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Loader2 } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  preloadUrl?: string;
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
  ({ audioUrl, preloadUrl, isPlaying, onPlay, onEnded, onBufferingChange }, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Notify parent of buffering state changes
  useEffect(() => {
    onBufferingChange?.(isBuffering);
  }, [isBuffering, onBufferingChange]);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    },
  }));

  // Handle play/pause with fresh audio element each time
  useEffect(() => {
    if (!audioUrl) return;

    // Create new audio element when playing starts
    if (isPlaying) {
      // Clean up any existing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      setIsBuffering(true);
      setHasError(false);

      const handleEnded = () => {
        setIsBuffering(false);
        onEnded?.();
      };
      
      const handleError = () => {
        console.error("Audio error for URL:", audioUrl);
        setIsBuffering(false);
        setHasError(true);
        // Continue to next ayah on error
        setTimeout(() => onEnded?.(), 500);
      };

      const handleCanPlayThrough = () => {
        setIsBuffering(false);
        setHasError(false);
      };

      const handlePlaying = () => {
        setIsBuffering(false);
      };
      
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);
      audio.addEventListener("canplaythrough", handleCanPlayThrough);
      audio.addEventListener("playing", handlePlaying);
      
      audio.play().catch((err) => {
        console.error("Play error:", err);
        setIsBuffering(false);
        setHasError(true);
      });

      return () => {
        audio.pause();
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
        audio.removeEventListener("canplaythrough", handleCanPlayThrough);
        audio.removeEventListener("playing", handlePlaying);
      };
    } else {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsBuffering(false);
    }
  }, [isPlaying, audioUrl, onEnded]);

  // Preload next audio when current starts playing
  useEffect(() => {
    if (isPlaying && preloadUrl) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = preloadUrl;
      link.as = 'audio';
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [isPlaying, preloadUrl]);

  const togglePlay = () => {
    onPlay?.();
  };

  return (
    <div className="inline-flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        className={`h-8 w-8 ${hasError ? 'text-destructive' : ''}`}
        title={hasError ? "Audio unavailable" : isPlaying ? "Pause" : "Play"}
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
