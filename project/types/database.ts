export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  order_index: number;
  active: boolean;
  created_at: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  image_url: string;
  rating: number;
  price_per_night: number;
  amenities: string[];
  featured: boolean;
  created_at: string;
}

export interface TourismPlace {
  id: string;
  name: string;
  description: string;
  location: string;
  image_url: string;
  views: number;
  category: string;
  featured: boolean;
  created_at: string;
}

export interface CompanyInfo {
  id: string;
  motto: string;
  mission: string;
  vision: string;
  about_description: string;
  phone: string;
  email: string;
  address: string;
  created_at: string;
}
