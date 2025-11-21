import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { lessons } from "@/data/lessonContent";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Learning = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  const loadProgress = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("learning_progress")
      .select("lesson_id, completed")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (data) {
      setCompletedLessons(new Set(data.map((p) => p.lesson_id)));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Islamic Learning Hub</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Structured lessons to deepen your Islamic knowledge
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {lessons.map((lesson) => {
              const isCompleted = completedLessons.has(lesson.id);
              return (
                <Card
                  key={lesson.id}
                  onClick={() => navigate(`/learning/${lesson.id}`)}
                  className="shadow-soft hover:shadow-elevated transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{lesson.category}</Badge>
                      {isCompleted && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <CardTitle className="flex items-start gap-2">
                      <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      {lesson.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {lesson.description}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {lesson.duration}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learning;
