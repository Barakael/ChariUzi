'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Tours', href: '/destinations' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2'
          : 'bg-white py-2'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Hotel className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1
                className={`text-2xl font-bold transition-colors ${
                  isScrolled ? 'text-sky-600' : 'text-sky-600'
                }`}
              >
                CHARE UZI ISLAND
              </h1>
              <p
                className={`text-sm transition-colors ${
                  isScrolled ? 'text-slate-600' : 'text-black'
                }`}
              >
                Hotel & Tours
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-semibold transition-colors hover:text-emerald-600 ${
                  isScrolled ? 'text-slate-700' : 'text-blue-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              className={isScrolled ? 'text-slate-700' : 'text-white hover:text-white'}
            >
              Sign In
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Book Now
            </Button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-slate-700' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-slate-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block font-semibold transition-colors hover:text-emerald-600 ${
                  isScrolled ? 'text-slate-700' : 'text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Button
                variant="outline"
                className={isScrolled ? 'text-slate-700 border-slate-300' : 'text-white border-white'}
              >
                Sign In
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Book Now
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
