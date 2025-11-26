import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Share2, Menu, WifiOff, Play, Pause } from "lucide-react";
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
import { AyahActionMenu } from "@/components/AyahActionMenu";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
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

const SurahReader = () => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const surahNum = parseInt(surahNumber || "1");
  
  // Use offline caching hooks
  const { data: arabicResult, loading: arabicLoading, isOffline: arabicOffline } = useOfflineQuranData(surahNum, "ar.alafasy");
  const { data: translationResult, loading: translationLoading, isOffline: translationOffline } = useOfflineQuranData(surahNum, "en.sahih");
  const { data: transliterationResult, loading: transliterationLoading, isOffline: transliterationOffline } = useOfflineQuranData(surahNum, "en.transliteration");
  
  const loading = arabicLoading || translationLoading || transliterationLoading;
  const isOffline = arabicOffline || translationOffline || transliterationOffline;
  
  const [arabicData, setArabicData] = useState<SurahData | null>(null);
  const [translationData, setTranslationData] = useState<SurahData | null>(null);
  const [transliterationData, setTransliterationData] = useState<SurahData | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [openTafsirs, setOpenTafsirs] = useState<Set<number>>(new Set());
  const [tafsirData, setTafsirData] = useState<{ [key: number]: string }>({});
  const [loadingTafsir, setLoadingTafsir] = useState<Set<number>>(new Set());
  const [selectedTafsir, setSelectedTafsir] = useState<string>("1");
  const [isAbridged, setIsAbridged] = useState<boolean>(true);
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [currentVisibleAyah, setCurrentVisibleAyah] = useState<number>(1);
  const [arabicOnlyMode, setArabicOnlyMode] = useState<boolean>(false);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<string>("ar.alafasy");
  const [showAudioBar, setShowAudioBar] = useState<boolean>(false);
  const [actionMenuState, setActionMenuState] = useState<{
    isOpen: boolean;
    ayahNumber: number | null;
    position: { x: number; y: number };
  }>({ isOpen: false, ayahNumber: null, position: { x: 0, y: 0 } });
  const [longPressAyah, setLongPressAyah] = useState<number | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const ayahRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const { user } = useAuth();

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

  // Save reading progress when ayahs are viewed
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
  }, [user, surahNumber, arabicData]);

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


  const handleShareAyah = async (ayahNumber: number) => {
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
      // Highlight the ayah briefly
      ayahElement.classList.add('ring-2', 'ring-primary');
      setTimeout(() => {
        ayahElement.classList.remove('ring-2', 'ring-primary');
      }, 2000);
    }
  };

  const handleAyahPlay = (ayahNumberInSurah: number) => {
    if (playingAyah === ayahNumberInSurah) {
      setPlayingAyah(null);
    } else {
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

  // Long press handlers
  const handleTouchStart = (e: React.TouchEvent, ayahNumber: number) => {
    // Prevent default to avoid text selection
    e.preventDefault();
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    
    longPressTimer.current = setTimeout(() => {
      setLongPressAyah(ayahNumber);
      const rect = e.currentTarget.getBoundingClientRect();
      const menuX = rect.left + rect.width / 2;
      const menuY = rect.top - 10;
      
      setActionMenuState({
        isOpen: true,
        ayahNumber,
        position: { x: menuX, y: menuY },
      });
    }, 500); // 500ms for long press
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setTimeout(() => setLongPressAyah(null), 300);
    touchStart.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStart.current.x);
    const deltaY = Math.abs(touch.clientY - touchStart.current.y);
    
    // If moved more than 10px, cancel long press
    if (deltaX > 10 || deltaY > 10) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    }
  };

  const handleContextMenu = (e: React.MouseEvent, ayahNumber: number) => {
    e.preventDefault();
    setActionMenuState({
      isOpen: true,
      ayahNumber,
      position: { x: e.clientX, y: e.clientY - 10 },
    });
  };

  const handleCopyAyah = () => {
    if (actionMenuState.ayahNumber === null) return;
    const ayah = arabicData?.ayahs.find(a => a.numberInSurah === actionMenuState.ayahNumber);
    if (ayah) {
      navigator.clipboard.writeText(ayah.text);
      toast.success("Arabic text copied to clipboard");
    }
  };

  const handleCopyTranslation = () => {
    if (actionMenuState.ayahNumber === null) return;
    const index = arabicData?.ayahs.findIndex(a => a.numberInSurah === actionMenuState.ayahNumber);
    if (index !== undefined && index >= 0 && translationData?.ayahs[index]) {
      navigator.clipboard.writeText(translationData.ayahs[index].text);
      toast.success("Translation copied to clipboard");
    }
  };

  const handleMenuBookmark = () => {
    if (actionMenuState.ayahNumber !== null) {
      toggleBookmark(actionMenuState.ayahNumber);
    }
  };

  const handleMenuShare = () => {
    if (actionMenuState.ayahNumber !== null) {
      handleShareAyah(actionMenuState.ayahNumber);
    }
  };

  const currentSurahNum = parseInt(surahNumber || "1");
  const prevSurah = currentSurahNum > 1 ? currentSurahNum - 1 : null;
  const nextSurah = currentSurahNum < 114 ? currentSurahNum + 1 : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex flex-col">
        <Navigation />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <AyahSkeleton key={i} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!arabicData || !translationData) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Failed to load Surah</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <Navigation />
      
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
                    <SelectItem value="ar.abdulbasit">Abdul Basit</SelectItem>
                    <SelectItem value="ar.abdurrahmaansudais">Abdur-Rahman Al-Sudais</SelectItem>
                    <SelectItem value="ar.shaatree">Abu Bakr Al-Shatri</SelectItem>
                    <SelectItem value="ar.husary">Mahmoud Al-Husary</SelectItem>
                    <SelectItem value="ar.minshawi">Mohamed Al-Minshawi</SelectItem>
                    <SelectItem value="ar.muhammadayyoub">Muhammad Ayyub</SelectItem>
                    <SelectItem value="ar.muhammadjibreel">Muhammad Jibreel</SelectItem>
                  </SelectContent>
                </Select>
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
            <Card className="mb-6 shadow-soft">
              <CardContent className="py-8 text-center">
                <p className="text-3xl text-foreground" dir="rtl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  In the name of Allah, the Most Gracious, the Most Merciful
                </p>
              </CardContent>
            </Card>
          )}

          {/* Ayahs */}
          <div className="space-y-6">
            {arabicData.ayahs.map((ayah, index) => (
              <Card
                key={ayah.number}
                className={`shadow-soft transition-transform duration-200 select-none ${
                  longPressAyah === ayah.numberInSurah ? "scale-[0.98]" : ""
                }`}
                ref={(el) => (ayahRefs.current[ayah.numberInSurah] = el)}
                data-ayah={ayah.numberInSurah}
                onTouchStart={(e) => handleTouchStart(e, ayah.numberInSurah)}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                onContextMenu={(e) => handleContextMenu(e, ayah.numberInSurah)}
                style={{ WebkitUserSelect: 'none', userSelect: 'none', WebkitTouchCallout: 'none' }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {currentSurahNum}:{ayah.numberInSurah}
                      </span>
                      <AudioPlayer 
                        ayahNumber={ayah.number}
                        reciter={selectedReciter}
                        isPlaying={playingAyah === ayah.numberInSurah}
                        onPlay={() => handleAyahPlay(ayah.numberInSurah)}
                        onEnded={handleAyahEnded}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleShareAyah(ayah.numberInSurah)}
                        className="h-8 w-8"
                        title="Share ayah"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleBookmark(ayah.numberInSurah)}
                        className="h-8 w-8"
                      >
                        {bookmarks.has(ayah.numberInSurah) ? (
                          <BookmarkCheck className="w-4 h-4 text-primary" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Arabic Text */}
                  <p className="text-3xl leading-loose text-right text-foreground" dir="rtl">
                    {ayah.text}
                  </p>

                  {/* Transliteration */}
                  {!arabicOnlyMode && transliterationData?.ayahs[index] && (
                    <p className="text-lg text-muted-foreground italic border-t pt-4">
                      {transliterationData.ayahs[index].text}
                    </p>
                  )}

                  {/* Translation */}
                  {!arabicOnlyMode && translationData?.ayahs[index] && (
                    <p className="text-base text-foreground border-t pt-4">
                      {translationData.ayahs[index].text}
                    </p>
                  )}

                  {/* Tafsir */}
                  {!arabicOnlyMode && (
                    <Collapsible
                      open={openTafsirs.has(ayah.numberInSurah)}
                      onOpenChange={(isOpen) => handleTafsirToggle(ayah.numberInSurah, isOpen)}
                      className="border-t pt-4"
                    >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="justify-start p-0 h-auto hover:bg-transparent w-fit">
                          <span className="text-sm font-semibold text-primary">View Tafsir (Commentary)</span>
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
                            <SelectTrigger className="w-[160px] sm:w-[200px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Ibn Kathir</SelectItem>
                              <SelectItem value="2">Maarif Ul Quran</SelectItem>
                              <SelectItem value="3">Tazkirul Quran</SelectItem>
                            </SelectContent>
                          </Select>
                          {selectedTafsir === "1" && (
                            <div className="flex items-center gap-2">
                              <Switch
                                id="abridged-mode"
                                checked={isAbridged}
                                onCheckedChange={setIsAbridged}
                              />
                              <Label htmlFor="abridged-mode" className="text-xs text-muted-foreground cursor-pointer whitespace-nowrap">
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
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-2 font-semibold">
                            {selectedTafsir === "1" 
                              ? `Tafsir Ibn Kathir${isAbridged ? " (Abridged)" : " (Full)"}` 
                              : selectedTafsir === "2" 
                                ? "Maarif Ul Quran" 
                                : "Tazkirul Quran"}
                          </p>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {tafsirData[`${ayah.numberInSurah}-${selectedTafsir}-${selectedTafsir === "1" ? isAbridged : "full"}`] || "Click to load tafsir..."}
                          </p>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                  )}
                </CardContent>
              </Card>
            ))}
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

      {/* iOS-style Action Menu */}
      <AyahActionMenu
        isOpen={actionMenuState.isOpen}
        onClose={() => setActionMenuState({ isOpen: false, ayahNumber: null, position: { x: 0, y: 0 } })}
        position={actionMenuState.position}
        onCopyAyah={handleCopyAyah}
        onCopyTranslation={handleCopyTranslation}
        onBookmark={handleMenuBookmark}
        onShare={handleMenuShare}
        isBookmarked={actionMenuState.ayahNumber !== null && bookmarks.has(actionMenuState.ayahNumber)}
      />

      <Footer />

      {/* Audio Control Bar */}
      {showAudioBar && arabicData && (
        <AudioControlBar
          isPlaying={playingAyah !== null}
          currentAyah={playingAyah || 1}
          totalAyahs={arabicData.numberOfAyahs}
          surahName={arabicData.englishName}
          onPlayPause={handlePlaySurah}
          onNext={handleNextAyah}
          onPrevious={handlePreviousAyah}
          onClose={handleCloseAudioBar}
        />
      )}
    </div>
  );
};

export default SurahReader;
