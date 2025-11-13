import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const Community = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [reflections, setReflections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    };
    checkUser();
    loadReflections();
  }, [navigate]);

  const loadReflections = async () => {
    const { data } = await supabase
      .from("reflections")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(20);

    if (data) setReflections(data);
  };

  const submitReflection = async () => {
    if (!user || !content) return;

    setLoading(true);
    const { error } = await supabase.from("reflections").insert({
      user_id: user.id,
      title,
      content,
      is_public: isPublic,
    });

    if (error) {
      toast.error("Failed to submit reflection");
    } else {
      toast.success("Reflection submitted!");
      setTitle("");
      setContent("");
      setIsPublic(false);
      if (isPublic) loadReflections();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Community & Reflections</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your thoughts and connect with fellow believers
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle>Share Your Reflection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Share publicly</span>
                </label>
                <Button onClick={submitReflection} disabled={loading || !content}>
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-6">Public Reflections</h2>
            <div className="space-y-4">
              {reflections.map((reflection) => (
                <Card key={reflection.id} className="shadow-soft">
                  <CardContent className="pt-6">
                    {reflection.title && (
                      <h3 className="font-semibold mb-2">{reflection.title}</h3>
                    )}
                    <p className="text-muted-foreground mb-4">{reflection.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-primary">
                        <Heart className="h-4 w-4" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary">
                        <MessageCircle className="h-4 w-4" />
                        <span>Comment</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
