import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, Loader2 } from "lucide-react";
import { toast } from "sonner";

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

  useEffect(() => {
    if (surahNumber) {
      fetchSurahData(parseInt(surahNumber));
    }
  }, [surahNumber]);

  const fetchSurahData = async (number: number) => {
    try {
      setLoading(true);

      // Fetch Arabic text
      const arabicResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quran-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ surah: number, edition: "ar.alafasy", type: "surah" }),
        }
      );

      // Fetch English translation
      const translationResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quran-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ surah: number, edition: "en.sahih", type: "surah" }),
        }
      );

      // Fetch transliteration
      const transliterationResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quran-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ surah: number, edition: "en.transliteration", type: "surah" }),
        }
      );

      if (!arabicResponse.ok || !translationResponse.ok || !transliterationResponse.ok) {
        throw new Error("Failed to fetch Surah data");
      }

      const arabicResult = await arabicResponse.json();
      const translationResult = await translationResponse.json();
      const transliterationResult = await transliterationResponse.json();

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
            <Link to="/quran" className="inline-flex items-center text-primary hover:underline mb-4">
              <BookOpen className="h-4 w-4 mr-2" />
              Back to Quran
            </Link>
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
              <Card key={ayah.number} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Ayah {ayah.numberInSurah}
                    </span>
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
      </main>

      <Footer />
    </div>
  );
};

export default SurahReader;
