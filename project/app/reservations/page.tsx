"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth-modal";
import { useBooking } from "@/lib/booking-context";
import { Calendar, MapPin, CreditCard, User } from "lucide-react";

export default function ReservationsPage() {
  const { user, reservations, rooms } = useBooking();
  const [authOpen, setAuthOpen] = useState(false);

  const list = user
    ? reservations.filter((r) => r.userId === String(user.id) || r.user_id === Number(user.id))
    : [];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">My Reservations</h1>
            <p className="text-slate-600 mt-2">View your booking details and payment status</p>
          </div>

          {!user ? (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
              <p className="text-slate-700 mb-4">Please sign in to view your reservations.</p>
              <Button onClick={() => setAuthOpen(true)} className="bg-sky-600 hover:bg-sky-700 text-white">
                Sign in
              </Button>
            </div>
          ) : list.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
              <p className="text-slate-700 mb-4">No reservations yet.</p>
              <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white">
                <a href="/hotels">Browse Rooms</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {list.map((res) => {
                const room = rooms.find((r) => r.id === res.roomId || r.id === res.room_id);
                return (
                  <div key={res.id} className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{room?.name ?? 'Room'}</h2>
                        <p className="text-sm text-slate-500">Booking ID: {res.id}</p>
                      </div>
                      <Badge
                        variant={res.status === 'paid' ? 'secondary' : res.status === 'cancelled' ? 'destructive' : 'outline'}
                        className={
                          res.status === 'paid'
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                            : res.status === 'pending-payment'
                            ? 'bg-amber-100 text-amber-700 border-amber-200'
                            : res.status === 'confirmed'
                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                            : ''
                        }
                      >
                        {res.status}
                      </Badge>
                    </div>

                    <div className="p-6 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-slate-900">Location</p>
                              <p className="text-sm text-slate-600">{room?.location || 'Uzi Island, Zanzibar'}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-slate-900">Check-in</p>
                              <p className="text-sm text-slate-600">
                                {new Date(res.startDate || res.start_date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-slate-900">Check-out</p>
                              <p className="text-sm text-slate-600">
                                {new Date(res.endDate || res.end_date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-slate-900">Guest</p>
                              <p className="text-sm text-slate-600">{res.userName || res.user?.name || user.name}</p>
                              <p className="text-xs text-slate-500">{res.userEmail || res.user?.email || user.email}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <CreditCard className="w-5 h-5 text-slate-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-slate-900">Payment</p>
                              <p className="text-sm text-slate-600 capitalize">
                                {res.paymentMethod || res.payment_method || 'Not specified'}
                              </p>
                            </div>
                          </div>

                          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-600">Duration</span>
                              <span className="text-sm font-medium text-slate-900">{res.nights} nights</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-600">Price per night</span>
                              <span className="text-sm font-medium text-slate-900">
                                ${room?.pricePerNight || room?.price_per_night || 0}
                              </span>
                            </div>
                            <div className="border-t border-slate-200 pt-2 mt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-base font-semibold text-slate-900">Total</span>
                                <span className="text-xl font-bold text-sky-600">
                                  ${(res.totalPrice || res.total_price)?.toFixed(0)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {room?.description && (
                        <div className="mt-6 pt-6 border-t border-slate-200">
                          <p className="text-sm text-slate-600">{room.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="signin" />
    </main>
  );
}
