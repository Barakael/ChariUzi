'use client';

import { MapPin, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PlaceCardProps {
  name: string;
  description: string;
  location: string;
  image_url: string;
  views: number;
  category: string;
}

export function PlaceCard({
  name,
  description,
  location,
  image_url,
  views,
  category,
}: PlaceCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full">
      <div className="relative h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image_url})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700 text-white border-0">
          {category}
        </Badge>

        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <Eye className="w-4 h-4 text-slate-700" />
          <span className="text-sm font-semibold text-slate-700">
            {views.toLocaleString()}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold mb-2 text-white">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-white/90 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{location}</span>
          </div>
          <p className="text-white/80 text-sm line-clamp-2">{description}</p>
        </div>
      </div>

      <CardContent className="p-6">
        <button className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors">
          Explore Tour
        </button>
      </CardContent>
    </Card>
  );
}
