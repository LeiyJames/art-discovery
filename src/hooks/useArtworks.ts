import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export interface Artwork {
  id: string
  title: string
  artist: string
  description: string
  image_url: string
  tags: string[]
  likes: number
  views: number
  width: number
  height: number
  created_at: string
  updated_at: string
}

export interface ArtworkInput {
  title: string
  artist: string
  description: string
  image_url: string
  tags?: string[]
  width?: number
  height?: number
}

export const useArtworks = () => {
  return useQuery({
    queryKey: ['artworks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        throw new Error(error.message)
      }
      
      return data as Artwork[]
    }
  })
}

export const useCreateArtwork = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (artwork: ArtworkInput) => {
      const { data, error } = await supabase
        .from('artworks')
        .insert([artwork])
        .select()
        .single()
      
      if (error) {
        throw new Error(error.message)
      }
      
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] })
      toast({
        title: "Success",
        description: "Artwork uploaded successfully!",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  })
}

export const useUpdateArtwork = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<ArtworkInput> }) => {
      const { data, error } = await supabase
        .from('artworks')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        throw new Error(error.message)
      }
      
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] })
      toast({
        title: "Success",
        description: "Artwork updated successfully!",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  })
}

export const useDeleteArtwork = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', id)
      
      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] })
      toast({
        title: "Success",
        description: "Artwork deleted successfully!",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  })
}

export const useIncrementViews = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.rpc('increment_views', { artwork_id: id })
      
      if (error) {
        console.error('Error incrementing views:', error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] })
    }
  })
}

export const useToggleLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.rpc('toggle_like', { artwork_id: id })
      
      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks'] })
    }
  })
}