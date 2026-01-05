'use client';

import { Target, Eye, Heart, Award, Briefcase, MapPin, Gift, Car } from 'lucide-react';

interface CompanyInfo {
  motto: string;
  mission: string;
  vision: string;
  about_description: string;
}

interface AboutSectionProps {
  companyInfo: CompanyInfo;
}

export function AboutSection({ companyInfo }: AboutSectionProps) {
  const features = [
    {
      icon: Heart,
      title: 'Our Motto',
      description: companyInfo.motto,
      color:  'from-sky-500 to-blue-500',
    },
    {
      icon: Target,
      title: 'Our Mission',
      description: companyInfo.mission,
      color: 'from-sky-500 to-blue-500',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: companyInfo.vision,
      color: 'from-sky-500 to-blue-500',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering world-class hospitality and unforgettable travel experiences with attention to every detail.',
      color: 'from-sky-500 to-blue-500',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
            About Chare Uzi Iland
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-sky-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {companyInfo.about_description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`hidden md:flex w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-emerald-600 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="mt-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 ">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-sky-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We offer comprehensive travel services tailored to make your experience unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Briefcase,
                title: 'Hotel Booking',
                description: 'Easy and secure hotel reservations with best rates and exclusive deals on luxury accommodations.',
                color: 'from-emerald-500 to-emerald-700',
              },
              {
                icon: MapPin,
                title: 'Tour Packages',
                description: 'Curated travel packages exploring breathtaking destinations with professional guides and unique experiences.',
                color: 'from-emerald-500 to-emerald-700',
              },
              {
                icon: Gift,
                title: 'Event Planning',
                description: 'Full-service event planning for weddings, conferences, and special occasions with meticulous attention to detail.',
                color: 'from-emerald-500 to-emerald-700',
              },
              {
                icon: Car,
                title: 'Airport Transfer',
                description: 'Convenient and reliable airport transportation services with professional drivers and comfortable vehicles.',
                color: 'from-emerald-500 to-emerald-700',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div
                  className={`hidden md:flex w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-sky-600 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
