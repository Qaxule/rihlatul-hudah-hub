import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PrayerTimes = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);

  const getPrayerTimes = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke("prayer-times", {
        body: { latitude: lat, longitude: lon },
      });

      if (error) throw error;
      setPrayerTimes(data.data.timings);
      setQiblaDirection(data.data.meta.qibla_direction);
      toast.success("Prayer times updated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch prayer times");
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          getPrayerTimes(latitude, longitude);
        },
        (error) => {
          toast.error("Unable to get your location");
          setLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const prayers = [
    { name: "Fajr", time: prayerTimes?.Fajr },
    { name: "Dhuhr", time: prayerTimes?.Dhuhr },
    { name: "Asr", time: prayerTimes?.Asr },
    { name: "Maghrib", time: prayerTimes?.Maghrib },
    { name: "Isha", time: prayerTimes?.Isha },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Prayer Times</h1>
            <p className="text-muted-foreground mb-6">
              Accurate prayer times based on your location
            </p>
            <Button onClick={getLocation} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="mr-2 h-4 w-4" />
              )}
              Get My Location
            </Button>
          </div>

          {prayerTimes && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {prayers.map((prayer) => (
                  <Card key={prayer.name} className="text-center shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-xl">{prayer.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">{prayer.time}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {qiblaDirection && (
                <Card className="text-center shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                      <Compass className="h-5 w-5" />
                      Qibla Direction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            transform: `rotate(${qiblaDirection}deg)`,
                          }}
                        >
                          <div className="w-1 h-20 bg-primary rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-primary mt-4">
                      {qiblaDirection.toFixed(2)}°
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PrayerTimes;
