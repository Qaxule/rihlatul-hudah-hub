import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const tajweedRules = [
  {
    color: "rgb(0, 139, 139)",
    rule: "Ghunnah",
    description: "Nasal sound produced from the nose (2 counts)",
    example: "ن, م with shaddah or followed by ن or م"
  },
  {
    color: "rgb(0, 128, 0)",
    rule: "Idghaam",
    description: "Merging of two letters",
    example: "When نْ or تنوين is followed by specific letters"
  },
  {
    color: "rgb(169, 169, 169)",
    rule: "Ikhfa",
    description: "Hiding the sound (nasal pronunciation)",
    example: "When نْ or تنوين is followed by 15 specific letters"
  },
  {
    color: "rgb(221, 0, 0)",
    rule: "Qalqalah",
    description: "Echoing/bouncing sound",
    example: "Letters: ق ط ب ج د with sukoon"
  },
  {
    color: "rgb(0, 0, 255)",
    rule: "Madd",
    description: "Prolongation (2, 4, or 6 counts)",
    example: "Long vowels: ا و ي"
  },
  {
    color: "rgb(148, 0, 211)",
    rule: "Iqlab",
    description: "Changing ن into م",
    example: "When نْ or تنوين is followed by ب"
  },
  {
    color: "rgb(255, 140, 0)",
    rule: "Madd Lazim",
    description: "Necessary prolongation (6 counts)",
    example: "When Madd letter is followed by shaddah or sukoon"
  }
];

export function TajweedLegend() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Info className="h-4 w-4" />
          Tajweed Rules
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-[70vh] overflow-y-auto" align="end">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-1">Tajweed Color Guide</h4>
            <p className="text-xs text-muted-foreground">
              Colors indicate different recitation rules
            </p>
          </div>
          
          <div className="space-y-2">
            {tajweedRules.map((rule) => (
              <div key={rule.rule} className="space-y-1">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded border border-border shrink-0" 
                    style={{ backgroundColor: rule.color }}
                  />
                  <span className="font-semibold text-sm">{rule.rule}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-6">
                  {rule.description}
                </p>
                <p className="text-xs text-muted-foreground/80 pl-6 italic">
                  {rule.example}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t text-xs text-muted-foreground">
            <p className="italic">
              Note: Tajweed rules help in proper Quranic recitation. 
              Study with a qualified teacher for accurate learning.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
