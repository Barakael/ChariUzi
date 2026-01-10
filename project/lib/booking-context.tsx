"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type ServiceOption =
  | "wifi"
  | "breakfast"
  | "parking"
  | "pool"
  | "air-conditioning"
  | "laundry"
  | "tv"
  | "workspace";

export type ReservationStatus =
  | "pending-payment"
  | "paid"
  | "confirmed"
  | "cancelled";

export interface BookingUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export interface Room {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  services: ServiceOption[];
  featured?: boolean;
  category?: string;
  subCategory?: string;
  capacity?: number;
}

export interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userEmail: string;
  startDate: string;
  endDate: string;
  nights: number;
  status: ReservationStatus;
  totalPrice: number;
  paymentMethod?: string;
  createdAt: string;
}

interface BookingContextValue {
  user?: BookingUser | null;
  rooms: Room[];
  reservations: Reservation[];
  signIn: (payload: { email: string; name: string }) => void;
  signOut: () => void;
  addRoom: (input: Omit<Room, "id" | "rating"> & { rating?: number }) => Room;
  createReservation: (input: {
    roomId: string;
    startDate: Date;
    endDate: Date;
    paymentMethod?: string;
  }) => { success: boolean; message?: string; reservation?: Reservation };
  markReservationPaid: (id: string) => void;
  isRoomAvailable: (roomId: string, start: Date, end: Date) => boolean;
  stats: {
    totalReservations: number;
    activeReservations: number;
    paidReservations: number;
    rooms: number;
    revenue: number;
  };
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

const dayMs = 1000 * 60 * 60 * 24;

function nightsBetween(start: Date, end: Date) {
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  const diff = Math.max(1, Math.round((endUtc - startUtc) / dayMs));
  return diff;
}

function rangesOverlap(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA <= endB && startB <= endA;
}

const initialRooms: Room[] = [
  {
    id: "room-standard-1",
    name: "Standard Room",
    description: "Cozy room with sea breeze, perfect for solo travelers or couples.",
    location: "Uzi Island, Zanzibar",
    imageUrl: "https://images.pexels.com/photos/35526989/pexels-photo-35526989.jpeg",
    rating: 4.9,
    pricePerNight: 300,
    amenities: ["Single bed", "Flat screen TV", "Air conditioning"],
    services: ["wifi", "breakfast", "air-conditioning"],
    featured: true,
    category: "Guest Areas",
    subCategory: "Standard Rooms",
    capacity: 2,
  },
  {
    id: "room-family-1",
    name: "Family Room",
    description: "Spacious family-friendly room with two beds and kid-friendly touches.",
    location: "Uzi Island, Zanzibar",
    imageUrl: "https://images.pexels.com/photos/7546767/pexels-photo-7546767.jpeg",
    rating: 4.8,
    pricePerNight: 580,
    amenities: ["Two beds", "Flat screen TV", "Air conditioning"],
    services: ["wifi", "breakfast", "parking"],
    featured: true,
    category: "Guest Areas",
    subCategory: "Family Rooms",
    capacity: 4,
  },
  {
    id: "room-vip-1",
    name: "VIP Room",
    description: "Premium suite with lounge area, curated minibar, and concierge perks.",
    location: "Uzi Island, Zanzibar",
    imageUrl: "https://images.pexels.com/photos/35526997/pexels-photo-35526997.jpeg",
    rating: 4.9,
    pricePerNight: 390,
    amenities: ["King bed", "Flat screen TV", "Air conditioning"],
    services: ["wifi", "breakfast", "workspace", "laundry"],
    featured: true,
    category: "Guest Areas",
    subCategory: "Suites",
    capacity: 2,
  },
  {
    id: "room-vvip-1",
    name: "VVIP Room",
    description: "Ocean-view suite with private deck, tailored experiences, and butler call.",
    location: "Uzi Island, Zanzibar",
    imageUrl: "https://images.pexels.com/photos/14513797/pexels-photo-14513797.jpeg",
    rating: 4.9,
    pricePerNight: 480,
    amenities: ["King bed", "Flat screen TV", "Sound system"],
    services: ["wifi", "breakfast", "pool", "workspace"],
    featured: true,
    category: "Guest Areas",
    subCategory: "Signature Suites",
    capacity: 2,
  },
  {
    id: "room-garden-1",
    name: "Garden Area",
    description: "Lush garden surroundings with outdoor seating and sunrise walks.",
    location: "Uzi Island, Zanzibar",
    imageUrl: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg",
    rating: 4.6,
    pricePerNight: 310,
    amenities: ["Outdoor seating", "Walking trails"],
    services: ["wifi", "parking"],
    featured: false,
    category: "Outdoor & External Areas",
    subCategory: "Garden",
    capacity: 4,
  },
  {
    id: "room-breakfast-1",
    name: "Breakfast Lounge",
    description: "Buffet breakfast with local and international favorites daily.",
    location: "Uzi Island, Zanzibar",
    imageUrl: "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
    rating: 4.7,
    pricePerNight: 260,
    amenities: ["Buffet", "Coffee bar"],
    services: ["wifi", "breakfast"],
    featured: false,
    category: "Food & Beverage Areas",
    subCategory: "Breakfast",
    capacity: 20,
  },
];

const seedReservations: Reservation[] = [
  {
    id: "res-1",
    roomId: "room-standard-1",
    userId: "demo-user",
    userName: "Demo Guest",
    userEmail: "guest@example.com",
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + dayMs * 2).toISOString(),
    nights: 2,
    status: "paid",
    totalPrice: 600,
    paymentMethod: "card",
    createdAt: new Date().toISOString(),
  },
];

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [reservations, setReservations] = useState<Reservation[]>(seedReservations);
  const [user, setUser] = useState<BookingUser | null>(null);

  const signIn = ({ email, name }: { email: string; name: string }) => {
    const role = email.toLowerCase().includes("admin") ? "admin" : "customer";
    const payload: BookingUser = {
      id: email,
      name: name || email.split("@")[0] || "Guest",
      email,
      role,
    };
    setUser(payload);
  };

  const signOut = () => setUser(null);

  const isRoomAvailable = (roomId: string, start: Date, end: Date) => {
    const targetStart = new Date(start);
    const targetEnd = new Date(end);
    if (targetEnd < targetStart) return false;

    const overlapping = reservations.some((reservation) => {
      if (reservation.roomId !== roomId) return false;
      if (reservation.status === "cancelled") return false;
      const resStart = new Date(reservation.startDate);
      const resEnd = new Date(reservation.endDate);
      return rangesOverlap(resStart, resEnd, targetStart, targetEnd);
    });

    return !overlapping;
  };

  const createReservation: BookingContextValue["createReservation"] = ({
    roomId,
    startDate,
    endDate,
    paymentMethod,
  }) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return { success: false, message: "Room not found" };
    if (!user) return { success: false, message: "Please sign in to reserve." };

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return { success: false, message: "Select valid dates." };
    }
    if (end < start) return { success: false, message: "End date must be after start date." };

    const available = isRoomAvailable(roomId, start, end);
    if (!available) {
      return { success: false, message: "Room is not available for those dates." };
    }

    const nights = nightsBetween(start, end);
    const reservation: Reservation = {
      id: `res-${crypto.randomUUID()}`,
      roomId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      nights,
      status: "pending-payment",
      totalPrice: nights * room.pricePerNight,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    setReservations((prev) => [...prev, reservation]);
    return { success: true, reservation, message: "Reservation created. Complete payment to confirm." };
  };

  const addRoom: BookingContextValue["addRoom"] = (input) => {
    const newRoom: Room = {
      id: `room-${crypto.randomUUID()}`,
      rating: input.rating ?? 4.8,
      ...input,
    };
    setRooms((prev) => [newRoom, ...prev]);
    return newRoom;
  };

  const markReservationPaid = (id: string) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: "paid" as ReservationStatus }
          : reservation
      )
    );
  };

  const stats = useMemo(() => {
    const totalReservations = reservations.length;
    const paidReservations = reservations.filter((r) => r.status === "paid").length;
    const activeReservations = reservations.filter((r) => r.status !== "cancelled").length;
    const revenue = reservations
      .filter((r) => r.status === "paid" || r.status === "confirmed")
      .reduce((acc, curr) => acc + curr.totalPrice, 0);

    return {
      totalReservations,
      activeReservations,
      paidReservations,
      rooms: rooms.length,
      revenue,
    };
  }, [reservations, rooms.length]);

  const value: BookingContextValue = {
    user,
    rooms,
    reservations,
    signIn,
    signOut,
    addRoom,
    createReservation,
    markReservationPaid,
    isRoomAvailable,
    stats,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
