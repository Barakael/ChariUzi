/*
  # Tourism & Hotel Website Schema

  1. New Tables
    - `hotels`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `location` (text)
      - `image_url` (text)
      - `rating` (numeric)
      - `price_per_night` (numeric)
      - `amenities` (text array)
      - `featured` (boolean)
      - `created_at` (timestamptz)
    
    - `tourism_places`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `location` (text)
      - `image_url` (text)
      - `views` (integer)
      - `category` (text)
      - `featured` (boolean)
      - `created_at` (timestamptz)
    
    - `hero_slides`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subtitle` (text)
      - `image_url` (text)
      - `order_index` (integer)
      - `active` (boolean)
      - `created_at` (timestamptz)
    
    - `company_info`
      - `id` (uuid, primary key)
      - `motto` (text)
      - `mission` (text)
      - `vision` (text)
      - `about_description` (text)
      - `phone` (text)
      - `email` (text)
      - `address` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Hotels Table
CREATE TABLE IF NOT EXISTS hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL,
  rating numeric DEFAULT 4.5,
  price_per_night numeric NOT NULL,
  amenities text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hotels are viewable by everyone"
  ON hotels FOR SELECT
  TO public
  USING (true);

-- Tourism Places Table
CREATE TABLE IF NOT EXISTS tourism_places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL,
  views integer DEFAULT 0,
  category text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tourism_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tourism places are viewable by everyone"
  ON tourism_places FOR SELECT
  TO public
  USING (true);

-- Hero Slides Table
CREATE TABLE IF NOT EXISTS hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  image_url text NOT NULL,
  order_index integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hero slides are viewable by everyone"
  ON hero_slides FOR SELECT
  TO public
  USING (active = true);

-- Company Info Table
CREATE TABLE IF NOT EXISTS company_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  motto text,
  mission text,
  vision text,
  about_description text,
  phone text,
  email text,
  address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company info is viewable by everyone"
  ON company_info FOR SELECT
  TO public
  USING (true);

-- Insert sample data for hero slides
INSERT INTO hero_slides (title, subtitle, image_url, order_index) VALUES
  ('Discover Paradise', 'Experience luxury and comfort in our world-class hotels', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920', 1),
  ('Explore Amazing Destinations', 'Unforgettable tours to breathtaking locations', 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1920', 2),
  ('Your Journey Begins Here', 'Create memories that last a lifetime', 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1920', 3),
  ('Luxury Redefined', 'Indulge in premium hospitality services', 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920', 4);

-- Insert sample hotels
INSERT INTO hotels (name, description, location, image_url, rating, price_per_night, amenities, featured) VALUES
  ('Oceanview Resort', 'Luxurious beachfront resort with stunning ocean views and world-class amenities', 'Maldives', 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800', 4.8, 299, ARRAY['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym'], true),
  ('Mountain Paradise Hotel', 'Escape to tranquility in our mountain retreat with breathtaking valley views', 'Swiss Alps', 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 249, ARRAY['Ski Access', 'Restaurant', 'Bar', 'WiFi', 'Spa'], true),
  ('Urban Luxury Suites', 'Modern elegance in the heart of the city with premium services', 'Dubai', 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800', 4.9, 399, ARRAY['Rooftop Pool', 'Concierge', 'Restaurant', 'WiFi', 'Gym', 'Spa'], true),
  ('Tropical Beach Villa', 'Private villas with direct beach access and personalized service', 'Bali', 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800', 4.6, 199, ARRAY['Private Pool', 'Beach Access', 'Restaurant', 'WiFi'], false),
  ('Heritage Grand Hotel', 'Classic architecture meets modern comfort in our historic hotel', 'Paris', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800', 4.5, 279, ARRAY['Restaurant', 'Bar', 'WiFi', 'Concierge'], false),
  ('Desert Oasis Resort', 'Experience serenity in our luxurious desert retreat', 'Morocco', 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800', 4.7, 229, ARRAY['Pool', 'Spa', 'Restaurant', 'WiFi', 'Desert Tours'], false);

-- Insert sample tourism places
INSERT INTO tourism_places (name, description, location, image_url, views, category, featured) VALUES
  ('Northern Lights', 'Witness the magical aurora borealis in the Arctic sky', 'Iceland', 'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=800', 15420, 'Natural Wonder', true),
  ('Ancient Temples', 'Explore magnificent historical temples and ancient ruins', 'Cambodia', 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800', 12850, 'Historical', true),
  ('Crystal Lagoon', 'Swim in pristine turquoise waters surrounded by nature', 'Philippines', 'https://images.pexels.com/photos/1118877/pexels-photo-1118877.jpeg?auto=compress&cs=tinysrgb&w=800', 18900, 'Beach', true),
  ('Mountain Peak Trek', 'Challenge yourself with spectacular mountain hiking trails', 'Nepal', 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800', 9560, 'Adventure', true),
  ('Safari Adventure', 'Experience wildlife in their natural habitat', 'Kenya', 'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=800', 11200, 'Wildlife', false),
  ('Coastal Paradise', 'Relax on pristine beaches with crystal clear waters', 'Greece', 'https://images.pexels.com/photos/1007425/pexels-photo-1007425.jpeg?auto=compress&cs=tinysrgb&w=800', 14300, 'Beach', false);

-- Insert company info
INSERT INTO company_info (motto, mission, vision, about_description, phone, email, address) VALUES
  ('Creating Memories, One Journey at a Time', 
   'To provide exceptional hospitality services and unforgettable travel experiences that exceed our guests expectations while promoting sustainable tourism.',
   'To become the world''s most trusted and preferred hotel and tourism company, known for innovation, excellence, and creating lasting memories.',
   'We are a premier hotel and tourism company dedicated to crafting extraordinary travel experiences. With a portfolio of luxury hotels and curated tours across the globe, we bring together comfort, adventure, and cultural immersion. Our team of experienced professionals is committed to ensuring every guest receives personalized attention and discovers the beauty of each destination.',
   '+1 (555) 123-4567',
   'info@tourismparadise.com',
   '123 Travel Avenue, Suite 500, New York, NY 10001');
