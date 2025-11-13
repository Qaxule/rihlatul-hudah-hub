import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Book, Compass, Calendar, Heart } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">As-salamu alaykum, {user?.user_metadata?.full_name || "User"}</h1>
            <p className="text-muted-foreground">Your personalized Islamic companion</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-elevated transition-all" onClick={() => navigate("/quran")}>
            <CardHeader>
              <Book className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Qur'an</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Read and reflect on the divine words</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-elevated transition-all" onClick={() => navigate("/prayer-times")}>
            <CardHeader>
              <Compass className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Prayer Times</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Never miss a prayer with accurate timings</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-elevated transition-all" onClick={() => navigate("/dhikr")}>
            <CardHeader>
              <Heart className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Dhikr Counter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Track your daily remembrance of Allah</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Today's Ayah</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-arabic mb-4 text-center leading-relaxed">
              إِنَّ مَعَ الْعُسْرِ يُسْرًا
            </p>
            <p className="text-center text-muted-foreground">
              "Indeed, with hardship comes ease." - Surah Ash-Sharh (94:6)
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
