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
        {/* Newsletter Section - Compact */}
        <div className="border-b border-slate-700/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-slate-400 text-sm mb-4">Subscribe to our newsletter for exclusive deals and travel tips</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 text-sm bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {subscribed && <p className="text-emerald-400 mt-2 text-xs">✓ Thank you for subscribing!</p>}
            </div>
          </div>
        </div>

        {/* Main Footer Content - 2 rows on mobile, 4 columns on larger screens */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
            {/* Brand Section */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-sky-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Hotel className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                    Chare Uzi
                  </h3>
                </div>
              </Link>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Luxury hotel & tours creating unforgettable travel experiences.
              </p>
              <div className="flex gap-2">
                {[
                  { icon: Facebook, href: 'https://facebook.com' },
                  { icon: Twitter, href: 'https://twitter.com' },
                  { icon: Instagram, href: 'https://instagram.com' },
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 hover:from-emerald-600 hover:to-sky-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="hidden md:block">
              <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                <div className="w-0.5 h-4 bg-gradient-to-b from-emerald-400 to-transparent rounded"></div>
                Links
              </h4>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Hotels', href: '/hotels' },
                  { name: 'Tours', href: '/destinations' },
                  { name: 'Gallery', href: '/gallery' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 text-xs transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="">
              <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                <div className="w-0.5 h-4 bg-gradient-to-b from-emerald-400 to-transparent rounded"></div>
                Services
              </h4>
              <ul className="space-y-2">
                {[
                  'Hotel Booking',
                  'Tour Packages',
                  'Event Planning',
                  'Airport Transfer',
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-emerald-400 text-xs transition-colors"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                <div className="w-0.5 h-4 bg-gradient-to-b from-emerald-400 to-transparent rounded"></div>
                Contact
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <a href="tel:+15551234567" className="text-slate-300 hover:text-emerald-400 text-xs transition-colors">
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <a href="mailto:info@chareuzi.com" className="text-slate-300 hover:text-emerald-400 text-xs transition-colors">
                    info@chareuzi.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-300 text-xs">Zanzibar</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700/50 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs mb-4">
              <p className="text-slate-400">
                &copy; {new Date().getFullYear()} Chare Uzi Island
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Terms
                </a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Cookies
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-3 text-slate-500 text-xs">
              <span>✓ 100K+ Travelers</span>
              <span>•</span>
              <span>✓ 24/7 Support</span>
              <span>•</span>
              <span>✓ Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
