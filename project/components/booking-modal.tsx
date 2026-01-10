"use client";

import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/lib/booking-context";
import { AuthModal } from "@/components/auth-modal";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId?: string;
  defaultRange?: DateRange;
}

const dayMs = 1000 * 60 * 60 * 24;

function nightsBetween(start: Date, end: Date) {
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.max(1, Math.round((endUtc - startUtc) / dayMs));
}

export function BookingModal({ isOpen, onClose, roomId, defaultRange }: BookingModalProps) {
  const { rooms, user, createReservation, markReservationPaid, isRoomAvailable } = useBooking();
  const room = rooms.find((r) => r.id === roomId);
  const [range, setRange] = useState<DateRange | undefined>(defaultRange);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [latestReservationId, setLatestReservationId] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRange(defaultRange ?? { from: new Date(), to: new Date(Date.now() + dayMs) });
      setStatusMessage(null);
      setIsSubmitting(false);
      setLatestReservationId(null);
    }
  }, [defaultRange, isOpen]);

  const availability = useMemo(() => {
    if (!room || !range?.from || !range?.to) return false;
    return isRoomAvailable(room.id, range.from, range.to);
  }, [room, range?.from, range?.to, isRoomAvailable]);

  const nights = useMemo(() => {
    if (!range?.from || !range?.to) return 1;
    return nightsBetween(range.from, range.to);
  }, [range?.from, range?.to]);

  const totalPrice = room ? nights * room.pricePerNight : 0;

  const handleReserve = () => {
    if (!room || !range?.from || !range?.to) {
      setStatusMessage("Select dates to continue.");
      return;
    }

    if (!user) {
      setAuthOpen(true);
      return;
    }

    setIsSubmitting(true);
    const result = createReservation({
      roomId: room.id,
      startDate: range.from,
      endDate: range.to,
      paymentMethod,
    });

    if (!result.success || !result.reservation) {
      setStatusMessage(result.message || "Could not create reservation.");
      setIsSubmitting(false);
      return;
    }

    setLatestReservationId(result.reservation.id);
    setStatusMessage("Reservation created. Complete payment to confirm.");
    setIsSubmitting(false);
  };

  const handleCompletePayment = () => {
    if (!latestReservationId) return;
    markReservationPaid(latestReservationId);
    setStatusMessage("Payment recorded. Your reservation is confirmed.");
  };

  if (!room) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : undefined)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Reserve {room.name}</DialogTitle>
            <DialogDescription>
              Choose your dates and payment method to complete your reservation.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="relative h-48 w-full overflow-hidden rounded-xl border">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${room.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-sky-600 text-white border-0">${room.pricePerNight}/night</Badge>
                </div>
              </div>

              <div className="border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Nights</span>
                  <span className="font-semibold">{nights}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Rate</span>
                  <span className="font-semibold">${room.pricePerNight}/night</span>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-sm text-slate-700">Total</span>
                  <span className="text-lg font-bold text-sky-700">${totalPrice}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant={availability ? "secondary" : "destructive"}>
                    {availability ? "Available" : "Unavailable"}
                  </Badge>
                  <span className="text-slate-600">
                    {availability
                      ? "This room is free for the selected dates."
                      : "Try different dates to find availability."}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Select dates</p>
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={2}
                  disabled={{ before: new Date() }}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700">Payment method</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "card", label: "Card" },
                    { key: "mobile", label: "Mobile Money" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setPaymentMethod(option.key)}
                      className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                        paymentMethod === option.key
                          ? "border-sky-500 bg-sky-50 text-sky-700"
                          : "border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {statusMessage && (
                <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
                  {statusMessage}
                </div>
              )}

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full md:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleReserve}
                  disabled={isSubmitting || !availability}
                  className="w-full md:w-auto"
                >
                  {user ? "Reserve & Pay" : "Sign in to reserve"}
                </Button>
                {latestReservationId && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCompletePayment}
                    className="w-full md:w-auto"
                  >
                    Complete Payment
                  </Button>
                )}
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode="signin"
      />
    </>
  );
}
