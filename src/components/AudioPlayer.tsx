import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  surahNumber: number;
  ayahNumber: number;
  onPlay?: () => void;
}

const AudioPlayer = ({ surahNumber, ayahNumber, onPlay }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Format: https://cdn.islamic.network/quran/audio/128/ar.alafasy/{surah}:{ayah}.mp3
  const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surahNumber}:${ayahNumber}.mp3`;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="inline-flex items-center">
      <audio ref={audioRef} src={audioUrl} />
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
};

export default AudioPlayer;
