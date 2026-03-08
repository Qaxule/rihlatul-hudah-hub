import { useEffect, useState } from 'react';
import { MapPin, Moon, Sun, Sunset, CloudSun, MoonStar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface PrayerTime {
  name: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LocationInfo {
  city: string;
  country: string;
}

// Hijri date calculation with adjustment
const getHijriDate = (): string => {
  const today = new Date();
  const gregorianYear = today.getFullYear();
  const gregorianMonth = today.getMonth() + 1;
  const gregorianDay = today.getDate();

  // Julian day calculation
  let jd = Math.floor((1461 * (gregorianYear + 4800 + Math.floor((gregorianMonth - 14) / 12))) / 4) +
           Math.floor((367 * (gregorianMonth - 2 - 12 * Math.floor((gregorianMonth - 14) / 12))) / 12) -
           Math.floor((3 * Math.floor((gregorianYear + 4900 + Math.floor((gregorianMonth - 14) / 12)) / 100)) / 4) +
           gregorianDay - 32075;

  // Hijri calculation with adjustment (-2 days to match observed dates)
  const adjustedJd = jd - 2;
  const l = adjustedJd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const remainingL = l - 10631 * n + 354;
  const j = Math.floor((10985 - remainingL) / 5316) * Math.floor((50 * remainingL) / 17719) +
            Math.floor(remainingL / 5670) * Math.floor((43 * remainingL) / 15238);
  const finalL = remainingL - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
                 Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hijriMonth = Math.floor((24 * finalL) / 709);
  const hijriDay = finalL - Math.floor((709 * hijriMonth) / 24);
  const hijriYear = 30 * n + j - 30;

  const monthNames = [
    'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhul Qi\'dah', 'Dhul Hijjah'
  ];

  return `${hijriDay} ${monthNames[hijriMonth - 1]} ${hijriYear}`;
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const formatPrayerTime = (timeStr: string): string => {
  // Handle both "05:30 AM" and "05:30" (24h) formats
  const [time] = timeStr.split(' ');
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${minutes}`;
};

const parseTimeToDate = (timeStr: string): Date => {
  const parts = timeStr.split(' ');
  const [hours, minutes] = parts[0].split(':').map(Number);
  const date = new Date();
  
  if (parts.length > 1) {
    // AM/PM format
    const period = parts[1];
    let adjustedHours = hours;
    if (period === 'PM' && hours !== 12) adjustedHours += 12;
    if (period === 'AM' && hours === 12) adjustedHours = 0;
    date.setHours(adjustedHours, minutes, 0, 0);
  } else {
    // 24-hour format
    date.setHours(hours, minutes, 0, 0);
  }
  
  return date;
};

const getTimeUntil = (targetTime: Date): string => {
  const now = new Date();
  let diff = targetTime.getTime() - now.getTime();
  
  if (diff < 0) {
    // Target is tomorrow
    diff += 24 * 60 * 60 * 1000;
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

const prayerIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Fajr: Sun,
  Dhuhr: CloudSun,
  Asr: Sunset,
  Maghrib: Sunset,
  Isha: MoonStar,
};

export const AppHeader = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; countdown: string; index: number } | null>(null);
  const [userName, setUserName] = useState<string>('');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('full_name, location')
          .eq('id', user.id)
          .single();
        
        if (data?.full_name) {
          // Get first name only
          setUserName(data.full_name.split(' ')[0]);
        }
        if (data?.location) {
          // Parse location if stored as "City, Country"
          const parts = data.location.split(',').map(s => s.trim());
          if (parts.length >= 2) {
            setLocation({ city: parts[0], country: parts[1] });
          } else {
            setLocation({ city: data.location, country: '' });
          }
        }
      }
    };
    fetchProfile();
  }, [user]);

  // Get user's geolocation and fetch prayer times
  useEffect(() => {
    const fetchPrayerTimes = async (lat: number, lon: number) => {
      try {
        const response = await supabase.functions.invoke('prayer-times', {
          body: { latitude: lat, longitude: lon },
        });

        const apiData = response.data?.data || response.data;
        if (apiData?.timings) {
          const timings = apiData.timings;
          const prayers: PrayerTime[] = [
            { name: 'Fajr', time: timings.Fajr, icon: prayerIcons.Fajr },
            { name: 'Dhuhr', time: timings.Dhuhr, icon: prayerIcons.Dhuhr },
            { name: 'Asr', time: timings.Asr, icon: prayerIcons.Asr },
            { name: 'Maghrib', time: timings.Maghrib, icon: prayerIcons.Maghrib },
            { name: 'Isha', time: timings.Isha, icon: prayerIcons.Isha },
          ];

          setPrayerTimes(prayers);

          // Find next prayer
          const now = new Date();
          for (let i = 0; i < prayers.length; i++) {
            const prayerTime = parseTimeToDate(prayers[i].time);
            if (prayerTime > now) {
              setNextPrayer({
                name: prayers[i].name,
                time: prayers[i].time,
                countdown: getTimeUntil(prayerTime),
                index: i,
              });
              return;
            }
          }
          // If all prayers passed, next is tomorrow's Fajr
          const fajrTime = parseTimeToDate(prayers[0].time);
          setNextPrayer({
            name: 'Fajr',
            time: prayers[0].time,
            countdown: getTimeUntil(fajrTime),
            index: 0,
          });
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    };

    const setDefaultLocation = () => {
      if (!location) {
        setLocation({ city: 'Kampala', country: 'Uganda' });
      }
    };

    // Get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocode for city name if not in profile
          if (!location) {
            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await response.json();
              setLocation({
                city: data.city || data.locality || 'Unknown',
                country: data.countryName || '',
              });
            } catch (e) {
              console.error('Error getting location name:', e);
              setDefaultLocation();
            }
          }

          fetchPrayerTimes(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setDefaultLocation();
          // Default to Kampala coordinates
          fetchPrayerTimes(0.3136, 32.5811);
        }
      );
    } else {
      setDefaultLocation();
      fetchPrayerTimes(0.3136, 32.5811);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update countdown every minute
  useEffect(() => {
    if (nextPrayer) {
      const timer = setInterval(() => {
        const prayerTime = parseTimeToDate(nextPrayer.time);
        setNextPrayer(prev => prev ? { ...prev, countdown: getTimeUntil(prayerTime) } : null);
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [nextPrayer?.time]);

  const greeting = userName ? `Assalamu Alaikum, ${userName}` : 'Assalamu Alaikum';

  // Check if a prayer time has passed
  const isPrayerPassed = (time: string): boolean => {
    const prayerTime = parseTimeToDate(time);
    return prayerTime < new Date();
  };

  return (
    <header className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 safe-area-top">
      <div className="px-6 pt-8 pb-6">
        {/* Greeting & Hijri Date - Centered */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground">{greeting}</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
            <Moon className="w-4 h-4" />
            <span>{getHijriDate()}</span>
          </div>
        </div>

        {/* Current Time - Centered */}
        <div className="text-center mb-4">
          <p className="text-5xl font-bold text-foreground tracking-tight">
            {formatTime(currentTime)}
          </p>
          {location && (
            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mt-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location.city}{location.country && `, ${location.country}`}</span>
            </div>
          )}
        </div>

        {/* Next Prayer Countdown - Below time */}
        {nextPrayer && (
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 rounded-2xl px-8 py-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Time until {nextPrayer.name}</p>
              <p className="text-3xl font-bold text-primary">{nextPrayer.countdown}</p>
            </div>
          </div>
        )}

        {/* Prayer Times Row */}
        {prayerTimes.length > 0 && (
          <div>
            <div className="flex justify-between items-center gap-1 bg-card/50 rounded-2xl p-3 border border-border/50">
              {prayerTimes.map((prayer, index) => {
                const isNext = nextPrayer?.index === index;
                const passed = isPrayerPassed(prayer.time) && !isNext;
                const IconComponent = prayer.icon;
                
                return (
                  <div 
                    key={prayer.name} 
                    className={`flex flex-col items-center flex-1 py-2 px-1 rounded-xl transition-all ${
                      isNext 
                        ? 'bg-primary/15 scale-105' 
                        : passed 
                          ? 'opacity-50' 
                          : ''
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 mb-1 ${isNext ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-[10px] font-medium ${isNext ? 'text-primary' : 'text-muted-foreground'}`}>
                      {prayer.name}
                    </span>
                    <span className={`text-xs font-semibold ${isNext ? 'text-primary' : 'text-foreground'}`}>
                      {formatPrayerTime(prayer.time)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
