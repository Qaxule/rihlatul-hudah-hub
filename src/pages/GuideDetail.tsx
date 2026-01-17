import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { guides } from "@/data/guidesContent";
import * as Icons from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const GuideDetail = () => {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const guide = guides.find((g) => g.id === guideId);

  useEffect(() => {
    const loadProgress = async () => {
      if (!user || !guideId) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("guide_progress")
        .select("completed_steps")
        .eq("user_id", user.id)
        .eq("guide_id", guideId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading guide progress:", error);
      } else if (data) {
        setCompletedSteps(data.completed_steps || []);
      }
      setIsLoading(false);
    };

    loadProgress();
  }, [user, guideId]);

  const toggleStepCompletion = async (stepIndex: number) => {
    if (!user || !guideId) {
      toast.error("Please sign in to track your progress");
      return;
    }

    const newCompletedSteps = completedSteps.includes(stepIndex)
      ? completedSteps.filter((s) => s !== stepIndex)
      : [...completedSteps, stepIndex].sort((a, b) => a - b);

    setCompletedSteps(newCompletedSteps);

    const isFullyCompleted = guide && newCompletedSteps.length === guide.steps.length;

    const { error } = await supabase
      .from("guide_progress")
      .upsert(
        {
          user_id: user.id,
          guide_id: guideId,
          completed_steps: newCompletedSteps,
          completed: isFullyCompleted,
        },
        { onConflict: 'user_id,guide_id' }
      );

    if (error) {
      console.error("Error saving progress:", error);
      toast.error("Failed to save progress");
      setCompletedSteps(completedSteps);
    } else if (isFullyCompleted) {
      toast.success("Guide completed! 🎉");
    }
  };

  if (!guide) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Guide not found</h1>
            <Button onClick={() => navigate("/guides")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Guides
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = Icons[guide.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/guides")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Guides
            </Button>

            <div className="flex items-start gap-4 flex-wrap mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                {guide.iconImage ? (
                  <img src={guide.iconImage} alt={guide.title} className="w-8 h-8 dark:invert" />
                ) : (
                  IconComponent && <IconComponent className="w-8 h-8 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2">
                  {guide.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
                <p className="text-muted-foreground">{guide.description}</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Step-by-Step Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {guide.steps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                return (
                  <div
                    key={index}
                    className={`p-4 bg-muted/50 rounded-lg border-l-4 transition-colors ${
                      isCompleted ? "border-green-500 bg-green-50/50 dark:bg-green-950/20" : "border-primary"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {user && (
                        <Checkbox
                          checked={isCompleted}
                          onCheckedChange={() => toggleStepCompletion(index)}
                          className="mt-1"
                          disabled={isLoading}
                        />
                      )}
                      <div className={`w-8 h-8 rounded-full ${isCompleted ? "bg-green-500" : "bg-primary"} text-primary-foreground flex items-center justify-center font-bold flex-shrink-0`}>
                        {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className={`font-semibold text-lg ${isCompleted ? "line-through opacity-70" : ""}`}>
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                        {step.arabicText && (
                          <div className="bg-card p-3 rounded-md border mt-3">
                            <p className="text-right text-2xl mb-2 font-arabic" dir="rtl">
                              {step.arabicText}
                            </p>
                            {step.transliteration && (
                              <p className="text-sm text-muted-foreground italic">
                                {step.transliteration}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Tips */}
          {guide.tips && guide.tips.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.Lightbulb className="h-5 w-5 text-primary" />
                  Helpful Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guide.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="flex-1 text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Resources */}
          {guide.resources && guide.resources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icons.ExternalLink className="h-5 w-5 text-primary" />
                  Additional Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guide.resources.map((resource, index) => (
                    <li key={index} className="text-muted-foreground">
                      {resource}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuideDetail;
