import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface WordData {
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
  wordData?: WordData;
}

export function WordByWordPopover({
  word,
  index,
  surahNumber,
  ayahNumber,
  wordData,
}: WordByWordPopoverProps) {
  const [open, setOpen] = useState(false);

  // Clean the word (remove Arabic diacritics for display purposes if needed)
  const displayWord = word.trim();

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
      <PopoverContent className="w-64 p-3" align="center" side="top">
        <div className="space-y-2">
          <p className="text-2xl text-center font-arabic" dir="rtl">
            {wordData?.arabic || displayWord}
          </p>
          {wordData ? (
            <>
              <p className="text-sm text-center text-muted-foreground italic">
                {wordData.transliteration}
              </p>
              <p className="text-sm text-center font-medium">
                {wordData.translation}
              </p>
              {wordData.grammar && (
                <p className="text-xs text-center text-muted-foreground border-t pt-2">
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
