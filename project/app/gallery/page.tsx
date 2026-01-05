'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    title: 'Beachfront Resort',
    category: 'Rooms',
    image: 'https://images.pexels.com/photos/261204/pexels-photo-261204.jpeg',
  },
  {
    id: 2,
    title: 'Luxury Suite',
    category: 'Rooms',
    image: 'https://images.pexels.com/photos/35521638/pexels-photo-35521638.jpeg',
  },
  {
    id: 3,
    title: 'Spa & Wellness',
    category: 'Facilities',
    image: 'https://images.pexels.com/photos/3212164/pexels-photo-3212164.jpeg',
  },
  {
    id: 4,
    title: 'Infinity Pool',
    category: 'Facilities',
    image: 'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg',
  },
  {
    id: 5,
    title: 'Fine Dining',
    category: 'Dining',
    image: 'https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg',
  },
  {
    id: 6,
    title: 'Beach Bar',
    category: 'Dining',
    image: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
  },
  {
    id: 7,
    title: 'Sunset View',
    category: 'Environment',
    image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
  },
  {
    id: 8,
    title: 'Ocean View',
    category: 'Environment',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg',
  },

  {
    id: 10,
    title: 'Conference Hall',
    category: 'Facilities',
    image: 'https://images.pexels.com/photos/7648044/pexels-photo-7648044.jpeg',
  },
  {
    id: 11,
    title: 'Beachfront Wedding',
    category: 'Events',
    image: 'https://images.pexels.com/photos/169185/pexels-photo-169185.jpeg',
  },
  {
    id: 12,
    title: 'Scenic Views',
    category: 'Environment',
    image: 'https://images.pexels.com/photos/1591284/pexels-photo-1591284.jpeg',
  },
];

const categories = ['All', 'Rooms', 'Facilities', 'Dining', 'Environment', 'Events'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24 bg-gradient-to-b from-blue-100 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-emerald-800 mb-4">Our Gallery of Moments</h1>
            <p className="text-md text-blue-800 max-w-2xl mx-auto">
              Discover the beauty of our hotel and resort facilities
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
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
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'border-emerald-600 text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold">{image.title}</h3>
                  <p className="text-emerald-300 text-sm">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto"
            />

            <div className="p-6 bg-gray-50">
              <h2 className="text-3xl font-bold text-emerald-600 mb-2">
                {selectedImage.title}
              </h2>
              <p className="text-emerald-500 font-semibold mb-4">
                Category: {selectedImage.category}
              </p>
              <p className="text-gray-700">
                Experience the luxury and comfort of our world-class facilities designed for your ultimate relaxation and enjoyment.
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
