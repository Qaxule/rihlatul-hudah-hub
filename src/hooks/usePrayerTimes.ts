import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PrayerTimeData {
  name: string;
  time: string;
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

const parseTimeToDate = (timeStr: string): Date => {
  const parts = timeStr.split(' ');
  const [hours, minutes] = parts[0].split(':').map(Number);
  const date = new Date();
  if (parts.length > 1) {
    const period = parts[1];
    let adjustedHours = hours;
    if (period === 'PM' && hours !== 12) adjustedHours += 12;
    if (period === 'AM' && hours === 12) adjustedHours = 0;
    date.setHours(adjustedHours, minutes, 0, 0);
  } else {
    date.setHours(hours, minutes, 0, 0);
  }
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
  const [time] = timeStr.split(' ');
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${minutes}`;
};

export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeData[]>([]);
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);
  const [locationCoords, setLocationCoords] = useState<LocationCoords | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      const response = await supabase.functions.invoke('prayer-times', {
        body: { latitude: lat, longitude: lon },
      });

      const apiData = response.data?.data || response.data;
      if (apiData?.timings) {
        const timings = apiData.timings;
        const prayers: PrayerTimeData[] = [
          { name: 'Fajr', time: timings.Fajr },
          { name: 'Dhuhr', time: timings.Dhuhr },
          { name: 'Asr', time: timings.Asr },
          { name: 'Maghrib', time: timings.Maghrib },
          { name: 'Isha', time: timings.Isha },
        ];
        setPrayerTimes(prayers);

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
            setIsLoading(false);
            return;
          }
        }
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
    } finally {
      setIsLoading(false);
    }
  }, []);

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
  };
};
