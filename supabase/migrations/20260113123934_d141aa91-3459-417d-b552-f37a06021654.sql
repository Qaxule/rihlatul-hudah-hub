-- ============================================
-- PHASE 1: Database Schema for New Features
-- ============================================

-- 1. Reading Streaks Table
CREATE TABLE public.reading_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_read_date DATE,
  streak_start_date DATE,
  total_days_read INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- 2. User Badges/Achievements Table
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_id TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  badge_description TEXT,
  badge_icon TEXT,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- 3. Juz Completion Tracking
CREATE TABLE public.juz_completion (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  juz_number INTEGER NOT NULL CHECK (juz_number >= 1 AND juz_number <= 30),
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, juz_number)
);

-- 4. Memorization Progress (Hifz)
CREATE TABLE public.memorization_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  surah_number INTEGER NOT NULL CHECK (surah_number >= 1 AND surah_number <= 114),
  ayah_from INTEGER NOT NULL DEFAULT 1,
  ayah_to INTEGER NOT NULL,
  memorization_level TEXT NOT NULL DEFAULT 'learning' CHECK (memorization_level IN ('learning', 'reviewing', 'memorized')),
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, surah_number)
);

-- 5. Add verse reference columns to reflections table
ALTER TABLE public.reflections
  ADD COLUMN IF NOT EXISTS surah_number INTEGER CHECK (surah_number >= 1 AND surah_number <= 114),
  ADD COLUMN IF NOT EXISTS ayah_number INTEGER;

-- Enable RLS on new tables
ALTER TABLE public.reading_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.juz_completion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memorization_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reading_streaks
CREATE POLICY "Users can view their own streaks"
  ON public.reading_streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streaks"
  ON public.reading_streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks"
  ON public.reading_streaks FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_badges
CREATE POLICY "Users can view their own badges"
  ON public.user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own badges"
  ON public.user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for juz_completion
CREATE POLICY "Users can view their own juz completion"
  ON public.juz_completion FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own juz completion"
  ON public.juz_completion FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own juz completion"
  ON public.juz_completion FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for memorization_progress
CREATE POLICY "Users can manage their own memorization"
  ON public.memorization_progress FOR ALL
  USING (auth.uid() = user_id);

-- Update trigger for reading_streaks
CREATE TRIGGER update_reading_streaks_updated_at
  BEFORE UPDATE ON public.reading_streaks
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Update trigger for memorization_progress
CREATE TRIGGER update_memorization_progress_updated_at
  BEFORE UPDATE ON public.memorization_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();