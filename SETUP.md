# Photo Gallery Setup Guide

This guide will help you set up a complete photo gallery application with an admin interface and Supabase backend.

## Features

### Frontend (Public Gallery)
- 📸 View artwork gallery in beautiful masonry layout
- 🔍 Search artworks by title, artist, or description
- 🏷️ Filter by tags
- ❤️ Like artworks
- 👁️ View count tracking
- 📱 Responsive design
- ⬆️ Upload-only functionality for visitors

### Admin Panel
- ➕ Create new artworks
- ✏️ Edit existing artworks
- 🗑️ Delete artworks
- 📊 View artwork statistics (likes, views, creation date)
- 🏷️ Manage tags
- 📝 Full CRUD operations

### Backend (Supabase)
- 🗄️ PostgreSQL database
- 🔐 Row Level Security
- 📈 Real-time updates
- 🔧 Custom SQL functions for likes and views

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is sufficient)
- Basic knowledge of React and SQL

## Step 1: Clone and Install Dependencies

```bash
# Install dependencies
npm install

# The following packages are already added:
# - @supabase/supabase-js
# - React, TypeScript, Vite
# - ShadCN UI components
# - TanStack Query for data fetching
```

## Step 2: Set Up Supabase

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up for an account
3. Create a new project
4. Wait for the project to be initialized

### 2.2 Set Up the Database

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase-schema.sql` from this project
3. Paste it into the SQL Editor and run it

This will create:
- `artworks` table with all necessary columns
- Indexes for better performance
- SQL functions for likes and views
- Row Level Security policies
- Sample data to get started

### 2.3 Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy your Project URL and anon/public key

## Step 3: Environment Configuration

1. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

2. Fill in your Supabase credentials in `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Step 4: Run the Application

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Step 5: Access the Admin Panel

Navigate to `http://localhost:5173/admin` to access the admin interface where you can:
- Add new artworks
- Edit existing artworks
- Delete artworks
- View detailed statistics

## Application Structure

```
src/
├── components/
│   ├── Gallery.tsx          # Main gallery view
│   ├── UploadSection.tsx    # Upload functionality
│   ├── Hero.tsx             # Hero section
│   ├── Footer.tsx           # Footer component
│   └── ui/                  # ShadCN UI components
├── hooks/
│   └── useArtworks.ts       # Custom hooks for Supabase operations
├── lib/
│   └── supabase.ts          # Supabase client configuration
├── pages/
│   ├── Index.tsx            # Main page
│   ├── Admin.tsx            # Admin dashboard
│   └── NotFound.tsx         # 404 page
└── App.tsx                  # Main app component with routing
```

## Database Schema

The `artworks` table includes:

- `id` (UUID, Primary Key)
- `title` (Text, Required)
- `artist` (Text, Required)
- `description` (Text, Optional)
- `image_url` (Text, Required)
- `tags` (Text Array)
- `likes` (Integer, Default: 0)
- `views` (Integer, Default: 0)
- `width` (Integer, Default: 400)
- `height` (Integer, Default: 600)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Custom SQL Functions

### `increment_views(artwork_id UUID)`
Increments the view count for an artwork when it's clicked.

### `toggle_like(artwork_id UUID)`
Increments the like count for an artwork. In a production app, you'd want to track which users liked what to prevent multiple likes.

## Image Handling

Currently, the application accepts image URLs. For production use, you might want to:

1. **Set up Supabase Storage** for file uploads
2. **Implement image upload** to Supabase Storage
3. **Add image optimization** and resize functionality
4. **Implement CDN** for better performance

## Security Considerations

The current setup allows public read/write access to the artworks table. For production:

1. **Implement authentication** (Supabase Auth)
2. **Restrict admin operations** to authenticated users
3. **Add user roles** (admin vs regular user)
4. **Implement proper RLS policies**

Example RLS policy for admin-only operations:
```sql
-- Only allow authenticated users to insert/update/delete
CREATE POLICY "Admin only write access" ON artworks
    FOR ALL USING (auth.role() = 'authenticated');
```

## Customization

### Adding New Fields
To add new fields to artworks:

1. Update the database schema in Supabase
2. Update the TypeScript interfaces in `src/hooks/useArtworks.ts`
3. Update the forms in `src/pages/Admin.tsx` and `src/components/UploadSection.tsx`

### Styling
The application uses Tailwind CSS with ShadCN UI components. You can customize:

- Colors in `tailwind.config.ts`
- Component styles in the respective component files
- Global styles in `src/index.css`

## Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Make sure to add environment variables in your hosting platform

### Database
Your Supabase database is already hosted and will work with any frontend deployment.

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Make sure your `.env` file has the correct Supabase URL and key
   - Restart the development server after adding environment variables

2. **"Error loading gallery"**
   - Check if your Supabase project is running
   - Verify the database schema was created correctly
   - Check the browser console for detailed error messages

3. **Images not loading**
   - Verify the image URLs are accessible
   - Check if CORS is properly configured in your image hosting service

4. **Admin operations not working**
   - Check the RLS policies in your Supabase dashboard
   - Verify the database functions were created successfully

### Need Help?

1. Check the browser console for error messages
2. Check the Supabase dashboard for database errors
3. Verify your environment variables are correctly set
4. Make sure the database schema was created successfully

## Next Steps

- [ ] Add user authentication
- [ ] Implement file upload to Supabase Storage
- [ ] Add image resizing and optimization
- [ ] Create user profiles
- [ ] Add artwork comments and ratings
- [ ] Implement search with full-text search
- [ ] Add artwork categories
- [ ] Create a favorites system
- [ ] Add social sharing features
- [ ] Implement admin analytics dashboard

This setup provides a solid foundation for a photo gallery application that you can extend based on your specific needs!