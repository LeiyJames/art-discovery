import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Heart, Eye, Calendar, User } from 'lucide-react';

interface ArtworkStats {
  totalArtworks: number;
  totalLikes: number;
  totalViews: number;
  totalArtists: number;
  topArtworks: Array<{
    id: string;
    title: string;
    artist: string;
    likes: number;
    views: number;
  }>;
  recentArtworks: Array<{
    id: string;
    title: string;
    artist: string;
    createdAt: string;
  }>;
  popularTags: Array<{
    tag: string;
    count: number;
  }>;
}

const ArtworkStatistics = () => {
  const [stats, setStats] = useState<ArtworkStats>({
    totalArtworks: 0,
    totalLikes: 0,
    totalViews: 0,
    totalArtists: 0,
    topArtworks: [],
    recentArtworks: [],
    popularTags: []
  });

  useEffect(() => {
    // Mock statistics - in a real app, this would come from an API
    const mockStats: ArtworkStats = {
      totalArtworks: 18,
      totalLikes: 6890,
      totalViews: 34567,
      totalArtists: 12,
      topArtworks: [
        { id: '1', title: 'Alpine Vista', artist: 'Sophie Brown', likes: 612, views: 3102 },
        { id: '2', title: 'Mountain River', artist: 'Riley Park', likes: 567, views: 2890 },
        { id: '3', title: 'Lake Reflection', artist: 'Michael Chang', likes: 523, views: 2678 },
        { id: '4', title: 'Misty Peak', artist: 'Anna Schmidt', likes: 489, views: 2345 },
        { id: '5', title: 'Urban Symphony', artist: 'Marcus Rodriguez', likes: 456, views: 2301 }
      ],
      recentArtworks: [
        { id: '1', title: 'Ocean Dreams', artist: 'Sarah Chen', createdAt: '2024-01-15' },
        { id: '2', title: 'Urban Symphony', artist: 'Marcus Rodriguez', createdAt: '2024-01-12' },
        { id: '3', title: 'Mountain Bridge', artist: 'Emma Thompson', createdAt: '2024-01-10' },
        { id: '4', title: 'Starry Night', artist: 'Carlos Martinez', createdAt: '2024-01-08' },
        { id: '5', title: 'Forest Light', artist: 'Maya Singh', createdAt: '2024-01-05' }
      ],
      popularTags: [
        { tag: 'Nature', count: 8 },
        { tag: 'Landscape', count: 6 },
        { tag: 'Forest', count: 5 },
        { tag: 'Mountains', count: 4 },
        { tag: 'Abstract', count: 3 },
        { tag: 'Urban', count: 2 }
      ]
    };

    setStats(mockStats);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Statistics Overview</h2>
        <p className="text-muted-foreground">Track your gallery performance and engagement</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArtworks}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLikes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +180 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +2.1k from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artists</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArtists}</div>
            <p className="text-xs text-muted-foreground">
              +1 new this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Artworks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Performing Artworks
            </CardTitle>
            <CardDescription>Most liked and viewed artworks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topArtworks.map((artwork, index) => (
                <div key={artwork.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{artwork.title}</p>
                      <p className="text-sm text-muted-foreground">by {artwork.artist}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-3 w-3" />
                      {artwork.likes}
                      <Eye className="h-3 w-3 ml-2" />
                      {artwork.views}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Artworks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recently Added
            </CardTitle>
            <CardDescription>Latest artworks in your gallery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentArtworks.map((artwork) => (
                <div key={artwork.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{artwork.title}</p>
                    <p className="text-sm text-muted-foreground">by {artwork.artist}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(artwork.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Tags</CardTitle>
          <CardDescription>Most frequently used tags in your gallery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.popularTags.map((tagData) => (
              <div key={tagData.tag} className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{tagData.count}</div>
                <div className="text-sm text-muted-foreground">{tagData.tag}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtworkStatistics;