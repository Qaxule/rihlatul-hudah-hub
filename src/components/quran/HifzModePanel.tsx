import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Brain, Eye, EyeOff, RotateCcw, Check, BookOpen } from 'lucide-react';
import { useMemorization, MemorizationLevel } from '@/hooks/useMemorization';
import { useAuth } from '@/contexts/AuthContext';

interface HifzModePanelProps {
  surahNumber: number;
  surahName: string;
  totalAyahs: number;
  hiddenAyahs: Set<number>;
  onToggleHide: (ayahNumber: number) => void;
  onHideAll: () => void;
  onShowAll: () => void;
  onTestMode: (enabled: boolean) => void;
  testMode: boolean;
}

export function HifzModePanel({
  surahNumber,
  surahName,
  totalAyahs,
  hiddenAyahs,
  onToggleHide,
  onHideAll,
  onShowAll,
  onTestMode,
  testMode,
}: HifzModePanelProps) {
  const { user } = useAuth();
  const { getSurahProgress, markSurahMemorized, updateProgress } = useMemorization();
  const [open, setOpen] = useState(false);

  const progress = getSurahProgress(surahNumber);
  const memorizedAyahs = progress?.ayah_to || 0;
  const progressPercent = (memorizedAyahs / totalAyahs) * 100;
  const hiddenCount = hiddenAyahs.size;

  const handleMarkMemorized = async () => {
    await markSurahMemorized(surahNumber, totalAyahs);
  };

  const handleUpdateProgress = async (level: MemorizationLevel) => {
    await updateProgress(surahNumber, memorizedAyahs || hiddenCount || totalAyahs, level);
  };

  const getLevelBadge = (level?: MemorizationLevel) => {
    switch (level) {
      case 'memorized':
        return <Badge className="bg-green-500">Memorized</Badge>;
      case 'reviewing':
        return <Badge className="bg-yellow-500">Reviewing</Badge>;
      case 'learning':
        return <Badge className="bg-blue-500">Learning</Badge>;
      default:
        return <Badge variant="outline">Not started</Badge>;
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Brain className="h-4 w-4" />
          Hifz Mode
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Memorization Mode
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Surah Info */}
          <div className="space-y-2">
            <h3 className="font-semibold">{surahName}</h3>
            <p className="text-sm text-muted-foreground">{totalAyahs} Ayahs</p>
            {progress && getLevelBadge(progress.memorization_level)}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{memorizedAyahs}/{totalAyahs} ayahs</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round(progressPercent)}% memorized
            </p>
          </div>

          {/* Test Mode Toggle */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <Label htmlFor="test-mode" className="cursor-pointer">
                Test Mode
              </Label>
            </div>
            <Switch
              id="test-mode"
              checked={testMode}
              onCheckedChange={onTestMode}
            />
          </div>
          {testMode && (
            <p className="text-xs text-muted-foreground">
              Tap on hidden verses to reveal them. Test your memorization!
            </p>
          )}

          {/* Hide/Show Controls */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Visibility Controls</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onHideAll}
                className="flex-1 gap-1"
              >
                <EyeOff className="h-3 w-3" />
                Hide All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onShowAll}
                className="flex-1 gap-1"
              >
                <Eye className="h-3 w-3" />
                Show All
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {hiddenCount} of {totalAyahs} ayahs hidden
            </p>
          </div>

          {/* Mark Progress */}
          {user && (
            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-sm font-medium">Update Status</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateProgress('learning')}
                  className="justify-start gap-2"
                >
                  <RotateCcw className="h-3 w-3" />
                  Mark as Learning
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateProgress('reviewing')}
                  className="justify-start gap-2"
                >
                  <Eye className="h-3 w-3" />
                  Mark as Reviewing
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleMarkMemorized}
                  className="justify-start gap-2"
                >
                  <Check className="h-3 w-3" />
                  Mark as Memorized
                </Button>
              </div>
            </div>
          )}

          {!user && (
            <p className="text-sm text-muted-foreground text-center py-4 border-t">
              Login to track your memorization progress
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
