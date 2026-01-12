"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  apiClient,
  type DashboardStats,
  type Reservation as ApiReservation,
  type Room as ApiRoom,
  type Service,
  type User,
} from "@/lib/api-client";

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

export interface BookingUser extends User {}

export interface Room {
  id: string;
  numericId: number;
  name: string;
  description: string;
  location?: string | null;
  imageUrl: string;
  image_url: string;
  pricePerNight: number;
  price_per_night: number;
  rating?: number;
  capacity?: number;
  featured?: boolean;
  category?: string | null;
  subCategory?: string | null;
  sub_category?: string | null;
  amenities: string[];
  services: ServiceOption[];
  raw: ApiRoom;
}

export interface Reservation {
  id: string;
  numericId: number;
  roomId: string;
  room_id: number;
  userId: string;
  user_id: number;
  userName: string;
  userEmail: string;
  startDate: string;
  start_date: string;
  endDate: string;
  end_date: string;
  nights: number;
  status: ReservationStatus;
  totalPrice: number;
  total_price: number;
  paymentMethod?: string | null;
  createdAt: string;
  created_at: string;
  room?: Room;
  raw: ApiReservation;
}

interface BookingContextValue {
  user: BookingUser | null;
  loading: boolean;
  rooms: Room[];
  reservations: Reservation[];
  services: Service[];
  stats: DashboardStats | null;
  signIn: (payload: { email: string; password: string }) => Promise<{ success: boolean; message?: string }>;
  register: (payload: { name: string; email: string; password: string }) => Promise<{ success: boolean; message?: string }>;
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
    imageUrl: string;
    pricePerNight: number;
    rating?: number;
    capacity?: number;
    featured?: boolean;
    category?: string;
    subCategory?: string;
    services?: ServiceOption[];
  }) => Promise<{ success: boolean; message?: string }>;
  createReservation: (input: {
    roomId: string;
    startDate: Date;
    endDate: Date;
    paymentMethod?: string;
  }) => Promise<{ success: boolean; message?: string; reservation?: Reservation }>;
  markReservationPaid: (id: string) => Promise<void>;
  cancelReservation: (id: string) => Promise<void>;
  isRoomAvailable: (roomId: string, start: Date, end: Date) => Promise<boolean>;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<BookingUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const serviceKeyToId = useMemo(() => {
    return new Map(services.map((service) => [service.key, service.id]));
  }, [services]);

  const restoreSession = useCallback(async () => {
    if (!apiClient.getToken()) return;
    try {
      const { user: userData } = await apiClient.me();
      setUser(userData);
    } catch (error) {
      console.error("Failed to restore auth session", error);
      apiClient.setToken(null);
      setUser(null);
    }
  }, []);

  const fetchRooms = useCallback(
    async (filters?: {
      category?: string;
      featured?: boolean;
      start_date?: string;
      end_date?: string;
    }) => {
      try {
        const { rooms: roomData } = await apiClient.getRooms(filters);
        setRooms(roomData.map(normalizeRoom));
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      }
    },
    []
  );

  const fetchServices = useCallback(async () => {
    try {
      const { services: serviceData } = await apiClient.getServices();
      setServices(serviceData);
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  }, []);

  const fetchReservations = useCallback(async () => {
    if (!apiClient.getToken()) return;
    try {
      const { reservations: reservationData } = await apiClient.getReservations();
      setReservations(reservationData.map(normalizeReservation));
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    if (!apiClient.getToken()) return;
    try {
      const { stats: statsData } = await apiClient.getDashboardStats();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      setLoading(true);
      await Promise.all([restoreSession(), fetchRooms(), fetchServices()]);
      setLoading(false);
    };
    bootstrap();
  }, [restoreSession, fetchRooms, fetchServices]);

  useEffect(() => {
    if (!user) {
      setReservations([]);
      setStats(null);
      return;
    }
    fetchReservations();
    if (user.role === "admin") {
      fetchStats();
    }
  }, [user, fetchReservations, fetchStats]);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const { user: userData } = await apiClient.login({ email, password });
        setUser(userData);
        await Promise.all([fetchReservations(), userData.role === "admin" ? fetchStats() : Promise.resolve()]);
        return { success: true };
      } catch (error: any) {
        return { success: false, message: error.message || "Login failed" };
      }
    },
    [fetchReservations, fetchStats]
  );

  const register = useCallback(
    async ({ name, email, password }: { name: string; email: string; password: string }) => {
      try {
        const { user: userData } = await apiClient.register({ name, email, password });
        setUser(userData);
        return { success: true };
      } catch (error: any) {
        return { success: false, message: error.message || "Registration failed" };
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      if (apiClient.getToken()) {
        await apiClient.logout();
      }
    } catch (error) {
      console.error("Error during logout", error);
    } finally {
      apiClient.setToken(null);
      setUser(null);
      setReservations([]);
      setStats(null);
    }
  }, []);

  const addRoom: BookingContextValue["addRoom"] = useCallback(
    async (input) => {
      if (!user || user.role !== "admin") {
        return { success: false, message: "Only admins can add rooms." };
      }

      try {
        const serviceIds = (input.services || [])
          .map((key) => serviceKeyToId.get(key))
          .filter((id): id is number => typeof id === "number");

        const { room, message } = await apiClient.createRoom({
          name: input.name,
          description: input.description,
          location: input.location,
          image_url: input.imageUrl,
          price_per_night: input.pricePerNight,
          rating: input.rating,
          capacity: input.capacity,
          featured: input.featured,
          category: input.category,
          sub_category: input.subCategory,
          services: serviceIds,
        });

        setRooms((prev) => [normalizeRoom(room), ...prev]);
        return { success: true, message };
      } catch (error: any) {
        return { success: false, message: error.message || "Failed to create room" };
      }
    },
    [serviceKeyToId, user]
  );

  const createReservation: BookingContextValue["createReservation"] = useCallback(
    async ({ roomId, startDate, endDate, paymentMethod }) => {
      if (!user) {
        return { success: false, message: "Please sign in to reserve." };
      }

      const targetRoom = rooms.find((room) => room.id === roomId || String(room.numericId) === roomId);
      const numericRoomId = targetRoom?.numericId ?? Number(roomId);
      if (!numericRoomId) {
        return { success: false, message: "Room not found." };
      }

      try {
        const { reservation, message } = await apiClient.createReservation({
          room_id: numericRoomId,
          start_date: formatDate(startDate),
          end_date: formatDate(endDate),
          payment_method: paymentMethod,
        });
        const normalized = normalizeReservation(reservation);
        setReservations((prev) => [normalized, ...prev]);
        return { success: true, message, reservation: normalized };
      } catch (error: any) {
        return { success: false, message: error.message || "Failed to create reservation" };
      }
    },
    [rooms, user]
  );

  const markReservationPaid = useCallback(
    async (id: string) => {
      const numericId = Number(id);
      if (!numericId) return;
      try {
        const { reservation } = await apiClient.updateReservationStatus(numericId, "paid");
        const normalized = normalizeReservation(reservation);
        setReservations((prev) => prev.map((res) => (res.numericId === numericId ? normalized : res)));
      } catch (error) {
        console.error("Failed to update reservation status", error);
      }
    },
    []
  );

  const cancelReservation = useCallback(async (id: string) => {
    const numericId = Number(id);
    if (!numericId) return;
    try {
      await apiClient.cancelReservation(numericId);
      setReservations((prev) => prev.map((res) => (res.numericId === numericId ? { ...res, status: "cancelled" } : res)));
    } catch (error) {
      console.error("Failed to cancel reservation", error);
    }
  }, []);

  const isRoomAvailable = useCallback(async (roomId: string, start: Date, end: Date) => {
    const targetRoom = rooms.find((room) => room.id === roomId || String(room.numericId) === roomId);
    const numericRoomId = targetRoom?.numericId ?? Number(roomId);
    if (!numericRoomId) return false;

    try {
      const { available } = await apiClient.checkAvailability(numericRoomId, {
        start_date: formatDate(start),
        end_date: formatDate(end),
      });
      return available;
    } catch (error) {
      console.error("Failed to check availability", error);
      return false;
    }
  }, [rooms]);

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
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

function normalizeRoom(room: ApiRoom): Room {
  return {
    id: String(room.id),
    numericId: room.id,
    name: room.name,
    description: room.description,
    location: room.location,
    imageUrl: room.image_url,
    image_url: room.image_url,
    pricePerNight: Number(room.price_per_night),
    price_per_night: Number(room.price_per_night),
    rating: room.rating ? Number(room.rating) : undefined,
    capacity: room.capacity ?? undefined,
    featured: room.featured ?? false,
    category: room.category,
    subCategory: room.sub_category,
    sub_category: room.sub_category,
    amenities: room.services?.map((service) => service.name) ?? [],
    services: room.services?.map((service) => service.key as ServiceOption) ?? [],
    raw: room,
  };
}

function normalizeReservation(reservation: ApiReservation): Reservation {
  return {
    id: String(reservation.id),
    numericId: reservation.id,
    roomId: String(reservation.room_id),
    room_id: reservation.room_id,
    userId: String(reservation.user_id),
    user_id: reservation.user_id,
    userName: reservation.user?.name || "Guest",
    userEmail: reservation.user?.email || "",
    startDate: reservation.start_date,
    start_date: reservation.start_date,
    endDate: reservation.end_date,
    end_date: reservation.end_date,
    nights: reservation.nights,
    status: reservation.status,
    totalPrice: Number(reservation.total_price),
    total_price: Number(reservation.total_price),
    paymentMethod: reservation.payment_method,
    createdAt: reservation.created_at,
    created_at: reservation.created_at,
    room: reservation.room ? normalizeRoom(reservation.room) : undefined,
    raw: reservation,
  };
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
