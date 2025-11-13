import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const namesOfAllah = [
  { arabic: "الرَّحْمَنُ", transliteration: "Ar-Rahman", meaning: "The Most Merciful", description: "The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter." },
  { arabic: "الرَّحِيمُ", transliteration: "Ar-Raheem", meaning: "The Most Compassionate", description: "The One who has plenty of mercy for the believers." },
  { arabic: "الْمَلِكُ", transliteration: "Al-Malik", meaning: "The King", description: "The One with the complete dominion, the One whose dominion is clear from imperfection." },
  { arabic: "الْقُدُّوسُ", transliteration: "Al-Quddus", meaning: "The Most Sacred", description: "The One who is pure from any imperfection and clear from children and adversaries." },
  { arabic: "السَّلاَمُ", transliteration: "As-Salam", meaning: "The Source of Peace", description: "The One who is free from every imperfection." },
  { arabic: "الْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "The Granter of Security", description: "The One who witnessed for Himself that no one is God but Him and witnessed for His believers that they are truthful in their belief that no one is God but Him." },
  { arabic: "الْمُهَيْمِنُ", transliteration: "Al-Muhaymin", meaning: "The Guardian", description: "The One who witnesses the saying and deeds of His creatures." },
  { arabic: "الْعَزِيزُ", transliteration: "Al-Aziz", meaning: "The Almighty", description: "The Defeater who is not defeated." },
  { arabic: "الْجَبَّارُ", transliteration: "Al-Jabbar", meaning: "The Compeller", description: "The One that nothing happens in His dominion except that which He willed." },
  { arabic: "الْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", meaning: "The Supreme", description: "The One who is clear from the attributes of the creatures and from resembling them." },
  { arabic: "الْخَالِقُ", transliteration: "Al-Khaliq", meaning: "The Creator", description: "The One who brings everything from non-existence to existence." },
  { arabic: "الْبَارِئُ", transliteration: "Al-Bari", meaning: "The Evolver", description: "The Maker who has the Power to turn the entities." },
];

const Names = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            The 99 Names of Allah
          </h1>
          <p className="text-xl text-muted-foreground italic">
            أَسْمَاءُ ٱللَّٰهِ ٱلْحُسْنَىٰ
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Most Beautiful Names. Learn and reflect upon the attributes of Allah (SWT).
          </p>
        </div>

        {/* Names Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {namesOfAllah.map((name, index) => (
            <Card
              key={index}
              className="shadow-soft hover:shadow-elevated transition-all group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-right text-foreground group-hover:text-primary transition-colors" dir="rtl">
                    {name.arabic}
                  </h2>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-primary">
                      {name.transliteration}
                    </p>
                    <p className="text-base font-medium text-foreground">
                      {name.meaning}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {name.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="shadow-soft border-primary/20">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground text-center italic">
                "And to Allah belong the best names, so invoke Him by them." 
                <span className="block mt-2 font-semibold">(Quran 7:180)</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Names;
