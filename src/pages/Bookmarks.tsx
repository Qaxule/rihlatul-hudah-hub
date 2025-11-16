import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Bookmark {
  id: string;
  surah_number: number;
  ayah_number: number;
  note: string | null;
  created_at: string;
}

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchBookmarks();
  }, [user, navigate]);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("quran_bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load bookmarks",
        variant: "destructive",
      });
    } else {
      setBookmarks(data || []);
    }
    setLoading(false);
  };

  const deleteBookmark = async (id: string) => {
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
      setBookmarks(bookmarks.filter((b) => b.id !== id));
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
        {bookmarks.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No bookmarks yet</p>
          </Card>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {bookmarks.map((bookmark) => (
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
                    onClick={() => deleteBookmark(bookmark.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Bookmarks;
