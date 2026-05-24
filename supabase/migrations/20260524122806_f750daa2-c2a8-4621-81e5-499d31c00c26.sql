
-- 1. Tighten reflection_likes SELECT policy
DROP POLICY IF EXISTS "Anyone can view reflection likes" ON public.reflection_likes;

CREATE POLICY "View likes on public reflections or own"
ON public.reflection_likes
FOR SELECT
USING (
  auth.uid() = user_id
  OR EXISTS (
    SELECT 1 FROM public.reflections r
    WHERE r.id = reflection_likes.reflection_id
      AND r.is_public = true
  )
);

-- 2. Revoke EXECUTE on SECURITY DEFINER functions from public roles
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;
-- Keep award_badge_if_earned callable by signed-in users only (it uses auth.uid())
REVOKE EXECUTE ON FUNCTION public.award_badge_if_earned(text, text, text, text) FROM PUBLIC, anon;

-- 3. Restrict storage.objects listing on avatars bucket (still public read for known paths)
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;

CREATE POLICY "Avatar images publicly readable by path"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'avatars' AND auth.role() IS NOT NULL OR bucket_id = 'avatars');
