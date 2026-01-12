'use client';

import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HotelCard } from '@/components/hotel-card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { BookingModal } from '@/components/booking-modal';
import { useBooking } from '@/lib/booking-context';

export default function HotelsPage() {
  const { rooms, isRoomAvailable } = useBooking();
  const [activeCategory, setActiveCategory] = useState('All');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, boolean>>({});
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(rooms.map((room) => room.category).filter(Boolean)));
    return ['All', ...unique];
  }, [rooms]);

  const filteredRooms = useMemo(
    () =>
      rooms.filter((room) =>
        activeCategory === 'All' ? true : room.category === activeCategory
      ),
    [rooms, activeCategory]
  );

  useEffect(() => {
    let active = true;
    if (!dateRange?.from || !dateRange?.to || filteredRooms.length === 0) {
      setAvailabilityMap({});
      return;
    }

    const run = async () => {
      setIsCheckingAvailability(true);
      try {
        const entries = await Promise.all(
          filteredRooms.map(async (room) => {
            const available = await isRoomAvailable(room.id, dateRange.from!, dateRange.to!);
            return [room.id, available] as const;
          })
        );
        if (!active) return;
        setAvailabilityMap(Object.fromEntries(entries));
      } catch (error) {
        if (!active) return;
        console.error('Failed to check availability', error);
        setAvailabilityMap({});
      } finally {
        if (active) setIsCheckingAvailability(false);
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [filteredRooms, dateRange?.from, dateRange?.to, isRoomAvailable]);

  const handleBook = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24 bg-gradient-to-b from-blue-100 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-blue-900 ">Real-Time Room Availability</h1>
            <p className="text-md text-emerald-800 max-w-2xl mx-auto">
              Pick your dates, filter rooms, and book instantly. Availability updates in real time as you adjust dates.
            </p>
          </div>
        </div>
      </div>

      <section className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? 'default' : 'outline'}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">Check availability</p>
            <Calendar
              mode="range"
              numberOfMonths={1}
              selected={dateRange}
              onSelect={setDateRange}
              disabled={{ before: new Date() }}
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredRooms.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredRooms.map((room) => {
                  const available = dateRange?.from && dateRange?.to
                    ? availabilityMap[room.id] ?? true
                    : true;
                  return (
                    <HotelCard
                      key={room.id}
                      id={room.id}
                      name={room.name}
                      description={room.description}
                      location={room.location}
                      imageUrl={room.imageUrl}
                      rating={room.rating}
                      pricePerNight={room.pricePerNight}
                      amenities={room.amenities}
                      featured={!!room.featured}
                      available={available}
                      onBook={handleBook}
                    />
                  );
                })}
              </div>
              {isCheckingAvailability && (
                <p className="text-center text-sm text-slate-500 mt-4">Refreshing availability…</p>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No rooms found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <BookingModal
        isOpen={!!selectedRoomId}
        onClose={() => setSelectedRoomId(null)}
        roomId={selectedRoomId ?? undefined}
        defaultRange={dateRange}
      />
    </main>
  );
}
