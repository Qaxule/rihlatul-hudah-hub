import { useState, useEffect } from "react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, RotateCcw, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useSEO, SEO_DATA } from "@/hooks/useSEO";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DhikrOption {
  name: string;
  arabic: string;
  meaning: string;
  isCustom?: boolean;
}

const defaultDhikrOptions: DhikrOption[] = [
  { name: "SubhanAllah", arabic: "سُبْحَانَ اللَّهِ", meaning: "Glory be to Allah" },
  { name: "Alhamdulillah", arabic: "الْحَمْدُ لِلَّهِ", meaning: "All praise is for Allah" },
  { name: "Allahu Akbar", arabic: "اللَّهُ أَكْبَرُ", meaning: "Allah is the Greatest" },
  { name: "La ilaha illallah", arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ", meaning: "There is no god but Allah" },
];

const Dhikr = () => {
  useSEO(SEO_DATA.dhikr);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [dhikrName, setDhikrName] = useState("SubhanAllah");
  const [customDhikrs, setCustomDhikrs] = useState<DhikrOption[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDhikr, setNewDhikr] = useState({ name: "", arabic: "", meaning: "" });

  useEffect(() => {
    const saved = localStorage.getItem("customDhikrs");
    if (saved) {
      setCustomDhikrs(JSON.parse(saved));
    }
  }, []);

  const allDhikrOptions = [...defaultDhikrOptions, ...customDhikrs.map(d => ({ ...d, isCustom: true }))];

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

  const handleAddCustomDhikr = () => {
    if (!newDhikr.name.trim() || !newDhikr.arabic.trim()) {
      toast.error("Please fill in at least the name and Arabic text");
      return;
    }

    const updated = [...customDhikrs, { ...newDhikr, isCustom: true }];
    setCustomDhikrs(updated);
    localStorage.setItem("customDhikrs", JSON.stringify(updated));
    setNewDhikr({ name: "", arabic: "", meaning: "" });
    setDialogOpen(false);
    toast.success("Custom dhikr added!");
  };

  const handleDeleteCustomDhikr = (name: string) => {
    const updated = customDhikrs.filter(d => d.name !== name);
    setCustomDhikrs(updated);
    localStorage.setItem("customDhikrs", JSON.stringify(updated));
    if (dhikrName === name) {
      setDhikrName("SubhanAllah");
      setCount(0);
    }
    toast.success("Dhikr removed");
  };

  const selectedDhikr = allDhikrOptions.find((d) => d.name === dhikrName) || allDhikrOptions[0];

  return (
    <PageWrapper className="bg-gradient-subtle">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Dhikr Counter</h1>
          <p className="text-muted-foreground mb-8">
            Remember Allah with every count
          </p>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {allDhikrOptions.map((dhikr) => (
              <div key={dhikr.name} className="relative group">
                <Button
                  variant={dhikrName === dhikr.name ? "default" : "outline"}
                  onClick={() => {
                    setDhikrName(dhikr.name);
                    setCount(0);
                  }}
                  className="h-auto py-4 px-6 flex flex-col min-w-[120px]"
                >
                  <span className="text-sm">{dhikr.name}</span>
                </Button>
                {dhikr.isCustom && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCustomDhikr(dhikr.name);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-auto py-4 px-6 border-dashed">
                  <Plus className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Custom Dhikr</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name / Transliteration</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Astaghfirullah"
                      value={newDhikr.name}
                      onChange={(e) => setNewDhikr({ ...newDhikr, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="arabic">Arabic Text</Label>
                    <Input
                      id="arabic"
                      placeholder="e.g., أَسْتَغْفِرُ اللَّهَ"
                      className="font-arabic text-right text-lg"
                      dir="rtl"
                      value={newDhikr.arabic}
                      onChange={(e) => setNewDhikr({ ...newDhikr, arabic: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meaning">Meaning (optional)</Label>
                    <Input
                      id="meaning"
                      placeholder="e.g., I seek forgiveness from Allah"
                      value={newDhikr.meaning}
                      onChange={(e) => setNewDhikr({ ...newDhikr, meaning: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddCustomDhikr} className="w-full">
                    Add Dhikr
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="shadow-elevated mb-8">
            <CardHeader>
              <CardTitle className="text-3xl font-arabic">{selectedDhikr.arabic}</CardTitle>
              {selectedDhikr.meaning && (
                <p className="text-muted-foreground">{selectedDhikr.meaning}</p>
              )}
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
