import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Share2, Menu, WifiOff, Play, Pause, ArrowUp, Eye, EyeOff, Link2, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { QuranNavigator } from "@/components/QuranNavigator";
import { AyahSkeleton } from "@/components/AyahSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useOfflineQuranData } from "@/hooks/useOfflineQuranData";
import { offlineCache, CACHE_CONFIG, STORES } from "@/lib/offlineCache";
import AudioPlayer from "@/components/AudioPlayer";
import AudioControlBar from "@/components/AudioControlBar";
import { WordByWordPopover } from "@/components/quran/WordByWordPopover";
import { ReflectionDialog } from "@/components/quran/ReflectionDialog";
import { HifzModePanel } from "@/components/quran/HifzModePanel";
import { StreakDisplay } from "@/components/quran/StreakDisplay";
import { useReadingStreak } from "@/hooks/useReadingStreak";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  audio?: string;
}

interface SurahData {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

// Map reciter IDs to everyayah.com folder names (more reliable CDN)
const RECITER_AUDIO_FOLDERS: Record<string, string> = {
  "ar.alafasy": "Alafasy_128kbps",
  "ar.abdulsamad": "Abdul_Basit_Murattal_64kbps",
  "ar.abdurrahmaansudais": "Abdurrahmaan_As-Sudais_192kbps",
  "ar.shaatree": "Abu_Bakr_Ash-Shaatree_128kbps",
  "ar.husary": "Husary_128kbps",
  "ar.minshawi": "Minshawy_Murattal_128kbps",
  "ar.muhammadayyoub": "Muhammad_Ayyoub_128kbps",
  "ar.muhammadjibreel": "Muhammad_Jibreel_64kbps",
};

// Get audio URL from everyayah.com CDN (more reliable)
const getAudioUrl = (surahNum: number, ayahNum: number, reciterId: string): string => {
  const folder = RECITER_AUDIO_FOLDERS[reciterId] || "Alafasy_128kbps";
  const surahPadded = surahNum.toString().padStart(3, "0");
  const ayahPadded = ayahNum.toString().padStart(3, "0");
  return `https://everyayah.com/data/${folder}/${surahPadded}${ayahPadded}.mp3`;
};

const SurahReader = () => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const surahNum = parseInt(surahNumber || "1");
  
  // Reciter state needs to be declared before the hooks that use it
  const [selectedReciter, setSelectedReciter] = useState<string>("ar.alafasy");
  
  // Use offline caching hooks - arabicResult uses the selected reciter for audio
  const { data: arabicResult, loading: arabicLoading, isOffline: arabicOffline } = useOfflineQuranData(surahNum, selectedReciter);
  const { data: translationResult, loading: translationLoading, isOffline: translationOffline } = useOfflineQuranData(surahNum, "en.sahih");
  const { data: transliterationResult, loading: transliterationLoading, isOffline: transliterationOffline } = useOfflineQuranData(surahNum, "en.transliteration");
  
  const loading = arabicLoading || translationLoading || transliterationLoading;
  const isOffline = arabicOffline || translationOffline || transliterationOffline;
  
  const [arabicData, setArabicData] = useState<SurahData | null>(null);
  const [translationData, setTranslationData] = useState<SurahData | null>(null);
  const [transliterationData, setTransliterationData] = useState<SurahData | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [openTafsirs, setOpenTafsirs] = useState<Set<number>>(new Set());
  const [tafsirData, setTafsirData] = useState<{ [key: string]: string }>({});
  const [loadingTafsir, setLoadingTafsir] = useState<Set<number>>(new Set());
  const [selectedTafsir, setSelectedTafsir] = useState<string>("1");
  const [isAbridged, setIsAbridged] = useState<boolean>(true);
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [currentVisibleAyah, setCurrentVisibleAyah] = useState<number>(1);
  const [arabicOnlyMode, setArabicOnlyMode] = useState<boolean>(false);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [isAudioBuffering, setIsAudioBuffering] = useState<boolean>(false);
  const [showAudioBar, setShowAudioBar] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Word-by-word mode
  const [wordByWordMode, setWordByWordMode] = useState(false);
  
  // Hifz mode states
  const [hifzMode, setHifzMode] = useState(false);
  const [hiddenAyahs, setHiddenAyahs] = useState<Set<number>>(new Set());
  const [testMode, setTestMode] = useState(false);
  
  const ayahRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const { user } = useAuth();
  const { updateStreak } = useReadingStreak();

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save reading position to localStorage whenever visible ayah changes
  useEffect(() => {
    if (surahNumber && currentVisibleAyah > 0) {
      const position = {
        surahNumber: parseInt(surahNumber),
        ayahNumber: currentVisibleAyah,
        timestamp: Date.now()
      };
      localStorage.setItem('quran-reading-position', JSON.stringify(position));
    }
  }, [surahNumber, currentVisibleAyah]);

  // Restore reading position after data is loaded
  useEffect(() => {
    if (!arabicData || !surahNumber) return;

    const savedPosition = localStorage.getItem('quran-reading-position');
    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition);
        // Only restore if it's for the current surah
        if (position.surahNumber === parseInt(surahNumber)) {
          // Wait for DOM to be ready, then scroll to saved position
          setTimeout(() => {
            scrollToAyah(position.ayahNumber);
          }, 300);
        }
      } catch (e) {
        console.error('Failed to restore reading position:', e);
      }
    }
  }, [arabicData, surahNumber]);

  // Save reading progress and update streak when ayahs are viewed
  useEffect(() => {
    if (!user || !surahNumber || !arabicData) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of ayah is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ayahNumber = parseInt(entry.target.getAttribute('data-ayah') || '0');
          if (ayahNumber > 0) {
            saveReadingProgress(parseInt(surahNumber), ayahNumber);
            setCurrentVisibleAyah(ayahNumber);
            // Update streak when reading
            updateStreak();
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all ayah cards
    Object.values(ayahRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [user, surahNumber, arabicData, updateStreak]);

  const saveReadingProgress = async (surahNum: number, ayahNum: number) => {
    if (!user) return;

    try {
      // Check if progress exists
      const { data: existing } = await supabase
        .from('reading_progress')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        // Update existing progress
        await supabase
          .from('reading_progress')
          .update({
            surah_number: surahNum,
            ayah_number: ayahNum,
            last_read_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);
      } else {
        // Insert new progress
        await supabase
          .from('reading_progress')
          .insert({
            user_id: user.id,
            surah_number: surahNum,
            ayah_number: ayahNum,
          });
      }
    } catch (error) {
      console.error('Error saving reading progress:', error);
    }
  };

  // Process data when loaded
  useEffect(() => {
    if (arabicResult && translationResult && transliterationResult) {
      // Bismillah text to filter out
      const bismillah = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
      
      // Remove Bismillah from first ayah if present (except for Surah 1 and 9)
      if (surahNum !== 1 && surahNum !== 9 && arabicResult.ayahs[0]) {
        const firstAyah = arabicResult.ayahs[0];
        firstAyah.text = firstAyah.text.replace(bismillah, '').trim();
      }
      
      setArabicData(arabicResult);
      setTranslationData(translationResult);
      setTransliterationData(transliterationResult);
    }
  }, [arabicResult, translationResult, transliterationResult, surahNum]);
  
  useEffect(() => {
    if (surahNumber && user) {
      fetchBookmarks(parseInt(surahNumber));
    }
  }, [surahNumber, user]);

  const fetchBookmarks = async (surahNum: number) => {
    const { data, error } = await supabase
      .from("quran_bookmarks")
      .select("ayah_number")
      .eq("surah_number", surahNum);

    if (!error && data) {
      setBookmarks(new Set(data.map((b) => b.ayah_number)));
    }
  };

  const toggleBookmark = async (ayahNumber: number) => {
    if (!user) {
      toast.error("Please login to bookmark verses");
      return;
    }

    const isBookmarked = bookmarks.has(ayahNumber);

    if (isBookmarked) {
      const { error } = await supabase
        .from("quran_bookmarks")
        .delete()
        .eq("surah_number", parseInt(surahNumber!))
        .eq("ayah_number", ayahNumber);

      if (error) {
        toast.error("Failed to remove bookmark");
      } else {
        const newBookmarks = new Set(bookmarks);
        newBookmarks.delete(ayahNumber);
        setBookmarks(newBookmarks);
        toast.success("Bookmark removed");
      }
    } else {
      const { error } = await supabase.from("quran_bookmarks").insert({
        user_id: user.id,
        surah_number: parseInt(surahNumber!),
        ayah_number: ayahNumber,
      });

      if (error) {
        toast.error("Failed to add bookmark");
      } else {
        const newBookmarks = new Set(bookmarks);
        newBookmarks.add(ayahNumber);
        setBookmarks(newBookmarks);
        toast.success("Bookmark added");
      }
    }
  };


  const handleCopyAyahText = async (ayahNumber: number) => {
    if (!arabicData || !translationData) return;
    
    const index = ayahNumber - 1;
    const arabicText = arabicData.ayahs[index]?.text || "";
    const transliteration = transliterationData?.ayahs[index]?.text || "";
    const translation = translationData.ayahs[index]?.text || "";
    
    // Get tafsir if available
    const tafsirKey = `${ayahNumber}-${selectedTafsir}-${selectedTafsir === "1" ? isAbridged : "full"}`;
    const tafsir = tafsirData[tafsirKey];
    
    // Format the share text
    let shareText = `${arabicData.englishName} (${arabicData.name}) - Ayah ${ayahNumber}\n\n`;
    shareText += `${arabicText}\n\n`;
    if (transliteration) {
      shareText += `${transliteration}\n\n`;
    }
    shareText += `Translation: ${translation}`;
    
    if (tafsir && openTafsirs.has(ayahNumber)) {
      const tafsirName = selectedTafsir === "1" ? "Ibn Kathir" : selectedTafsir === "2" ? "Maarif Ul Quran" : "Tazkirul Quran";
      shareText += `\n\nTafsir (${tafsirName}):\n${tafsir}`;
    }
    
    try {
      // Try Web Share API first (if supported)
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${arabicData.englishName} - Ayah ${ayahNumber}`,
            text: shareText,
          });
          toast.success("Shared successfully");
          return;
        } catch (shareError) {
          // If share fails (NotAllowedError, etc.), fall through to clipboard
          if (shareError instanceof Error && shareError.name === "AbortError") {
            return; // User cancelled, don't show error
          }
        }
      }
      
      // Fallback to clipboard
      await navigator.clipboard.writeText(shareText);
      toast.success("Copied to clipboard");
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleCopyAyahLink = async (ayahNumber: number) => {
    const link = `https://rihlatulhudah.com/surah/${surahNum}#ayah-${ayahNumber}`;
    
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.error("Error copying link:", error);
      toast.error("Failed to copy link");
    }
  };

  const handleTafsirToggle = async (ayahNumber: number, isOpen: boolean) => {
    const newOpenTafsirs = new Set(openTafsirs);
    if (isOpen) {
      newOpenTafsirs.add(ayahNumber);
      await fetchTafsir(ayahNumber);
    } else {
      newOpenTafsirs.delete(ayahNumber);
    }
    setOpenTafsirs(newOpenTafsirs);
  };

  // Refetch tafsir when selection or abridged mode changes for open verses
  useEffect(() => {
    openTafsirs.forEach((ayahNumber) => {
      fetchTafsir(ayahNumber);
    });
  }, [selectedTafsir, isAbridged]);

  // Handle hash navigation to specific ayah
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const ayahMatch = hash.match(/#ayah-(\d+)/);
      if (ayahMatch) {
        const ayahNumber = parseInt(ayahMatch[1]);
        setTimeout(() => scrollToAyah(ayahNumber), 500);
      }
    }
  }, [arabicData]);

  const scrollToAyah = (ayahNumber: number) => {
    const ayahElement = ayahRefs.current[ayahNumber];
    if (ayahElement) {
      ayahElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  const handleAyahPlay = (ayahNumberInSurah: number) => {
    if (playingAyah === ayahNumberInSurah) {
      setPlayingAyah(null);
    } else {
      setShowAudioBar(true);
      setPlayingAyah(ayahNumberInSurah);
    }
  };

  const handleAyahEnded = () => {
    if (!arabicData || playingAyah === null) return;
    
    const nextAyahNumber = playingAyah + 1;
    if (nextAyahNumber <= arabicData.numberOfAyahs) {
      setPlayingAyah(nextAyahNumber);
      // Scroll to next ayah
      setTimeout(() => scrollToAyah(nextAyahNumber), 100);
    } else {
      setPlayingAyah(null);
      toast.success("Surah completed");
    }
  };

  const handlePlaySurah = () => {
    if (playingAyah !== null) {
      setPlayingAyah(null);
    } else {
      setShowAudioBar(true);
      setPlayingAyah(1);
      scrollToAyah(1);
    }
  };

  const handleNextAyah = () => {
    if (playingAyah !== null && arabicData && playingAyah < arabicData.numberOfAyahs) {
      const nextAyah = playingAyah + 1;
      setPlayingAyah(nextAyah);
      scrollToAyah(nextAyah);
    }
  };

  const handlePreviousAyah = () => {
    if (playingAyah !== null && playingAyah > 1) {
      const prevAyah = playingAyah - 1;
      setPlayingAyah(prevAyah);
      scrollToAyah(prevAyah);
    }
  };

  const handleCloseAudioBar = () => {
    setPlayingAyah(null);
    setShowAudioBar(false);
  };

  // Fetch tafsir with offline caching
  const fetchTafsir = async (ayahNumber: number) => {
    const tafsirKey = `${ayahNumber}-${selectedTafsir}-${selectedTafsir === "1" ? isAbridged : "full"}`;
    if (tafsirData[tafsirKey]) {
      return; // Already loaded
    }

    setLoadingTafsir(new Set(loadingTafsir).add(ayahNumber));

    try {
      // Try to get from cache first
      const cacheKey = CACHE_CONFIG.TAFSIR(surahNum, ayahNumber, parseInt(selectedTafsir), selectedTafsir === "1" ? isAbridged : false);
      const cachedTafsir = await offlineCache.get(
        STORES.TAFSIR,
        cacheKey,
        CACHE_CONFIG.TAFSIR_MAX_AGE
      );

      if (cachedTafsir) {
        setTafsirData({
          ...tafsirData,
          [tafsirKey]: cachedTafsir,
        });
        setLoadingTafsir(new Set(Array.from(loadingTafsir).filter(n => n !== ayahNumber)));
        return;
      }

      // Fetch from network
      const { data, error } = await supabase.functions.invoke("quran-tafsir", {
        body: {
          surah: surahNum,
          ayah: ayahNumber,
          tafsirId: parseInt(selectedTafsir),
          abridged: selectedTafsir === "1" ? isAbridged : false,
        },
      });

      if (error) throw error;

      // Cache the result
      await offlineCache.set(STORES.TAFSIR, cacheKey, data.text);

      setTafsirData({
        ...tafsirData,
        [tafsirKey]: data.text,
      });
    } catch (error) {
      console.error("Error fetching tafsir:", error);
      toast.error("Failed to load tafsir");
    } finally {
      const newLoadingTafsir = new Set(loadingTafsir);
      newLoadingTafsir.delete(ayahNumber);
      setLoadingTafsir(newLoadingTafsir);
    }
  };

  // Hifz mode functions
  const toggleAyahVisibility = useCallback((ayahNumber: number) => {
    setHiddenAyahs(prev => {
      const next = new Set(prev);
      if (next.has(ayahNumber)) {
        next.delete(ayahNumber);
      } else {
        next.add(ayahNumber);
      }
      return next;
    });
  }, []);

  const hideAllAyahs = useCallback(() => {
    if (!arabicData) return;
    const allAyahs = new Set(arabicData.ayahs.map(a => a.numberInSurah));
    setHiddenAyahs(allAyahs);
  }, [arabicData]);

  const showAllAyahs = useCallback(() => {
    setHiddenAyahs(new Set());
  }, []);

  // Render Arabic text with word-by-word or plain
  const renderArabicText = (text: string, ayahNumber: number) => {
    if (!wordByWordMode) {
      return text;
    }

    // Split by whitespace while preserving the characters
    const words = text.split(/\s+/).filter(w => w.trim());
    
    return (
      <span className="inline">
        {words.map((word, index) => (
          <span key={index}>
            <WordByWordPopover
              word={word}
              index={index}
              surahNumber={surahNum}
              ayahNumber={ayahNumber}
            />
            {index < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    );
  };

  const currentSurahNum = parseInt(surahNumber || "1");
  const prevSurah = currentSurahNum > 1 ? currentSurahNum - 1 : null;
  const nextSurah = currentSurahNum < 114 ? currentSurahNum + 1 : null;

  if (loading) {
    return (
      <PageWrapper className="bg-gradient-subtle">
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <AyahSkeleton key={i} />
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!arabicData || !translationData) {
    return (
      <PageWrapper className="bg-gradient-subtle">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Failed to load Surah</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="bg-gradient-subtle">
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-3">
              <Link to="/quran" className="inline-flex items-center text-primary hover:underline">
                <BookOpen className="h-4 w-4 mr-2" />
                Back to Quran
              </Link>
              <div className="flex items-center gap-2">
                {user && <StreakDisplay compact />}
                {isOffline && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
                    <WifiOff className="h-3 w-3" />
                    Offline
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNavigatorOpen(true)}
                  className="gap-2"
                >
                  <Menu className="h-4 w-4" />
                  Navigate
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  onClick={handlePlaySurah}
                  variant="outline"
                  className="gap-2"
                >
                  {playingAyah !== null ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Stop Surah
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Play Surah
                    </>
                  )}
                </Button>
                <Select value={selectedReciter} onValueChange={setSelectedReciter}>
                  <SelectTrigger className="w-[200px] h-9 bg-background">
                    <SelectValue placeholder="Select Reciter" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="ar.alafasy">Mishary Alafasy</SelectItem>
                    <SelectItem value="ar.abdulsamad">Abdul Basit Abdul Samad</SelectItem>
                    <SelectItem value="ar.abdurrahmaansudais">Abdur-Rahman Al-Sudais</SelectItem>
                    <SelectItem value="ar.shaatree">Abu Bakr Al-Shatri</SelectItem>
                    <SelectItem value="ar.husary">Mahmoud Al-Husary</SelectItem>
                    <SelectItem value="ar.minshawi">Mohamed Al-Minshawi</SelectItem>
                    <SelectItem value="ar.muhammadayyoub">Muhammad Ayyub</SelectItem>
                    <SelectItem value="ar.muhammadjibreel">Muhammad Jibreel</SelectItem>
                  </SelectContent>
                </Select>
                <HifzModePanel
                  surahNumber={surahNum}
                  surahName={arabicData.englishName}
                  totalAyahs={arabicData.numberOfAyahs}
                  hiddenAyahs={hiddenAyahs}
                  onToggleHide={toggleAyahVisibility}
                  onHideAll={hideAllAyahs}
                  onShowAll={showAllAyahs}
                  onTestMode={setTestMode}
                  testMode={testMode}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                  <Switch
                    id="word-by-word"
                    checked={wordByWordMode}
                    onCheckedChange={setWordByWordMode}
                  />
                  <Label htmlFor="word-by-word" className="text-xs font-medium cursor-pointer whitespace-nowrap">
                    Word-by-Word
                  </Label>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                  <Switch
                    id="arabic-only"
                    checked={arabicOnlyMode}
                    onCheckedChange={setArabicOnlyMode}
                  />
                  <Label htmlFor="arabic-only" className="text-xs font-medium cursor-pointer whitespace-nowrap">
                    Arabic Only
                  </Label>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2" dir="rtl">
              {arabicData.name}
            </h1>
            <h2 className="text-2xl font-semibold text-primary mb-2">
              {arabicData.englishName}
            </h2>
            <p className="text-muted-foreground">
              {arabicData.englishNameTranslation} • {arabicData.revelationType} • {arabicData.numberOfAyahs} Ayahs
            </p>
          </div>

          {/* Bismillah */}
          {currentSurahNum !== 1 && currentSurahNum !== 9 && (
            <div className="mb-8 py-8 text-center border-b border-border/50">
              <p className="text-3xl md:text-4xl text-foreground leading-relaxed" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>
          )}

          {/* Ayahs - Continuous Reading Layout */}
          <div className="divide-y divide-border/40">
            {arabicData.ayahs.map((ayah, index) => {
              const isHidden = hiddenAyahs.has(ayah.numberInSurah);
              
              return (
                <div
                  key={ayah.number}
                  className="py-6 md:py-8"
                  ref={(el) => (ayahRefs.current[ayah.numberInSurah] = el)}
                  data-ayah={ayah.numberInSurah}
                >
                    {/* Ayah Header - Subtle */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-muted-foreground/70 tabular-nums">
                          {currentSurahNum}:{ayah.numberInSurah}
                        </span>
                        <AudioPlayer 
                          audioUrl={getAudioUrl(currentSurahNum, ayah.numberInSurah, selectedReciter)}
                          preloadUrl={
                            ayah.numberInSurah < arabicData.numberOfAyahs
                              ? getAudioUrl(currentSurahNum, ayah.numberInSurah + 1, selectedReciter)
                              : undefined
                          }
                          isPlaying={playingAyah === ayah.numberInSurah}
                          onPlay={() => handleAyahPlay(ayah.numberInSurah)}
                          onEnded={handleAyahEnded}
                          onBufferingChange={(buffering) => {
                            if (playingAyah === ayah.numberInSurah) {
                              setIsAudioBuffering(buffering);
                            }
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        {/* Hifz hide/show button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleAyahVisibility(ayah.numberInSurah)}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          title={isHidden ? "Show ayah" : "Hide ayah"}
                        >
                          {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <ReflectionDialog
                          surahNumber={surahNum}
                          ayahNumber={ayah.numberInSurah}
                          surahName={arabicData.englishName}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              title="Share ayah"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleCopyAyahText(ayah.numberInSurah)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Text
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyAyahLink(ayah.numberInSurah)}>
                              <Link2 className="w-4 h-4 mr-2" />
                              Copy Link
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleBookmark(ayah.numberInSurah)}
                          className="h-8 w-8"
                        >
                          {bookmarks.has(ayah.numberInSurah) ? (
                            <BookmarkCheck className="w-4 h-4 text-primary" />
                          ) : (
                            <Bookmark className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Arabic Text - Primary & Prominent */}
                    {isHidden && testMode ? (
                      <div 
                        className="bg-muted/50 rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => toggleAyahVisibility(ayah.numberInSurah)}
                      >
                        <p className="text-muted-foreground">Tap to reveal ayah {ayah.numberInSurah}</p>
                      </div>
                    ) : isHidden ? (
                      <div className="bg-muted/30 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground text-sm">Hidden for memorization</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-2xl md:text-3xl lg:text-4xl leading-[2] md:leading-[2.2] text-right text-foreground font-arabic" dir="rtl">
                          {renderArabicText(ayah.text, ayah.numberInSurah)}
                        </p>

                        {/* Transliteration - Smaller */}
                        {!arabicOnlyMode && transliterationData?.ayahs[index] && (
                          <p className="text-base md:text-lg text-muted-foreground/80 italic mt-4 leading-relaxed">
                            {transliterationData.ayahs[index].text}
                          </p>
                        )}

                        {/* Translation - Secondary */}
                        {!arabicOnlyMode && translationData?.ayahs[index] && (
                          <p className="text-sm md:text-base text-foreground/80 mt-3 leading-relaxed">
                            {translationData.ayahs[index].text}
                          </p>
                        )}
                      </>
                    )}

                    {/* Tafsir */}
                    {!arabicOnlyMode && !isHidden && (
                      <Collapsible
                        open={openTafsirs.has(ayah.numberInSurah)}
                        onOpenChange={(isOpen) => handleTafsirToggle(ayah.numberInSurah, isOpen)}
                        className="mt-4 pt-4 border-t border-border/30"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="justify-start p-0 h-auto hover:bg-transparent w-fit">
                              <span className="text-sm font-medium text-primary/80 hover:text-primary">View Tafsir</span>
                              {openTafsirs.has(ayah.numberInSurah) ? (
                                <ChevronUp className="h-4 w-4 ml-2" />
                              ) : (
                                <ChevronDown className="h-4 w-4 ml-2" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                          {openTafsirs.has(ayah.numberInSurah) && (
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <Select value={selectedTafsir} onValueChange={setSelectedTafsir}>
                                <SelectTrigger className="w-[160px] sm:w-[200px] h-8 bg-background">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-background">
                                  <SelectItem value="1">Ibn Kathir</SelectItem>
                                  <SelectItem value="2">Maarif Ul Quran</SelectItem>
                                  <SelectItem value="3">Tazkirul Quran</SelectItem>
                                </SelectContent>
                              </Select>
                              {selectedTafsir === "1" && (
                                <div className="flex items-center gap-2">
                                  <Switch
                                    id={`abridged-mode-${ayah.numberInSurah}`}
                                    checked={isAbridged}
                                    onCheckedChange={setIsAbridged}
                                  />
                                  <Label htmlFor={`abridged-mode-${ayah.numberInSurah}`} className="text-xs text-muted-foreground cursor-pointer whitespace-nowrap">
                                    Abridged
                                  </Label>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <CollapsibleContent className="pt-2">
                          {loadingTafsir.has(ayah.numberInSurah) ? (
                            <div className="space-y-2 py-4">
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-11/12" />
                              <Skeleton className="h-4 w-5/6" />
                            </div>
                          ) : (
                            <div className="bg-muted/30 rounded-lg p-4">
                              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                                {selectedTafsir === "1" 
                                  ? `Ibn Kathir${isAbridged ? " (Abridged)" : ""}` 
                                  : selectedTafsir === "2" 
                                    ? "Maarif Ul Quran" 
                                    : "Tazkirul Quran"}
                              </p>
                              <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/80">
                                {tafsirData[`${ayah.numberInSurah}-${selectedTafsir}-${selectedTafsir === "1" ? isAbridged : "full"}`] || "Click to load tafsir..."}
                              </p>
                            </div>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            {prevSurah ? (
              <Link to={`/surah/${prevSurah}`}>
                <Button variant="outline">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous Surah
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {nextSurah ? (
              <Link to={`/surah/${nextSurah}`}>
                <Button variant="outline">
                  Next Surah
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Quran Navigator */}
        <QuranNavigator
          open={navigatorOpen}
          onOpenChange={setNavigatorOpen}
          currentSurah={currentSurahNum}
          currentAyah={currentVisibleAyah}
          onAyahSelect={scrollToAyah}
        />
      </main>

      {/* Audio Control Bar */}
      {showAudioBar && arabicData && (
        <AudioControlBar
          isPlaying={playingAyah !== null}
          isBuffering={isAudioBuffering}
          currentAyah={playingAyah || 1}
          totalAyahs={arabicData.numberOfAyahs}
          surahName={arabicData.englishName}
          onPlayPause={handlePlaySurah}
          onNext={handleNextAyah}
          onPrevious={handlePreviousAyah}
          onClose={handleCloseAudioBar}
        />
      )}

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-4 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default SurahReader;
