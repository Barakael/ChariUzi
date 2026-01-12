# Chare Uzi Iland - Hotel & Tourism Website

A beautiful, modern hotel and tourism website built with Next.js, TypeScript, and Supabase.

## Features

- **Hero Carousel**: Stunning sliding hero section with beautiful tourism images and smooth animations
- **Hotel Showcase**: Display luxury hotels with ratings, amenities, and pricing
- **Popular Destinations**: Showcase most viewed tourism places with view counts
- **About Section**: Company information with motto, mission, vision, and statistics
- **Contact Section**: Beautiful contact form with company contact information
- **Responsive Design**: Fully responsive across all device sizes
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Color Scheme**: Elegant pale green and blue color palette

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## Getting Started

### 1. Set up Supabase

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Project Settings > API

### 2. Configure Environment Variables

Update the `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=room-images
```

Create a public Supabase Storage bucket matching `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` (default `room-images`) and enable "Public access" so uploaded room photos can be served directly.

### 3. Database Setup

The database schema has already been created with sample data including:
- Hero slides for the carousel
- Sample hotels with amenities and pricing
- Popular tourism destinations
- Company information

All tables are set up with Row Level Security (RLS) for public read access.

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Global styles
├── components/
│   ├── hero-carousel.tsx   # Hero slider component
│   ├── hotel-card.tsx      # Hotel display card
│   ├── place-card.tsx      # Tourism place card
│   ├── about-section.tsx   # About us section
│   ├── contact-section.tsx # Contact form section
│   ├── header.tsx          # Navigation header
│   ├── footer.tsx          # Footer component
│   └── ui/                 # shadcn/ui components
└── lib/
    └── supabase.ts         # Supabase client configuration
```

## Database Schema

### Tables

1. **hero_slides**: Carousel images with titles and subtitles
2. **hotels**: Hotel information, pricing, amenities, and ratings
3. **tourism_places**: Popular destinations with view counts
4. **company_info**: About us information and contact details

All tables have RLS enabled for secure public access.

## Customization

### Colors

The website uses a pale green and blue color scheme with:
- Primary green: `emerald-600` (Tailwind)
- Primary blue: `sky-600` (Tailwind)
- Gradients throughout for modern appeal

### Images

All images are sourced from Pexels. You can replace them with your own images by updating the `image_url` fields in the database.

### Content

Update content directly in your Supabase database:
- Modify hotel information in the `hotels` table
- Update tourism places in the `tourism_places` table
- Change company info in the `company_info` table
- Add/remove hero slides in the `hero_slides` table

## Building for Production

```bash
npm run build
npm run start
```

## License

This project is created for demonstration purposes.
