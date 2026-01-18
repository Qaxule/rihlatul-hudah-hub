import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { namesOfAllah } from "@/data/namesOfAllah";
import { namesOfAllahDetails } from "@/data/namesOfAllahDetails";
import { BookOpen, Quote, Sparkles, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

const NameDetail = () => {
  const { nameIndex } = useParams();
  const navigate = useNavigate();
  const currentIndex = nameIndex ? parseInt(nameIndex, 10) - 1 : 0;
  
  // Validate index
  const isValidIndex = currentIndex >= 0 && currentIndex < namesOfAllah.length;
  const name = isValidIndex ? namesOfAllah[currentIndex] : null;
  const details = name ? namesOfAllahDetails[name.transliteration] : null;

  // Swipe gesture state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      navigate(`/names/${currentIndex}`, { replace: true });
    }
  }, [currentIndex, navigate]);

  const goToNext = useCallback(() => {
    if (currentIndex < namesOfAllah.length - 1) {
      navigate(`/names/${currentIndex + 2}`, { replace: true });
    }
  }, [currentIndex, navigate]);

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
  }, [goToPrevious, goToNext]);

  if (!isValidIndex || !name) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Name not found</h1>
          <Link to="/names">
            <Button>Back to 99 Names</Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="bg-gradient-subtle">
      <div 
        className="min-h-screen"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b">
          <div className="container mx-auto px-4 py-6">
            {/* Back button and navigation */}
            <div className="flex items-center justify-between mb-6">
              <Link to="/names">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">All Names</span>
                </Button>
              </Link>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className="h-9 w-9"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground font-medium min-w-[60px] text-center">
                  {currentIndex + 1} of 99
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  disabled={currentIndex === namesOfAllah.length - 1}
                  className="h-9 w-9"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Name display */}
            <div className="text-center space-y-4 py-8">
              <p className="text-6xl md:text-7xl font-bold text-primary leading-tight" dir="rtl">
                {name.arabic}
              </p>
              <div className="space-y-2">
                <p className="text-2xl md:text-3xl font-semibold text-foreground">
                  {name.transliteration}
                </p>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {name.meaning}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {details ? (
              <>
                {/* Explanation */}
                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h2 className="font-semibold text-lg">Understanding This Name</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {details.explanation}
                    </p>
                  </CardContent>
                </Card>

                {/* Quran Reference */}
                {details.quranReference && (
                  <Card className="shadow-soft bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="font-semibold text-lg">Quran Reference</h2>
                      </div>
                      <p className="text-3xl md:text-4xl text-center my-6 font-arabic leading-loose" dir="rtl">
                        {details.quranReference.arabic}
                      </p>
                      <p className="text-muted-foreground italic text-center text-lg">
                        "{details.quranReference.translation}"
                      </p>
                      <p className="text-sm text-primary text-center mt-4 font-medium">
                        Surah {details.quranReference.surah} • Ayah {details.quranReference.ayah}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Hadith Reference */}
                {details.hadithReference && (
                  <Card className="shadow-soft bg-gradient-to-br from-accent/10 to-transparent border-accent/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-accent/20">
                          <Quote className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <h2 className="font-semibold text-lg">Hadith Reference</h2>
                      </div>
                      <p className="text-muted-foreground italic leading-relaxed text-lg">
                        "{details.hadithReference.text}"
                      </p>
                      <p className="text-sm text-muted-foreground mt-4 font-medium">
                        — {details.hadithReference.source}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Benefits */}
                {details.benefits && details.benefits.length > 0 && (
                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <span className="text-xl">💡</span> Benefits & Reflections
                      </h2>
                      <ul className="space-y-3">
                        {details.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="text-primary text-lg">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <p className="text-muted-foreground">{name.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Navigation hint */}
            <p className="text-center text-sm text-muted-foreground pt-4">
              Use ← → arrow keys or swipe to navigate between names
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NameDetail;
