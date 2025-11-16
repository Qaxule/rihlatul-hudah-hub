import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search as SearchIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface SearchResult {
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  translation: string;
  surahName: string;
}

const Search = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to search the Quran",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [user, navigate, toast]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to search the Quran",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session) {
        toast({
          title: "Authentication Required",
          description: "Please login to search the Quran",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke("quran-search", {
        body: { query: searchTerm },
      });

      console.log("Search response:", { data, error });

      if (error) {
        console.error("Search error:", error);
        throw error;
      }

      setResults(data?.results || []);
    } catch (error) {
      console.error("Search failed:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to search verses",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Search Quran</h1>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search in Arabic or English..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-lg"
            />
            <Button type="submit" disabled={loading}>
              <SearchIcon className="w-5 h-5" />
            </Button>
          </div>
        </form>

        {loading && (
          <p className="text-center text-muted-foreground">Searching...</p>
        )}

        {!loading && results.length === 0 && searchTerm && (
          <Card className="p-8 text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground">No results found</p>
          </Card>
        )}

        <div className="space-y-6 max-w-4xl mx-auto">
          {results.map((result, index) => (
            <Card
              key={index}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/surah/${result.surahNumber}`)}
            >
              <div className="mb-2 text-sm text-muted-foreground">
                {result.surahName} - Ayah {result.ayahNumber}
              </div>
              <div className="text-2xl text-right mb-4 leading-loose">
                {result.arabicText}
              </div>
              <div className="text-sm text-muted-foreground">
                {result.translation}
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
