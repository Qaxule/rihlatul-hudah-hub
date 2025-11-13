import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const surahs = [
  { number: 1, name: "Al-Fatihah", translation: "The Opening", verses: 7, revelation: "Meccan" },
  { number: 2, name: "Al-Baqarah", translation: "The Cow", verses: 286, revelation: "Medinan" },
  { number: 3, name: "Ali 'Imran", translation: "Family of Imran", verses: 200, revelation: "Medinan" },
  { number: 4, name: "An-Nisa", translation: "The Women", verses: 176, revelation: "Medinan" },
  { number: 5, name: "Al-Ma'idah", translation: "The Table", verses: 120, revelation: "Medinan" },
  { number: 6, name: "Al-An'am", translation: "The Cattle", verses: 165, revelation: "Meccan" },
  { number: 7, name: "Al-A'raf", translation: "The Heights", verses: 206, revelation: "Meccan" },
  { number: 8, name: "Al-Anfal", translation: "The Spoils of War", verses: 75, revelation: "Medinan" },
  { number: 9, name: "At-Tawbah", translation: "The Repentance", verses: 129, revelation: "Medinan" },
  { number: 10, name: "Yunus", translation: "Jonah", verses: 109, revelation: "Meccan" },
  { number: 11, name: "Hud", translation: "Hud", verses: 123, revelation: "Meccan" },
  { number: 12, name: "Yusuf", translation: "Joseph", verses: 111, revelation: "Meccan" },
];

const Quran = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Book className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            The Holy Qur'an
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read the complete Qur'an with Arabic text, English translation, and detailed tafsir.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for a surah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 shadow-soft"
            />
          </div>
        </div>

        {/* Surahs List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredSurahs.map((surah) => (
            <Card
              key={surah.number}
              className="shadow-soft hover:shadow-elevated transition-all cursor-pointer group"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-primary font-bold">{surah.number}</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {surah.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {surah.translation}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {surah.verses} verses
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {surah.revelation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No surahs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quran;
