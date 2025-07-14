import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface TagData {
  id: string;
  name: string;
  count: number;
  color?: string;
}

const TagManager = () => {
  const [tags, setTags] = useState<TagData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<TagData | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3b82f6');

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockTags: TagData[] = [
      { id: '1', name: 'Nature', count: 8, color: '#10b981' },
      { id: '2', name: 'Landscape', count: 6, color: '#059669' },
      { id: '3', name: 'Forest', count: 5, color: '#047857' },
      { id: '4', name: 'Mountains', count: 4, color: '#065f46' },
      { id: '5', name: 'Abstract', count: 3, color: '#8b5cf6' },
      { id: '6', name: 'Urban', count: 2, color: '#ef4444' },
      { id: '7', name: 'Street Art', count: 2, color: '#f97316' },
      { id: '8', name: 'Blue', count: 1, color: '#3b82f6' },
      { id: '9', name: 'Water', count: 1, color: '#06b6d4' },
      { id: '10', name: 'Colorful', count: 1, color: '#ec4899' }
    ];
    setTags(mockTags);
  }, []);

  const handleCreateTag = () => {
    setEditingTag(null);
    setNewTagName('');
    setNewTagColor('#3b82f6');
    setIsDialogOpen(true);
  };

  const handleEditTag = (tag: TagData) => {
    setEditingTag(tag);
    setNewTagName(tag.name);
    setNewTagColor(tag.color || '#3b82f6');
    setIsDialogOpen(true);
  };

  const handleDeleteTag = (tagId: string) => {
    if (confirm('Are you sure you want to delete this tag? This will remove it from all artworks.')) {
      setTags(prev => prev.filter(tag => tag.id !== tagId));
    }
  };

  const handleSaveTag = () => {
    if (!newTagName.trim()) return;

    if (editingTag) {
      // Update existing tag
      setTags(prev => prev.map(tag =>
        tag.id === editingTag.id
          ? { ...tag, name: newTagName.trim(), color: newTagColor }
          : tag
      ));
    } else {
      // Create new tag
      const newTag: TagData = {
        id: Date.now().toString(),
        name: newTagName.trim(),
        count: 0,
        color: newTagColor
      };
      setTags(prev => [...prev, newTag]);
    }

    setIsDialogOpen(false);
    setNewTagName('');
    setNewTagColor('#3b82f6');
    setEditingTag(null);
  };

  const sortedTags = [...tags].sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Tag Management</h2>
          <p className="text-muted-foreground">Organize and manage your artwork tags</p>
        </div>
        <Button onClick={handleCreateTag} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Tag
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tags.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sortedTags[0]?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              {sortedTags[0]?.count || 0} artworks
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tags.reduce((sum, tag) => sum + tag.count, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            All Tags
          </CardTitle>
          <CardDescription>Manage your gallery tags and their usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <div>
                    <div className="font-medium">{tag.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {tag.count} artwork{tag.count !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEditTag(tag)}
                    className="h-8 w-8"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteTag(tag.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {tags.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tags found.</p>
              <Button variant="outline" onClick={handleCreateTag} className="mt-2">
                Create your first tag
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Tag Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTag ? 'Edit Tag' : 'Create New Tag'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tagName">Tag Name</Label>
              <Input
                id="tagName"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Enter tag name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tagColor">Tag Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  id="tagColor"
                  type="color"
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  className="w-12 h-10 border rounded cursor-pointer"
                />
                <Input
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  placeholder="#3b82f6"
                />
              </div>
            </div>
            
            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <Badge 
                variant="secondary" 
                style={{ 
                  backgroundColor: newTagColor + '20',
                  color: newTagColor,
                  borderColor: newTagColor + '40'
                }}
              >
                {newTagName || 'Tag Preview'}
              </Badge>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTag} disabled={!newTagName.trim()}>
                {editingTag ? 'Update Tag' : 'Create Tag'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TagManager;