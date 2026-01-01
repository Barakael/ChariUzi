'use client';

import { Target, Eye, Heart, Award } from 'lucide-react';

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
      color: 'from-rose-500 to-pink-500',
    },
    {
      icon: Target,
      title: 'Our Mission',
      description: companyInfo.mission,
      color: 'from-[#636B2F] to-teal-500',
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
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-sky-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {companyInfo.about_description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: '150+', label: 'Hotels Worldwide' },
            { number: '500K+', label: 'Happy Guests' },
            { number: '95%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Customer Support' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50"
            >
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-slate-600 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
