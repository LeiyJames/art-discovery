import { useState } from 'react'
import { Pencil, Trash2, Plus, Eye, Heart, Calendar, User, Tag } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import { useArtworks, useCreateArtwork, useUpdateArtwork, useDeleteArtwork, type Artwork, type ArtworkInput } from '@/hooks/useArtworks'
import { useToast } from '@/hooks/use-toast'

interface ArtworkFormData extends ArtworkInput {
  tagsInput: string
}

const Admin = () => {
  const { data: artworks = [], isLoading, error } = useArtworks()
  const createArtwork = useCreateArtwork()
  const updateArtwork = useUpdateArtwork()
  const deleteArtwork = useDeleteArtwork()
  const { toast } = useToast()
  
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  
  const [formData, setFormData] = useState<ArtworkFormData>({
    title: '',
    artist: '',
    description: '',
    image_url: '',
    tagsInput: '',
    width: 400,
    height: 600,
  })

  const resetForm = () => {
    setFormData({
      title: '',
      artist: '',
      description: '',
      image_url: '',
      tagsInput: '',
      width: 400,
      height: 600,
    })
  }

  const handleInputChange = (field: keyof ArtworkFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.artist || !formData.image_url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const tags = formData.tagsInput
      ? formData.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
      : []

    const artworkData: ArtworkInput = {
      title: formData.title,
      artist: formData.artist,
      description: formData.description,
      image_url: formData.image_url,
      tags,
      width: formData.width,
      height: formData.height,
    }

    try {
      if (editingArtwork) {
        await updateArtwork.mutateAsync({ id: editingArtwork.id, updates: artworkData })
        setIsEditDialogOpen(false)
        setEditingArtwork(null)
      } else {
        await createArtwork.mutateAsync(artworkData)
        setIsCreateDialogOpen(false)
      }
      resetForm()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork)
    setFormData({
      title: artwork.title,
      artist: artwork.artist,
      description: artwork.description,
      image_url: artwork.image_url,
      tagsInput: artwork.tags.join(', '),
      width: artwork.width,
      height: artwork.height,
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteArtwork.mutateAsync(id)
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const ArtworkForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Artwork title"
            required
          />
        </div>
        <div>
          <Label htmlFor="artist">Artist *</Label>
          <Input
            id="artist"
            value={formData.artist}
            onChange={(e) => handleInputChange('artist', e.target.value)}
            placeholder="Artist name"
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="image_url">Image URL *</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => handleInputChange('image_url', e.target.value)}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Artwork description"
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tagsInput}
          onChange={(e) => handleInputChange('tagsInput', e.target.value)}
          placeholder="Abstract, Blue, Water"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="width">Width (px)</Label>
          <Input
            id="width"
            type="number"
            value={formData.width}
            onChange={(e) => handleInputChange('width', parseInt(e.target.value) || 400)}
            min="100"
          />
        </div>
        <div>
          <Label htmlFor="height">Height (px)</Label>
          <Input
            id="height"
            type="number"
            value={formData.height}
            onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 600)}
            min="100"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            resetForm()
            setIsCreateDialogOpen(false)
            setIsEditDialogOpen(false)
            setEditingArtwork(null)
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={createArtwork.isPending || updateArtwork.isPending}>
          {editingArtwork ? 'Update' : 'Create'} Artwork
        </Button>
      </div>
    </form>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading artworks...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading artworks: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your gallery artworks</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Artwork
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Artwork</DialogTitle>
              </DialogHeader>
              <ArtworkForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={artwork.image_url}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Dialog open={isEditDialogOpen && editingArtwork?.id === artwork.id} onOpenChange={(open) => {
                    setIsEditDialogOpen(open)
                    if (!open) {
                      setEditingArtwork(null)
                      resetForm()
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(artwork)}
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Artwork</DialogTitle>
                      </DialogHeader>
                      <ArtworkForm />
                    </DialogContent>
                  </Dialog>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Artwork</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{artwork.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(artwork.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{artwork.title}</CardTitle>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-3 h-3 mr-1" />
                  {artwork.artist}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700 line-clamp-2">{artwork.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {artwork.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="w-2 h-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {artwork.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{artwork.tags.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {artwork.likes}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {artwork.views}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(artwork.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  {artwork.width} × {artwork.height}px
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {artworks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No artworks found</div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Artwork
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Artwork</DialogTitle>
                </DialogHeader>
                <ArtworkForm />
              </DialogContent>
            </Dialog>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default Admin