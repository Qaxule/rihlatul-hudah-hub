import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { offlineCache, CACHE_CONFIG, STORES } from '@/lib/offlineCache';
import { toast } from 'sonner';

interface QuranDataResult {
  data: any;
  loading: boolean;
  error: string | null;
  isOffline: boolean;
}

export function useOfflineQuranData(
  surahNumber: number,
  edition: string
): QuranDataResult {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const cacheKey = CACHE_CONFIG.QURAN_SURAH(surahNumber, edition);

        // Try to get from cache first
        const cachedData = await offlineCache.get(
          STORES.QURAN_DATA,
          cacheKey,
          CACHE_CONFIG.QURAN_MAX_AGE
        );

        if (cachedData && isMounted) {
          setData(cachedData);
          setIsOffline(true);
          setLoading(false);
        }

        // Try to fetch from network
        try {
          const { data: result, error: fetchError } = await supabase.functions.invoke(
            'quran-data',
            {
              body: { surah: surahNumber, edition, type: 'surah' },
            }
          );

          if (fetchError) throw fetchError;

          if (result && isMounted) {
            // Update cache with fresh data
            await offlineCache.set(STORES.QURAN_DATA, cacheKey, result.data);
            setData(result.data);
            setIsOffline(false);
            
            // Show toast only if we were using cached data
            if (cachedData) {
              toast.success('Content updated');
            }
          }
        } catch (networkError) {
          console.error('Network error:', networkError);
          
          // If we have cached data, use it
          if (cachedData) {
            if (isMounted) {
              setIsOffline(true);
              toast.info('Showing cached content (offline)');
            }
          } else {
            // No cache and no network
            throw new Error('Unable to load data. Please check your connection.');
          }
        }
      } catch (err: any) {
        console.error('Error fetching Quran data:', err);
        if (isMounted) {
          setError(err.message || 'Failed to load Surah');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [surahNumber, edition]);

  return { data, loading, error, isOffline };
}
