import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { offlineCache, CACHE_CONFIG, STORES } from '@/lib/offlineCache';

interface WordData {
  position: number;
  arabic: string;
  transliteration: string;
  translation: string;
  grammar?: string;
}

interface WordByWordPopoverProps {
  word: string;
  index: number;
  surahNumber: number;
  ayahNumber: number;
}

// Cache for ayah word data to avoid refetching
const ayahWordCache = new Map<string, WordData[]>();

export function WordByWordPopover({
  word,
  index,
  surahNumber,
  ayahNumber,
}: WordByWordPopoverProps) {
  const [open, setOpen] = useState(false);
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const displayWord = word.trim();
  const cacheKey = `${surahNumber}:${ayahNumber}`;

  useEffect(() => {
    if (!open) return;

    const fetchWordData = async () => {
      // Check in-memory cache first
      if (ayahWordCache.has(cacheKey)) {
        const words = ayahWordCache.get(cacheKey)!;
        if (words[index]) {
          setWordData(words[index]);
          return;
        }
      }

      // Check IndexedDB cache
      try {
        const indexedDBKey = CACHE_CONFIG.WORD_BY_WORD(surahNumber, ayahNumber);
        const cached = await offlineCache.get(
          STORES.WORD_BY_WORD,
          indexedDBKey,
          CACHE_CONFIG.WORD_BY_WORD_MAX_AGE
        );
        
        if (cached?.words) {
          ayahWordCache.set(cacheKey, cached.words);
          if (cached.words[index]) {
            setWordData(cached.words[index]);
            return;
          }
        }
      } catch (e) {
        console.log('IndexedDB cache miss for word data');
      }

      // Fetch from API
      setLoading(true);
      setError(false);

      try {
        const { data, error: apiError } = await supabase.functions.invoke('quran-word-by-word', {
          body: { surah: surahNumber, ayah: ayahNumber },
        });

        if (apiError) throw apiError;

        if (data?.words?.length > 0) {
          // Cache in memory
          ayahWordCache.set(cacheKey, data.words);
          
          // Cache in IndexedDB
          try {
            const indexedDBKey = CACHE_CONFIG.WORD_BY_WORD(surahNumber, ayahNumber);
            await offlineCache.set(STORES.WORD_BY_WORD, indexedDBKey, {
              words: data.words,
              surah: surahNumber,
              ayah: ayahNumber,
            });
          } catch (e) {
            console.log('Failed to cache word data in IndexedDB');
          }

          if (data.words[index]) {
            setWordData(data.words[index]);
          }
        }
      } catch (err) {
        console.error('Error fetching word data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWordData();
  }, [open, surahNumber, ayahNumber, index, cacheKey]);

  if (!displayWord) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          className="cursor-pointer hover:bg-primary/10 hover:text-primary px-0.5 rounded transition-colors inline-block"
          onClick={() => setOpen(true)}
        >
          {displayWord}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="center" side="top">
        <div className="space-y-3">
          <p className="text-2xl text-center font-arabic leading-relaxed" dir="rtl">
            {wordData?.arabic || displayWord}
          </p>
          
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          ) : error ? (
            <p className="text-xs text-center text-muted-foreground">
              Word #{index + 1} • {surahNumber}:{ayahNumber}
            </p>
          ) : wordData ? (
            <>
              {wordData.transliteration && (
                <p className="text-sm text-center text-muted-foreground italic">
                  {wordData.transliteration}
                </p>
              )}
              {wordData.translation && (
                <p className="text-sm text-center font-medium text-foreground">
                  {wordData.translation}
                </p>
              )}
              {wordData.grammar && (
                <p className="text-xs text-center text-muted-foreground border-t border-border pt-2 mt-2">
                  {wordData.grammar}
                </p>
              )}
            </>
          ) : (
            <p className="text-xs text-center text-muted-foreground">
              Word #{index + 1} • {surahNumber}:{ayahNumber}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
