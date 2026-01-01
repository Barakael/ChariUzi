'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HotelCard } from '@/components/hotel-card';

const mockHotels = [
  {
    name: 'Luxury Beach Resort',
    description: 'Experience ultimate luxury by the sea with world-class amenities',
    location: 'Maldives',
    image_url: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg',
    rating: 4.9,
    price_per_night: 450,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'],
    featured: true,
  },
  {
    name: 'Mountain View Hotel',
    description: 'Alpine charm with modern comfort and breathtaking views',
    location: 'Swiss Alps',
    image_url: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
    rating: 4.8,
    price_per_night: 380,
    amenities: ['Sauna', 'Restaurant', 'WiFi', 'Parking'],
    featured: true,
  },
  {
    name: 'Calm Elegance',
    description: 'Sophisticated city living in the heart of the capital',
    location: 'Paris',
    image_url: 'https://images.pexels.com/photos/5531378/pexels-photo-5531378.jpeg',
    rating: 4.7,
    price_per_night: 320,
    amenities: ['Concierge', 'Gym', 'Restaurant', 'WiFi'],
    featured: true,
  },
  {
    name: 'Tropical Paradise',
    description: 'Exotic island retreat with pristine beaches and water sports',
    location: 'Bali',
    image_url: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    rating: 4.8,
    price_per_night: 280,
    amenities: ['Beach', 'Water Sports', 'Spa', 'Restaurant'],
    featured: true,
  },
  {
    name: 'Historic Grand Hotel',
    description: 'Colonial elegance with modern conveniences and rich heritage',
    location: 'Rome',
    image_url: 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg',
    rating: 4.6,
    price_per_night: 290,
    amenities: ['Historical Tours', 'Restaurant', 'WiFi', 'Concierge'],
    featured: true,
  },
  {
    name: 'Nordic Comfort',
    description: 'Cozy Scandinavian design with authentic Nordic hospitality',
    location: 'Stockholm',
    image_url: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg',
    rating: 4.7,
    price_per_night: 350,
    amenities: ['Sauna', 'Nordic Spa', 'Restaurant', 'WiFi'],
    featured: true,
  },
];

export default function HotelsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-24 bg-gradient-to-b from-blue-100 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h1 className="text-5xl font-bold text-blue-900 mb-4">Our Featured Hotels</h1>
            <p className="text-xl text-[#636B2F] max-w-2xl mx-auto">
              Discover luxury accommodations across the world's most beautiful destinations
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockHotels.map((hotel) => (
              <HotelCard key={hotel.name} {...hotel} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
