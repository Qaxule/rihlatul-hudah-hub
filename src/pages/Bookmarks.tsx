import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, BookOpen, Book } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QuranBookmark {
  id: string;
  surah_number: number;
  ayah_number: number;
  note: string | null;
  created_at: string;
}

interface HadithBookmark {
  id: string;
  collection_id: string;
  hadith_number: number;
  hadith_text: string;
  hadith_arabic_text: string | null;
  created_at: string;
}

const Bookmarks = () => {
  const [quranBookmarks, setQuranBookmarks] = useState<QuranBookmark[]>([]);
  const [hadithBookmarks, setHadithBookmarks] = useState<HadithBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const collectionNames: Record<string, string> = {
    "eng-bukhari": "Sahih Bukhari",
    "eng-muslim": "Sahih Muslim",
    "eng-abudawud": "Sunan Abu Dawood",
    "eng-tirmidhi": "Jami at-Tirmidhi",
    "eng-nasai": "Sunan an-Nasa'i",
    "eng-ibnmajah": "Sunan Ibn Majah",
    "eng-malik": "Muwatta Malik",
    "eng-nawawi": "An-Nawawi's 40 Hadith",
    "eng-qudsi": "40 Hadith Qudsi",
    "eng-mishkat": "Mishkat al-Masabih",
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchBookmarks();
  }, [user, navigate]);

  const fetchBookmarks = async () => {
    const [quranResult, hadithResult] = await Promise.all([
      supabase
        .from("quran_bookmarks")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("hadith_bookmarks")
        .select("*")
        .order("created_at", { ascending: false })
    ]);

    if (quranResult.error) {
      toast({
        title: "Error",
        description: "Failed to load Quran bookmarks",
        variant: "destructive",
      });
    } else {
      setQuranBookmarks(quranResult.data || []);
    }

    if (hadithResult.error) {
      toast({
        title: "Error",
        description: "Failed to load Hadith bookmarks",
        variant: "destructive",
      });
    } else {
      setHadithBookmarks(hadithResult.data || []);
    }

    setLoading(false);
  };

  const deleteQuranBookmark = async (id: string) => {
    const { error } = await supabase
      .from("quran_bookmarks")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete bookmark",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Bookmark removed",
      });
      setQuranBookmarks(quranBookmarks.filter((b) => b.id !== id));
    }
  };

  const deleteHadithBookmark = async (id: string) => {
    const { error } = await supabase
      .from("hadith_bookmarks")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete bookmark",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Bookmark removed",
      });
      setHadithBookmarks(hadithBookmarks.filter((b) => b.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          <p className="text-center">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">My Bookmarks</h1>
        
        <Tabs defaultValue="quran" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quran" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Quran ({quranBookmarks.length})
            </TabsTrigger>
            <TabsTrigger value="hadith" className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              Hadith ({hadithBookmarks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quran" className="mt-6">
            {quranBookmarks.length === 0 ? (
              <Card className="p-8 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No Quran bookmarks yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {quranBookmarks.map((bookmark) => (
                  <Card key={bookmark.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <button
                          onClick={() =>
                            navigate(`/surah/${bookmark.surah_number}`)
                          }
                          className="text-xl font-semibold hover:text-primary transition-colors"
                        >
                          Surah {bookmark.surah_number}, Ayah {bookmark.ayah_number}
                        </button>
                        {bookmark.note && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {bookmark.note}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteQuranBookmark(bookmark.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hadith" className="mt-6">
            {hadithBookmarks.length === 0 ? (
              <Card className="p-8 text-center">
                <Book className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No Hadith bookmarks yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {hadithBookmarks.map((bookmark) => (
                  <Card key={bookmark.id} className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>
                          {collectionNames[bookmark.collection_id] || bookmark.collection_id} - Hadith {bookmark.hadith_number}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteHadithBookmark(bookmark.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-3">
                      {bookmark.hadith_arabic_text && (
                        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                          <p className="text-lg leading-loose text-right font-amiri" dir="rtl">
                            {bookmark.hadith_arabic_text}
                          </p>
                        </div>
                      )}
                      <p className="text-base leading-relaxed text-foreground">
                        {bookmark.hadith_text}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Bookmarks;
