import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

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

interface ArtworkFormProps {
  artwork?: Artwork | null;
  onSave: (artwork: Partial<Artwork>) => void;
  onCancel: () => void;
}

const ArtworkForm = ({ artwork, onSave, onCancel }: ArtworkFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    description: '',
    imageUrl: '',
    width: 400,
    height: 600,
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (artwork) {
      setFormData({
        title: artwork.title,
        artist: artwork.artist,
        description: artwork.description,
        imageUrl: artwork.imageUrl,
        width: artwork.width,
        height: artwork.height,
        tags: [...artwork.tags]
      });
    } else {
      setFormData({
        title: '',
        artist: '',
        description: '',
        imageUrl: '',
        width: 400,
        height: 600,
        tags: []
      });
    }
  }, [artwork]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'width' || name === 'height' ? parseInt(value) || 0 : value
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter artwork title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="artist">Artist *</Label>
          <Input
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
            placeholder="Enter artist name"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter artwork description"
          rows={3}
        />
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL *</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleInputChange}
          placeholder="https://example.com/image.jpg"
          required
        />
        {formData.imageUrl && (
          <div className="mt-2">
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="max-w-xs max-h-48 object-cover rounded border"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="width">Width (px)</Label>
          <Input
            id="width"
            name="width"
            type="number"
            min="1"
            value={formData.width}
            onChange={handleInputChange}
            placeholder="400"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="height">Height (px)</Label>
          <Input
            id="height"
            name="height"
            type="number"
            min="1"
            value={formData.height}
            onChange={handleInputChange}
            placeholder="600"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Type a tag and press Enter"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {artwork ? 'Update Artwork' : 'Create Artwork'}
        </Button>
      </div>
    </form>
  );
};

export default ArtworkForm;