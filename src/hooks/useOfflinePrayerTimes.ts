import { useState, useEffect } from 'react';
import { offlineCache, CACHE_CONFIG, STORES } from '@/lib/offlineCache';
import { toast } from 'sonner';

interface PrayerTimesResult {
  prayerTimes: any;
  qiblaDirection: number | null;
  loading: boolean;
  error: string | null;
  isOffline: boolean;
  fetchPrayerTimes: (lat: number, lon: number) => Promise<void>;
}

export function useOfflinePrayerTimes(session: any): PrayerTimesResult {
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const fetchPrayerTimes = async (lat: number, lon: number) => {
    if (!session) {
      toast.error('Please login to access prayer times');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const today = new Date().toISOString().split('T')[0];
      const cacheKey = CACHE_CONFIG.PRAYER_TIMES(lat, lon, today);

      // Try to get from cache first
      const cachedData = await offlineCache.get(
        STORES.PRAYER_TIMES,
        cacheKey,
        CACHE_CONFIG.PRAYER_TIMES_MAX_AGE
      );

      if (cachedData) {
        setPrayerTimes(cachedData.timings);
        setQiblaDirection(cachedData.qibla);
        setIsOffline(true);
      }

      // Try to fetch from network
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/prayer-times`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`,
              'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
            body: JSON.stringify({ latitude: lat, longitude: lon }),
          }
        );

        if (!response.ok) throw new Error('Failed to fetch prayer times');

        const data = await response.json();

        // Update cache with fresh data
        await offlineCache.set(STORES.PRAYER_TIMES, cacheKey, {
          timings: data.data.timings,
          qibla: data.data.meta.qibla_direction,
        });

        setPrayerTimes(data.data.timings);
        setQiblaDirection(data.data.meta.qibla_direction);
        setIsOffline(false);

        if (cachedData) {
          toast.success('Prayer times updated');
        } else {
          toast.success('Prayer times loaded');
        }
      } catch (networkError) {
        console.error('Network error:', networkError);

        // If we have cached data, use it
        if (cachedData) {
          setIsOffline(true);
          toast.info('Showing cached prayer times (offline)');
        } else {
          // No cache and no network
          throw new Error('Unable to load prayer times. Please check your connection.');
        }
      }
    } catch (err: any) {
      console.error('Error fetching prayer times:', err);
      setError(err.message || 'Failed to fetch prayer times');
      toast.error(err.message || 'Failed to fetch prayer times');
    } finally {
      setLoading(false);
    }
  };

  return {
    prayerTimes,
    qiblaDirection,
    loading,
    error,
    isOffline,
    fetchPrayerTimes,
  };
}
