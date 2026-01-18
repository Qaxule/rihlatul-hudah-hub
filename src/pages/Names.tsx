import { useState } from "react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { namesOfAllah } from "@/data/namesOfAllah";
import { namesOfAllahDetails } from "@/data/namesOfAllahDetails";
import { useSEO, SEO_DATA } from "@/hooks/useSEO";
import asmaUlHusnaIcon from "@/assets/asma-ul-husna-icon.png";
import { BookOpen, Quote } from "lucide-react";

const Names = () => {
  useSEO(SEO_DATA.names);
  const [selectedName, setSelectedName] = useState<typeof namesOfAllah[0] | null>(null);

  const getNameDetails = (transliteration: string) => {
    return namesOfAllahDetails[transliteration];
  };

  return (
    <PageWrapper className="bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
            <img src={asmaUlHusnaIcon} alt="99 Names" className="w-8 h-8 dark:invert" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            The 99 Names of Allah
          </h1>
          <p className="text-xl text-muted-foreground italic">
            أَسْمَاءُ ٱللَّٰهِ ٱلْحُسْنَىٰ
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Most Beautiful Names. Click on any name to learn more with Quran and Hadith references.
          </p>
        </div>

        {/* Names Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {namesOfAllah.map((name, index) => (
            <Card
              key={index}
              className="shadow-soft hover:shadow-elevated transition-all group cursor-pointer"
              onClick={() => setSelectedName(name)}
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

      {/* Detail Dialog */}
      <Dialog open={!!selectedName} onOpenChange={() => setSelectedName(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-center space-y-2">
              <p className="text-4xl font-bold text-primary" dir="rtl">{selectedName?.arabic}</p>
              <p className="text-xl font-semibold">{selectedName?.transliteration}</p>
              <p className="text-muted-foreground">{selectedName?.meaning}</p>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            {selectedName && getNameDetails(selectedName.transliteration) ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Explanation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {getNameDetails(selectedName.transliteration)?.explanation}
                  </p>
                </div>

                {getNameDetails(selectedName.transliteration)?.quranReference && (
                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Quran Reference</h3>
                    </div>
                    <p className="text-2xl text-center my-3 font-arabic" dir="rtl">
                      {getNameDetails(selectedName.transliteration)?.quranReference?.arabic}
                    </p>
                    <p className="text-muted-foreground italic text-center">
                      "{getNameDetails(selectedName.transliteration)?.quranReference?.translation}"
                    </p>
                    <p className="text-sm text-primary text-center mt-2">
                      — Surah {getNameDetails(selectedName.transliteration)?.quranReference?.surah} ({getNameDetails(selectedName.transliteration)?.quranReference?.ayah})
                    </p>
                  </div>
                )}

                {getNameDetails(selectedName.transliteration)?.hadithReference && (
                  <div className="bg-accent/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Quote className="h-4 w-4 text-accent-foreground" />
                      <h3 className="font-semibold">Hadith Reference</h3>
                    </div>
                    <p className="text-muted-foreground italic">
                      "{getNameDetails(selectedName.transliteration)?.hadithReference?.text}"
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      — {getNameDetails(selectedName.transliteration)?.hadithReference?.source}
                    </p>
                  </div>
                )}

                {getNameDetails(selectedName.transliteration)?.benefits && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Benefits & Reflections</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {getNameDetails(selectedName.transliteration)?.benefits?.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">{selectedName?.description}</p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
};

export default Names;
