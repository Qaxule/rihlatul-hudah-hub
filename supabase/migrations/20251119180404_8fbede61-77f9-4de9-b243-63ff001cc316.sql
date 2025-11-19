-- Create reading progress table
CREATE TABLE public.reading_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  surah_number integer NOT NULL,
  ayah_number integer NOT NULL,
  last_read_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own reading progress
CREATE POLICY "Users can manage their own reading progress"
  ON public.reading_progress
  FOR ALL
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_reading_progress_user_id ON public.reading_progress(user_id);

-- Create trigger to update last_read_at
CREATE TRIGGER update_reading_progress_last_read_at
  BEFORE UPDATE ON public.reading_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();