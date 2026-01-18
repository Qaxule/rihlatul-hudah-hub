import { useState, useEffect } from "react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, RotateCcw, X, Target } from "lucide-react";
import { toast } from "sonner";
import { useSEO, SEO_DATA } from "@/hooks/useSEO";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

const targetPresets = [33, 100, 500, 1000];

const Dhikr = () => {
  useSEO(SEO_DATA.dhikr);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [customTarget, setCustomTarget] = useState("");
  const [targetPopoverOpen, setTargetPopoverOpen] = useState(false);
  const [dhikrName, setDhikrName] = useState("SubhanAllah");
  const [customDhikrs, setCustomDhikrs] = useState<DhikrOption[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDhikr, setNewDhikr] = useState({ name: "", arabic: "", meaning: "" });

  useEffect(() => {
    const saved = localStorage.getItem("customDhikrs");
    if (saved) {
      setCustomDhikrs(JSON.parse(saved));
    }
    const savedTarget = localStorage.getItem("dhikrTarget");
    if (savedTarget) {
      setTarget(parseInt(savedTarget, 10));
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

  const handleSetTarget = (value: number) => {
    setTarget(value);
    localStorage.setItem("dhikrTarget", value.toString());
    setTargetPopoverOpen(false);
    if (count > value) setCount(0);
  };

  const handleCustomTarget = () => {
    const value = parseInt(customTarget, 10);
    if (isNaN(value) || value < 1 || value > 99999) {
      toast.error("Please enter a valid number (1-99999)");
      return;
    }
    handleSetTarget(value);
    setCustomTarget("");
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
                <Popover open={targetPopoverOpen} onOpenChange={setTargetPopoverOpen}>
                  <PopoverTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 cursor-pointer">
                      of {target} <Target className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Set Target</p>
                      <div className="flex flex-wrap gap-2">
                        {targetPresets.map((preset) => (
                          <Button
                            key={preset}
                            size="sm"
                            variant={target === preset ? "default" : "outline"}
                            onClick={() => handleSetTarget(preset)}
                          >
                            {preset}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Custom"
                          value={customTarget}
                          onChange={(e) => setCustomTarget(e.target.value)}
                          className="h-9"
                          min={1}
                          max={99999}
                        />
                        <Button size="sm" onClick={handleCustomTarget}>
                          Set
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
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
