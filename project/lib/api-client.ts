// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

// Types matching backend
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  key: string;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  location?: string;
  image_url: string;
  price_per_night: number;
  rating?: number;
  capacity?: number;
  featured: boolean;
  category?: string;
  sub_category?: string;
  services?: Service[];
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: number;
  user_id: number;
  room_id: number;
  start_date: string;
  end_date: string;
  nights: number;
  status: 'pending-payment' | 'paid' | 'confirmed' | 'cancelled';
  total_price: number;
  payment_method?: string;
  user?: User;
  room?: Room;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_reservations: number;
  active_reservations: number;
  paid_reservations: number;
  pending_payments: number;
  total_revenue: number;
}

// API Client Class
class ApiClient {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: { name: string; email: string; password: string }) {
    const response = await this.request<{ user: User; token: string; message: string }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    this.setToken(response.token);
    return response;
  }

  async login(data: { email: string; password: string }) {
    const response = await this.request<{ user: User; token: string; message: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    this.setToken(response.token);
    return response;
  }

  async logout() {
    const response = await this.request<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
    this.setToken(null);
    return response;
  }

  async me() {
    return this.request<{ user: User }>('/auth/me');
  }

  // Room endpoints
  async getRooms(filters?: {
    category?: string;
    featured?: boolean;
    start_date?: string;
    end_date?: string;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }
    const queryString = params.toString();
    return this.request<{ rooms: Room[] }>(`/rooms${queryString ? `?${queryString}` : ''}`);
  }

  async getRoom(id: number) {
    return this.request<{ room: Room }>(`/rooms/${id}`);
  }

  async createRoom(data: {
    name: string;
    description: string;
    location?: string;
    image_url: string;
    price_per_night: number;
    rating?: number;
    capacity?: number;
    featured?: boolean;
    category?: string;
    sub_category?: string;
    services?: number[];
  }) {
    return this.request<{ room: Room; message: string }>('/rooms', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateRoom(id: number, data: Partial<Room>) {
    return this.request<{ room: Room; message: string }>(`/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteRoom(id: number) {
    return this.request<{ message: string }>(`/rooms/${id}`, {
      method: 'DELETE',
    });
  }

  async checkAvailability(
    roomId: number,
    data: { start_date: string; end_date: string }
  ) {
    return this.request<{
      available: boolean;
      room_id: number;
      start_date: string;
      end_date: string;
    }>(`/rooms/${roomId}/check-availability`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Service endpoints
  async getServices() {
    return this.request<{ services: Service[] }>('/services');
  }

  async createService(data: { name: string; key: string }) {
    return this.request<{ service: Service; message: string }>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Reservation endpoints
  async getReservations(filters?: { status?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) {
      params.append('status', filters.status);
    }
    const queryString = params.toString();
    return this.request<{ reservations: Reservation[] }>(
      `/reservations${queryString ? `?${queryString}` : ''}`
    );
  }

  async getReservation(id: number) {
    return this.request<{ reservation: Reservation }>(`/reservations/${id}`);
  }

  async createReservation(data: {
    room_id: number;
    start_date: string;
    end_date: string;
    payment_method?: string;
  }) {
    return this.request<{ reservation: Reservation; message: string }>(
      '/reservations',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  async updateReservationStatus(
    id: number,
    status: 'pending-payment' | 'paid' | 'confirmed' | 'cancelled'
  ) {
    return this.request<{ reservation: Reservation; message: string }>(
      `/reservations/${id}/status`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }
    );
  }

  async cancelReservation(id: number) {
    return this.request<{ message: string }>(`/reservations/${id}/cancel`, {
      method: 'POST',
    });
  }

  // Admin endpoints
  async getDashboardStats() {
    return this.request<{ stats: DashboardStats }>('/admin/stats');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
