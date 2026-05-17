-- Fix feedback category constraint to match app values
ALTER TABLE public.feedback DROP CONSTRAINT feedback_category_check;
ALTER TABLE public.feedback ADD CONSTRAINT feedback_category_check
  CHECK (category IN ('bug', 'idee', 'lob'));
