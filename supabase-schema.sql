-- Create the artworks table
CREATE TABLE artworks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    width INTEGER DEFAULT 400,
    height INTEGER DEFAULT 600,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster sorting
CREATE INDEX idx_artworks_created_at ON artworks(created_at DESC);

-- Create an index on tags for faster filtering
CREATE INDEX idx_artworks_tags ON artworks USING GIN(tags);

-- Function to increment views
CREATE OR REPLACE FUNCTION increment_views(artwork_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE artworks 
    SET views = views + 1, updated_at = NOW()
    WHERE id = artwork_id;
END;
$$ LANGUAGE plpgsql;

-- Function to toggle likes (increment if not liked, decrement if liked)
-- Note: In a real app, you'd want a separate likes table to track which users liked what
CREATE OR REPLACE FUNCTION toggle_like(artwork_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE artworks 
    SET likes = likes + 1, updated_at = NOW()
    WHERE id = artwork_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (optional but recommended)
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read artworks
CREATE POLICY "Allow public read access" ON artworks
    FOR SELECT USING (true);

-- Create a policy that allows anyone to insert artworks (you might want to restrict this)
CREATE POLICY "Allow public insert" ON artworks
    FOR INSERT WITH CHECK (true);

-- Create a policy that allows anyone to update artworks (you might want to restrict this)
CREATE POLICY "Allow public update" ON artworks
    FOR UPDATE USING (true);

-- Create a policy that allows anyone to delete artworks (you might want to restrict this)
CREATE POLICY "Allow public delete" ON artworks
    FOR DELETE USING (true);

-- Insert sample data (optional)
INSERT INTO artworks (title, artist, description, image_url, tags, likes, views, width, height) VALUES
('Ocean Dreams', 'Sarah Chen', 'A mesmerizing piece capturing the fluid motion of ocean waves in abstract form.', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop&crop=center', ARRAY['Abstract', 'Blue', 'Water'], 234, 1205, 400, 600),
('Urban Symphony', 'Marcus Rodriguez', 'Contemporary street art meets digital manipulation in this vibrant urban landscape.', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=500&fit=crop&crop=center', ARRAY['Street Art', 'Urban', 'Colorful'], 456, 2301, 400, 500),
('Mountain Bridge', 'Emma Thompson', 'A stunning concrete bridge overlooking waterfalls during golden hour.', 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=650&fit=crop&crop=center', ARRAY['Nature', 'Landscape', 'Architecture'], 189, 987, 400, 650),
('Starry Night Vista', 'Alex Kim', 'A breathtaking view of stars scattered across the night sky above silhouetted mountains.', 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop&crop=center', ARRAY['Night', 'Stars', 'Mountains'], 423, 2001, 400, 600),
('Forest Sunbeam', 'Riley Park', 'Dramatic sunbeam piercing through dense forest canopy, creating magical atmosphere.', 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=600&fit=crop&crop=center', ARRAY['Forest', 'Sunbeam', 'Nature'], 445, 2234, 400, 600);