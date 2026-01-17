import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronLeft, MessageSquare, Search, Trash2, Edit, Globe, Lock, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { getSurahInfo } from "@/data/quranMetadata";
import { format } from "date-fns";
import { toast } from "sonner";

interface Reflection {
  id: string;
  title: string | null;
  content: string;
  surah_number: number | null;
  ayah_number: number | null;
  is_public: boolean;
  created_at: string;
}

const Reflections = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchReflections();
    }
  }, [user]);

  const fetchReflections = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reflections")
        .select("id, title, content, surah_number, ayah_number, is_public, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReflections(data || []);
    } catch (error) {
      console.error("Error fetching reflections:", error);
      toast.error("Failed to load reflections");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from("reflections")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      
      setReflections((prev) => prev.filter((r) => r.id !== id));
      toast.success("Reflection deleted");
    } catch (error) {
      console.error("Error deleting reflection:", error);
      toast.error("Failed to delete reflection");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredReflections = reflections.filter((reflection) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const surahInfo = reflection.surah_number ? getSurahInfo(reflection.surah_number) : null;
    return (
      reflection.title?.toLowerCase().includes(query) ||
      reflection.content.toLowerCase().includes(query) ||
      surahInfo?.englishName.toLowerCase().includes(query) ||
      surahInfo?.name.includes(searchQuery)
    );
  });

  const getVerseReference = (surah: number | null, ayah: number | null) => {
    if (!surah) return null;
    const surahInfo = getSurahInfo(surah);
    if (!surahInfo) return `${surah}:${ayah || "?"}`;
    return `${surahInfo.englishName} ${surah}:${ayah || "?"}`;
  };

  if (authLoading) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
            <Link to="/">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                My Reflections
              </h1>
              <p className="text-muted-foreground mt-1">
                {reflections.length} reflection{reflections.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        {reflections.length > 0 && (
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search reflections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : reflections.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No reflections yet</h3>
              <p className="text-muted-foreground mb-4">
                Start reading the Quran and add reflections on verses that inspire you.
              </p>
              <Button asChild>
                <Link to="/quran">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Start Reading
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : filteredReflections.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Search className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-muted-foreground">No reflections match "{searchQuery}"</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredReflections.map((reflection) => (
              <Card key={reflection.id} className="group">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Verse Reference */}
                      {reflection.surah_number && (
                        <Link
                          to={`/surah/${reflection.surah_number}#ayah-${reflection.ayah_number || 1}`}
                          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-2"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          {getVerseReference(reflection.surah_number, reflection.ayah_number)}
                        </Link>
                      )}
                      
                      {/* Title */}
                      {reflection.title && (
                        <h3 className="font-medium text-foreground mb-1">{reflection.title}</h3>
                      )}
                      
                      {/* Content */}
                      <p className="text-sm text-foreground/80 line-clamp-3 whitespace-pre-wrap">
                        {reflection.content}
                      </p>
                      
                      {/* Footer */}
                      <div className="flex items-center gap-3 mt-3">
                        <Badge variant="outline" className="gap-1 text-xs">
                          {reflection.is_public ? (
                            <>
                              <Globe className="h-3 w-3" />
                              Public
                            </>
                          ) : (
                            <>
                              <Lock className="h-3 w-3" />
                              Private
                            </>
                          )}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(reflection.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            disabled={deletingId === reflection.id}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Reflection</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this reflection? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(reflection.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Reflections;
