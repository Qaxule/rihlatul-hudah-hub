import { useEffect, useState } from 'react';
import { Moon, Sun, Sunset, CloudSun, MoonStar, Sunrise, Settings2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { usePrayerTimes, formatPrayerTime, CALCULATION_METHODS } from '@/hooks/usePrayerTimes';
import { LocationSearchDialog } from './LocationSearchDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Hijri date calculation with adjustment
const getHijriDate = (): string => {
  const today = new Date();
  const gregorianYear = today.getFullYear();
  const gregorianMonth = today.getMonth() + 1;
  const gregorianDay = today.getDate();

  let jd = Math.floor((1461 * (gregorianYear + 4800 + Math.floor((gregorianMonth - 14) / 12))) / 4) +
           Math.floor((367 * (gregorianMonth - 2 - 12 * Math.floor((gregorianMonth - 14) / 12))) / 12) -
           Math.floor((3 * Math.floor((gregorianYear + 4900 + Math.floor((gregorianMonth - 14) / 12)) / 100)) / 4) +
           gregorianDay - 32075;

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

const prayerIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Fajr: Sun,
  Sunrise: Sunrise,
  Dhuhr: CloudSun,
  Asr: Sunset,
  Maghrib: Sunset,
  Isha: MoonStar,
  Midnight: Moon,
};

export const AppHeader = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState<string>('');
  const { prayerTimes, nextPrayer, locationCoords, isPrayerPassed, setManualLocation, calculationMethod, setCalculationMethod } = usePrayerTimes();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        if (data?.full_name) {
          setUserName(data.full_name.split(' ')[0]);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const greeting = userName ? `Assalamu Alaikum, ${userName}` : 'Assalamu Alaikum';

  return (
    <header className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 safe-area-top">
      <div className="px-6 pt-8 pb-6">
        {/* Greeting & Hijri Date */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-foreground">{greeting}</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
            <Moon className="w-4 h-4" />
            <span>{getHijriDate()}</span>
          </div>
        </div>

        {/* Current Time */}
        <div className="text-center mb-4 space-y-2">
          <p className="text-5xl font-bold text-foreground tracking-tight">
            {formatTime(currentTime)}
          </p>
          <LocationSearchDialog
            currentCity={locationCoords?.city}
            currentCountry={locationCoords?.country}
            onLocationSelect={setManualLocation}
          />
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Settings2 className="w-3.5 h-3.5" />
            <Popover>
              <PopoverTrigger asChild>
                <button className="hover:text-primary transition-colors underline-offset-2 hover:underline">
                  {CALCULATION_METHODS.find(m => m.value === calculationMethod)?.label || 'Calculation Method'}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72" align="center">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Calculation Method</p>
                  <Select value={String(calculationMethod)} onValueChange={(v) => setCalculationMethod(Number(v))}>
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CALCULATION_METHODS.map((m) => (
                        <SelectItem key={m.value} value={String(m.value)} className="text-xs">
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Next Prayer Countdown */}
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
                const IconComponent = prayerIcons[prayer.name] || Sun;
                
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
