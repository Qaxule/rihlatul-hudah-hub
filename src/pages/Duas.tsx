import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Volume2 } from "lucide-react";

const Duas = () => {
  const duaCategories = [
    {
      category: "Morning & Evening",
      duas: [
        {
          arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
          transliteration: "Asbahna wa asbahal mulku lillah",
          meaning: "We have entered morning and the dominion has entered morning belonging to Allah",
        },
        {
          arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا",
          transliteration: "Allahumma bika asbahna wa bika amsayna",
          meaning: "O Allah, by You we enter the morning and by You we enter the evening",
        },
      ],
    },
    {
      category: "Before Meals",
      duas: [
        {
          arabic: "بِسْمِ اللَّهِ",
          transliteration: "Bismillah",
          meaning: "In the name of Allah",
        },
      ],
    },
    {
      category: "After Meals",
      duas: [
        {
          arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",
          transliteration: "Alhamdulillahil-ladhi at'amana wa saqana",
          meaning: "Praise be to Allah who has fed us and given us drink",
        },
      ],
    },
    {
      category: "Travel",
      duas: [
        {
          arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا",
          transliteration: "Subhanal-ladhi sakhkhara lana hadha",
          meaning: "Glory be to Him who has subjected this to us",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Duas & Supplications</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Essential prayers for every moment of your life
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {duaCategories.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
              <div className="space-y-4">
                {category.duas.map((dua, index) => (
                  <Card key={index} className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-3xl font-arabic text-center leading-relaxed">
                        {dua.arabic}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-center text-muted-foreground italic">
                        {dua.transliteration}
                      </p>
                      <p className="text-center">{dua.meaning}</p>
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm">
                          <Volume2 className="h-4 w-4 mr-2" />
                          Listen
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Duas;
