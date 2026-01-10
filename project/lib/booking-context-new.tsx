"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  apiClient,
  type User,
  type Room,
  type Reservation,
  type Service,
  type DashboardStats,
} from "./api-client";

export type ServiceOption = Service["key"];
export type ReservationStatus = Reservation["status"];

export interface BookingUser extends User {}

interface BookingContextValue {
  user: BookingUser | null;
  loading: boolean;
  rooms: Room[];
  reservations: Reservation[];
  services: Service[];
  stats: DashboardStats | null;
  signIn: (payload: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  fetchRooms: (filters?: {
    category?: string;
    featured?: boolean;
    start_date?: string;
    end_date?: string;
  }) => Promise<void>;
  addRoom: (input: {
    name: string;
    description: string;
    location?: string;
    image_url: string;
    price_per_night: number;
    rating?: number;
    capacity?: number;
    featured?: boolean;
    category?: string;
    services: number[];
  }) => Promise<{ success: boolean; message?: string; room?: Room }>;
  createReservation: (input: {
    room_id: number;
    start_date: string;
    end_date: string;
    payment_method?: string;
  }) => Promise<{ success: boolean; message?: string; reservation?: Reservation }>;
  markReservationPaid: (id: number) => Promise<void>;
  cancelReservation: (id: number) => Promise<void>;
  isRoomAvailable: (
    roomId: number,
    startDate: string,
    endDate: string
  ) => Promise<boolean>;
  fetchReservations: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchStats: () => Promise<void>;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<BookingUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (apiClient.getToken()) {
          const { user: userData } = await apiClient.me();
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to check auth:", error);
        apiClient.setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Load initial data when user logs in
  useEffect(() => {
    if (user) {
      fetchRooms();
      fetchReservations();
      fetchServices();
      if (user.role === "admin") {
        fetchStats();
      }
    }
  }, [user]);

  const signIn = async (payload: { email: string; password: string }) => {
    try {
      const { user: userData } = await apiClient.login(payload);
      setUser(userData);
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message || "Login failed" };
    }
  };

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { user: userData } = await apiClient.register(payload);
      setUser(userData);
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message || "Registration failed" };
    }
  };

  const signOut = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setRooms([]);
      setReservations([]);
      setStats(null);
    }
  };

  const fetchRooms = async (filters?: {
    category?: string;
    featured?: boolean;
    start_date?: string;
    end_date?: string;
  }) => {
    try {
      const { rooms: roomsData } = await apiClient.getRooms(filters);
      setRooms(roomsData);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  };

  const addRoom = async (input: {
    name: string;
    description: string;
    location?: string;
    image_url: string;
    price_per_night: number;
    rating?: number;
    capacity?: number;
    featured?: boolean;
    category?: string;
    services: number[];
  }) => {
    try {
      const { room, message } = await apiClient.createRoom(input);
      setRooms((prev) => [...prev, room]);
      return { success: true, message, room };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to create room" };
    }
  };

  const createReservation = async (input: {
    room_id: number;
    start_date: string;
    end_date: string;
    payment_method?: string;
  }) => {
    try {
      const { reservation, message } = await apiClient.createReservation(input);
      setReservations((prev) => [...prev, reservation]);
      return { success: true, message, reservation };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to create reservation",
      };
    }
  };

  const markReservationPaid = async (id: number) => {
    try {
      const { reservation } = await apiClient.updateReservationStatus(id, "paid");
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? reservation : r))
      );
    } catch (error) {
      console.error("Failed to mark reservation as paid:", error);
      throw error;
    }
  };

  const cancelReservation = async (id: number) => {
    try {
      await apiClient.cancelReservation(id);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "cancelled" as const } : r))
      );
    } catch (error) {
      console.error("Failed to cancel reservation:", error);
      throw error;
    }
  };

  const isRoomAvailable = async (
    roomId: number,
    startDate: string,
    endDate: string
  ): Promise<boolean> => {
    try {
      const { available } = await apiClient.checkAvailability(roomId, {
        start_date: startDate,
        end_date: endDate,
      });
      return available;
    } catch (error) {
      console.error("Failed to check availability:", error);
      return false;
    }
  };

  const fetchReservations = async () => {
    try {
      const { reservations: reservationsData } = await apiClient.getReservations();
      setReservations(reservationsData);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const { services: servicesData } = await apiClient.getServices();
      setServices(servicesData);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const { stats: statsData } = await apiClient.getDashboardStats();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const value: BookingContextValue = {
    user,
    loading,
    rooms,
    reservations,
    services,
    stats,
    signIn,
    register,
    signOut,
    fetchRooms,
    addRoom,
    createReservation,
    markReservationPaid,
    cancelReservation,
    isRoomAvailable,
    fetchReservations,
    fetchServices,
    fetchStats,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
