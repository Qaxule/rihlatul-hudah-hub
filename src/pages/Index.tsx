import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Heart, Users, Sparkles, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-emerald bg-clip-text text-transparent">
              رحلة الهدى
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              Rihlatul Hudah
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your comprehensive Islamic knowledge hub. Explore the Qur'an, Hadith, 
              and spiritual guidance all in one place.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Button size="lg" className="shadow-elevated hover:shadow-glow transition-all" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <>
                <Button size="lg" className="shadow-elevated hover:shadow-glow transition-all" onClick={() => navigate("/auth")}>
                  Get Started
                </Button>
                <Button asChild variant="outline" size="lg" className="shadow-soft">
                  <Link to="/quran">Explore Qur'an</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Daily Wisdom */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-3xl mx-auto shadow-elevated border-primary/20">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Ayah of the Day
              </h3>
              <span className="text-sm text-muted-foreground">Surah Al-Baqarah 2:286</span>
            </div>
            <div className="space-y-4">
              <p className="text-2xl text-right leading-loose font-arabic text-foreground" dir="rtl">
                لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا
              </p>
              <p className="text-lg text-muted-foreground italic">
                "Allah does not burden a soul beyond that it can bear."
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This beautiful verse reminds us that Allah knows our capabilities perfectly. 
                He never tests us with more than we can handle, and every challenge is an 
                opportunity for growth in faith.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="shadow-soft hover:shadow-elevated transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Complete Qur'an</h3>
              <p className="text-muted-foreground">
                Read the Holy Qur'an with Arabic text, English translation, and detailed tafsir.
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-primary">
                <Link to="/quran">Explore →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elevated transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">99 Names of Allah</h3>
              <p className="text-muted-foreground">
                Learn the beautiful names and attributes of Allah with meanings and explanations.
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-primary">
                <Link to="/names">Discover →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elevated transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Dua & Dhikr</h3>
              <p className="text-muted-foreground">
                Access a comprehensive collection of duas and dhikr for every occasion.
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-primary">
                <Link to="/">Coming Soon →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elevated transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Hadith Collections</h3>
              <p className="text-muted-foreground">
                Browse authentic Hadith from Sahih Bukhari, Muslim, and other collections.
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-primary">
                <Link to="/">Coming Soon →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elevated transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">New Muslim Guide</h3>
              <p className="text-muted-foreground">
                Step-by-step guides for new Muslims covering Salah, Wudhu, and basics of Islam.
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-primary">
                <Link to="/guides">Learn →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elevated transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Daily Inspiration</h3>
              <p className="text-muted-foreground">
                Receive daily ayahs, hadiths, and reflections to strengthen your faith.
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-primary">
                <Link to="/">View Today's →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold bg-gradient-emerald bg-clip-text text-transparent">
              رحلة الهدى
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              May Allah guide us all on the path of righteousness and grant us beneficial knowledge.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Rihlatul Hudah. Built with devotion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
