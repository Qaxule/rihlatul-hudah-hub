import { Link, useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/app/PageWrapper";
import { AppHeader } from "@/components/app/AppHeader";
import { useNativeAppContext } from "@/contexts/NativeAppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, Heart, Calendar, ArrowRight, Compass, BookOpen, Search, ChevronRight, Bookmark, GraduationCap, HandHeart, Loader2, X, Filter, ChevronDown, Flame, Trophy, MessageSquare } from "lucide-react";
import asmaUlHusnaIcon from "@/assets/asma-ul-husna-icon.png";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { surahList, juzList } from "@/data/quranMetadata";
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSurahInfo } from "@/data/quranMetadata";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useSEO, SEO_DATA } from "@/hooks/useSEO";
import { useReadingStreak } from "@/hooks/useReadingStreak";
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
interface SearchResult {
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  translation: string;
  surahName: string;
  revelationType?: string;
}
interface SearchFilters {
  surah?: number;
  juz?: number;
  revelationType?: string;
}
const Index = () => {
  const { isNativeApp } = useNativeAppContext();
  useSEO(SEO_DATA.home);
  const [ayatOfTheDay, setAyatOfTheDay] = useState<AyatOfTheDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState<ReadingProgress | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showFilters, setShowFilters] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const { streak, badges } = useReadingStreak();
  useEffect(() => {
    fetchAyatOfTheDay();
    if (user) {
      fetchReadingProgress();
    }
  }, [user]);

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchResults]);

  // Debounced search
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      try {
        const {
          data,
          error
        } = await supabase.functions.invoke('quran-search', {
          body: {
            query: searchQuery.trim(),
            filters: searchFilters
          }
        });
        if (error) throw error;
        setSearchResults(data.results || []);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchFilters]);
  const clearFilters = () => {
    setSearchFilters({});
  };
  const hasActiveFilters = Object.keys(searchFilters).some(key => searchFilters[key as keyof SearchFilters] !== undefined);
  const fetchReadingProgress = async () => {
    if (!user) return;
    try {
      const {
        data
      } = await supabase.from('reading_progress').select('surah_number, ayah_number').eq('user_id', user.id).maybeSingle();
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
    } finally {
      setLoading(false);
    }
  };
  const handleResultClick = (result: SearchResult) => {
    setShowResults(false);
    setSearchQuery("");
    setSelectedIndex(-1);
    navigate(`/surah/${result.surahNumber}#ayah-${result.ayahNumber}`);
  };
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults || searchResults.length === 0) {
      if (e.key === 'Escape') {
        clearSearch();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < searchResults.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : searchResults.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleResultClick(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => regex.test(part) ? <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">{part}</mark> : part);
  };
  const quickLinks = [{
    label: "Browse Surahs",
    href: "/quran",
    icon: Book
  }, {
    label: "Popular",
    href: "/popular",
    icon: ArrowRight
  }];
  const exploreTopics = [{
    label: "Learning Islam",
    href: "/learning"
  }, {
    label: "Daily Duas",
    href: "/duas"
  }, {
    label: "Islamic Guides",
    href: "/guides"
  }];
  const features = [{
    title: "Holy Qur'an",
    description: "Read with translation & tafsir",
    href: "/quran",
    icon: Book
  }, {
    title: "Hadith",
    description: "Authentic collections",
    href: "/hadith",
    icon: BookOpen
  }, {
    title: "Prayer Times",
    description: "For your location",
    href: "/prayer-times",
    icon: Compass
  }, {
    title: "99 Names",
    description: "Names of Allah",
    href: "/names",
    iconImage: asmaUlHusnaIcon
  }, {
    title: "Dhikr",
    description: "Digital tasbih",
    href: "/dhikr",
    icon: Heart
  }, {
    title: "Calendar",
    description: "Islamic dates",
    href: "/calendar",
    icon: Calendar
  }];
  return <PageWrapper>
      {/* App Header for native app only */}
      {isNativeApp && <AppHeader />}
      
      {/* Hero Section */}
      <section className="relative">
        {/* Subtle Islamic Pattern Background */}
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0L62 38L100 50L62 62L50 100L38 62L0 50L38 38Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)" className="text-primary" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-12 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            {/* Logo/Brand */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight animate-fade-in">A Journey to Islamic Guidance.</h1>
            
            {/* Search Bar with Results */}
            <div ref={searchRef} className="relative max-w-xl mx-auto animate-fade-in [animation-delay:0.2s]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input ref={inputRef} type="text" placeholder="Search the Qur'an in English or Arabic..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => searchResults.length > 0 && setShowResults(true)} onKeyDown={handleKeyDown} className="w-full h-14 pl-12 pr-24 text-base rounded-full border-2 border-border bg-card shadow-soft focus:border-primary focus:ring-primary" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {searchQuery && <button onClick={clearSearch} className="text-muted-foreground hover:text-foreground transition-colors">
                      {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <X className="h-5 w-5" />}
                    </button>}
                  <button onClick={() => setShowFilters(!showFilters)} className={`p-1.5 rounded-full transition-colors ${hasActiveFilters ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`} title="Search filters">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && <div className="mt-3 p-4 bg-card border border-border rounded-xl shadow-elevated z-50">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-foreground">Search Filters</p>
                    {hasActiveFilters && <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                        Clear all
                      </button>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Surah</label>
                      <Select value={searchFilters.surah?.toString() || "all"} onValueChange={value => setSearchFilters(prev => ({
                    ...prev,
                    surah: value === "all" ? undefined : parseInt(value)
                  }))}>
                        <SelectTrigger className="w-full bg-background">
                          <SelectValue placeholder="All Surahs" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] bg-popover">
                          <SelectItem value="all">All Surahs</SelectItem>
                          {surahList.map(surah => <SelectItem key={surah.number} value={surah.number.toString()}>
                              {surah.number}. {surah.englishName}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Juz</label>
                      <Select value={searchFilters.juz?.toString() || "all"} onValueChange={value => setSearchFilters(prev => ({
                    ...prev,
                    juz: value === "all" ? undefined : parseInt(value)
                  }))}>
                        <SelectTrigger className="w-full bg-background">
                          <SelectValue placeholder="All Juz" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] bg-popover">
                          <SelectItem value="all">All Juz</SelectItem>
                          {juzList.map(juz => <SelectItem key={juz.number} value={juz.number.toString()}>
                              Juz {juz.number}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Revelation</label>
                      <Select value={searchFilters.revelationType || "all"} onValueChange={value => setSearchFilters(prev => ({
                    ...prev,
                    revelationType: value === "all" ? undefined : value
                  }))}>
                        <SelectTrigger className="w-full bg-background">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="Meccan">Meccan</SelectItem>
                          <SelectItem value="Medinan">Medinan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>}

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-elevated max-h-[400px] overflow-y-auto z-50">
                  <div className="p-2">
                    <div className="flex items-center justify-between px-3 py-2">
                      <p className="text-xs text-muted-foreground">
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ↑↓ to navigate • Enter to select
                      </p>
                    </div>
                    {searchResults.map((result, index) => <button key={`${result.surahNumber}-${result.ayahNumber}-${index}`} onClick={() => handleResultClick(result)} onMouseEnter={() => setSelectedIndex(index)} className={`w-full text-left p-3 rounded-lg transition-colors ${selectedIndex === index ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'}`}>
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${selectedIndex === index ? 'bg-primary/20' : 'bg-primary/10'}`}>
                            <span className="text-primary text-xs font-semibold">{result.surahNumber}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {result.surahName} {result.surahNumber}:{result.ayahNumber}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {highlightMatch(result.translation, searchQuery)}
                            </p>
                            <p className="text-sm font-arabic text-foreground/70 line-clamp-1 mt-1 text-right" dir="rtl">
                              {result.arabicText}
                            </p>
                          </div>
                        </div>
                      </button>)}
                  </div>
                </div>}

              {/* No Results Message */}
              {showResults && searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-elevated z-50">
                  <div className="p-6 text-center">
                    <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                    <p className="text-sm text-muted-foreground mt-1">Try searching for a different word or phrase</p>
                  </div>
                </div>}
            </div>

            {/* Quick Links */}
            <div className="flex items-center justify-center gap-3 animate-fade-in [animation-delay:0.3s]">
              {quickLinks.map(link => <Link key={link.label} to={link.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-secondary/50 transition-colors text-sm font-medium">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>)}
            </div>
          </div>
        </div>
      </section>

      {/* Start Reading Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground">Start Reading</h2>
            {user && (
              <div className="flex items-center gap-4 mt-2">
                <Link to="/reflections" className="text-sm text-primary hover:underline flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Reflections
                </Link>
                <Link to="/bookmarks" className="text-sm text-primary hover:underline flex items-center gap-1">
                  <Bookmark className="h-4 w-4" />
                  Bookmarks
                </Link>
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Featured Surah Card */}
            <Link to={readingProgress ? `/surah/${readingProgress.surah_number}` : "/surah/1"}>
              <Card className="h-full hover:shadow-elevated transition-all group border-2 border-transparent hover:border-primary/20">
                <CardContent className="p-6 flex flex-col justify-between h-full min-h-[180px]">
                  <div>
                    <p className="text-2xl font-semibold text-foreground mb-1">
                      {readingProgress ? "Continue Reading" : "Start Reading"}
                    </p>
                    <p className="text-lg font-medium text-foreground">
                      {readingProgress ? `${readingProgress.surah_number}. ${getSurahInfo(readingProgress.surah_number)?.englishName || `Surah ${readingProgress.surah_number}`}` : "1. Al-Fatihah"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {readingProgress ? `Ayah ${readingProgress.ayah_number} • ${getSurahInfo(readingProgress.surah_number)?.englishNameTranslation || ""}` : "The Opener"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Button className="w-fit group-hover:bg-primary/90">
                      {readingProgress ? "Continue" : "Begin"}
                    </Button>
                    {/* Streak Display */}
                    {user && streak && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10" title="Current streak">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="font-semibold text-sm text-orange-600">{streak.current_streak}</span>
                        </div>
                        {streak.longest_streak > 0 && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10" title="Longest streak">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span className="font-semibold text-sm text-yellow-600">{streak.longest_streak}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Action Links - Flat List */}
            <div className="divide-y divide-border rounded-lg border border-border bg-card overflow-hidden">
              <Link to="/learning" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Learn Islam</p>
                    <p className="text-sm text-muted-foreground">Structured lessons for all levels</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link to="/yasarna" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Yasarna</p>
                    <p className="text-sm text-muted-foreground">Learn to read Arabic with ease</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link to="/support" className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <HandHeart className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Support the Project</p>
                    <p className="text-sm text-muted-foreground">Help us grow and improve</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
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
            {exploreTopics.map(topic => <Link key={topic.label} to={topic.href} className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-border bg-card hover:bg-secondary/50 hover:border-primary/30 transition-all text-sm font-medium">
                {topic.label}
                <ChevronRight className="h-4 w-4" />
              </Link>)}
          </div>
        </div>
      </section>

      {/* Ayah of the Day */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground mb-4">Daily Verse</h2>
          {loading ? <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card> : ayatOfTheDay ? <Link to={`/surah/${ayatOfTheDay.surah.number}#ayah-${ayatOfTheDay.ayah.numberInSurah}`}>
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
            </Link> : <Link to="/surah/2#ayah-286">
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
            </Link>}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {features.map(feature => <Link key={feature.title} to={feature.href}>
                <Card className="h-full hover:shadow-soft hover:border-primary/20 transition-all group">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      {feature.iconImage ? (
                        <img src={feature.iconImage} alt={feature.title} className="w-5 h-5 dark:invert" />
                      ) : (
                        <feature.icon className="w-5 h-5 text-primary" />
                      )}
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
              </Link>)}
          </div>
        </div>
      </section>

    </PageWrapper>;
};
export default Index;