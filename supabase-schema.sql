-- Supabase Schema for Artwork Gallery
-- Copy and paste this into your Supabase SQL Editor

-- Enable RLS (Row Level Security)
-- You can customize these policies based on your needs

-- Create artworks table
CREATE TABLE IF NOT EXISTS public.artworks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    image_path TEXT, -- for Supabase storage path
    tags TEXT[] DEFAULT '{}', -- Array of tags
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    width INTEGER DEFAULT 400,
    height INTEGER DEFAULT 600,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create tags table for better organization (optional - you can use the tags array in artworks instead)
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    color VARCHAR(7) DEFAULT '#3b82f6', -- hex color
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create artwork_tags junction table (if using separate tags table)
CREATE TABLE IF NOT EXISTS public.artwork_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    artwork_id UUID REFERENCES public.artworks(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(artwork_id, tag_id)
);

-- Create likes table to track user likes (optional - for user-specific likes)
CREATE TABLE IF NOT EXISTS public.artwork_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    artwork_id UUID REFERENCES public.artworks(id) ON DELETE CASCADE,
    user_id UUID, -- Can reference auth.users(id) if using Supabase Auth
    ip_address INET, -- For anonymous likes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(artwork_id, user_id), -- Prevent duplicate likes per user
    UNIQUE(artwork_id, ip_address) -- Prevent duplicate likes per IP (for anonymous)
);

-- Create views table to track artwork views
CREATE TABLE IF NOT EXISTS public.artwork_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    artwork_id UUID REFERENCES public.artworks(id) ON DELETE CASCADE,
    user_id UUID, -- Can reference auth.users(id) if using Supabase Auth
    ip_address INET, -- For anonymous views
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at on artworks
CREATE TRIGGER on_artworks_updated
    BEFORE UPDATE ON public.artworks
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create trigger for updated_at on tags
CREATE TRIGGER on_tags_updated
    BEFORE UPDATE ON public.tags
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to increment artwork likes
CREATE OR REPLACE FUNCTION public.increment_artwork_likes(artwork_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    new_likes INTEGER;
BEGIN
    UPDATE public.artworks 
    SET likes = likes + 1 
    WHERE id = artwork_uuid;
    
    SELECT likes INTO new_likes 
    FROM public.artworks 
    WHERE id = artwork_uuid;
    
    RETURN new_likes;
END;
$$ LANGUAGE plpgsql;

-- Function to increment artwork views
CREATE OR REPLACE FUNCTION public.increment_artwork_views(artwork_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    new_views INTEGER;
BEGIN
    UPDATE public.artworks 
    SET views = views + 1 
    WHERE id = artwork_uuid;
    
    SELECT views INTO new_views 
    FROM public.artworks 
    WHERE id = artwork_uuid;
    
    RETURN new_views;
END;
$$ LANGUAGE plpgsql;

-- Function to update tag usage count
CREATE OR REPLACE FUNCTION public.update_tag_usage_count(tag_name TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.tags 
    SET usage_count = (
        SELECT COUNT(*) 
        FROM public.artworks 
        WHERE tag_name = ANY(tags)
    )
    WHERE name = tag_name;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_artworks_created_at ON public.artworks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_artworks_likes ON public.artworks(likes DESC);
CREATE INDEX IF NOT EXISTS idx_artworks_views ON public.artworks(views DESC);
CREATE INDEX IF NOT EXISTS idx_artworks_tags ON public.artworks USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_artworks_artist ON public.artworks(artist);
CREATE INDEX IF NOT EXISTS idx_artwork_views_artwork_id ON public.artwork_views(artwork_id);
CREATE INDEX IF NOT EXISTS idx_artwork_likes_artwork_id ON public.artwork_likes(artwork_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_views ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your needs)

-- Allow public read access to artworks
CREATE POLICY "Allow public read access to artworks" ON public.artworks
    FOR SELECT USING (true);

-- Allow public read access to tags
CREATE POLICY "Allow public read access to tags" ON public.tags
    FOR SELECT USING (true);

-- Allow public read access to artwork_tags
CREATE POLICY "Allow public read access to artwork_tags" ON public.artwork_tags
    FOR SELECT USING (true);

-- Admin policies - you can restrict these to specific users/roles
-- For now, allowing all authenticated users to manage artworks
-- You should modify these based on your admin authentication setup

CREATE POLICY "Allow authenticated users to insert artworks" ON public.artworks
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update artworks" ON public.artworks
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete artworks" ON public.artworks
    FOR DELETE USING (auth.role() = 'authenticated');

-- Similar policies for tags
CREATE POLICY "Allow authenticated users to manage tags" ON public.tags
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow public to add likes and views (for engagement tracking)
CREATE POLICY "Allow public to add likes" ON public.artwork_likes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to add views" ON public.artwork_views
    FOR INSERT WITH CHECK (true);

-- Allow public read access to likes and views for counting
CREATE POLICY "Allow public read access to likes" ON public.artwork_likes
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to views" ON public.artwork_views
    FOR SELECT USING (true);

-- Insert some sample data (optional)
INSERT INTO public.artworks (title, artist, description, image_url, tags, likes, views, width, height) VALUES
('Ocean Dreams', 'Sarah Chen', 'A mesmerizing piece capturing the fluid motion of ocean waves in abstract form.', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop&crop=center', ARRAY['Abstract', 'Blue', 'Water'], 234, 1205, 400, 600),
('Urban Symphony', 'Marcus Rodriguez', 'Contemporary street art meets digital manipulation in this vibrant urban landscape.', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=500&fit=crop&crop=center', ARRAY['Street Art', 'Urban', 'Colorful'], 456, 2301, 400, 500),
('Mountain Bridge', 'Emma Thompson', 'A stunning concrete bridge overlooking waterfalls during golden hour.', 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=650&fit=crop&crop=center', ARRAY['Nature', 'Landscape', 'Architecture'], 189, 987, 400, 650);

-- Insert some sample tags
INSERT INTO public.tags (name, color, usage_count) VALUES
('Nature', '#10b981', 8),
('Landscape', '#059669', 6),
('Abstract', '#8b5cf6', 3),
('Urban', '#ef4444', 2),
('Street Art', '#f97316', 2),
('Blue', '#3b82f6', 1),
('Water', '#06b6d4', 1),
('Colorful', '#ec4899', 1);

-- Create storage bucket for artwork images (run this after the tables are created)
-- You'll need to run this separately in the Supabase dashboard or via the storage API
-- INSERT INTO storage.buckets (id, name, public) VALUES ('artwork-images', 'artwork-images', true);

-- Storage policies for artwork images bucket
-- CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'artwork-images');
-- CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'artwork-images' AND auth.role() = 'authenticated');
-- CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE USING (bucket_id = 'artwork-images' AND auth.role() = 'authenticated');
-- CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE USING (bucket_id = 'artwork-images' AND auth.role() = 'authenticated');