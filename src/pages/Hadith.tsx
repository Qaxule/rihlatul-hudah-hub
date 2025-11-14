import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

const Hadith = () => {
  const collections = [
    { name: "Sahih Bukhari", count: "7563 Hadiths", description: "The most authentic collection" },
    { name: "Sahih Muslim", count: "7422 Hadiths", description: "Second most authentic collection" },
    { name: "Sunan Abu Dawood", count: "5274 Hadiths", description: "Focus on legal rulings" },
    { name: "Jami at-Tirmidhi", count: "3956 Hadiths", description: "Includes weak narrations with notes" },
    { name: "Sunan an-Nasa'i", count: "5758 Hadiths", description: "Focus on authenticity" },
    { name: "Sunan Ibn Majah", count: "4341 Hadiths", description: "Completes the six major books" },
  ];

  const topics = [
    "Faith (Iman)", "Prayer (Salah)", "Charity (Zakat)", "Fasting (Sawm)",
    "Pilgrimage (Hajj)", "Manners & Conduct", "Family & Marriage", "Business & Trade",
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Hadith Collections</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore authentic sayings and actions of Prophet Muhammad (ﷺ)
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Major Collections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Card key={collection.name} className="shadow-soft hover:shadow-elevated transition-all cursor-pointer">
                <CardHeader>
                  <Book className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{collection.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{collection.count}</p>
                  <p className="text-sm">{collection.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Browse by Topic</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic) => (
              <Card key={topic} className="shadow-soft hover:shadow-elevated transition-all cursor-pointer">
                <CardContent className="pt-6">
                  <p className="font-medium text-center">{topic}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Hadith of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4 italic">
              "The best among you are those who have the best manners and character."
            </p>
            <p className="text-sm text-muted-foreground">- Sahih Bukhari</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Hadith;
