import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Compass, MapPin, Loader2, Bell, Volume2, WifiOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useOfflinePrayerTimes } from "@/hooks/useOfflinePrayerTimes";
import { useSEO, SEO_DATA } from "@/hooks/useSEO";

const PrayerTimes = () => {
  useSEO(SEO_DATA.prayerTimes);
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  
  // Use offline caching hook
  const { 
    prayerTimes, 
    qiblaDirection, 
    loading, 
    isOffline, 
    fetchPrayerTimes 
  } = useOfflinePrayerTimes(session);
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem("prayerNotifications") === "true";
  });
  const [notificationSound, setNotificationSound] = useState(() => {
    return localStorage.getItem("prayerNotificationSound") || "adhan1";
  });

  const soundOptions = [
    { value: "silent", label: "Silent" },
    { value: "adhan1", label: "Adhan (Makkah)" },
    { value: "adhan2", label: "Adhan (Madinah)" },
    { value: "adhan3", label: "Adhan (Egypt)" },
    { value: "adhan4", label: "Adhan (Turkey)" },
  ];

  const adhanAudioUrls: Record<string, string> = {
    silent: "",
    adhan1: "https://www.islamcan.com/audio/adhan/adhan1.mp3",
    adhan2: "https://www.islamcan.com/audio/adhan/adhan2.mp3",
    adhan3: "https://www.islamcan.com/audio/adhan/adhan3.mp3",
    adhan4: "https://www.islamcan.com/audio/adhan/adhan4.mp3",
  };

  const playAdhan = (soundType: string) => {
    if (soundType === "silent") return;
    
    const audioUrl = adhanAudioUrls[soundType];
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(err => console.log("Audio play failed:", err));
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("Please login to access prayer times");
      navigate("/login");
    }
  }, [user, navigate]);

  const schedulePrayerNotifications = (timings: any) => {
    const prayers = [
      { name: "Fajr", time: timings.Fajr },
      { name: "Dhuhr", time: timings.Dhuhr },
      { name: "Asr", time: timings.Asr },
      { name: "Maghrib", time: timings.Maghrib },
      { name: "Isha", time: timings.Isha },
    ];

    // Schedule daily summary at Fajr time
    const [fajrHours, fajrMinutes] = timings.Fajr.split(":").map(Number);
    const now = new Date();
    const fajrTime = new Date(now);
    fajrTime.setHours(fajrHours, fajrMinutes, 0, 0);

    // If Fajr has passed today, schedule for tomorrow
    if (fajrTime < now) {
      fajrTime.setDate(fajrTime.getDate() + 1);
    }

    const timeUntilFajr = fajrTime.getTime() - now.getTime();

    setTimeout(() => {
      if ("Notification" in window && Notification.permission === "granted") {
        const dailySummary = prayers.map(p => `${p.name}: ${p.time}`).join("\n");
        new Notification("Today's Prayer Times", {
          body: `As-salamu alaykum! Here are today's prayer times:\n${dailySummary}`,
          icon: "/favicon.png",
          tag: "daily-summary",
        });
        playAdhan(notificationSound);
      }
    }, timeUntilFajr);

    // Schedule individual prayer notifications
    prayers.forEach((prayer) => {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerTime = new Date(now);
      prayerTime.setHours(hours, minutes, 0, 0);

      // If prayer time has passed today, schedule for tomorrow
      if (prayerTime < now) {
        prayerTime.setDate(prayerTime.getDate() + 1);
      }

      const timeUntilPrayer = prayerTime.getTime() - now.getTime();

      setTimeout(() => {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(`Time for ${prayer.name} Prayer`, {
            body: `It's ${prayer.time}. Time to pray ${prayer.name}.`,
            icon: "/favicon.png",
            tag: prayer.name,
          });
          playAdhan(notificationSound);
        }
      }, timeUntilPrayer);
    });
  };

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("This browser does not support notifications");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }

    return false;
  };

  const testNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Prayer Time Reminder", {
        body: "This is how you'll be notified at prayer times. May Allah accept your prayers.",
        icon: "/favicon.png",
        tag: "test",
      });
      playAdhan(notificationSound);
      toast.success("Test notification sent!");
    } else {
      toast.error("Please enable notifications first");
    }
  };

  const handleSoundChange = (value: string) => {
    setNotificationSound(value);
    localStorage.setItem("prayerNotificationSound", value);
    toast.success(`Notification sound updated to ${soundOptions.find(s => s.value === value)?.label}`);
  };

  const toggleNotifications = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        localStorage.setItem("prayerNotifications", "true");
        if (prayerTimes) {
          schedulePrayerNotifications(prayerTimes);
        }
        toast.success("Prayer notifications enabled");
      } else {
        toast.error("Notification permission denied");
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem("prayerNotifications", "false");
      toast.success("Prayer notifications disabled");
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          fetchPrayerTimes(latitude, longitude);
        },
        (error) => {
          toast.error("Unable to get your location");
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
    <PageWrapper className="bg-gradient-subtle">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Prayer Times</h1>
            <p className="text-muted-foreground mb-6">
              Accurate prayer times based on your location
            </p>
            {isOffline && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-sm text-muted-foreground mb-4">
                <WifiOff className="h-4 w-4" />
                Showing cached prayer times (offline)
              </div>
            )}
            <div className="flex flex-col items-center gap-4">
              <Button onClick={getLocation} disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="mr-2 h-4 w-4" />
                )}
                Get My Location
              </Button>
              
              {prayerTimes && (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="notifications" className="cursor-pointer">
                      Enable Prayer Notifications
                    </Label>
                    <Switch
                      id="notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={toggleNotifications}
                    />
                  </div>
                  {notificationsEnabled && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                        <Label>Notification Sound</Label>
                        <Select value={notificationSound} onValueChange={handleSoundChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {soundOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={testNotification}
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        Test Notification
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
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
    </PageWrapper>
  );
};

export default PrayerTimes;
