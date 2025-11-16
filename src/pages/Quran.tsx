import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const surahs = [
  { number: 1, name: "Al-Fatihah", translation: "The Opening", verses: 7, revelation: "Meccan" },
  { number: 2, name: "Al-Baqarah", translation: "The Cow", verses: 286, revelation: "Medinan" },
  { number: 3, name: "Ali 'Imran", translation: "Family of Imran", verses: 200, revelation: "Medinan" },
  { number: 4, name: "An-Nisa", translation: "The Women", verses: 176, revelation: "Medinan" },
  { number: 5, name: "Al-Ma'idah", translation: "The Table Spread", verses: 120, revelation: "Medinan" },
  { number: 6, name: "Al-An'am", translation: "The Cattle", verses: 165, revelation: "Meccan" },
  { number: 7, name: "Al-A'raf", translation: "The Heights", verses: 206, revelation: "Meccan" },
  { number: 8, name: "Al-Anfal", translation: "The Spoils of War", verses: 75, revelation: "Medinan" },
  { number: 9, name: "At-Tawbah", translation: "The Repentance", verses: 129, revelation: "Medinan" },
  { number: 10, name: "Yunus", translation: "Jonah", verses: 109, revelation: "Meccan" },
  { number: 11, name: "Hud", translation: "Hud", verses: 123, revelation: "Meccan" },
  { number: 12, name: "Yusuf", translation: "Joseph", verses: 111, revelation: "Meccan" },
  { number: 13, name: "Ar-Ra'd", translation: "The Thunder", verses: 43, revelation: "Medinan" },
  { number: 14, name: "Ibrahim", translation: "Abraham", verses: 52, revelation: "Meccan" },
  { number: 15, name: "Al-Hijr", translation: "The Rocky Tract", verses: 99, revelation: "Meccan" },
  { number: 16, name: "An-Nahl", translation: "The Bee", verses: 128, revelation: "Meccan" },
  { number: 17, name: "Al-Isra", translation: "The Night Journey", verses: 111, revelation: "Meccan" },
  { number: 18, name: "Al-Kahf", translation: "The Cave", verses: 110, revelation: "Meccan" },
  { number: 19, name: "Maryam", translation: "Mary", verses: 98, revelation: "Meccan" },
  { number: 20, name: "Ta-Ha", translation: "Ta-Ha", verses: 135, revelation: "Meccan" },
  { number: 21, name: "Al-Anbiya", translation: "The Prophets", verses: 112, revelation: "Meccan" },
  { number: 22, name: "Al-Hajj", translation: "The Pilgrimage", verses: 78, revelation: "Medinan" },
  { number: 23, name: "Al-Mu'minun", translation: "The Believers", verses: 118, revelation: "Meccan" },
  { number: 24, name: "An-Nur", translation: "The Light", verses: 64, revelation: "Medinan" },
  { number: 25, name: "Al-Furqan", translation: "The Criterion", verses: 77, revelation: "Meccan" },
  { number: 26, name: "Ash-Shu'ara", translation: "The Poets", verses: 227, revelation: "Meccan" },
  { number: 27, name: "An-Naml", translation: "The Ant", verses: 93, revelation: "Meccan" },
  { number: 28, name: "Al-Qasas", translation: "The Stories", verses: 88, revelation: "Meccan" },
  { number: 29, name: "Al-Ankabut", translation: "The Spider", verses: 69, revelation: "Meccan" },
  { number: 30, name: "Ar-Rum", translation: "The Romans", verses: 60, revelation: "Meccan" },
  { number: 31, name: "Luqman", translation: "Luqman", verses: 34, revelation: "Meccan" },
  { number: 32, name: "As-Sajdah", translation: "The Prostration", verses: 30, revelation: "Meccan" },
  { number: 33, name: "Al-Ahzab", translation: "The Combined Forces", verses: 73, revelation: "Medinan" },
  { number: 34, name: "Saba", translation: "Sheba", verses: 54, revelation: "Meccan" },
  { number: 35, name: "Fatir", translation: "Originator", verses: 45, revelation: "Meccan" },
  { number: 36, name: "Ya-Sin", translation: "Ya-Sin", verses: 83, revelation: "Meccan" },
  { number: 37, name: "As-Saffat", translation: "Those Ranged in Ranks", verses: 182, revelation: "Meccan" },
  { number: 38, name: "Sad", translation: "The Letter Sad", verses: 88, revelation: "Meccan" },
  { number: 39, name: "Az-Zumar", translation: "The Troops", verses: 75, revelation: "Meccan" },
  { number: 40, name: "Ghafir", translation: "The Forgiver", verses: 85, revelation: "Meccan" },
  { number: 41, name: "Fussilat", translation: "Explained in Detail", verses: 54, revelation: "Meccan" },
  { number: 42, name: "Ash-Shuraa", translation: "The Consultation", verses: 53, revelation: "Meccan" },
  { number: 43, name: "Az-Zukhruf", translation: "The Ornaments of Gold", verses: 89, revelation: "Meccan" },
  { number: 44, name: "Ad-Dukhan", translation: "The Smoke", verses: 59, revelation: "Meccan" },
  { number: 45, name: "Al-Jathiyah", translation: "The Crouching", verses: 37, revelation: "Meccan" },
  { number: 46, name: "Al-Ahqaf", translation: "The Wind-Curved Sandhills", verses: 35, revelation: "Meccan" },
  { number: 47, name: "Muhammad", translation: "Muhammad", verses: 38, revelation: "Medinan" },
  { number: 48, name: "Al-Fath", translation: "The Victory", verses: 29, revelation: "Medinan" },
  { number: 49, name: "Al-Hujurat", translation: "The Rooms", verses: 18, revelation: "Medinan" },
  { number: 50, name: "Qaf", translation: "The Letter Qaf", verses: 45, revelation: "Meccan" },
  { number: 51, name: "Adh-Dhariyat", translation: "The Winnowing Winds", verses: 60, revelation: "Meccan" },
  { number: 52, name: "At-Tur", translation: "The Mount", verses: 49, revelation: "Meccan" },
  { number: 53, name: "An-Najm", translation: "The Star", verses: 62, revelation: "Meccan" },
  { number: 54, name: "Al-Qamar", translation: "The Moon", verses: 55, revelation: "Meccan" },
  { number: 55, name: "Ar-Rahman", translation: "The Beneficent", verses: 78, revelation: "Medinan" },
  { number: 56, name: "Al-Waqi'ah", translation: "The Inevitable", verses: 96, revelation: "Meccan" },
  { number: 57, name: "Al-Hadid", translation: "The Iron", verses: 29, revelation: "Medinan" },
  { number: 58, name: "Al-Mujadila", translation: "The Pleading Woman", verses: 22, revelation: "Medinan" },
  { number: 59, name: "Al-Hashr", translation: "The Exile", verses: 24, revelation: "Medinan" },
  { number: 60, name: "Al-Mumtahanah", translation: "She That is to be Examined", verses: 13, revelation: "Medinan" },
  { number: 61, name: "As-Saf", translation: "The Ranks", verses: 14, revelation: "Medinan" },
  { number: 62, name: "Al-Jumu'ah", translation: "The Congregation", verses: 11, revelation: "Medinan" },
  { number: 63, name: "Al-Munafiqun", translation: "The Hypocrites", verses: 11, revelation: "Medinan" },
  { number: 64, name: "At-Taghabun", translation: "The Mutual Disillusion", verses: 18, revelation: "Medinan" },
  { number: 65, name: "At-Talaq", translation: "The Divorce", verses: 12, revelation: "Medinan" },
  { number: 66, name: "At-Tahrim", translation: "The Prohibition", verses: 12, revelation: "Medinan" },
  { number: 67, name: "Al-Mulk", translation: "The Sovereignty", verses: 30, revelation: "Meccan" },
  { number: 68, name: "Al-Qalam", translation: "The Pen", verses: 52, revelation: "Meccan" },
  { number: 69, name: "Al-Haqqah", translation: "The Reality", verses: 52, revelation: "Meccan" },
  { number: 70, name: "Al-Ma'arij", translation: "The Ascending Stairways", verses: 44, revelation: "Meccan" },
  { number: 71, name: "Nuh", translation: "Noah", verses: 28, revelation: "Meccan" },
  { number: 72, name: "Al-Jinn", translation: "The Jinn", verses: 28, revelation: "Meccan" },
  { number: 73, name: "Al-Muzzammil", translation: "The Enshrouded One", verses: 20, revelation: "Meccan" },
  { number: 74, name: "Al-Muddaththir", translation: "The Cloaked One", verses: 56, revelation: "Meccan" },
  { number: 75, name: "Al-Qiyamah", translation: "The Resurrection", verses: 40, revelation: "Meccan" },
  { number: 76, name: "Al-Insan", translation: "The Man", verses: 31, revelation: "Medinan" },
  { number: 77, name: "Al-Mursalat", translation: "The Emissaries", verses: 50, revelation: "Meccan" },
  { number: 78, name: "An-Naba", translation: "The Tidings", verses: 40, revelation: "Meccan" },
  { number: 79, name: "An-Nazi'at", translation: "Those Who Drag Forth", verses: 46, revelation: "Meccan" },
  { number: 80, name: "Abasa", translation: "He Frowned", verses: 42, revelation: "Meccan" },
  { number: 81, name: "At-Takwir", translation: "The Overthrowing", verses: 29, revelation: "Meccan" },
  { number: 82, name: "Al-Infitar", translation: "The Cleaving", verses: 19, revelation: "Meccan" },
  { number: 83, name: "Al-Mutaffifin", translation: "The Defrauding", verses: 36, revelation: "Meccan" },
  { number: 84, name: "Al-Inshiqaq", translation: "The Splitting Open", verses: 25, revelation: "Meccan" },
  { number: 85, name: "Al-Buruj", translation: "The Mansions of the Stars", verses: 22, revelation: "Meccan" },
  { number: 86, name: "At-Tariq", translation: "The Nightcomer", verses: 17, revelation: "Meccan" },
  { number: 87, name: "Al-A'la", translation: "The Most High", verses: 19, revelation: "Meccan" },
  { number: 88, name: "Al-Ghashiyah", translation: "The Overwhelming", verses: 26, revelation: "Meccan" },
  { number: 89, name: "Al-Fajr", translation: "The Dawn", verses: 30, revelation: "Meccan" },
  { number: 90, name: "Al-Balad", translation: "The City", verses: 20, revelation: "Meccan" },
  { number: 91, name: "Ash-Shams", translation: "The Sun", verses: 15, revelation: "Meccan" },
  { number: 92, name: "Al-Layl", translation: "The Night", verses: 21, revelation: "Meccan" },
  { number: 93, name: "Ad-Duhaa", translation: "The Morning Hours", verses: 11, revelation: "Meccan" },
  { number: 94, name: "Ash-Sharh", translation: "The Relief", verses: 8, revelation: "Meccan" },
  { number: 95, name: "At-Tin", translation: "The Fig", verses: 8, revelation: "Meccan" },
  { number: 96, name: "Al-Alaq", translation: "The Clot", verses: 19, revelation: "Meccan" },
  { number: 97, name: "Al-Qadr", translation: "The Power", verses: 5, revelation: "Meccan" },
  { number: 98, name: "Al-Bayyinah", translation: "The Clear Proof", verses: 8, revelation: "Medinan" },
  { number: 99, name: "Az-Zalzalah", translation: "The Earthquake", verses: 8, revelation: "Medinan" },
  { number: 100, name: "Al-Adiyat", translation: "The Courser", verses: 11, revelation: "Meccan" },
  { number: 101, name: "Al-Qari'ah", translation: "The Calamity", verses: 11, revelation: "Meccan" },
  { number: 102, name: "At-Takathur", translation: "The Rivalry in World Increase", verses: 8, revelation: "Meccan" },
  { number: 103, name: "Al-Asr", translation: "The Declining Day", verses: 3, revelation: "Meccan" },
  { number: 104, name: "Al-Humazah", translation: "The Traducer", verses: 9, revelation: "Meccan" },
  { number: 105, name: "Al-Fil", translation: "The Elephant", verses: 5, revelation: "Meccan" },
  { number: 106, name: "Quraysh", translation: "Quraysh", verses: 4, revelation: "Meccan" },
  { number: 107, name: "Al-Ma'un", translation: "The Small Kindnesses", verses: 7, revelation: "Meccan" },
  { number: 108, name: "Al-Kawthar", translation: "The Abundance", verses: 3, revelation: "Meccan" },
  { number: 109, name: "Al-Kafirun", translation: "The Disbelievers", verses: 6, revelation: "Meccan" },
  { number: 110, name: "An-Nasr", translation: "The Divine Support", verses: 3, revelation: "Medinan" },
  { number: 111, name: "Al-Masad", translation: "The Palm Fiber", verses: 5, revelation: "Meccan" },
  { number: 112, name: "Al-Ikhlas", translation: "The Sincerity", verses: 4, revelation: "Meccan" },
  { number: 113, name: "Al-Falaq", translation: "The Daybreak", verses: 5, revelation: "Meccan" },
  { number: 114, name: "An-Nas", translation: "Mankind", verses: 6, revelation: "Meccan" },
];

const Quran = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredSurahs.map((surah) => (
            <Link key={surah.number} to={`/surah/${surah.number}`}>
              <Card className="shadow-soft hover:shadow-elevated transition-all cursor-pointer group">
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
            </Link>
          ))}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No surahs found matching your search.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Quran;
