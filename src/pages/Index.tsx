import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Heart, Calendar, Sparkles, ArrowRight, Compass, BookOpen, Gem, Type } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

interface AyatOfTheDay {
  surah: {
    number: number;
    name: string;
    englishName: string;
    arabicName: string;
  };
  ayah: {
    number: number;
    numberInSurah: number;
    arabic: string;
    translation: string;
  };
}

interface ReadingProgress {
  surah_number: number;
  ayah_number: number;
}

const Index = () => {
  const [ayatOfTheDay, setAyatOfTheDay] = useState<AyatOfTheDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState<ReadingProgress | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchAyatOfTheDay();
    if (user) {
      fetchReadingProgress();
    }
  }, [user]);

  const fetchReadingProgress = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('reading_progress')
        .select('surah_number, ayah_number')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        setReadingProgress(data);
      }
    } catch (error) {
      console.error('Error fetching reading progress:', error);
    }
  };

  const fetchAyatOfTheDay = async () => {
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('ayat-of-the-day');
      if (error) throw error;
      setAyatOfTheDay(data);
    } catch (error) {
      console.error('Error fetching Ayat of the Day:', error);
      // Keep null to show fallback content
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-emerald bg-clip-text text-transparent leading-relaxed md:leading-relaxed lg:leading-relaxed px-4 md:whitespace-nowrap animate-fade-in [animation-delay:0.1s]">
              رحلة الهدى
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mt-2 md:mt-4 animate-fade-in [animation-delay:0.3s]">
              Rihlatul Hudah
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 mt-4 md:mt-6 animate-fade-in [animation-delay:0.5s]">
              Your comprehensive Islamic knowledge hub. Explore the Qur'an, Hadith, 
              and spiritual guidance all in one place.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in [animation-delay:0.7s]">
            {readingProgress ? (
              <Button asChild size="lg" className="shadow-elevated hover:shadow-glow transition-all">
                <Link to={`/surah/${readingProgress.surah_number}`}>
                  <BookOpen className="mr-2 h-5 w-5" />
                  Continue Reading
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="shadow-elevated hover:shadow-glow transition-all">
                <Link to="/quran">
                  Explore Qur'an
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="shadow-soft">
              <Link to="/guides">New to Islam?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Wisdom */}
      <section className="container mx-auto px-4 py-16">
        {loading ? (
          <Card className="max-w-3xl mx-auto shadow-elevated border-primary/20">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ) : ayatOfTheDay ? (
          <Link to={`/surah/${ayatOfTheDay.surah.number}#${ayatOfTheDay.ayah.numberInSurah}`}>
            <Card className="max-w-3xl mx-auto shadow-elevated border-primary/20 cursor-pointer hover:shadow-glow transition-all group">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2 group-hover:text-primary/80 transition-colors">
                    <Sparkles className="w-5 h-5" />
                    Ayah of the Day
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    Surah {ayatOfTheDay.surah.englishName} {ayatOfTheDay.surah.number}:{ayatOfTheDay.ayah.numberInSurah}
                  </span>
                </div>
                <div className="space-y-4">
                  <p className="text-2xl text-right leading-loose font-arabic text-foreground" dir="rtl">
                    {ayatOfTheDay.ayah.arabic}
                  </p>
                  <p className="text-lg text-muted-foreground italic">
                    "{ayatOfTheDay.ayah.translation}"
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ) : (
          <Link to="/surah/2#286">
            <Card className="max-w-3xl mx-auto shadow-elevated border-primary/20 cursor-pointer hover:shadow-glow transition-all group">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2 group-hover:text-primary/80 transition-colors">
                    <Sparkles className="w-5 h-5" />
                    Ayah of the Day
                  </h3>
                  <span className="text-sm text-muted-foreground">Surah Al-Baqarah 2:286</span>
                </div>
                <div className="space-y-4">
                  <p className="text-2xl text-right leading-loose font-arabic text-foreground" dir="rtl">
                    لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا
                  </p>
                  <p className="text-lg text-muted-foreground italic">
                    "Allah does not burden a soul beyond that it can bear."
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This beautiful verse reminds us that Allah knows our capabilities perfectly. 
                    He never tests us with more than we can handle, and every challenge is an 
                    opportunity for growth in faith.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Explore Islamic Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/quran">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Book className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Holy Qur'an
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Read and reflect on the complete Qur'an with English translation and tafsir
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/hadith">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Hadith Collections
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Explore authentic hadith from Sahih Bukhari, Muslim, and more
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/prayer-times">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Compass className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Prayer Times
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Get accurate prayer times for your location with Qibla direction
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/names">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Gem className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      99 Names of Allah
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Learn the beautiful names and attributes of Allah (SWT)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dhikr">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Dhikr Counter
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Track your daily remembrance of Allah with digital tasbih
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/calendar">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Islamic Calendar
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      View important Islamic dates and events throughout the year
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;