-- Create guide_progress table for tracking user progress through guides
CREATE TABLE public.guide_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  guide_id TEXT NOT NULL,
  completed_steps INTEGER[] DEFAULT '{}',
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, guide_id)
);

-- Enable Row Level Security
ALTER TABLE public.guide_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can manage their own guide progress"
ON public.guide_progress
FOR ALL
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_guide_progress_updated_at
BEFORE UPDATE ON public.guide_progress
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();