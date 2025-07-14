import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, Settings, Image } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <Image className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ArtGallery</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <Link to="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Back to Gallery
                </Button>
              </Link>
            ) : (
              <Link to="/admin">
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Admin Panel
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation