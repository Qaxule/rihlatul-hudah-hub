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

  // Create audio element dynamically to avoid CORS issues
  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;

    const handleEnded = () => {
      setIsBuffering(false);
      onEnded?.();
    };
    
    const handleError = () => {
      console.error("Audio error for URL:", audioUrl);
      setIsBuffering(false);
      setHasError(true);
      // Try to continue to next ayah even on error
      onEnded?.();
    };

    const handleCanPlay = () => {
      setIsBuffering(false);
      setHasError(false);
    };

    const handleWaiting = () => {
      if (isPlaying) {
        setIsBuffering(true);
      }
    };

    const handlePlaying = () => {
      setIsBuffering(false);
      setHasError(false);
    };

    const handleLoadStart = () => {
      if (isPlaying) {
        setIsBuffering(true);
      }
    };
    
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("loadstart", handleLoadStart);
    
    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("loadstart", handleLoadStart);
      audioRef.current = null;
    };
  }, [audioUrl]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    if (isPlaying) {
      setIsBuffering(true);
      setHasError(false);
      // Set source and play
      if (audio.src !== audioUrl) {
        audio.src = audioUrl;
      }
      audio.play().catch((err) => {
        console.error("Play error:", err);
        setIsBuffering(false);
        setHasError(true);
      });
    } else {
      audio.pause();
      setIsBuffering(false);
    }
  }, [isPlaying, audioUrl]);

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
        disabled={isBuffering}
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
