'use client';

import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

export function ContactSection({ contactInfo }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-sky-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Phone,
              title: 'Phone',
              value: contactInfo.phone,
              color: 'from-emerald-500 to-teal-500',
            },
            {
              icon: Mail,
              title: 'Email',
              value: contactInfo.email,
              color: 'from-sky-500 to-blue-500',
            },
            {
              icon: MapPin,
              title: 'Address',
              value: contactInfo.address,
              color: 'from-purple-500 to-pink-500',
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto border-0 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    className="h-12 border-slate-300 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 border-slate-300 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Subject
                </label>
                <Input
                  placeholder="How can we help you?"
                  className="h-12 border-slate-300 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <Textarea
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="border-slate-300 focus:border-emerald-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold h-14"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
