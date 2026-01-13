import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type MemorizationLevel = 'learning' | 'reviewing' | 'memorized';

interface MemorizationProgress {
  surah_number: number;
  ayah_from: number;
  ayah_to: number;
  memorization_level: MemorizationLevel;
  last_reviewed_at: string | null;
  review_count: number;
}

export function useMemorization() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Map<number, MemorizationProgress>>(new Map());
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('memorization_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const progressMap = new Map<number, MemorizationProgress>();
      data?.forEach((item) => {
        progressMap.set(item.surah_number, {
          surah_number: item.surah_number,
          ayah_from: item.ayah_from,
          ayah_to: item.ayah_to,
          memorization_level: item.memorization_level as MemorizationLevel,
          last_reviewed_at: item.last_reviewed_at,
          review_count: item.review_count,
        });
      });

      setProgress(progressMap);
    } catch (error) {
      console.error('Error fetching memorization progress:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const updateProgress = useCallback(
    async (
      surahNumber: number,
      ayahTo: number,
      level: MemorizationLevel = 'learning'
    ) => {
      if (!user) return;

      try {
        const existing = progress.get(surahNumber);

        if (existing) {
          await supabase
            .from('memorization_progress')
            .update({
              ayah_to: ayahTo,
              memorization_level: level,
              last_reviewed_at: new Date().toISOString(),
              review_count: existing.review_count + 1,
            })
            .eq('user_id', user.id)
            .eq('surah_number', surahNumber);
        } else {
          await supabase.from('memorization_progress').insert({
            user_id: user.id,
            surah_number: surahNumber,
            ayah_from: 1,
            ayah_to: ayahTo,
            memorization_level: level,
            last_reviewed_at: new Date().toISOString(),
            review_count: 1,
          });
        }

        setProgress((prev) => {
          const next = new Map(prev);
          next.set(surahNumber, {
            surah_number: surahNumber,
            ayah_from: 1,
            ayah_to: ayahTo,
            memorization_level: level,
            last_reviewed_at: new Date().toISOString(),
            review_count: (existing?.review_count || 0) + 1,
          });
          return next;
        });
      } catch (error) {
        console.error('Error updating memorization progress:', error);
      }
    },
    [user, progress]
  );

  const markSurahMemorized = useCallback(
    async (surahNumber: number, totalAyahs: number) => {
      await updateProgress(surahNumber, totalAyahs, 'memorized');
    },
    [updateProgress]
  );

  const getSurahProgress = useCallback(
    (surahNumber: number): MemorizationProgress | null => {
      return progress.get(surahNumber) || null;
    },
    [progress]
  );

  const getMemorizedSurahs = useCallback((): number[] => {
    return Array.from(progress.entries())
      .filter(([_, p]) => p.memorization_level === 'memorized')
      .map(([surah]) => surah);
  }, [progress]);

  const getTotalMemorizedAyahs = useCallback((): number => {
    let total = 0;
    progress.forEach((p) => {
      if (p.memorization_level === 'memorized') {
        total += p.ayah_to - p.ayah_from + 1;
      }
    });
    return total;
  }, [progress]);

  return {
    progress,
    loading,
    updateProgress,
    markSurahMemorized,
    getSurahProgress,
    getMemorizedSurahs,
    getTotalMemorizedAyahs,
    refresh: fetchProgress,
  };
}
