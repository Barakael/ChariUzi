'use client';

import { CheckCircle, Users, Zap, Shield, Clock, Smile } from 'lucide-react';

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Users,
      title: 'Loyal Community',
      description: 'Join thousands of satisfied travelers who trust us for their vacation needs. Our community-driven approach ensures personalized service.',
      color: 'from-emerald-500 to-emerald-700',
    },
    {
      icon: CheckCircle,
      title: 'Simple & Easy',
      description: 'Straightforward booking process with no hidden fees. Get exactly what you need without unnecessary complications.',
      color: 'from-sky-500 to-blue-500',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Quick response times and rapid service delivery. Your convenience is our priority, every step of the way.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Your safety and data protection are paramount. We use industry-leading security measures for peace of mind.',
      color: 'from-sky-500 to-cyan-500',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer service ready to assist you anytime. Your satisfaction is our mission.',
      color: 'from-emerald-600 to-green-700',
    },
    {
      icon: Smile,
      title: 'Unforgettable Experiences',
      description: 'We craft memorable journeys tailored to your desires. Every trip with us becomes a cherished story.',
      color: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-sky-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our commitment to excellence, simplicity, and loyalty. 
            We're dedicated to making your travel dreams a reality.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon Background */}
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${reason.color} items-center justify-center mb-6 flex group-hover:scale-110 transition-transform duration-300`}
              >
                <reason.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {reason.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {reason.description}
              </p>

              {/* Accent Line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${reason.color} rounded-full transition-all duration-300 group-hover:w-full`} style={{ width: '0%' }}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-slate-600 mb-6">
            Ready to start your unforgettable journey with us?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Now
            </button>
            <button className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
