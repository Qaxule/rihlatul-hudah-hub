import { useEffect, useState, useCallback } from 'react';

interface PrayerTimeData {
  name: string;
  time: string;
  isExtra?: boolean;
}

interface LocationCoords {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

interface NextPrayer {
  name: string;
  time: string;
  countdown: string;
  index: number;
}

const LOCATION_STORAGE_KEY = 'user-prayer-location';
const METHOD_STORAGE_KEY = 'prayer-calculation-method';

export const CALCULATION_METHODS = [
  { value: 3, label: 'Muslim World League' },
  { value: 2, label: 'ISNA (Islamic Society of North America)' },
  { value: 5, label: 'Egyptian General Authority of Survey' },
  { value: 4, label: 'Umm Al-Qura University, Makkah' },
  { value: 1, label: 'University of Islamic Sciences, Karachi' },
  { value: 0, label: 'Shia Ithna-Ashari' },
  { value: 7, label: 'Institute of Geophysics, University of Tehran' },
  { value: 8, label: 'Gulf Region' },
  { value: 9, label: 'Kuwait' },
  { value: 10, label: 'Qatar' },
  { value: 11, label: 'Majlis Ugama Islam Singapura' },
  { value: 13, label: 'Diyanet İşleri Başkanlığı, Turkey' },
  { value: 15, label: 'Moonsighting Committee Worldwide' },
] as const;

const parseTimeToDate = (timeStr: string): Date => {
  const cleaned = timeStr.replace(/\s*\(.*\)/, '').trim();
  const [hours, minutes] = cleaned.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const getTimeUntil = (targetTime: Date): string => {
  const now = new Date();
  let diff = targetTime.getTime() - now.getTime();
  if (diff < 0) diff += 24 * 60 * 60 * 1000;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const formatPrayerTime = (timeStr: string): string => {
  const cleaned = timeStr.replace(/\s*\(.*\)/, '').trim();
  const [hours, minutes] = cleaned.split(':');
  const h = parseInt(hours);
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const ampm = h >= 12 ? '' : '';
  return `${displayH}:${minutes}`;
};

// Main prayers used for next-prayer countdown calculation
const MAIN_PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeData[]>([]);
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);
  const [locationCoords, setLocationCoords] = useState<LocationCoords | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [calculationMethod, setCalculationMethodState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(METHOD_STORAGE_KEY);
      return saved ? parseInt(saved, 10) : 3; // Default: Muslim World League
    } catch {
      return 3;
    }
  });

  const getSavedLocation = (): LocationCoords | null => {
    try {
      const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const saveLocation = (coords: LocationCoords) => {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(coords));
    setLocationCoords(coords);
  };

  const fetchPrayerTimes = useCallback(async (lat: number, lon: number) => {
    try {
      setIsLoading(true);
      const date = new Date();
      const timestamp = Math.floor(date.getTime() / 1000);
      const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=${calculationMethod}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`AlAdhan API error: ${response.status}`);

      const result = await response.json();
      const timings = result?.data?.timings;

      if (timings) {
        const prayers: PrayerTimeData[] = [
          { name: 'Fajr', time: timings.Fajr },
          { name: 'Sunrise', time: timings.Sunrise, isExtra: true },
          { name: 'Dhuhr', time: timings.Dhuhr },
          { name: 'Asr', time: timings.Asr },
          { name: 'Maghrib', time: timings.Maghrib },
          { name: 'Isha', time: timings.Isha },
          { name: 'Midnight', time: timings.Midnight, isExtra: true },
        ];
        setPrayerTimes(prayers);

        // Calculate next prayer from main prayers only
        const mainPrayers = prayers.filter(p => MAIN_PRAYERS.includes(p.name));
        const now = new Date();
        for (let i = 0; i < mainPrayers.length; i++) {
          const prayerTime = parseTimeToDate(mainPrayers[i].time);
          if (prayerTime > now) {
            // Find the index in the full array
            const fullIndex = prayers.findIndex(p => p.name === mainPrayers[i].name);
            setNextPrayer({
              name: mainPrayers[i].name,
              time: mainPrayers[i].time,
              countdown: getTimeUntil(prayerTime),
              index: fullIndex,
            });
            setIsLoading(false);
            return;
          }
        }
        // All prayers passed — next is Fajr
        const fajrTime = parseTimeToDate(mainPrayers[0].time);
        const fajrIndex = prayers.findIndex(p => p.name === 'Fajr');
        setNextPrayer({
          name: 'Fajr',
          time: mainPrayers[0].time,
          countdown: getTimeUntil(fajrTime),
          index: fajrIndex,
        });
      }
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    } finally {
      setIsLoading(false);
    }
  }, [calculationMethod]);

  const setCalculationMethod = useCallback((method: number) => {
    setCalculationMethodState(method);
    localStorage.setItem(METHOD_STORAGE_KEY, String(method));
    if (locationCoords) {
      fetchPrayerTimes(locationCoords.latitude, locationCoords.longitude);
    }
  }, [locationCoords, fetchPrayerTimes]);

  const setManualLocation = useCallback(async (city: string, country: string, lat: number, lon: number) => {
    const coords: LocationCoords = { latitude: lat, longitude: lon, city, country };
    saveLocation(coords);
    await fetchPrayerTimes(lat, lon);
  }, [fetchPrayerTimes]);

  // Initialize location
  useEffect(() => {
    const saved = getSavedLocation();
    if (saved) {
      setLocationCoords(saved);
      fetchPrayerTimes(saved.latitude, saved.longitude);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const coords: LocationCoords = {
              latitude, longitude,
              city: data.city || data.locality || 'Unknown',
              country: data.countryName || '',
            };
            saveLocation(coords);
          } catch {
            setLocationCoords({ latitude, longitude, city: 'Unknown', country: '' });
          }
          fetchPrayerTimes(latitude, longitude);
        },
        () => {
          const defaultCoords: LocationCoords = { latitude: 0.3136, longitude: 32.5811, city: 'Kampala', country: 'Uganda' };
          setLocationCoords(defaultCoords);
          fetchPrayerTimes(0.3136, 32.5811);
        }
      );
    } else {
      const defaultCoords: LocationCoords = { latitude: 0.3136, longitude: 32.5811, city: 'Kampala', country: 'Uganda' };
      setLocationCoords(defaultCoords);
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

  const isPrayerPassed = (time: string): boolean => {
    return parseTimeToDate(time) < new Date();
  };

  return {
    prayerTimes,
    nextPrayer,
    locationCoords,
    isLoading,
    isPrayerPassed,
    setManualLocation,
    calculationMethod,
    setCalculationMethod,
  };
};
