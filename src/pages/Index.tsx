import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Heart, Calendar, Sparkles, ArrowRight, Compass, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
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
            <Button asChild size="lg" className="shadow-elevated hover:shadow-glow transition-all">
              <Link to="/quran">
                Explore Qur'an
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-soft">
              <Link to="/guides">New to Islam?</Link>
            </Button>
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
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Explore Islamic Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/quran">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Book className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Holy Qur'an
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Read and reflect on the complete Qur'an with English translation and tafsir
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/hadith">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Hadith Collections
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Explore authentic hadith from Sahih Bukhari, Muslim, and more
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/prayer-times">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Compass className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Prayer Times
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Get accurate prayer times for your location with Qibla direction
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/names">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      99 Names of Allah
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Learn the beautiful names and attributes of Allah (SWT)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dhikr">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Dhikr Counter
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Track your daily remembrance of Allah with digital tasbih
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/calendar">
              <Card className="cursor-pointer hover:shadow-elevated transition-all h-full group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      Islamic Calendar
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      View important Islamic dates and events throughout the year
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
