'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContactSection } from '@/components/contact-section';

const mockContactInfo = {
  phone: '+1 (555) 987-6543',
  email: 'hello@paradisetravel.com',
  address: '456 Tourism Boulevard, Suite 200, San Francisco, CA 94110',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-32 pb-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with our travel specialists to plan your perfect getaway
            </p>
          </div>
        </div>
      </div>

      <ContactSection contactInfo={mockContactInfo} />

      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Office Locations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">San Francisco</h3>
              <p className="text-gray-600">456 Tourism Boulevard, Suite 200</p>
              <p className="text-gray-600">San Francisco, CA 94110</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">London</h3>
              <p className="text-gray-600">789 Travel Street, Floor 5</p>
              <p className="text-gray-600">London, UK EC1A 1BB</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sydney</h3>
              <p className="text-gray-600">123 Adventure Avenue, Suite 300</p>
              <p className="text-gray-600">Sydney, NSW 2000</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
