'use client';

import Link from 'next/link';
import { MapPin, Star, Check, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HotelCardProps {
  id?: string;
  name: string;
  description: string;
  location: string;
  image_url?: string;
  imageUrl?: string;
  rating: number;
  price_per_night?: number;
  pricePerNight?: number;
  amenities: string[];
  featured: boolean;
  available?: boolean;
  onBook?: (roomId: string) => void;
}

export function HotelCard({
  id,
  name,
  description,
  location,
  image_url,
  imageUrl,
  rating,
  price_per_night,
  pricePerNight,
  amenities,
  featured,
  available = true,
  onBook,
}: HotelCardProps) {
  const resolvedImage = imageUrl || image_url;
  const nightly = typeof pricePerNight === 'number' ? pricePerNight : price_per_night;
  const roomId = id || name;

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${resolvedImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {featured && (
          <Badge className="absolute top-4 right-4 bg-sky-600 hover:bg-sky-800 text-white border-0">
            Featured
          </Badge>
        )}
        <div className="absolute top-4 left-4">
          <Badge
            variant="secondary"
            className={
              available
                ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                : 'bg-amber-100 text-amber-700 border-amber-200'
            }
          >
            <span className="flex items-center gap-1 text-xs font-semibold">
              {available ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
              {available ? 'Available' : 'Unavailable'}
            </span>
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1 text-yellow-400 mb-2">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-white font-semibold text-lg">{rating}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-sky-600 group-hover:text-sky-800 transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-2 text-slate-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{location}</span>
        </div>

        <p className="text-slate-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 4).map((amenity) => (
            <Badge
              key={amenity}
              variant="secondary"
              className="bg-sky-100 text-sky-700 hover:bg-sky-200"
            >
              {amenity}
            </Badge>
          ))}
          {amenities.length > 4 && (
            <Badge variant="secondary" className="bg-slate-100 text-slate-700">
              +{amenities.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-sky-500">Starting from</p>
            <p className="text-2xl font-bold text-sky-600">
              ${nightly ?? 0}
              <span className="text-sm font-normal text-slate-500">/night</span>
            </p>
          </div>
          {onBook ? (
            <button
              onClick={() => onBook(roomId)}
              className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition-colors"
            >
              Book Now
            </button>
          ) : (
            <Link
              href="/hotels"
              className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition-colors"
            >
              Book Now
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
