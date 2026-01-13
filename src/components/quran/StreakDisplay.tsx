import { Flame, Trophy, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useReadingStreak } from '@/hooks/useReadingStreak';
import { useAuth } from '@/contexts/AuthContext';

interface StreakDisplayProps {
  compact?: boolean;
}

export function StreakDisplay({ compact = false }: StreakDisplayProps) {
  const { user } = useAuth();
  const { streak, badges, loading } = useReadingStreak();

  if (!user || loading) return null;

  if (!streak && !compact) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Flame className="h-4 w-4" />
        <span>Start reading to build your streak!</span>
      </div>
    );
  }

  if (compact) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-orange-500/10 text-orange-600">
            <Flame className="h-4 w-4" />
            <span className="font-semibold text-sm">{streak?.current_streak || 0}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">{streak?.current_streak || 0} day streak!</p>
            <p className="text-xs text-muted-foreground">
              Longest: {streak?.longest_streak || 0} days
            </p>
            <p className="text-xs text-muted-foreground">
              Total: {streak?.total_days_read || 0} days read
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className="space-y-4">
      {/* Streak Stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10">
          <Flame className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-lg font-bold text-orange-600">{streak?.current_streak || 0}</p>
            <p className="text-xs text-muted-foreground">Current Streak</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <div>
            <p className="text-lg font-bold text-yellow-600">{streak?.longest_streak || 0}</p>
            <p className="text-xs text-muted-foreground">Longest Streak</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10">
          <Star className="h-5 w-5 text-blue-500" />
          <div>
            <p className="text-lg font-bold text-blue-600">{streak?.total_days_read || 0}</p>
            <p className="text-xs text-muted-foreground">Total Days</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Badges Earned</h4>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Tooltip key={badge.badge_id}>
                <TooltipTrigger>
                  <Badge variant="secondary" className="gap-1 cursor-default">
                    <span>{badge.badge_icon}</span>
                    <span>{badge.badge_name}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{badge.badge_description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
