import { Heart, Instagram, Twitter, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Art Canvas Explore
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover and share amazing artwork from talented artists worldwide. A platform for creativity and inspiration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Explore</h4>
            <nav className="space-y-2">
              <a href="#gallery" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Gallery
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Featured Artists
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Collections
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Trending
              </a>
            </nav>
          </div>

          {/* Community Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Community</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Join Artists
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Guidelines
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Blog
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Events
              </a>
            </nav>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Support</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Help Center
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Contact Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Terms of Service
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <p className="text-muted-foreground text-sm text-center sm:text-left">
            © 2024 Art Canvas Explore. Made with <Heart className="inline h-4 w-4 text-red-500 mx-1" /> for artists worldwide.
          </p>
          <p className="text-muted-foreground text-sm">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;