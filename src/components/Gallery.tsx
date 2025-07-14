import { useState, useEffect } from 'react';
import { Search, Filter, Upload, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  description: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  views: number;
  width: number;
  height: number;
}

// Mock data for demonstration
const mockArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Ocean Dreams',
    artist: 'Sarah Chen',
    description: 'A mesmerizing piece capturing the fluid motion of ocean waves in abstract form.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop&crop=center',
    tags: ['Abstract', 'Blue', 'Water'],
    likes: 234,
    views: 1205,
    width: 400,
    height: 600
  },
  {
    id: '2',
    title: 'Urban Symphony',
    artist: 'Marcus Rodriguez',
    description: 'Contemporary street art meets digital manipulation in this vibrant urban landscape.',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=500&fit=crop&crop=center',
    tags: ['Street Art', 'Urban', 'Colorful'],
    likes: 456,
    views: 2301,
    width: 400,
    height: 500
  },
  {
    id: '3',
    title: 'Ethereal Botanics',
    artist: 'Emma Thompson',
    description: 'Delicate botanical forms rendered in soft, dreamlike colors.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=650&fit=crop&crop=center',
    tags: ['Nature', 'Botanical', 'Soft'],
    likes: 189,
    views: 987,
    width: 400,
    height: 650
  },
  {
    id: '4',
    title: 'Geometric Harmony',
    artist: 'Alex Kim',
    description: 'Precision and beauty unite in this exploration of geometric forms.',
    imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop&crop=center',
    tags: ['Geometric', 'Minimal', 'Pattern'],
    likes: 334,
    views: 1654,
    width: 400,
    height: 400
  },
  {
    id: '5',
    title: 'Digital Landscape',
    artist: 'Riley Park',
    description: 'A futuristic interpretation of natural landscapes through digital media.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=550&fit=crop&crop=center',
    tags: ['Digital', 'Landscape', 'Futuristic'],
    likes: 567,
    views: 2890,
    width: 400,
    height: 550
  },
  {
    id: '6',
    title: 'Warm Abstractions',
    artist: 'Jordan Lee',
    description: 'Warm colors flow together in this comforting abstract composition.',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=700&fit=crop&crop=center',
    tags: ['Abstract', 'Warm', 'Flow'],
    likes: 298,
    views: 1432,
    width: 400,
    height: 700
  }
];

const Gallery = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setArtworks(mockArtworks);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = 
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = selectedTag === '' || artwork.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(artworks.flatMap(artwork => artwork.tags)));

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted rounded-lg overflow-hidden animate-pulse"
              style={{ height: `${Math.random() * 200 + 300}px` }}
            >
              <div className="w-full h-full bg-muted-foreground/20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="gallery" className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-light mb-4">Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing artwork from talented artists worldwide
          </p>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <div className="max-w-6xl mx-auto mb-12 animate-slide-up">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search artworks, artists, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-background/50 border-border/50 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Filter Tags */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground mr-2">Filter by:</span>
                <Button
                  variant={selectedTag === '' ? 'default' : 'secondary'}
                  onClick={() => setSelectedTag('')}
                  size="sm"
                  className="rounded-full px-4 py-2 transition-all duration-200 hover:scale-105"
                >
                  All Tags
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'secondary'}
                    onClick={() => setSelectedTag(tag)}
                    size="sm"
                    className="rounded-full px-4 py-2 transition-all duration-200 hover:scale-105"
                  >
                    {tag}
                  </Button>
                ))}
              </div>

              {/* Upload Button */}
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Upload className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Upload Artwork
              </Button>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                {filteredArtworks.length === artworks.length 
                  ? `Showing all ${artworks.length} artworks`
                  : `Found ${filteredArtworks.length} of ${artworks.length} artworks`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredArtworks.map((artwork, index) => (
            <Dialog key={artwork.id}>
              <DialogTrigger asChild>
                <div 
                  className="group cursor-pointer break-inside-avoid animate-fade-in-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-auto object-cover"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    
                    {/* Hover Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex justify-end space-x-2">
                        <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1 text-white text-sm">
                          <Heart className="h-3 w-3" />
                          <span>{artwork.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1 text-white text-sm">
                          <Eye className="h-3 w-3" />
                          <span>{artwork.views}</span>
                        </div>
                      </div>
                      
                      <div className="text-white">
                        <h3 className="font-semibold text-lg mb-1">{artwork.title}</h3>
                        <p className="text-white/80">by {artwork.artist}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl w-full p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">{artwork.title}</h3>
                      <p className="text-muted-foreground text-lg">by {artwork.artist}</p>
                    </div>
                    
                    <p className="text-foreground leading-relaxed">{artwork.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {artwork.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-6 pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{artwork.likes} likes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{artwork.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {filteredArtworks.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No artworks found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchTerm('');
              setSelectedTag('');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;