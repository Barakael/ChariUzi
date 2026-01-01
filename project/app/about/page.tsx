'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AboutSection } from '@/components/about-section';

const mockCompanyInfo = {
  motto: 'Travel with passion, live with purpose',
  mission: 'To provide exceptional travel experiences that create lasting memories for our guests worldwide',
  vision: 'To be the leading travel and tourism company known for our commitment to excellence and innovation',
  about_description: 'Chare Uzi Iland is dedicated to crafting unforgettable journeys across the globe. With over 20 years of experience in the hospitality industry, we pride ourselves on providing world-class service and access to the most breathtaking destinations on earth.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">About Chare Uzi Iland</h1>
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
                Founded in 2004, Chare Uzi Iland began with a simple mission: to help travelers discover the world's most beautiful destinations while experiencing exceptional hospitality. What started as a small boutique travel agency has grown into a global leader in luxury travel experiences.
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

      <Footer />
    </main>
  );
}
