-- Create table for saved duas
CREATE TABLE public.dua_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  arabic TEXT NOT NULL,
  transliteration TEXT NOT NULL,
  meaning TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.dua_bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own dua bookmarks" 
ON public.dua_bookmarks 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own dua bookmarks" 
ON public.dua_bookmarks 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own dua bookmarks" 
ON public.dua_bookmarks 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create unique constraint to prevent duplicate bookmarks
ALTER TABLE public.dua_bookmarks 
ADD CONSTRAINT dua_bookmarks_unique UNIQUE (user_id, arabic);