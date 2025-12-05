import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  isPlaying: boolean;
  onPlay?: () => void;
  onEnded?: () => void;
}

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
}

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ audioUrl, isPlaying, onPlay, onEnded }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);

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
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      onEnded?.();
    };
    
    const handleError = (e: Event) => {
      const audioEl = e.target as HTMLAudioElement;
      console.error("Audio error:", audioEl?.error?.code, audioEl?.error?.message, "URL:", audioUrl);
      onEnded?.();
    };
    
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [onEnded, audioUrl]);

  const togglePlay = () => {
    onPlay?.();
  };

    return (
      <div className="inline-flex items-center">
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="h-8 w-8"
        >
          {isPlaying ? (
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
