import { useState } from 'react';
import { Plus, BarChart3, Tags, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArtworkManager from '@/components/admin/ArtworkManager';
import ArtworkStatistics from '@/components/admin/ArtworkStatistics';
import TagManager from '@/components/admin/TagManager';

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">Manage your artwork gallery</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <a href="/">
                  ← Back to Gallery
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="artworks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="artworks" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Artworks
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-2">
              <Tags className="h-4 w-4" />
              Tags
            </TabsTrigger>
          </TabsList>

          <TabsContent value="artworks" className="space-y-6">
            <ArtworkManager />
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <ArtworkStatistics />
          </TabsContent>

          <TabsContent value="tags" className="space-y-6">
            <TagManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;