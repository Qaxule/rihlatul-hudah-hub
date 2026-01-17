-- Create reflection_likes table for liking community reflections
CREATE TABLE public.reflection_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  reflection_id uuid NOT NULL REFERENCES public.reflections(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, reflection_id)
);

-- Enable RLS
ALTER TABLE public.reflection_likes ENABLE ROW LEVEL SECURITY;

-- Users can view all likes (to show like counts)
CREATE POLICY "Anyone can view reflection likes"
ON public.reflection_likes
FOR SELECT
USING (true);

-- Users can insert their own likes
CREATE POLICY "Users can like reflections"
ON public.reflection_likes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can remove their own likes
CREATE POLICY "Users can unlike reflections"
ON public.reflection_likes
FOR DELETE
USING (auth.uid() = user_id);