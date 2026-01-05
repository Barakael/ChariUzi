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
      <ContactSection contactInfo={mockContactInfo} />
      <Footer />
    </main>
  );
}
