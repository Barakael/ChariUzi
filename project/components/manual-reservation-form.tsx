"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooking } from "@/lib/booking-context";
import { Plus } from "lucide-react";
import { addDays } from "date-fns";

export function ManualReservationForm() {
  const { rooms, createReservation } = useBooking();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    guestName: "",
    guestEmail: "",
    roomId: "",
    paymentMethod: "card",
  });
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateRange.from || !dateRange.to || !formState.roomId) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      // Note: This would need a special endpoint for admin to create reservations for other users
      // For now, it will create under the current admin user
      const result = await createReservation({
        roomId: formState.roomId,
        startDate: dateRange.from,
        endDate: dateRange.to,
        paymentMethod: formState.paymentMethod,
      });

      if (result.success) {
        setIsOpen(false);
        setFormState({
          guestName: "",
          guestEmail: "",
          roomId: "",
          paymentMethod: "card",
        });
        setDateRange({ from: undefined, to: undefined });
      } else {
        alert(result.message || "Failed to create reservation");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Failed to create reservation");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-sky-600 hover:bg-sky-700 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Manual Reservation
      </Button>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Create Manual Reservation
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="guestName">Guest Name</Label>
            <Input
              id="guestName"
              placeholder="John Doe"
              value={formState.guestName}
              onChange={(e) =>
                setFormState((s) => ({ ...s, guestName: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="guestEmail">Guest Email</Label>
            <Input
              id="guestEmail"
              type="email"
              placeholder="john@example.com"
              value={formState.guestEmail}
              onChange={(e) =>
                setFormState((s) => ({ ...s, guestEmail: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="room">Room</Label>
          <Select
            value={formState.roomId}
            onValueChange={(value) =>
              setFormState((s) => ({ ...s, roomId: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a room" />
            </SelectTrigger>
            <SelectContent>
              {rooms.map((room) => (
                <SelectItem key={room.id} value={room.id}>
                  {room.name} - ${room.pricePerNight || room.price_per_night}/night
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select
            value={formState.paymentMethod}
            onValueChange={(value) =>
              setFormState((s) => ({ ...s, paymentMethod: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">Credit/Debit Card</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              <SelectItem value="mobile-money">Mobile Money</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Select Dates</Label>
          <div className="border rounded-lg p-4 bg-slate-50">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) =>
                setDateRange({
                  from: range?.from,
                  to: range?.to,
                })
              }
              disabled={(date) => date < new Date()}
              className="rounded-md"
            />
          </div>
          {dateRange.from && dateRange.to && (
            <p className="text-sm text-slate-600 mt-2">
              {dateRange.from.toLocaleDateString()} -{" "}
              {dateRange.to.toLocaleDateString()} (
              {Math.ceil(
                (dateRange.to.getTime() - dateRange.from.getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              nights)
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white"
        >
          {loading ? "Creating..." : "Create Reservation"}
        </Button>
      </form>
    </div>
  );
}
