import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, Clock } from "lucide-react";

const Learning = () => {
  const lessons = [
    {
      title: "The Five Pillars of Islam",
      description: "Foundation of Islamic practice",
      duration: "15 min",
      completed: true,
      category: "Fundamentals",
    },
    {
      title: "Understanding Tawhid",
      description: "The concept of Divine Unity",
      duration: "20 min",
      completed: true,
      category: "Aqeedah",
    },
    {
      title: "Prophet Muhammad's Life",
      description: "Seerah - The prophetic biography",
      duration: "45 min",
      completed: false,
      category: "Seerah",
    },
    {
      title: "Islamic Manners & Etiquette",
      description: "Adab in daily life",
      duration: "25 min",
      completed: false,
      category: "Adab",
    },
    {
      title: "Fiqh of Prayer",
      description: "Detailed rulings on Salah",
      duration: "30 min",
      completed: false,
      category: "Fiqh",
    },
    {
      title: "Signs of the Day of Judgment",
      description: "Major and minor signs",
      duration: "35 min",
      completed: false,
      category: "Aqeedah",
    },
  ];

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
            {lessons.map((lesson) => (
              <Card
                key={lesson.title}
                className="shadow-soft hover:shadow-elevated transition-all cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{lesson.category}</Badge>
                    {lesson.completed && (
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
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learning;
