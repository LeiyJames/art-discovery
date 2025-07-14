import { useState, useEffect } from 'react';
import { Search, Filter, Upload, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useArtworks, useIncrementViews, useToggleLike, type Artwork } from '@/hooks/useArtworks';
import UploadSection from './UploadSection';

const Gallery = () => {
  const { data: artworks = [], isLoading, error } = useArtworks();
  const incrementViews = useIncrementViews();
  const toggleLike = useToggleLike();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Get unique tags from all artworks
  const allTags = Array.from(new Set(artworks.flatMap(artwork => artwork.tags)));

  // Filter artworks based on search and tag
  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || artwork.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleImageClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    incrementViews.mutate(artwork.id);
  };

  const handleLike = (artworkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike.mutate(artworkId);
  };

  const handleUpload = () => {
    setIsUploadOpen(true);
  };

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500 mb-4">Error loading gallery: {error.message}</div>
          <p className="text-gray-600">Please check your Supabase configuration and try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Art Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing artworks from talented artists around the world. Each piece tells a unique story.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by title, artist, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <Button onClick={handleUpload} className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Art
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading gallery...</div>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              {artworks.length === 0 ? 'No artworks available yet.' : 'No artworks match your search.'}
            </div>
            {artworks.length === 0 && (
              <Button onClick={handleUpload} className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload First Artwork
              </Button>
            )}
          </div>
        ) : (
          /* Masonry Grid */
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredArtworks.map((artwork) => (
              <div key={artwork.id} className="break-inside-avoid">
                <div
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
                  onClick={() => handleImageClick(artwork)}
                >
                  <div className="relative">
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ aspectRatio: `${artwork.width}/${artwork.height}` }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=${artwork.width}&h=${artwork.height}&fit=crop&crop=center`;
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                      <div className="w-full p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-semibold mb-1">{artwork.title}</h3>
                        <p className="text-sm text-gray-200 mb-2">by {artwork.artist}</p>
                        <p className="text-xs text-gray-300 line-clamp-2 mb-3">{artwork.description}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {artwork.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {artwork.tags.length > 3 && (
                            <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
                              +{artwork.tags.length - 3}
                            </span>
                          )}
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center justify-between">
                          <button
                            onClick={(e) => handleLike(artwork.id, e)}
                            className="flex items-center gap-1 hover:text-red-400 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{artwork.likes}</span>
                          </button>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{artwork.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Dialog */}
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <UploadSection onSuccess={() => setIsUploadOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Artwork Detail Modal */}
        <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedArtwork && (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedArtwork.image_url}
                    alt={selectedArtwork.title}
                    className="w-full h-auto max-h-96 object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedArtwork.title}</h3>
                  <p className="text-lg text-gray-600 mb-4">by {selectedArtwork.artist}</p>
                  <p className="text-gray-700 mb-4">{selectedArtwork.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedArtwork.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => handleLike(selectedArtwork.id, e)}
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{selectedArtwork.likes} likes</span>
                      </button>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{selectedArtwork.views} views</span>
                      </div>
                    </div>
                    <div>
                      {selectedArtwork.width} × {selectedArtwork.height}px
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;