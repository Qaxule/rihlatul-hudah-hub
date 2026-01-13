import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ReadingStreak {
  current_streak: number;
  longest_streak: number;
  last_read_date: string | null;
  streak_start_date: string | null;
  total_days_read: number;
}

interface Badge {
  badge_id: string;
  badge_name: string;
  badge_description: string;
  badge_icon: string;
  earned_at: string;
}

const BADGE_DEFINITIONS = [
  { id: 'first_read', name: 'First Step', description: 'Read your first ayah', icon: '📖', threshold: 1 },
  { id: 'streak_3', name: 'Consistent Reader', description: '3-day reading streak', icon: '🔥', threshold: 3 },
  { id: 'streak_7', name: 'Weekly Warrior', description: '7-day reading streak', icon: '⭐', threshold: 7 },
  { id: 'streak_30', name: 'Monthly Master', description: '30-day reading streak', icon: '🏆', threshold: 30 },
  { id: 'streak_100', name: 'Century Champion', description: '100-day reading streak', icon: '👑', threshold: 100 },
  { id: 'juz_1', name: 'First Juz', description: 'Completed 1 Juz', icon: '📚', threshold: 1 },
  { id: 'juz_5', name: 'Five Complete', description: 'Completed 5 Juz', icon: '📕', threshold: 5 },
  { id: 'juz_10', name: 'Ten Complete', description: 'Completed 10 Juz', icon: '📗', threshold: 10 },
  { id: 'juz_30', name: 'Khatm ul-Quran', description: 'Completed all 30 Juz', icon: '🎉', threshold: 30 },
];

export function useReadingStreak() {
  const { user } = useAuth();
  const [streak, setStreak] = useState<ReadingStreak | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [completedJuz, setCompletedJuz] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStreakData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Fetch reading streak
      const { data: streakData } = await supabase
        .from('reading_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (streakData) {
        setStreak({
          current_streak: streakData.current_streak,
          longest_streak: streakData.longest_streak,
          last_read_date: streakData.last_read_date,
          streak_start_date: streakData.streak_start_date,
          total_days_read: streakData.total_days_read,
        });
      }

      // Fetch badges
      const { data: badgeData } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id);

      if (badgeData) {
        setBadges(badgeData);
      }

      // Fetch completed juz
      const { data: juzData } = await supabase
        .from('juz_completion')
        .select('juz_number')
        .eq('user_id', user.id);

      if (juzData) {
        setCompletedJuz(juzData.map((j) => j.juz_number));
      }
    } catch (error) {
      console.error('Error fetching streak data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStreakData();
  }, [fetchStreakData]);

  const updateStreak = useCallback(async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];

    try {
      const { data: existing } = await supabase
        .from('reading_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!existing) {
        // Create new streak record
        await supabase.from('reading_streaks').insert({
          user_id: user.id,
          current_streak: 1,
          longest_streak: 1,
          last_read_date: today,
          streak_start_date: today,
          total_days_read: 1,
        });

        // Award first read badge
        await awardBadge('first_read');
        setStreak({
          current_streak: 1,
          longest_streak: 1,
          last_read_date: today,
          streak_start_date: today,
          total_days_read: 1,
        });
        return;
      }

      // Check if already read today
      if (existing.last_read_date === today) {
        return; // Already counted today
      }

      const lastReadDate = existing.last_read_date ? new Date(existing.last_read_date) : null;
      const todayDate = new Date(today);
      
      let newStreak = 1;
      let newLongest = existing.longest_streak;
      let streakStart = today;

      if (lastReadDate) {
        const diffDays = Math.floor((todayDate.getTime() - lastReadDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // Consecutive day - extend streak
          newStreak = existing.current_streak + 1;
          streakStart = existing.streak_start_date;
        } else if (diffDays === 0) {
          // Same day - no change
          return;
        }
        // If diffDays > 1, streak resets to 1
      }

      if (newStreak > newLongest) {
        newLongest = newStreak;
      }

      await supabase
        .from('reading_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: newLongest,
          last_read_date: today,
          streak_start_date: streakStart,
          total_days_read: existing.total_days_read + 1,
        })
        .eq('user_id', user.id);

      // Check for streak badges
      const streakBadges = [
        { streak: 3, id: 'streak_3' },
        { streak: 7, id: 'streak_7' },
        { streak: 30, id: 'streak_30' },
        { streak: 100, id: 'streak_100' },
      ];

      for (const { streak: threshold, id } of streakBadges) {
        if (newStreak >= threshold) {
          await awardBadge(id);
        }
      }

      setStreak({
        current_streak: newStreak,
        longest_streak: newLongest,
        last_read_date: today,
        streak_start_date: streakStart,
        total_days_read: existing.total_days_read + 1,
      });
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  }, [user]);

  const awardBadge = useCallback(async (badgeId: string) => {
    if (!user) return;

    const badgeDef = BADGE_DEFINITIONS.find((b) => b.id === badgeId);
    if (!badgeDef) return;

    // Check if already has badge
    const hasIt = badges.some((b) => b.badge_id === badgeId);
    if (hasIt) return;

    try {
      const { error } = await supabase.from('user_badges').insert({
        user_id: user.id,
        badge_id: badgeId,
        badge_name: badgeDef.name,
        badge_description: badgeDef.description,
        badge_icon: badgeDef.icon,
      });

      if (!error) {
        setBadges((prev) => [
          ...prev,
          {
            badge_id: badgeId,
            badge_name: badgeDef.name,
            badge_description: badgeDef.description,
            badge_icon: badgeDef.icon,
            earned_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error awarding badge:', error);
    }
  }, [user, badges]);

  const markJuzComplete = useCallback(async (juzNumber: number) => {
    if (!user || completedJuz.includes(juzNumber)) return;

    try {
      await supabase.from('juz_completion').insert({
        user_id: user.id,
        juz_number: juzNumber,
      });

      const newCompletedJuz = [...completedJuz, juzNumber];
      setCompletedJuz(newCompletedJuz);

      // Check for juz badges
      const juzCount = newCompletedJuz.length;
      if (juzCount >= 1) await awardBadge('juz_1');
      if (juzCount >= 5) await awardBadge('juz_5');
      if (juzCount >= 10) await awardBadge('juz_10');
      if (juzCount >= 30) await awardBadge('juz_30');
    } catch (error) {
      console.error('Error marking juz complete:', error);
    }
  }, [user, completedJuz, awardBadge]);

  return {
    streak,
    badges,
    completedJuz,
    loading,
    updateStreak,
    markJuzComplete,
    awardBadge,
    BADGE_DEFINITIONS,
    refresh: fetchStreakData,
  };
}
