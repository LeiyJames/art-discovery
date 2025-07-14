import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import heroArtwork from '@/assets/hero-artwork.jpg';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = heroArtwork;
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroArtwork}
          alt="Featured Artwork"
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-wide">
            Art Canvas Explore
          </h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#gallery" className="hover:text-white/80 transition-colors">
              Gallery
            </a>
            <a href="#explore" className="hover:text-white/80 transition-colors">
              Explore
            </a>
            <a href="#upload" className="hover:text-white/80 transition-colors">
              Upload
            </a>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              Discover
              <span className="block font-semibold">
                Extraordinary Art
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore a curated collection of stunning artwork from talented artists around the world
            </p>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              Explore Gallery
            </Button>
          </div>
        </div>

        {/* Featured Artwork Info */}
        <div className="flex items-end justify-between">
          <div className="animate-slide-up">
            <p className="text-sm text-white/70 mb-2">Featured Artwork</p>
            <h3 className="text-xl font-medium mb-1">Flowing Abstractions</h3>
            <p className="text-white/80">by Digital Artist</p>
          </div>
          
          {/* Scroll Indicator */}
          <div className="hidden lg:flex flex-col items-center animate-pulse">
            <span className="text-sm text-white/70 mb-2">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 text-white/70" />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-muted-foreground mt-4">Loading gallery...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;