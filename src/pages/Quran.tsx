import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { surahList, juzList, getSurahsByJuz } from "@/data/quranMetadata";

// Chronological revelation order mapping
const revelationOrder: { [key: number]: number } = {
  96: 1, 68: 2, 73: 3, 74: 4, 1: 5, 111: 6, 81: 7, 87: 8, 92: 9, 89: 10,
  93: 11, 94: 12, 103: 13, 100: 14, 108: 15, 102: 16, 107: 17, 109: 18, 105: 19, 113: 20,
  114: 21, 112: 22, 53: 23, 80: 24, 97: 25, 91: 26, 85: 27, 95: 28, 106: 29, 101: 30,
  75: 31, 104: 32, 77: 33, 50: 34, 90: 35, 86: 36, 54: 37, 38: 38, 7: 39, 72: 40,
  36: 41, 25: 42, 35: 43, 19: 44, 20: 45, 56: 46, 26: 47, 27: 48, 28: 49, 17: 50,
  10: 51, 11: 52, 12: 53, 15: 54, 6: 55, 37: 56, 31: 57, 34: 58, 39: 59, 40: 60,
  41: 61, 42: 62, 43: 63, 44: 64, 45: 65, 46: 66, 51: 67, 88: 68, 18: 69, 16: 70,
  71: 71, 14: 72, 21: 73, 23: 74, 32: 75, 52: 76, 67: 77, 69: 78, 70: 79, 78: 80,
  79: 81, 82: 82, 84: 83, 30: 84, 29: 85, 83: 86, 2: 87, 8: 88, 3: 89, 33: 90,
  60: 91, 4: 92, 99: 93, 57: 94, 47: 95, 13: 96, 55: 97, 76: 98, 65: 99, 98: 100,
  59: 101, 24: 102, 22: 103, 63: 104, 58: 105, 49: 106, 66: 107, 64: 108, 61: 109, 62: 110,
  48: 111, 5: 112, 9: 113, 110: 114
};

const surahs = surahList.map(surah => ({
  number: surah.number,
  name: surah.englishName,
  translation: surah.englishNameTranslation,
  verses: surah.numberOfAyahs,
  revelation: surah.revelationType,
  juz: surah.juz,
  revelationOrder: revelationOrder[surah.number] || 0
}));

const Quran = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"surah" | "juz" | "revelation">("surah");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredSurahs = useMemo(() => {
    return surahs.filter(
      (surah) =>
        surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.translation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const juzData = useMemo(() => {
    const data = juzList.map(juz => ({
      ...juz,
      surahs: getSurahsByJuz(juz.number)
    }));
    return sortOrder === "asc" ? data : [...data].reverse();
  }, [sortOrder]);

  const surahData = useMemo(() => {
    let sorted = [...filteredSurahs];
    if (viewMode === "revelation") {
      sorted.sort((a, b) => a.revelationOrder - b.revelationOrder);
    } else {
      sorted.sort((a, b) => a.number - b.number);
    }
    return sortOrder === "desc" ? sorted.reverse() : sorted;
  }, [filteredSurahs, viewMode, sortOrder]);

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
            The Holy Qur'an
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read the complete Qur'an with Arabic text, English translation, and detailed tafsir.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
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

        {/* Navigation Tabs and Sort Toggle */}
        <div className="max-w-4xl mx-auto mb-8">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <TabsList className="w-full sm:w-auto bg-muted">
                <TabsTrigger value="surah" className="flex-1 sm:flex-initial">Surah</TabsTrigger>
                <TabsTrigger value="juz" className="flex-1 sm:flex-initial">Juz</TabsTrigger>
                <TabsTrigger value="revelation" className="flex-1 sm:flex-initial">Revelation Order</TabsTrigger>
              </TabsList>
              
              <button
                onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
              >
                <span className="text-muted-foreground">SORT BY:</span>
                <span className="text-foreground uppercase">{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>

            <TabsContent value="surah" className="space-y-8 md:space-y-10 mt-0">
              {surahData.map((surah) => (
                <Link key={surah.number} to={`/surah/${surah.number}`}>
                  <Card className="shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer group border-border/50">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6 md:gap-8">
                          <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <span className="text-primary font-bold text-lg md:text-xl">{surah.number}</span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {surah.name}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                              {surah.translation}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2 flex-shrink-0">
                          <p className="text-sm md:text-base font-medium text-muted-foreground">
                            {surah.verses} verses
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {surah.revelation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {filteredSurahs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No surahs found matching your search.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="juz" className="space-y-8 md:space-y-10 mt-0">
              {juzData.map((juz) => (
                <Card key={juz.number} className="shadow-soft border-border/50">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg md:text-xl">{juz.number}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                        {juz.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-0 md:ml-20">
                      {juz.surahs.map((surah) => (
                        <Link key={surah.number} to={`/surah/${surah.number}`}>
                          <div className="p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <span className="text-primary font-medium">{surah.number}.</span>
                              <div>
                                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                  {surah.englishName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {surah.numberOfAyahs} verses
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="revelation" className="space-y-8 md:space-y-10 mt-0">
              {surahData.map((surah) => (
                <Link key={surah.number} to={`/surah/${surah.number}`}>
                  <Card className="shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer group border-border/50">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6 md:gap-8">
                          <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <span className="text-primary font-bold text-lg md:text-xl">{surah.revelationOrder}</span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {surah.name}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground">
                              {surah.translation}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Surah {surah.number}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2 flex-shrink-0">
                          <p className="text-sm md:text-base font-medium text-muted-foreground">
                            {surah.verses} verses
                          </p>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {surah.revelation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Quran;
