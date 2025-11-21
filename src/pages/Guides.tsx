import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, CheckCircle2 } from "lucide-react";
import { guides } from "@/data/guidesContent";
import * as Icons from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Guides = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [completedGuides, setCompletedGuides] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadCompletedGuides = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("guide_progress")
        .select("guide_id, completed")
        .eq("user_id", user.id)
        .eq("completed", true);

      if (error) {
        console.error("Error loading completed guides:", error);
      } else if (data) {
        setCompletedGuides(new Set(data.map((g) => g.guide_id)));
      }
    };

    loadCompletedGuides();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Icons.BookOpenCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Islamic Guides
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical step-by-step guides to help you practice Islam correctly and confidently.
          </p>
        </div>

        {/* Welcome Message */}
        <Card className="max-w-4xl mx-auto mb-12 shadow-elevated border-primary/20">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Heart className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Welcome!</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're a new Muslim or looking to refresh your knowledge, these guides 
              provide clear, step-by-step instructions for essential Islamic practices. Take your 
              time to learn, and remember that consistency in small actions is better than 
              sporadic big efforts.
            </p>
          </CardContent>
        </Card>

        {/* Guides Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const IconComponent = Icons[guide.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            const isCompleted = completedGuides.has(guide.id);
            
            return (
              <Card
                key={guide.id}
                onClick={() => navigate(`/guides/${guide.id}`)}
                className={`shadow-soft hover:shadow-elevated transition-all cursor-pointer hover:scale-[1.02] relative ${
                  isCompleted ? "border-green-500" : ""
                }`}
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
                    </div>
                    <Badge variant="secondary">{guide.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {guide.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icons.List className="h-3 w-3" />
                    <span>{guide.steps.length} steps</span>
                    {isCompleted && (
                      <span className="text-green-500 font-medium">• Completed</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Guides;
