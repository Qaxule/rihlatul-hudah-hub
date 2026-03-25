
-- Create a server-side function to award badges, with validation
CREATE OR REPLACE FUNCTION public.award_badge_if_earned(
  _badge_id text,
  _badge_name text,
  _badge_description text,
  _badge_icon text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
  _current_streak int;
  _juz_count int;
  _total_days int;
  _earned boolean := false;
BEGIN
  _user_id := auth.uid();
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Check if badge already exists
  IF EXISTS (SELECT 1 FROM user_badges WHERE user_id = _user_id AND badge_id = _badge_id) THEN
    RETURN true;
  END IF;

  -- Get streak data
  SELECT current_streak, total_days_read INTO _current_streak, _total_days
  FROM reading_streaks WHERE user_id = _user_id;

  -- Get juz completion count
  SELECT count(*) INTO _juz_count FROM juz_completion WHERE user_id = _user_id;

  -- Validate badge eligibility
  CASE _badge_id
    WHEN 'first_read' THEN _earned := COALESCE(_total_days, 0) >= 1;
    WHEN 'streak_3' THEN _earned := COALESCE(_current_streak, 0) >= 3;
    WHEN 'streak_7' THEN _earned := COALESCE(_current_streak, 0) >= 7;
    WHEN 'streak_30' THEN _earned := COALESCE(_current_streak, 0) >= 30;
    WHEN 'streak_100' THEN _earned := COALESCE(_current_streak, 0) >= 100;
    WHEN 'juz_1' THEN _earned := COALESCE(_juz_count, 0) >= 1;
    WHEN 'juz_5' THEN _earned := COALESCE(_juz_count, 0) >= 5;
    WHEN 'juz_10' THEN _earned := COALESCE(_juz_count, 0) >= 10;
    WHEN 'juz_30' THEN _earned := COALESCE(_juz_count, 0) >= 30;
    ELSE _earned := false;
  END CASE;

  IF _earned THEN
    INSERT INTO user_badges (user_id, badge_id, badge_name, badge_description, badge_icon)
    VALUES (_user_id, _badge_id, _badge_name, _badge_description, _badge_icon)
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN _earned;
END;
$$;

-- Revoke direct INSERT on user_badges from anon and authenticated
DROP POLICY IF EXISTS "Users can insert their own badges" ON public.user_badges;
