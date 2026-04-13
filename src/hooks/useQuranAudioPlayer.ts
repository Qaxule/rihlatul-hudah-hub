import { useState, useRef, useCallback, useEffect } from "react";

interface UseQuranAudioPlayerOptions {
  surahNumber: number;
  totalAyahs: number;
  reciterId: string;
  reciterName?: string;
  surahName?: string;
  getAudioUrl: (surahNum: number, ayahNum: number, reciterId: string) => string;
  onAyahChange?: (ayahNumber: number) => void;
  onComplete?: () => void;
}

type PlaybackMode = 'idle' | 'surah' | 'ayah';

interface AudioPlayerState {
  currentAyah: number | null;
  isPlaying: boolean;
  isBuffering: boolean;
  isPaused: boolean;
  repeatCount: number;
  currentRepeatIndex: number;
  mode: PlaybackMode;
}

// Map app reciter IDs to Islamic Network CDN identifiers for full surah audio
const SURAH_AUDIO_RECITER_MAP: Record<string, string> = {
  "ar.alafasy": "ar.alafasy",
  "ar.abdulsamad": "ar.abdulsamad",
  "ar.abdurrahmaansudais": "ar.abdurrahmaansudais",
  "ar.shaatree": "ar.shaatree",
  "ar.husary": "ar.husary",
  "ar.minshawi": "ar.minshawi",
  "ar.muhammadayyoub": "ar.muhammadayyoub",
  "ar.muhammadjibreel": "ar.muhammadjibreel",
};

// Full surah audio URL from Islamic Network CDN
const getFullSurahAudioUrl = (surahNum: number, reciterId: string): string => {
  const cdnId = SURAH_AUDIO_RECITER_MAP[reciterId] || reciterId;
  return `https://cdn.islamic.network/quran/audio-surah/128/${cdnId}/${surahNum}.mp3`;
};

export const useQuranAudioPlayer = ({
  surahNumber,
  totalAyahs,
  reciterId,
  reciterName = "Reciter",
  surahName = "Surah",
  getAudioUrl,
  onAyahChange,
  onComplete,
}: UseQuranAudioPlayerOptions) => {
  const [state, setState] = useState<AudioPlayerState>({
    currentAyah: null,
    isPlaying: false,
    isBuffering: false,
    isPaused: false,
    repeatCount: 0,
    currentRepeatIndex: 0,
    mode: 'idle',
  });

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const preloadedAudioRef = useRef<HTMLAudioElement | null>(null);
  const preloadedAyahRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);
  const singleAyahLoopRef = useRef(false);

  // --- Media Session API ---
  const updateMediaSession = useCallback((playing: boolean) => {
    if (!('mediaSession' in navigator)) return;

    const artworkUrl = `${window.location.origin}/quran-artwork.png`;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: `Surah ${surahName} (${surahNumber})`,
      artist: reciterName,
      album: 'Rihlatul Hudah - Holy Quran',
      artwork: [
        { src: artworkUrl, sizes: '512x512', type: 'image/png' },
      ],
    });

    navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
  }, [surahName, surahNumber, reciterName]);

  const clearMediaSession = useCallback(() => {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = 'none';
  }, []);

  // --- Cleanup helper ---
  const cleanupAudio = useCallback(() => {
    if (currentAudioRef.current) {
      const audio = currentAudioRef.current;
      audio.pause();
      audio.oncanplay = null;
      audio.onplaying = null;
      audio.onended = null;
      audio.onerror = null;
      audio.ontimeupdate = null;
      audio.src = "";
      currentAudioRef.current = null;
    }
    if (preloadedAudioRef.current) {
      preloadedAudioRef.current.src = "";
      preloadedAudioRef.current = null;
      preloadedAyahRef.current = null;
    }
    isTransitioningRef.current = false;
  }, []);

  // --- Full Surah Playback ---
  const playFullSurah = useCallback(() => {
    cleanupAudio();

    const url = getFullSurahAudioUrl(surahNumber, reciterId);
    const audio = new Audio(url);
    currentAudioRef.current = audio;

    setState(prev => ({
      ...prev,
      currentAyah: 1,
      isPlaying: true,
      isBuffering: true,
      isPaused: false,
      mode: 'surah',
      currentRepeatIndex: 0,
    }));

    updateMediaSession(true);

    audio.oncanplay = () => {
      setState(prev => ({ ...prev, isBuffering: false }));
    };

    audio.onplaying = () => {
      setState(prev => ({ ...prev, isBuffering: false }));
      updateMediaSession(true);
    };

    audio.onended = () => {
      onComplete?.();
      clearMediaSession();
      setState(prev => ({
        ...prev,
        currentAyah: null,
        isPlaying: false,
        isBuffering: false,
        isPaused: false,
        mode: 'idle',
      }));
    };

    audio.onerror = (e) => {
      console.error("Full surah audio error:", e);
      setState(prev => ({ ...prev, isBuffering: false, isPlaying: false, mode: 'idle' }));
      clearMediaSession();
    };

    audio.play().catch((err) => {
      console.error("Full surah play error:", err);
      setState(prev => ({ ...prev, isBuffering: false, isPlaying: false, mode: 'idle' }));
      clearMediaSession();
    });
  }, [surahNumber, reciterId, cleanupAudio, updateMediaSession, clearMediaSession, onComplete]);

  // --- Per-Ayah Playback (for individual ayah buttons) ---
  const preloadNextAyah = useCallback((currentAyahNumber: number) => {
    const nextAyah = currentAyahNumber + 1;
    if (nextAyah > totalAyahs) return;
    if (preloadedAyahRef.current === nextAyah && preloadedAudioRef.current) return;

    if (preloadedAudioRef.current) {
      preloadedAudioRef.current.src = "";
      preloadedAudioRef.current = null;
    }

    const nextUrl = getAudioUrl(surahNumber, nextAyah, reciterId);
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = nextUrl;
    audio.load();

    preloadedAudioRef.current = audio;
    preloadedAyahRef.current = nextAyah;
  }, [surahNumber, totalAyahs, reciterId, getAudioUrl]);

  const playAyah = useCallback((ayahNumber: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    cleanupAudio();

    let audio: HTMLAudioElement;
    if (preloadedAyahRef.current === ayahNumber && preloadedAudioRef.current) {
      audio = preloadedAudioRef.current;
      preloadedAudioRef.current = null;
      preloadedAyahRef.current = null;
    } else {
      audio = new Audio(getAudioUrl(surahNumber, ayahNumber, reciterId));
    }

    currentAudioRef.current = audio;

    setState(prev => ({
      ...prev,
      currentAyah: ayahNumber,
      isPlaying: true,
      isBuffering: true,
      isPaused: false,
      mode: 'ayah',
    }));

    updateMediaSession(true);

    audio.oncanplay = () => {
      setState(prev => ({ ...prev, isBuffering: false }));
    };

    audio.onplaying = () => {
      setState(prev => ({ ...prev, isBuffering: false }));
      isTransitioningRef.current = false;
      preloadNextAyah(ayahNumber);
      updateMediaSession(true);
    };

    audio.onended = () => {
      setState(prev => {
        if (prev.repeatCount > 0 && prev.currentRepeatIndex < prev.repeatCount) {
          isTransitioningRef.current = false;
          setTimeout(() => playAyah(ayahNumber), 0);
          return { ...prev, currentRepeatIndex: prev.currentRepeatIndex + 1 };
        }

        if (singleAyahLoopRef.current) {
          isTransitioningRef.current = false;
          singleAyahLoopRef.current = false;
          clearMediaSession();
          return {
            ...prev,
            isPlaying: false,
            isBuffering: false,
            isPaused: false,
            currentRepeatIndex: 0,
          };
        }

        const nextAyah = ayahNumber + 1;
        if (nextAyah <= totalAyahs) {
          isTransitioningRef.current = false;
          setTimeout(() => {
            playAyah(nextAyah);
            onAyahChange?.(nextAyah);
          }, 0);
          return { ...prev, currentRepeatIndex: 0 };
        } else {
          isTransitioningRef.current = false;
          onComplete?.();
          clearMediaSession();
          return {
            currentAyah: null,
            isPlaying: false,
            isBuffering: false,
            isPaused: false,
            repeatCount: prev.repeatCount,
            currentRepeatIndex: 0,
            mode: 'idle',
          };
        }
      });
    };

    audio.onerror = (e) => {
      console.error("Audio error for ayah:", ayahNumber, e);
      isTransitioningRef.current = false;
      setState(prev => ({ ...prev, isBuffering: false }));
    };

    audio.play().catch((err) => {
      console.error("Play error:", err);
      isTransitioningRef.current = false;
      setState(prev => ({ ...prev, isBuffering: false, isPlaying: false }));
      clearMediaSession();
    });
  }, [surahNumber, totalAyahs, reciterId, getAudioUrl, preloadNextAyah, onAyahChange, onComplete, cleanupAudio, updateMediaSession, clearMediaSession]);

  // --- Pause / Resume ---
  const pause = useCallback(() => {
    if (currentAudioRef.current && state.isPlaying) {
      currentAudioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false, isPaused: true }));
      updateMediaSession(false);
    }
  }, [state.isPlaying, updateMediaSession]);

  const resume = useCallback(() => {
    if (currentAudioRef.current && state.isPaused) {
      currentAudioRef.current.play().catch(console.error);
      setState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
      updateMediaSession(true);
    }
  }, [state.isPaused, updateMediaSession]);

  // --- Toggle Play/Pause (full surah mode) ---
  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else if (state.isPaused && currentAudioRef.current) {
      resume();
    } else {
      // Start fresh - use full surah mode
      playFullSurah();
      onAyahChange?.(1);
    }
  }, [state.isPlaying, state.isPaused, pause, resume, playFullSurah, onAyahChange]);

  // --- Toggle individual ayah ---
  const toggleAyah = useCallback((ayahNumber: number) => {
    if (state.currentAyah === ayahNumber && state.mode === 'ayah') {
      if (state.isPlaying) {
        pause();
      } else if (state.isPaused) {
        resume();
      }
    } else {
      if (state.repeatCount > 0) {
        singleAyahLoopRef.current = true;
      }
      setState(prev => ({ ...prev, currentRepeatIndex: 0 }));
      playAyah(ayahNumber);
      onAyahChange?.(ayahNumber);
    }
  }, [state.currentAyah, state.isPlaying, state.isPaused, state.repeatCount, state.mode, pause, resume, playAyah, onAyahChange]);

  // --- Skip next/previous (only in ayah mode) ---
  const next = useCallback(() => {
    if (state.mode === 'ayah' && state.currentAyah && state.currentAyah < totalAyahs) {
      const nextAyah = state.currentAyah + 1;
      playAyah(nextAyah);
      onAyahChange?.(nextAyah);
    }
  }, [state.currentAyah, state.mode, totalAyahs, playAyah, onAyahChange]);

  const previous = useCallback(() => {
    if (state.mode === 'ayah' && state.currentAyah && state.currentAyah > 1) {
      const prevAyah = state.currentAyah - 1;
      playAyah(prevAyah);
      onAyahChange?.(prevAyah);
    }
  }, [state.currentAyah, state.mode, playAyah, onAyahChange]);

  // --- Stop ---
  const stop = useCallback(() => {
    cleanupAudio();
    clearMediaSession();
    setState(prev => ({
      currentAyah: null,
      isPlaying: false,
      isBuffering: false,
      isPaused: false,
      repeatCount: prev.repeatCount,
      currentRepeatIndex: 0,
      mode: 'idle',
    }));
  }, [cleanupAudio, clearMediaSession]);

  // --- Media Session action handlers ---
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;

    navigator.mediaSession.setActionHandler('play', () => {
      if (state.isPaused) resume();
      else if (!state.isPlaying) playFullSurah();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      if (state.isPlaying) pause();
    });
    navigator.mediaSession.setActionHandler('stop', () => stop());
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      if (state.mode === 'ayah') previous();
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      if (state.mode === 'ayah') next();
    });

    return () => {
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('stop', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
    };
  }, [state.isPlaying, state.isPaused, state.mode, pause, resume, stop, previous, next, playFullSurah]);

  // Cleanup on unmount
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

  // Stop on reciter change
  useEffect(() => {
    stop();
  }, [reciterId, stop]);

  const setRepeatCount = useCallback((count: number) => {
    setState(prev => ({ ...prev, repeatCount: count, currentRepeatIndex: 0 }));
  }, []);

  return {
    currentAyah: state.currentAyah,
    isPlaying: state.isPlaying,
    isBuffering: state.isBuffering,
    isPaused: state.isPaused,
    repeatCount: state.repeatCount,
    currentRepeatIndex: state.currentRepeatIndex,
    mode: state.mode,
    playAyah,
    playFullSurah,
    toggleAyah,
    togglePlayPause,
    pause,
    resume,
    next,
    previous,
    stop,
    setRepeatCount,
  };
};
