import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Book, Heart, Calendar, ArrowRight, Compass, BookOpen, Gem, 
  Search, ChevronRight, Bookmark, GraduationCap, HandHeart
} from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
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
      const { data, error } = await supabase.functions.invoke('ayat-of-the-day');
      if (error) throw error;
      setAyatOfTheDay(data);
    } catch (error) {
      console.error('Error fetching Ayat of the Day:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/quran?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const quickLinks = [
    { label: "Browse Surahs", href: "/quran", icon: Book },
    { label: "Popular", href: "/quran", icon: ArrowRight },
  ];

  const exploreTopics = [
    { label: "Learning Islam", href: "/learning" },
    { label: "Daily Duas", href: "/duas" },
    { label: "Islamic Guides", href: "/guides" },
  ];

  const features = [
    { title: "Holy Qur'an", description: "Read with translation & tafsir", href: "/quran", icon: Book },
    { title: "Hadith", description: "Authentic collections", href: "/hadith", icon: BookOpen },
    { title: "Prayer Times", description: "For your location", href: "/prayer-times", icon: Compass },
    { title: "99 Names", description: "Names of Allah", href: "/names", icon: Gem },
    { title: "Dhikr", description: "Digital tasbih", href: "/dhikr", icon: Heart },
    { title: "Calendar", description: "Islamic dates", href: "/calendar", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Hero Section - Quran.com inspired */}
      <section className="relative overflow-hidden">
        {/* Subtle Islamic Pattern Background */}
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0L62 38L100 50L62 62L50 100L38 62L0 50L38 38Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)" className="text-primary"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-12 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            {/* Logo/Brand */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground tracking-tight animate-fade-in">
              Rihlatul Hudah
            </h1>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto animate-fade-in [animation-delay:0.2s]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search the Qur'an..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 text-base rounded-full border-2 border-border bg-card shadow-soft focus:border-primary focus:ring-primary"
                />
              </div>
            </form>

            {/* Quick Links */}
            <div className="flex items-center justify-center gap-3 animate-fade-in [animation-delay:0.3s]">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-secondary/50 transition-colors text-sm font-medium"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Start Reading Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Start Reading</h2>
            {user && (
              <Link to="/bookmarks" className="text-sm text-primary hover:underline flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                My Bookmarks
              </Link>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Featured Surah Card */}
            <Link to={readingProgress ? `/surah/${readingProgress.surah_number}` : "/surah/1"}>
              <Card className="h-full hover:shadow-elevated transition-all group border-2 border-transparent hover:border-primary/20">
                <CardContent className="p-6 flex flex-col justify-between h-full min-h-[180px]">
                  <div>
                    <p className="text-4xl font-arabic text-foreground mb-2" dir="rtl">
                      {readingProgress ? "مواصلة القراءة" : "الفَاتِحَة"}
                    </p>
                    <p className="text-lg font-medium text-foreground">
                      {readingProgress ? `Continue from Surah ${readingProgress.surah_number}` : "1. Al-Fatihah"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {readingProgress ? `Ayah ${readingProgress.ayah_number}` : "The Opener"}
                    </p>
                  </div>
                  <Button className="w-fit mt-4 group-hover:bg-primary/90">
                    {readingProgress ? "Continue" : "Begin"}
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Action Cards */}
            <div className="space-y-4">
              <Link to="/learning">
                <Card className="hover:shadow-soft transition-all group">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Learn Islam</p>
                        <p className="text-sm text-muted-foreground">Structured lessons for all levels</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>

              <Link to="/support">
                <Card className="hover:shadow-soft transition-all group">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HandHeart className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Support the Project</p>
                        <p className="text-sm text-muted-foreground">Help us grow and improve</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Topics */}
      <section className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground mb-4">Explore Topics</h2>
          <div className="flex flex-wrap gap-3">
            {exploreTopics.map((topic) => (
              <Link
                key={topic.label}
                to={topic.href}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-border bg-card hover:bg-secondary/50 hover:border-primary/30 transition-all text-sm font-medium"
              >
                {topic.label}
                <ChevronRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ayah of the Day */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground mb-4">Daily Verse</h2>
          {loading ? (
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ) : ayatOfTheDay ? (
            <Link to={`/surah/${ayatOfTheDay.surah.number}#ayah-${ayatOfTheDay.ayah.numberInSurah}`}>
              <Card className="border-l-4 border-l-primary hover:shadow-elevated transition-all group cursor-pointer">
                <CardContent className="p-6 space-y-4">
                  <p className="text-2xl md:text-3xl text-right leading-loose font-arabic text-foreground" dir="rtl">
                    {ayatOfTheDay.ayah.arabic}
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground italic">
                    "{ayatOfTheDay.ayah.translation}"
                  </p>
                  <p className="text-sm text-primary font-medium">
                    Surah {ayatOfTheDay.surah.englishName} {ayatOfTheDay.surah.number}:{ayatOfTheDay.ayah.numberInSurah}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <Link to="/surah/2#ayah-286">
              <Card className="border-l-4 border-l-primary hover:shadow-elevated transition-all cursor-pointer">
                <CardContent className="p-6 space-y-4">
                  <p className="text-2xl md:text-3xl text-right leading-loose font-arabic text-foreground" dir="rtl">
                    لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground italic">
                    "Allah does not burden a soul beyond that it can bear."
                  </p>
                  <p className="text-sm text-primary font-medium">
                    Surah Al-Baqarah 2:286
                  </p>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.href}>
                <Card className="h-full hover:shadow-soft hover:border-primary/20 transition-all group">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors truncate">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
