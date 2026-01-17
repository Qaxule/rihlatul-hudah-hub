-- Add unique constraint for user_id and guide_id to enable proper upsert functionality
ALTER TABLE public.guide_progress 
ADD CONSTRAINT guide_progress_user_guide_unique UNIQUE (user_id, guide_id);