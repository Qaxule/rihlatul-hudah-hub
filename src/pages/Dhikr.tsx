import { useState } from "react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const Dhikr = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [dhikrName, setDhikrName] = useState("SubhanAllah");

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount === target) {
      toast.success("Alhamdulillah! Target reached!");
    }
  };

  const reset = () => {
    setCount(0);
  };

  const dhikrOptions = [
    { name: "SubhanAllah", arabic: "سُبْحَانَ اللَّهِ", meaning: "Glory be to Allah" },
    { name: "Alhamdulillah", arabic: "الْحَمْدُ لِلَّهِ", meaning: "All praise is for Allah" },
    { name: "Allahu Akbar", arabic: "اللَّهُ أَكْبَرُ", meaning: "Allah is the Greatest" },
    { name: "La ilaha illallah", arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ", meaning: "There is no god but Allah" },
  ];

  const selectedDhikr = dhikrOptions.find((d) => d.name === dhikrName) || dhikrOptions[0];

  return (
    <PageWrapper className="bg-gradient-subtle">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Dhikr Counter</h1>
          <p className="text-muted-foreground mb-8">
            Remember Allah with every count
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {dhikrOptions.map((dhikr) => (
              <Button
                key={dhikr.name}
                variant={dhikrName === dhikr.name ? "default" : "outline"}
                onClick={() => {
                  setDhikrName(dhikr.name);
                  setCount(0);
                }}
                className="h-auto py-4 flex flex-col"
              >
                <span className="text-sm">{dhikr.name}</span>
              </Button>
            ))}
          </div>

          <Card className="shadow-elevated mb-8">
            <CardHeader>
              <CardTitle className="text-3xl font-arabic">{selectedDhikr.arabic}</CardTitle>
              <p className="text-muted-foreground">{selectedDhikr.meaning}</p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <div className="text-8xl font-bold text-primary mb-4">{count}</div>
                <p className="text-muted-foreground">of {target}</p>
                <div className="w-full bg-secondary rounded-full h-2 mt-4">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((count / target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={reset}
                  className="w-24"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  onClick={increment}
                  className="w-48 h-48 rounded-full text-4xl"
                >
                  +
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Dhikr;
