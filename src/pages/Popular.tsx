import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Book, Gem, ChevronRight } from "lucide-react";

const Popular = () => {
  const popularItems = [
    // Full Surahs
    { type: "surah" as const, number: 1, name: "Al-Fatihah", arabicName: "الفاتحة", translation: "The Opener", verses: 7, href: "/surah/1" },
    { type: "surah" as const, number: 36, name: "Ya-Sin", arabicName: "يس", translation: "Ya Sin", verses: 83, href: "/surah/36" },
    { type: "surah" as const, number: 55, name: "Ar-Rahman", arabicName: "الرحمن", translation: "The Most Merciful", verses: 78, href: "/surah/55" },
    { type: "surah" as const, number: 67, name: "Al-Mulk", arabicName: "الملك", translation: "The Sovereignty", verses: 30, href: "/surah/67" },
    { type: "surah" as const, number: 112, name: "Al-Ikhlas", arabicName: "الإخلاص", translation: "Sincerity", verses: 4, href: "/surah/112" },
    { type: "surah" as const, number: 113, name: "Al-Falaq", arabicName: "الفلق", translation: "The Daybreak", verses: 5, href: "/surah/113" },
    { type: "surah" as const, number: 114, name: "An-Nas", arabicName: "الناس", translation: "Mankind", verses: 6, href: "/surah/114" },
    // Specific Verses
    { type: "ayah" as const, surah: 2, ayah: 255, name: "Ayatul Kursi", arabicName: "آية الكرسي", translation: "The Throne Verse", href: "/surah/2#ayah-255" },
    { type: "ayah" as const, surah: 2, ayah: 285, name: "Last 2 Ayat of Al-Baqarah", arabicName: "آخر آيتين", translation: "Verses 285-286", href: "/surah/2#ayah-285" },
    { type: "ayah" as const, surah: 18, ayah: 1, name: "First 10 Ayat of Al-Kahf", arabicName: "أول عشر آيات", translation: "Protection from Dajjal", href: "/surah/18#ayah-1" },
  ];

  const surahs = popularItems.filter(item => item.type === "surah");
  const verses = popularItems.filter(item => item.type === "ayah");

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 flex-grow">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Book className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Popular Surahs & Verses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Frequently recited surahs and blessed verses from the Holy Qur'an.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          {/* Popular Surahs */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Popular Surahs</h2>
            <div className="bg-card rounded-lg border border-border/50 overflow-hidden divide-y divide-border">
              {surahs.map((item, index) => (
                <Link key={index} to={item.href}>
                  <div className="flex items-center justify-between px-4 py-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">{item.number}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-lg font-arabic text-muted-foreground">{item.arabicName}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{item.translation}</span>
                          <span>•</span>
                          <span>{item.verses} verses</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular Verses */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Blessed Verses</h2>
            <div className="bg-card rounded-lg border border-border/50 overflow-hidden divide-y divide-border">
              {verses.map((item, index) => (
                <Link key={index} to={item.href}>
                  <div className="flex items-center justify-between px-4 py-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Gem className="w-4 h-4 text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-lg font-arabic text-muted-foreground">{item.arabicName}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{item.translation}</span>
                          <span>•</span>
                          <span>Surah {item.surah}:{item.ayah}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Link to full Quran */}
          <div className="text-center pt-4">
            <Link 
              to="/quran" 
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Browse All 114 Surahs
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Popular;
