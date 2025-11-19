import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, Loader2, Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Share2, Menu } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { QuranNavigator } from "@/components/QuranNavigator";

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
  const [loading, setLoading] = useState(true);
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
  const ayahRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const { user } = useAuth();

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

  useEffect(() => {
    if (surahNumber) {
      fetchSurahData(parseInt(surahNumber));
      if (user) {
        fetchBookmarks(parseInt(surahNumber));
      }
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

  const fetchTafsir = async (ayahNumber: number) => {
    const tafsirKey = `${ayahNumber}-${selectedTafsir}-${selectedTafsir === "1" ? isAbridged : "full"}`;
    if (tafsirData[tafsirKey]) {
      return; // Already loaded
    }

    setLoadingTafsir(new Set(loadingTafsir).add(ayahNumber));

    try {
      const { data, error } = await supabase.functions.invoke("quran-tafsir", {
        body: {
          surah: parseInt(surahNumber!),
          ayah: ayahNumber,
          tafsirId: parseInt(selectedTafsir),
          abridged: selectedTafsir === "1" ? isAbridged : false,
        },
      });

      if (error) throw error;

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

  const fetchSurahData = async (number: number) => {
    try {
      setLoading(true);

      // Bismillah text to filter out
      const bismillah = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

      // Fetch Arabic text
      const { data: arabicResult, error: arabicError } = await supabase.functions.invoke(
        "quran-data",
        {
          body: { surah: number, edition: "ar.alafasy", type: "surah" },
        }
      );

      // Fetch English translation
      const { data: translationResult, error: translationError } = await supabase.functions.invoke(
        "quran-data",
        {
          body: { surah: number, edition: "en.sahih", type: "surah" },
        }
      );

      // Fetch transliteration
      const { data: transliterationResult, error: transliterationError } = await supabase.functions.invoke(
        "quran-data",
        {
          body: { surah: number, edition: "en.transliteration", type: "surah" },
        }
      );

      if (arabicError || translationError || transliterationError) {
        throw new Error("Failed to fetch Surah data");
      }

      // Remove Bismillah from first ayah if present (except for Surah 1 and 9)
      if (number !== 1 && number !== 9 && arabicResult.data.ayahs[0]) {
        const firstAyah = arabicResult.data.ayahs[0];
        firstAyah.text = firstAyah.text.replace(bismillah, '').trim();
      }

      setArabicData(arabicResult.data);
      setTranslationData(translationResult.data);
      setTransliterationData(transliterationResult.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load Surah");
      console.error("Error fetching Surah:", error);
    } finally {
      setLoading(false);
    }
  };
  const currentSurahNum = parseInt(surahNumber || "1");
  const prevSurah = currentSurahNum > 1 ? currentSurahNum - 1 : null;
  const nextSurah = currentSurahNum < 114 ? currentSurahNum + 1 : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
            <div className="flex items-center justify-between mb-4">
              <Link to="/quran" className="inline-flex items-center text-primary hover:underline">
                <BookOpen className="h-4 w-4 mr-2" />
                Back to Quran
              </Link>
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
                className="shadow-soft"
                ref={(el) => (ayahRefs.current[ayah.numberInSurah] = el)}
                data-ayah={ayah.numberInSurah}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {currentSurahNum}:{ayah.numberInSurah}
                    </span>
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
                  {transliterationData?.ayahs[index] && (
                    <p className="text-lg text-muted-foreground italic border-t pt-4">
                      {transliterationData.ayahs[index].text}
                    </p>
                  )}

                  {/* Translation */}
                  {translationData?.ayahs[index] && (
                    <p className="text-base text-foreground border-t pt-4">
                      {translationData.ayahs[index].text}
                    </p>
                  )}

                  {/* Tafsir */}
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
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
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

      <Footer />
    </div>
  );
};

export default SurahReader;
