import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import ArtworkForm from './ArtworkForm';

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
  createdAt?: string;
}

// Mock data - in a real app, this would come from an API
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
    height: 600,
    createdAt: '2024-01-15'
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
    height: 500,
    createdAt: '2024-01-12'
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
    height: 650,
    createdAt: '2024-01-10'
  }
];

const ArtworkManager = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  useEffect(() => {
    setArtworks(mockArtworks);
  }, []);

  const filteredArtworks = artworks.filter(artwork =>
    artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artwork.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateArtwork = () => {
    setSelectedArtwork(null);
    setIsCreateMode(true);
    setIsFormOpen(true);
  };

  const handleEditArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsCreateMode(false);
    setIsFormOpen(true);
  };

  const handleDeleteArtwork = (artworkId: string) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      setArtworks(prev => prev.filter(artwork => artwork.id !== artworkId));
    }
  };

  const handleSaveArtwork = (artworkData: Partial<Artwork>) => {
    if (isCreateMode) {
      const newArtwork: Artwork = {
        id: Date.now().toString(),
        title: artworkData.title || '',
        artist: artworkData.artist || '',
        description: artworkData.description || '',
        imageUrl: artworkData.imageUrl || '',
        tags: artworkData.tags || [],
        likes: 0,
        views: 0,
        width: artworkData.width || 400,
        height: artworkData.height || 600,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setArtworks(prev => [newArtwork, ...prev]);
    } else if (selectedArtwork) {
      setArtworks(prev => prev.map(artwork =>
        artwork.id === selectedArtwork.id
          ? { ...artwork, ...artworkData }
          : artwork
      ));
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Artwork Management</h2>
          <p className="text-muted-foreground">Create, edit, and manage your gallery artworks</p>
        </div>
        <Button onClick={handleCreateArtwork} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Artwork
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search artworks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleEditArtwork(artwork)}
                  className="h-8 w-8 bg-background/80 hover:bg-background"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDeleteArtwork(artwork.id)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{artwork.title}</CardTitle>
              <CardDescription>by {artwork.artist}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {artwork.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {artwork.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {artwork.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {artwork.views}
                </div>
                <div className="text-xs">
                  {artwork.createdAt}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No artworks found.</p>
          {searchTerm && (
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              className="mt-2"
            >
              Clear search
            </Button>
          )}
        </div>
      )}

      {/* Artwork Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreateMode ? 'Create New Artwork' : 'Edit Artwork'}
            </DialogTitle>
          </DialogHeader>
          <ArtworkForm
            artwork={selectedArtwork}
            onSave={handleSaveArtwork}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtworkManager;