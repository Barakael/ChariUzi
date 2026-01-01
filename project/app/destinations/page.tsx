'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PlaceCard } from '@/components/place-card';

const mockPlaces = [
  {
    name: 'Bali',
    description: 'Tropical paradise with ancient temples and pristine beaches',
    location: 'Indonesia',
    image_url: 'https://wearezanzibar.com/cdn-cgi/image/w=1280,f=avif/https://a.storyblok.com/f/301902/678x1205/89e57f5cae/1cab5ac7-9ced-42ce-bb34-f8ae2b2dc1cb.jpeg',
    views: 1500,
    category: 'Beach',
  },
  {
    name: 'Tokyo',
    description: 'Vibrant city blending tradition and cutting-edge technology',
    location: 'Japan',
    image_url: 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg',
    views: 2300,
    category: 'Urban',
  },
  {
    name: 'Iceland',
    description: 'Land of fire and ice with stunning natural landscapes',
    location: 'Iceland',
    image_url: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg',
    views: 1800,
    category: 'Adventure',
  },
  {
    name: 'Greece',
    description: 'Ancient history meets Mediterranean beauty and culture',
    location: 'Greece',
    image_url: 'https://images.pexels.com/photos/1321556/pexels-photo-1321556.jpeg',
    views: 2100,
    category: 'Cultural',
  },
  {
    name: 'Swiss Alps',
    description: 'Mountain majesty with world-class skiing and hiking trails',
    location: 'Switzerland',
    image_url: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
    views: 1600,
    category: 'Adventure',
  },
  {
    name: 'Maldives',
    description: 'Tropical island chains with crystal clear turquoise waters',
    location: 'Maldives',
    image_url: 'https://images.pexels.com/photos/1631984/pexels-photo-1631984.jpeg',
    views: 1900,
    category: 'Beach',
  },
  {
    name: 'Paris',
    description: 'The City of Light with iconic monuments and art museums',
    location: 'France',
    image_url: 'https://images.pexels.com/photos/1282127/pexels-photo-1282127.jpeg',
    views: 2700,
    category: 'Cultural',
  },
  {
    name: 'Bangkok',
    description: 'Exotic city with temples, markets, and vibrant street life',
    location: 'Thailand',
    image_url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
    views: 2000,
    category: 'Urban',
  },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-emerald-800 mb-4">Popular Destinations</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore breathtaking locations and discover your next adventure
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPlaces.map((place) => (
              <PlaceCard key={place.name} {...place} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
