import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Book, Search, ChevronRight, BookOpen, Languages, Bookmark, BookmarkCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

interface HadithData {
  hadithnumber: number;
  text: string;
  arabictext?: string;
  reference?: {
    book?: string;
    hadith?: string;
  };
}

const Hadith = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [hadiths, setHadiths] = useState<HadithData[]>([]);
  const [loading, setLoading] = useState(false);
  const [randomHadith, setRandomHadith] = useState<HadithData | null>(null);
  const [showArabic, setShowArabic] = useState(() => {
    const saved = localStorage.getItem('hadith-show-arabic');
    return saved === null ? true : saved === 'true';
  });
  const [bookmarkedHadiths, setBookmarkedHadiths] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem('hadith-show-arabic', showArabic.toString());
  }, [showArabic]);

  const collections = [
    { 
      id: "eng-bukhari", 
      name: "Sahih Bukhari", 
      count: "7563 Hadiths", 
      description: "The most authentic collection",
      color: "bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20"
    },
    { 
      id: "eng-muslim", 
      name: "Sahih Muslim", 
      count: "7422 Hadiths", 
      description: "Second most authentic collection",
      color: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20"
    },
    { 
      id: "eng-abudawud", 
      name: "Sunan Abu Dawood", 
      count: "5274 Hadiths", 
      description: "Focus on legal rulings",
      color: "bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
    },
    { 
      id: "eng-tirmidhi", 
      name: "Jami at-Tirmidhi", 
      count: "3956 Hadiths", 
      description: "Includes weak narrations with notes",
      color: "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20"
    },
    { 
      id: "eng-nasai", 
      name: "Sunan an-Nasa'i", 
      count: "5758 Hadiths", 
      description: "Focus on jurisprudence",
      color: "bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20"
    },
    { 
      id: "eng-ibnmajah", 
      name: "Sunan Ibn Majah", 
      count: "4341 Hadiths", 
      description: "Sixth major hadith collection",
      color: "bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20"
    },
    { 
      id: "eng-malik", 
      name: "Muwatta Malik", 
      count: "1849 Hadiths", 
      description: "Earliest collection of hadith",
      color: "bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/20"
    },
    { 
      id: "eng-nawawi", 
      name: "An-Nawawi's 40 Hadith", 
      count: "42 Hadiths", 
      description: "Essential hadiths for every Muslim",
      color: "bg-teal-500/10 border-teal-500/20 hover:bg-teal-500/20"
    },
    { 
      id: "eng-qudsi", 
      name: "40 Hadith Qudsi", 
      count: "40 Hadiths", 
      description: "Sacred words of Allah",
      color: "bg-fuchsia-500/10 border-fuchsia-500/20 hover:bg-fuchsia-500/20"
    },
    { 
      id: "eng-mishkat", 
      name: "Mishkat al-Masabih", 
      count: "6000+ Hadiths", 
      description: "Comprehensive hadith compilation",
      color: "bg-red-500/10 border-red-500/20 hover:bg-red-500/20"
    },
  ];

  useEffect(() => {
    fetchRandomHadith();
    if (user) {
      fetchBookmarkedHadiths();
    }
  }, [user]);

  const fetchBookmarkedHadiths = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('hadith_bookmarks')
        .select('collection_id, hadith_number');
      
      if (error) throw error;
      
      const bookmarked = new Set(
        data?.map(b => `${b.collection_id}-${b.hadith_number}`) || []
      );
      setBookmarkedHadiths(bookmarked);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const isBookmarked = (collectionId: string, hadithNumber: number) => {
    return bookmarkedHadiths.has(`${collectionId}-${hadithNumber}`);
  };

  const toggleBookmark = async (hadith: HadithData, collectionId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to bookmark hadiths",
        variant: "destructive"
      });
      return;
    }

    const bookmarkKey = `${collectionId}-${hadith.hadithnumber}`;
    const isCurrentlyBookmarked = bookmarkedHadiths.has(bookmarkKey);

    try {
      if (isCurrentlyBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('hadith_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('collection_id', collectionId)
          .eq('hadith_number', hadith.hadithnumber);

        if (error) throw error;

        setBookmarkedHadiths(prev => {
          const newSet = new Set(prev);
          newSet.delete(bookmarkKey);
          return newSet;
        });

        toast({
          title: "Bookmark Removed",
          description: "Hadith removed from your bookmarks"
        });
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('hadith_bookmarks')
          .insert({
            user_id: user.id,
            collection_id: collectionId,
            hadith_number: hadith.hadithnumber,
            hadith_text: hadith.text,
            hadith_arabic_text: hadith.arabictext
          });

        if (error) throw error;

        setBookmarkedHadiths(prev => new Set([...prev, bookmarkKey]));

        toast({
          title: "Bookmark Added",
          description: "Hadith saved to your bookmarks"
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive"
      });
    }
  };

  const fetchRandomHadith = async () => {
    try {
      const randomNum = Math.floor(Math.random() * 100) + 1;
      const { data, error } = await supabase.functions.invoke('hadith-data', {
        body: { collection: 'eng-bukhari', hadith: randomNum.toString() }
      });

      if (error) throw error;
      
      // The API returns the full response with metadata, we need to extract the hadith
      if (data?.hadiths && data.hadiths.length > 0) {
        setRandomHadith(data.hadiths[0]);
      }
    } catch (error) {
      console.error('Error fetching random hadith:', error);
    }
  };

  const fetchHadiths = async (collectionId: string, page: number = 1) => {
    setLoading(true);
    setSelectedCollection(collectionId);
    
    try {
      const { data, error } = await supabase.functions.invoke('hadith-data', {
        body: { collection: collectionId, page, limit: 50 }
      });

      if (error) throw error;
      
      if (data?.hadiths) {
        setHadiths(data.hadiths);
      }
    } catch (error) {
      console.error('Error fetching hadiths:', error);
      toast({
        title: "Error",
        description: "Failed to load hadiths. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecificHadith = async (collectionId: string, hadithNumber: string) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('hadith-data', {
        body: { collection: collectionId, hadith: hadithNumber }
      });

      if (error) throw error;
      
      if (data?.hadiths && data.hadiths.length > 0) {
        setHadiths(data.hadiths);
      } else {
        toast({
          title: "Not Found",
          description: `Hadith #${hadithNumber} not found in this collection.`,
          variant: "destructive"
        });
        setHadiths([]);
      }
    } catch (error) {
      console.error('Error fetching specific hadith:', error);
      toast({
        title: "Error",
        description: "Failed to load hadith. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!selectedCollection) return;
    
    const isNumber = /^\d+$/.test(searchTerm.trim());
    if (isNumber && searchTerm.trim()) {
      fetchSpecificHadith(selectedCollection, searchTerm.trim());
    } else {
      // Reload the collection if searching text or clearing search
      fetchHadiths(selectedCollection);
    }
  };

  // Filter hadiths by text search only (number search now uses fetchSpecificHadith)
  const filteredHadiths = searchTerm && !/^\d+$/.test(searchTerm) 
    ? hadiths.filter((hadith) => hadith.text?.toLowerCase().includes(searchTerm.toLowerCase()))
    : hadiths;

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Hadith Collections
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore authentic sayings and actions of Prophet Muhammad (ﷺ)
          </p>
          
          {/* Arabic Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <Languages className="w-5 h-5 text-muted-foreground" />
            <Label htmlFor="arabic-toggle" className="text-sm font-medium cursor-pointer">
              Show Arabic Text
            </Label>
            <Switch
              id="arabic-toggle"
              checked={showArabic}
              onCheckedChange={setShowArabic}
            />
          </div>
        </div>

        {/* Hadith of the Day */}
        <Card className="max-w-4xl mx-auto mb-12 shadow-soft border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Book className="h-6 w-6 text-primary" />
              Hadith of the Day
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {randomHadith ? (
              <>
                {/* Arabic Text */}
                {showArabic && randomHadith.arabictext && (
                  <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                    <p className="text-2xl leading-loose text-right font-amiri" dir="rtl">
                      {randomHadith.arabictext}
                    </p>
                  </div>
                )}
                
                {/* English Translation */}
                <p className="text-lg leading-relaxed italic text-foreground">
                  "{randomHadith.text}"
                </p>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Sahih Bukhari - Hadith {randomHadith.hadithnumber}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(randomHadith, 'eng-bukhari')}
                    >
                      {isBookmarked('eng-bukhari', randomHadith.hadithnumber) ? (
                        <>
                          <BookmarkCheck className="w-4 h-4 mr-1 fill-primary text-primary" />
                          Bookmarked
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4 mr-1" />
                          Bookmark
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={fetchRandomHadith}>
                      Get Another
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <Skeleton className="h-24 w-full" />
            )}
          </CardContent>
        </Card>

        {/* Collections */}
        {!selectedCollection && (
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Major Collections</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <Card 
                  key={collection.id}
                  className={`${collection.color} shadow-soft hover:shadow-elevated transition-all cursor-pointer border-2`}
                  onClick={() => fetchHadiths(collection.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="text-xl">{collection.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {collection.description}
                        </CardDescription>
                        <p className="text-xs font-medium text-muted-foreground">
                          {collection.count}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0" />
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Hadith List */}
        {selectedCollection && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedCollection(null);
                  setHadiths([]);
                  setSearchTerm("");
                }}
              >
                ← Back to Collections
              </Button>
            </div>

            {/* Collection Title */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                {collections.find(c => c.id === selectedCollection)?.name}
              </h2>
              <p className="text-muted-foreground mt-2">
                {collections.find(c => c.id === selectedCollection)?.description}
              </p>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by hadith number or text..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 h-12 shadow-soft"
                  />
                </div>
                <Button onClick={handleSearch} className="h-12 px-6">
                  Search
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Enter a hadith reference number (e.g., 100, 500) or search by text
              </p>
            </div>

            {/* Hadiths */}
            <div className="space-y-6">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))
              ) : filteredHadiths.length > 0 ? (
                filteredHadiths.map((hadith, index) => (
                  <Card key={index} className="shadow-soft hover:shadow-elevated transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-sm">
                            {hadith.hadithnumber}
                          </span>
                        </div>
                        <div className="flex-1 space-y-4">
                          {/* Arabic Text */}
                          {showArabic && hadith.arabictext && (
                            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                              <p className="text-xl leading-loose text-right font-amiri" dir="rtl">
                                {hadith.arabictext}
                              </p>
                            </div>
                          )}
                          
                          {/* English Translation */}
                          <p className="text-base leading-relaxed text-foreground">
                            {hadith.text}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2">
                            {hadith.reference && (
                              <p className="text-sm text-muted-foreground">
                                {hadith.reference.book && `Book: ${hadith.reference.book}`}
                                {hadith.reference.hadith && ` • Hadith: ${hadith.reference.hadith}`}
                              </p>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleBookmark(hadith, selectedCollection!)}
                              className="ml-auto"
                            >
                              {isBookmarked(selectedCollection!, hadith.hadithnumber) ? (
                                <>
                                  <BookmarkCheck className="w-4 h-4 mr-1 fill-primary text-primary" />
                                  Bookmarked
                                </>
                              ) : (
                                <>
                                  <Bookmark className="w-4 h-4 mr-1" />
                                  Bookmark
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">No hadiths found matching your search.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Hadith;
