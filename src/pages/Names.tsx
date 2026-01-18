import { useState, useEffect, useCallback, useRef } from "react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { namesOfAllah } from "@/data/namesOfAllah";
import { namesOfAllahDetails } from "@/data/namesOfAllahDetails";
import { useSEO, SEO_DATA } from "@/hooks/useSEO";
import asmaUlHusnaIcon from "@/assets/asma-ul-husna-icon.png";
import { BookOpen, Quote, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Names = () => {
  useSEO(SEO_DATA.names);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedName = selectedIndex !== null ? namesOfAllah[selectedIndex] : null;
  
  // Swipe gesture state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const getNameDetails = (transliteration: string) => {
    return namesOfAllahDetails[transliteration];
  };

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < namesOfAllah.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, goToPrevious, goToNext]);

  return (
    <PageWrapper className="bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
            <img src={asmaUlHusnaIcon} alt="99 Names" className="w-8 h-8 dark:invert" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            The 99 Names of Allah
          </h1>
          <p className="text-xl text-muted-foreground italic">
            أَسْمَاءُ ٱللَّٰهِ ٱلْحُسْنَىٰ
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Most Beautiful Names. Click on any name to learn more with Quran and Hadith references.
          </p>
        </div>

        {/* Names Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {namesOfAllah.map((name, index) => (
            <Card
              key={index}
              className="shadow-soft hover:shadow-elevated transition-all group cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-right text-foreground group-hover:text-primary transition-colors" dir="rtl">
                    {name.arabic}
                  </h2>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-primary">
                      {name.transliteration}
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {name.meaning}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {name.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="shadow-soft border-primary/20">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground text-center italic">
                "And to Allah belong the best names, so invoke Him by them." 
                <span className="block mt-2 font-semibold">(Quran 7:180)</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent 
          className="max-w-2xl max-h-[90vh] p-0 overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Header with gradient background */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 pb-4 border-b">
            <DialogHeader>
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrevious}
                  disabled={selectedIndex === 0}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground font-medium">
                  {selectedIndex !== null ? selectedIndex + 1 : 0} of 99
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  disabled={selectedIndex === namesOfAllah.length - 1}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <DialogTitle className="text-center space-y-3">
                <p className="text-5xl font-bold text-primary leading-tight" dir="rtl">
                  {selectedName?.arabic}
                </p>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold text-foreground">{selectedName?.transliteration}</p>
                  <p className="text-lg text-muted-foreground">{selectedName?.meaning}</p>
                </div>
              </DialogTitle>
            </DialogHeader>
          </div>

          <ScrollArea className="max-h-[55vh] px-6 py-4">
            {selectedName && getNameDetails(selectedName.transliteration) ? (
              <div className="space-y-5">
                {/* Explanation */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-base">Understanding This Name</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {getNameDetails(selectedName.transliteration)?.explanation}
                  </p>
                </div>

                {/* Quran Reference */}
                {getNameDetails(selectedName.transliteration)?.quranReference && (
                  <div className="bg-gradient-to-br from-primary/8 to-primary/3 rounded-xl p-5 border border-primary/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-primary/10">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-sm">Quran Reference</h3>
                    </div>
                    <p className="text-2xl text-center my-4 font-arabic leading-loose" dir="rtl">
                      {getNameDetails(selectedName.transliteration)?.quranReference?.arabic}
                    </p>
                    <p className="text-muted-foreground italic text-center text-sm">
                      "{getNameDetails(selectedName.transliteration)?.quranReference?.translation}"
                    </p>
                    <p className="text-xs text-primary text-center mt-3 font-medium">
                      Surah {getNameDetails(selectedName.transliteration)?.quranReference?.surah} • Ayah {getNameDetails(selectedName.transliteration)?.quranReference?.ayah}
                    </p>
                  </div>
                )}

                {/* Hadith Reference */}
                {getNameDetails(selectedName.transliteration)?.hadithReference && (
                  <div className="bg-gradient-to-br from-accent/15 to-accent/5 rounded-xl p-5 border border-accent/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-accent/20">
                        <Quote className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <h3 className="font-semibold text-sm">Hadith Reference</h3>
                    </div>
                    <p className="text-muted-foreground italic text-sm leading-relaxed">
                      "{getNameDetails(selectedName.transliteration)?.hadithReference?.text}"
                    </p>
                    <p className="text-xs text-muted-foreground mt-3 font-medium">
                      — {getNameDetails(selectedName.transliteration)?.hadithReference?.source}
                    </p>
                  </div>
                )}

                {/* Benefits */}
                {getNameDetails(selectedName.transliteration)?.benefits && (
                  <div className="space-y-2 pb-2">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <span className="text-lg">💡</span> Benefits & Reflections
                    </h3>
                    <ul className="space-y-2">
                      {getNameDetails(selectedName.transliteration)?.benefits?.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">{selectedName?.description}</p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
};

export default Names;
