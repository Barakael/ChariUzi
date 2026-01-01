'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { HeroCarousel } from '@/components/hero-carousel';
import { HotelCard } from '@/components/hotel-card';
import { PlaceCard } from '@/components/place-card';
import { Footer } from '@/components/footer';
import { ArrowRight } from 'lucide-react';

const mockSlides = [
  {
    id: '1',
    title: 'Discover Paradise',
    subtitle: 'Experience luxury like never before',
    image_url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    order_index: 0,
  },
  {
    id: '2',
    title: 'Tropical Getaway',
    subtitle: 'Relax on pristine beaches',
    image_url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
    order_index: 1,
  },
  {
    id: '3',
    title: 'Mountain Retreat',
    subtitle: 'Breathtaking views await',
    image_url: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg',
    order_index: 2,
  },
];

const mockHotels = [
  {
    name: 'Luxury Beach Resort',
    description: 'Experience ultimate luxury by the sea',
    location: 'Maldives',
    image_url: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
    rating: 4.9,
    price_per_night: 450,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'],
    featured: true,
  },
  {
    name: 'Mountain View Hotel',
    description: 'Alpine charm with modern comfort',
    location: 'Swiss Alps',
    image_url: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
    rating: 4.8,
    price_per_night: 380,
    amenities: ['Sauna', 'Restaurant', 'WiFi', 'Parking'],
    featured: true,
  },
  {
    name: 'Calm Elegance',
    description: 'Sophisticated city living',
    location: 'Paris',
    image_url: 'https://images.pexels.com/photos/5531378/pexels-photo-5531378.jpeg',
    rating: 4.7,
    price_per_night: 320,
    amenities: ['Concierge', 'Gym', 'Restaurant', 'WiFi'],
    featured: true,
  },
  {
    name: 'Tropical Paradise',
    description: 'Exotic island retreat with water sports',
    location: 'Bali',
    image_url: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    rating: 4.8,
    price_per_night: 280,
    amenities: ['Beach', 'Water Sports', 'Spa', 'Restaurant'],
    featured: true,
  },
];

const mockTours = [
  {
    name: 'Bali Adventure',
    description: 'Experience the magic of Bali with temple tours and local culture',
    location: 'Bali',
    image_url: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    views: 1500,
    category: 'Adventure',
  },
  {
    name: 'Tokyo Exploration',
    description: 'Discover modern and ancient Tokyo in one unforgettable journey',
    location: 'Japan',
    image_url: 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg',
    views: 2300,
    category: 'Urban',
  },
  {
    name: 'Iceland Discovery',
    description: 'Experience waterfalls, glaciers, and geysers in Iceland',
    location: 'Iceland',
    image_url: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg',
    views: 1800,
    category: 'Nature',
  },
  {
    name: 'Mediterranean Coast',
    description: 'Sail along stunning Mediterranean beaches and historic ruins',
    location: 'Greece',
    image_url: 'https://images.pexels.com/photos/1321556/pexels-photo-1321556.jpeg',
    views: 2100,
    category: 'Beach',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="">
        <HeroCarousel slides={mockSlides} />
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Featured Hotels</h2>
            <p className="text-xl text-gray-600">Discover luxury accommodations across the world</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockHotels.map((hotel) => (
              <HotelCard key={hotel.name} {...hotel} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Popular Tours</h2>
            <p className="text-xl text-gray-600">Explore breathtaking destinations around the world</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTours.map((tour) => (
              <PlaceCard key={tour.name} {...tour} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
