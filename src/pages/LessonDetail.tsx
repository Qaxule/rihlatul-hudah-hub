import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, BookOpen, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { lessons } from "@/data/lessonContent";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lesson = lessons.find((l) => l.id === lessonId);

  useEffect(() => {
    if (user && lessonId) {
      checkCompletion();
    }
  }, [user, lessonId]);

  const checkCompletion = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from("learning_progress")
      .select("completed")
      .eq("user_id", user.id)
      .eq("lesson_id", lessonId)
      .single();

    if (data) {
      setIsCompleted(data.completed || false);
    }
  };

  const handleMarkComplete = async () => {
    if (!user) {
      toast.error("Please sign in to track your progress");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("learning_progress")
        .upsert({
          user_id: user.id,
          lesson_id: lessonId!,
          completed: !isCompleted,
          completed_at: !isCompleted ? new Date().toISOString() : null,
        });

      if (error) throw error;

      setIsCompleted(!isCompleted);
      toast.success(isCompleted ? "Marked as incomplete" : "Lesson completed!");
    } catch (error) {
      toast.error("Failed to update progress");
    } finally {
      setIsLoading(false);
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
            <Button onClick={() => navigate("/learning")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learning
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/learning")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learning
            </Button>

            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{lesson.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.duration}
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-muted-foreground">{lesson.description}</p>
              </div>
              <Button
                onClick={handleMarkComplete}
                disabled={isLoading}
                variant={isCompleted ? "outline" : "default"}
                className="gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                {isCompleted ? "Completed" : "Mark Complete"}
              </Button>
            </div>
          </div>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Lesson Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Introduction */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Introduction</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {lesson.content.introduction}
                </p>
              </div>

              {/* Sections */}
              {lesson.content.sections.map((section, index) => (
                <div key={index} className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                  <p className="text-muted-foreground mb-3 leading-relaxed">
                    {section.content}
                  </p>
                  {section.points && section.points.length > 0 && (
                    <ul className="space-y-2 ml-4">
                      {section.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5">•</span>
                          <span className="flex-1">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Conclusion */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-2">Conclusion</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {lesson.content.conclusion}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {lesson.content.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="flex-1">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Action */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleMarkComplete}
              disabled={isLoading}
              size="lg"
              variant={isCompleted ? "outline" : "default"}
              className="gap-2"
            >
              <CheckCircle className="h-5 w-5" />
              {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LessonDetail;
