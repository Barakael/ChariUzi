'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HotelCard } from '@/components/hotel-card';
import { Button } from '@/components/ui/button';

const mockHotels = [
  // Guest Areas
  {
    name: 'Standard Room',
    description: 'Experience ultimate luxury by the sea with world-class amenities',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/35526989/pexels-photo-35526989.jpeg',
    rating: 4.9,
    price_per_night: 300,
    amenities: ['single bed','Free WiFi', 'flat screen TV', 'Air condition',],
    featured: true,
    category: 'Guest Areas',
    subCategory: 'Standard Rooms',
  },
  {
    name: 'Family room',
    description: 'Spacious family-friendly accommodations perfect for groups',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
    rating: 4.8,
    price_per_night: 380,
    amenities: ['Free WiFi', 'Parking'],
    featured: true,
    category: 'Guest Areas',
    subCategory: 'Family Rooms',
  },
  {
    name: 'VIP Room',
    description: 'Experience ultimate luxury by the sea with world-class amenities',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/35526997/pexels-photo-35526997.jpeg',
    rating: 4.9,
    price_per_night: 390,
    amenities: ['single bed','Free WiFi', 'flat screen TV', 'Air condition',],
    featured: true,
    category: 'Guest Areas',
    subCategory: 'Standard Rooms',
  },
  {
    name: 'VVIP room',
    description: 'Spacious family-friendly accommodations perfect for groups',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/14513797/pexels-photo-14513797.jpeg',
    rating: 4.8,
    price_per_night: 480,
    amenities: ['2 beds','flat screen TV','Free WiFi', 'Air condition'],
    featured: true,
    category: 'Guest Areas',
    subCategory: 'Family Rooms',
  },

  // Public Guest Spaces
  {
    name: 'Grand Reception area',
    description: 'Elegant reception area with world-class hospitality services',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg',
    rating: 4.6,
    price_per_night: 290,
    amenities: ['Free Wifi'],
    featured: true,
    category: 'Public Guest Spaces',
    subCategory: 'Reception Area',
  },
  {
    name: 'Business Center area',
    description: 'Modern business center with all connectivity and workspace amenities',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg',
    rating: 4.7,
    price_per_night: 350,
    amenities: ['Free Wifi'],
    featured: true,
    category: 'Public Guest Spaces',
    subCategory: 'Business Center',
  },

  // Food & Beverage Areas
  {
    name: 'Breakfast area',
    description: 'Buffet breakfast with fresh local and international cuisine',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
    rating: 4.9,
    price_per_night: 420,
    amenities: ['Free Wifi'],
    featured: true,
    category: 'Food & Beverage Areas',
    subCategory: 'Breakfast Area',
  },
  {
    name: 'Café Coffee Shop',
    description: 'Cozy café with artisan coffee and pastries throughout the day',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
    rating: 4.8,
    price_per_night: 360,
    amenities: ['Free Wifi'],
    featured: true,
    category: 'Food & Beverage Areas',
    subCategory: 'Café / Coffee Shop',
  },

  // Outdoor & External Areas
  {
    name: 'Parking Convenience areas',
    description: 'Secure parking with easy access to hotel facilities',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/5531378/pexels-photo-5531378.jpeg',
    rating: 4.7,
    price_per_night: 310,
    amenities: ['Free Wifi','Parking', 'Security',],
    featured: true,
    category: 'Outdoor & External Areas',
    subCategory: 'Parking Area',
  },
  {
    name: 'Garden area',
    description: 'Surrounded by lush tropical gardens and scenic landscaping',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    rating: 4.8,
    price_per_night: 370,
    amenities: ['Garden', 'Walking Trails', 'Free Wifi'],
    featured: true,
    category: 'Outdoor & External Areas',
    subCategory: 'Garden',
  },
  {
    name: 'Outdoor Seating area',
    description: 'Multiple outdoor seating areas with scenic views and fresh air',
    location: 'Uzi island, zanzibar',
    image_url: 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg',
    rating: 4.6,
    price_per_night: 300,
    amenities: ['Outdoor Seating', 'Free Wifi'],
    featured: true,
    category: 'Outdoor & External Areas',
    subCategory: 'Outdoor Seating',
  },
];

const categories = [
  'All',
  'Guest Areas',
  'Public Guest Spaces',
  'Food & Beverage Areas',
  'Outdoor & External Areas',
];

export default function HotelsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredHotels =
    activeCategory === 'All'
      ? mockHotels
      : mockHotels.filter((hotel) => hotel.category === activeCategory);

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24 bg-gradient-to-b from-blue-100 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-blue-900 ">Our Featured Hotels</h1>
            <p className="text-md text-emerald-800 max-w-2xl mx-auto">
              Discover luxury accommodations across the world's most beautiful destinations
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <section className="hidden md:flex py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? 'default' : 'outline'}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.name} {...hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No hotels found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
