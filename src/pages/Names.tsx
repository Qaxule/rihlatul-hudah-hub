import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { namesOfAllah } from "@/data/namesOfAllah";

const Names = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
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

      <Footer />
    </div>
  );
};

export default Names;
