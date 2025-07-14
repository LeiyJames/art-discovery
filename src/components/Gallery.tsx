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

// Mock data with diverse artwork
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
    title: 'Mountain Bridge',
    artist: 'Emma Thompson',
    description: 'A stunning concrete bridge overlooking waterfalls during golden hour.',
    imageUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=650&fit=crop&crop=center',
    tags: ['Nature', 'Landscape', 'Architecture'],
    likes: 189,
    views: 987,
    width: 400,
    height: 650
  },
  {
    id: '4',
    title: 'Orange Blossoms',
    artist: 'Alex Kim',
    description: 'Delicate orange flowers captured in perfect natural lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop&crop=center',
    tags: ['Flowers', 'Nature', 'Botanical'],
    likes: 334,
    views: 1654,
    width: 400,
    height: 400
  },
  {
    id: '5',
    title: 'Mountain River',
    artist: 'Riley Park',
    description: 'A serene river flowing between majestic mountains under cloudy skies.',
    imageUrl: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=700&fit=crop&crop=center',
    tags: ['Landscape', 'River', 'Mountains'],
    likes: 567,
    views: 2890,
    width: 400,
    height: 700
  },
  {
    id: '6',
    title: 'Pine Forest',
    artist: 'Jordan Lee',
    description: 'Towering pine trees creating a natural cathedral of green.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=550&fit=crop&crop=center',
    tags: ['Forest', 'Trees', 'Nature'],
    likes: 298,
    views: 1432,
    width: 400,
    height: 550
  },
  {
    id: '7',
    title: 'Forest Light',
    artist: 'Maya Singh',
    description: 'Sunbeams filtering through dense forest canopy creating magical atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=600&fit=crop&crop=center',
    tags: ['Forest', 'Light', 'Atmospheric'],
    likes: 445,
    views: 2156,
    width: 400,
    height: 600
  },
  {
    id: '8',
    title: 'Golden Forest',
    artist: 'David Park',
    description: 'Warm sunlight creating magical patterns through green leaves.',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=500&fit=crop&crop=center',
    tags: ['Forest', 'Golden', 'Sunlight'],
    likes: 378,
    views: 1789,
    width: 400,
    height: 500
  },
  {
    id: '9',
    title: 'Sunrise Mountains',
    artist: 'Lisa Wang',
    description: 'Dramatic mountain landscape illuminated by golden sunrise rays.',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=650&fit=crop&crop=center',
    tags: ['Mountains', 'Sunrise', 'Dramatic'],
    likes: 512,
    views: 2734,
    width: 400,
    height: 650
  },
  {
    id: '10',
    title: 'Starry Night',
    artist: 'Carlos Martinez',
    description: 'A breathtaking view of stars scattered across the night sky.',
    imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop&crop=center',
    tags: ['Night', 'Stars', 'Sky'],
    likes: 423,
    views: 2001,
    width: 400,
    height: 600
  },
  {
    id: '11',
    title: 'Misty Peak',
    artist: 'Anna Schmidt',
    description: 'A foggy mountain summit shrouded in mysterious mist.',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=500&fit=crop&crop=center',
    tags: ['Mountains', 'Fog', 'Mystery'],
    likes: 356,
    views: 1654,
    width: 400,
    height: 500
  },
  {
    id: '12',
    title: 'Ocean Wave',
    artist: 'Tom Wilson',
    description: 'Powerful ocean waves crashing at a pristine beach.',
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop&crop=center',
    tags: ['Ocean', 'Waves', 'Beach'],
    likes: 489,
    views: 2345,
    width: 400,
    height: 600
  },
  {
    id: '13',
    title: 'Alpine Vista',
    artist: 'Sophie Brown',
    description: 'Panoramic view of snow-capped alpine peaks.',
    imageUrl: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=400&h=700&fit=crop&crop=center',
    tags: ['Alps', 'Snow', 'Panoramic'],
    likes: 612,
    views: 3102,
    width: 400,
    height: 700
  },
  {
    id: '14',
    title: 'Rocky Canyon',
    artist: 'Jake Thompson',
    description: 'A winding river carved through ancient rock formations.',
    imageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=450&fit=crop&crop=center',
    tags: ['Canyon', 'River', 'Rock'],
    likes: 267,
    views: 1456,
    width: 400,
    height: 450
  },
  {
    id: '15',
    title: 'Desert Dunes',
    artist: 'Mia Johnson',
    description: 'Endless sand dunes creating mesmerizing patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=400&h=500&fit=crop&crop=center',
    tags: ['Desert', 'Sand', 'Patterns'],
    likes: 334,
    views: 1789,
    width: 400,
    height: 500
  },
  {
    id: '16',
    title: 'Forest Sunbeam',
    artist: 'Ryan Davis',
    description: 'Dramatic sunbeam piercing through dense forest.',
    imageUrl: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=600&fit=crop&crop=center',
    tags: ['Forest', 'Sunbeam', 'Dramatic'],
    likes: 445,
    views: 2234,
    width: 400,
    height: 600
  },
  {
    id: '17',
    title: 'Twilight Forest',
    artist: 'Elena Garcia',
    description: 'Golden lights dancing between trees at twilight.',
    imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=550&fit=crop&crop=center',
    tags: ['Forest', 'Twilight', 'Golden'],
    likes: 389,
    views: 1923,
    width: 400,
    height: 550
  },
  {
    id: '18',
    title: 'Lake Reflection',
    artist: 'Michael Chang',
    description: 'Perfect reflections of trees in a crystal-clear mountain lake.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=650&fit=crop&crop=center',
    tags: ['Lake', 'Reflection', 'Trees'],
    likes: 523,
    views: 2678,
    width: 400,
    height: 650
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
      <section className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-light mb-4">Gallery</h2>
            <p className="text-xl text-muted-foreground">Loading amazing artwork...</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6 px-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid bg-muted rounded-lg overflow-hidden animate-pulse"
                style={{ height: `${Math.random() * 300 + 200}px` }}
              >
                <div className="w-full h-full bg-muted-foreground/20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">Gallery</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing artwork from talented artists worldwide
          </p>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <div className="max-w-6xl mx-auto mb-8 sm:mb-12 animate-slide-up px-4">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 shadow-lg">
            {/* Search Bar */}
            <div className="relative mb-4 sm:mb-6">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 sm:h-5 w-4 sm:w-5" />
              <Input
                placeholder="Search artworks, artists, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 sm:pl-12 pr-10 sm:pr-4 py-2 sm:py-3 text-base sm:text-lg bg-background/50 border-border/50 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
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
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 sm:gap-6 space-y-4 sm:space-y-6 px-4">
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
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop`;
                      }}
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
              
              <DialogContent className="max-w-6xl w-[95vw] sm:w-full p-0 max-h-[90vh] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
                  <div className="relative h-64 sm:h-80 md:h-full">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop`;
                      }}
                    />
                  </div>
                  
                  <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold mb-2">{artwork.title}</h3>
                      <p className="text-muted-foreground text-base sm:text-lg">by {artwork.artist}</p>
                    </div>
                    
                    <p className="text-foreground leading-relaxed text-sm sm:text-base">{artwork.description}</p>
                    
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
                    
                    <div className="flex items-center space-x-4 sm:space-x-6 pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground" />
                        <span className="text-muted-foreground text-sm sm:text-base">{artwork.likes} likes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground" />
                        <span className="text-muted-foreground text-sm sm:text-base">{artwork.views} views</span>
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