'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AboutSection } from '@/components/about-section';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const mockCompanyInfo = {
  motto: 'Travel with passion, live with purpose',
  mission: 'To provide exceptional travel experiences that create lasting memories for our guests worldwide',
  vision: 'To be the leading travel and tourism company known for our commitment to excellence and innovation',
  about_description: 'Chare Uzi Iland is dedicated to crafting unforgettable journeys across the globe. With over 20 years of experience in the hospitality industry, we pride ourselves on providing world-class service and access to the most breathtaking destinations on earth.',
};

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'General Manager',
    email: 'sarah.johnson@chareuziisland.com',
    phone: '+255 777 123 456',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'With over 15 years in hospitality management, Sarah ensures exceptional service.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Operations Director',
    email: 'michael.chen@chareuziisland.com',
    phone: '+255 777 234 567',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Michael oversees all daily operations with precision and expertise.',
  },
  {
    id: 3,
    name: 'Amara Okafor',
    position: 'Systems Manager',
    email: 'amara.okafor@chareuziisland.com',
    phone: '+255 777 345 678',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Amara manages our technology infrastructure and digital systems.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">About Chare Uzi Island</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted partner in creating unforgettable travel experiences
            </p>
          </div>
        </div>
      </div>

      <AboutSection companyInfo={mockCompanyInfo} />

      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2004, Chare Uzi Island began with a simple mission: to help travelers discover the world's most beautiful destinations while experiencing exceptional hospitality. What started as a small boutique travel agency has grown into a global leader in luxury travel experiences.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Today, we partner with over 150 premium hotels, resorts, and tour operators across 80+ countries. Our dedicated team of travel experts works tirelessly to ensure every journey is perfectly tailored to our clients' desires, creating memories that last a lifetime.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe travel is more than just visiting new places—it's about connecting with cultures, people, and experiences that transform us. That's why we're committed to sustainable and ethical tourism practices that benefit both travelers and local communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to excellence and your satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-emerald-600 mb-2">{member.name}</h3>
                  <p className="text-emerald-500 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-emerald-600" />
                      <a
                        href={`mailto:${member.email}`}
                        className="text-sm text-gray-600 hover:text-emerald-600 transition-colors break-all"
                      >
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-emerald-600" />
                      <a
                        href={`tel:${member.phone}`}
                        className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                      >
                        {member.phone}
                      </a>
                    </div>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors">
                    Connect
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
