-- Create hadith_bookmarks table
CREATE TABLE public.hadith_bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  collection_id TEXT NOT NULL,
  hadith_number INTEGER NOT NULL,
  hadith_text TEXT NOT NULL,
  hadith_arabic_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, collection_id, hadith_number)
);

-- Enable Row Level Security
ALTER TABLE public.hadith_bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own hadith bookmarks"
ON public.hadith_bookmarks
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own hadith bookmarks"
ON public.hadith_bookmarks
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own hadith bookmarks"
ON public.hadith_bookmarks
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_hadith_bookmarks_user_id ON public.hadith_bookmarks(user_id);
CREATE INDEX idx_hadith_bookmarks_collection ON public.hadith_bookmarks(collection_id);