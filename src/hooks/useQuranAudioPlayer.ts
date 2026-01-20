import { useState, useRef, useCallback, useEffect } from "react";

interface UseQuranAudioPlayerOptions {
  surahNumber: number;
  totalAyahs: number;
  reciterId: string;
  getAudioUrl: (surahNum: number, ayahNum: number, reciterId: string) => string;
  onAyahChange?: (ayahNumber: number) => void;
  onComplete?: () => void;
}

interface AudioPlayerState {
  currentAyah: number | null;
  isPlaying: boolean;
  isBuffering: boolean;
  isPaused: boolean;
}

export const useQuranAudioPlayer = ({
  surahNumber,
  totalAyahs,
  reciterId,
  getAudioUrl,
  onAyahChange,
  onComplete,
}: UseQuranAudioPlayerOptions) => {
  const [state, setState] = useState<AudioPlayerState>({
    currentAyah: null,
    isPlaying: false,
    isBuffering: false,
    isPaused: false,
  });

  // Audio element refs
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const preloadedAudioRef = useRef<HTMLAudioElement | null>(null);
  const preloadedAyahRef = useRef<number | null>(null);

  // Preload the next ayah's audio
  const preloadNextAyah = useCallback((currentAyahNumber: number) => {
    const nextAyah = currentAyahNumber + 1;
    if (nextAyah > totalAyahs) return;

    // Don't preload if already preloaded
    if (preloadedAyahRef.current === nextAyah && preloadedAudioRef.current) {
      return;
    }

    // Clean up old preloaded audio
    if (preloadedAudioRef.current) {
      preloadedAudioRef.current.src = "";
      preloadedAudioRef.current = null;
    }

    const nextUrl = getAudioUrl(surahNumber, nextAyah, reciterId);
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = nextUrl;
    
    // Start loading
    audio.load();
    
    preloadedAudioRef.current = audio;
    preloadedAyahRef.current = nextAyah;
  }, [surahNumber, totalAyahs, reciterId, getAudioUrl]);

  // Play a specific ayah
  const playAyah = useCallback((ayahNumber: number) => {
    // Check if we have this ayah preloaded
    let audio: HTMLAudioElement;
    
    if (preloadedAyahRef.current === ayahNumber && preloadedAudioRef.current) {
      // Use preloaded audio - instant start!
      audio = preloadedAudioRef.current;
      preloadedAudioRef.current = null;
      preloadedAyahRef.current = null;
    } else {
      // Create new audio element
      audio = new Audio(getAudioUrl(surahNumber, ayahNumber, reciterId));
    }

    // Clean up current audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.src = "";
      currentAudioRef.current = null;
    }

    currentAudioRef.current = audio;

    setState(prev => ({
      ...prev,
      currentAyah: ayahNumber,
      isPlaying: true,
      isBuffering: true,
      isPaused: false,
    }));

    const handleCanPlay = () => {
      setState(prev => ({ ...prev, isBuffering: false }));
    };

    const handlePlaying = () => {
      setState(prev => ({ ...prev, isBuffering: false }));
      // Start preloading next ayah as soon as current starts playing
      preloadNextAyah(ayahNumber);
    };

    const handleEnded = () => {
      const nextAyah = ayahNumber + 1;
      if (nextAyah <= totalAyahs) {
        // Auto-advance to next ayah
        playAyah(nextAyah);
        onAyahChange?.(nextAyah);
      } else {
        // Surah complete
        setState({
          currentAyah: null,
          isPlaying: false,
          isBuffering: false,
          isPaused: false,
        });
        onComplete?.();
      }
    };

    const handleError = () => {
      console.error("Audio error for ayah:", ayahNumber);
      setState(prev => ({ ...prev, isBuffering: false }));
      // Try to continue to next ayah after a short delay
      setTimeout(() => {
        const nextAyah = ayahNumber + 1;
        if (nextAyah <= totalAyahs) {
          playAyah(nextAyah);
          onAyahChange?.(nextAyah);
        } else {
          setState({
            currentAyah: null,
            isPlaying: false,
            isBuffering: false,
            isPaused: false,
          });
          onComplete?.();
        }
      }, 300);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    audio.play().catch((err) => {
      console.error("Play error:", err);
      handleError();
    });

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [surahNumber, totalAyahs, reciterId, getAudioUrl, preloadNextAyah, onAyahChange, onComplete]);

  // Pause playback (resume will continue from same position)
  const pause = useCallback(() => {
    if (currentAudioRef.current && state.isPlaying) {
      currentAudioRef.current.pause();
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isPaused: true,
      }));
    }
  }, [state.isPlaying]);

  // Resume from paused position
  const resume = useCallback(() => {
    if (currentAudioRef.current && state.isPaused) {
      currentAudioRef.current.play().catch(console.error);
      setState(prev => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
      }));
    }
  }, [state.isPaused]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else if (state.isPaused && currentAudioRef.current) {
      resume();
    } else if (state.currentAyah) {
      // Resume from last known ayah
      playAyah(state.currentAyah);
    } else {
      // Start from beginning
      playAyah(1);
      onAyahChange?.(1);
    }
  }, [state.isPlaying, state.isPaused, state.currentAyah, pause, resume, playAyah, onAyahChange]);

  // Play/pause a specific ayah (for individual ayah buttons)
  const toggleAyah = useCallback((ayahNumber: number) => {
    if (state.currentAyah === ayahNumber) {
      if (state.isPlaying) {
        pause();
      } else if (state.isPaused) {
        resume();
      }
    } else {
      playAyah(ayahNumber);
      onAyahChange?.(ayahNumber);
    }
  }, [state.currentAyah, state.isPlaying, state.isPaused, pause, resume, playAyah, onAyahChange]);

  // Skip to next ayah
  const next = useCallback(() => {
    if (state.currentAyah && state.currentAyah < totalAyahs) {
      const nextAyah = state.currentAyah + 1;
      playAyah(nextAyah);
      onAyahChange?.(nextAyah);
    }
  }, [state.currentAyah, totalAyahs, playAyah, onAyahChange]);

  // Skip to previous ayah
  const previous = useCallback(() => {
    if (state.currentAyah && state.currentAyah > 1) {
      const prevAyah = state.currentAyah - 1;
      playAyah(prevAyah);
      onAyahChange?.(prevAyah);
    }
  }, [state.currentAyah, playAyah, onAyahChange]);

  // Stop playback completely
  const stop = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.src = "";
      currentAudioRef.current = null;
    }
    if (preloadedAudioRef.current) {
      preloadedAudioRef.current.src = "";
      preloadedAudioRef.current = null;
      preloadedAyahRef.current = null;
    }
    setState({
      currentAyah: null,
      isPlaying: false,
      isBuffering: false,
      isPaused: false,
    });
  }, []);

  // Cleanup on unmount or reciter change
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.src = "";
      }
      if (preloadedAudioRef.current) {
        preloadedAudioRef.current.src = "";
      }
    };
  }, []);

  // When reciter changes, stop current playback
  useEffect(() => {
    stop();
  }, [reciterId, stop]);

  return {
    currentAyah: state.currentAyah,
    isPlaying: state.isPlaying,
    isBuffering: state.isBuffering,
    isPaused: state.isPaused,
    playAyah,
    toggleAyah,
    togglePlayPause,
    pause,
    resume,
    next,
    previous,
    stop,
  };
};
