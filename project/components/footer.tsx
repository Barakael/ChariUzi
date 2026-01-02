'use client';

import { Hotel, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-slate-700/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-2">Stay Updated</h3>
              <p className="text-slate-400 mb-6">Subscribe to our newsletter for exclusive deals and travel tips</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {subscribed && <p className="text-emerald-400 mt-2 text-sm">✓ Thank you for subscribing!</p>}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Hotel className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                    Chare Uzi Island
                  </h3>
                  <p className="text-xs text-slate-500">Luxury hotel and tours</p>
                </div>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Creating unforgettable travel experiences with world-class hospitality and exceptional service across the globe by chare uzi island.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: 'https://facebook.com' },
                  { icon: Twitter, href: 'https://twitter.com' },
                  { icon: Instagram, href: 'https://instagram.com' },
                  { icon: Linkedin, href: 'https://linkedin.com' },
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 hover:from-emerald-600 hover:to-sky-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-5 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-transparent rounded"></div>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Hotels', href: '/hotels' },
                  { name: 'Tours', href: '/destinations' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Contact', href: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-2 transition-all"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-5 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-transparent rounded"></div>
                Services
              </h4>
              <ul className="space-y-3">
                {[
                  'Hotel Booking',
                  'Tour Packages',
                  'Event Planning',
                  'Travel Insurance',
                  'Airport Transfer',
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-2 transition-all"></span>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-5 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-transparent rounded"></div>
                Contact Info
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <Phone className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Phone</p>
                    <a href="tel:+15551234567" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <Mail className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                    <a href="mailto:info@tourismparadise.com" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      info@tourismparadise.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                    <p className="text-slate-300">Chare uzi island, Zanzibar</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
              <p className="text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} Chare Uzi Island. All rights reserved.
                <span className="inline-flex items-center gap-1 ml-2">
                  Made for travel lovers
                </span>
              </p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-end">
                <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Cookie Policy
                </a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Sitemap
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-xs">
              <span className="flex items-center gap-1">✓ Trusted by 100K+ Travelers</span>
              <span>•</span>
              <span className="flex items-center gap-1">✓ 24/7 Customer Support</span>
              <span>•</span>
              <span className="flex items-center gap-1">✓ Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
