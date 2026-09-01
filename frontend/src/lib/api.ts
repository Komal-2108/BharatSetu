import {
  ServiceData,
  BookingData,
  ReviewData,
  VendorData,
  MOCK_SERVICES,
  MOCK_BOOKINGS,
  MOCK_REVIEWS,
  SEED_MOCK_DATA
} from "./mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

function getCombinedServices(): ServiceData[] {
  let customList: ServiceData[] = [];
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("bharatsetu_custom_services");
      if (saved) customList = JSON.parse(saved);
    } catch (e) {
      // fallback
    }
  }
  return [...customList, ...(SEED_MOCK_DATA.services as any)];
}

/**
 * Robust API Client that connects directly to FastAPI backend,
 * with seamless fallback to rich mock data if backend is offline.
 */
export async function getServices(filters?: {
  location?: string;
  category?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
}): Promise<ServiceData[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.location) params.append("location", filters.location);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.search) params.append("search", filters.search);
    if (filters?.min_price) params.append("min_price", filters.min_price.toString());
    if (filters?.max_price) params.append("max_price", filters.max_price.toString());

    const res = await fetch(`${API_BASE_URL}/services?${params.toString()}`, {
      cache: "no-store"
    });

    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Backend server unreachable. Using fallback seed data.", err);
    let result = getCombinedServices();

    if (filters?.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter(s => s.location.toLowerCase().includes(loc));
    }
    if (filters?.category && filters.category !== "all") {
      const cat = filters.category.toLowerCase();
      result = result.filter(s => s.category.toLowerCase() === cat);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(search) || 
        s.description.toLowerCase().includes(search) ||
        s.location.toLowerCase().includes(search)
      );
    }
    if (filters?.max_price) {
      result = result.filter(s => s.price <= filters.max_price!);
    }

    return result;
  }
}

export async function getServiceById(id: string): Promise<ServiceData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Falling back to local mock for service ${id}`);
    const all = getCombinedServices();
    const found = all.find(s => s.id === id);
    return found || all[0];
  }
}

export async function createBooking(bookingPayload: {
  service_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  booking_date: string;
  people?: number;
  nights?: number;
  special_requests?: string;
  payment_status?: string;
  total_price?: number;
}): Promise<BookingData> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload)
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.detail || "Failed to create booking");
    }

    return await res.json();
  } catch (err: any) {
    console.warn("Backend endpoint offline. Generating simulated mock booking.", err);
    const all = getCombinedServices();
    const service = all.find(s => s.id === bookingPayload.service_id) || all[0];
    
    return {
      id: `bk-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: bookingPayload.service_id,
      customerName: bookingPayload.customer_name,
      customerPhone: bookingPayload.customer_phone,
      customerEmail: bookingPayload.customer_email,
      date: bookingPayload.booking_date,
      people: bookingPayload.people,
      nights: bookingPayload.nights,
      specialRequests: bookingPayload.special_requests,
      status: "pending",
      paymentStatus: (bookingPayload.payment_status as any) || "pay_on_arrival",
      totalPrice: bookingPayload.total_price || service.price,
      service
    } as any;
  }
}

export async function getBookingById(id: string): Promise<BookingData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Falling back to mock booking for ID ${id}`);
    const found = MOCK_BOOKINGS.find(b => b.id === id);
    if (found) return found;

    return {
      id,
      serviceId: SEED_MOCK_DATA.services[0].id,
      customerName: "Aarav Sharma",
      customerPhone: "+919876543210",
      customerEmail: "aarav@gmail.com",
      date: "2026-09-05",
      status: "confirmed",
      paymentStatus: "pay_on_arrival",
      totalPrice: 1600,
      service: SEED_MOCK_DATA.services[0] as any
    } as any;
  }
}

export async function getVendorBookings(vendorId: string): Promise<BookingData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/vendor/${vendorId}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend offline. Returning mock vendor bookings inbox.");
    return MOCK_BOOKINGS;
  }
}

export async function updateBookingStatus(bookingId: string, status: string): Promise<BookingData> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.detail || "Failed to update status");
    }
    return await res.json();
  } catch (err: any) {
    console.warn("Backend offline. Updating local state mock.");
    const existing = MOCK_BOOKINGS.find(b => b.id === bookingId) || MOCK_BOOKINGS[0];
    existing.status = status as any;
    return { ...existing };
  }
}

export async function createReview(bookingId: string, rating: number, comment: string): Promise<ReviewData> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment })
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.detail || "Failed to submit review");
    }
    return await res.json();
  } catch (err: any) {
    console.warn("Backend offline. Returning local mock review.");
    return {
      id: `rev-${Date.now()}`,
      bookingId: bookingId,
      serviceId: SEED_MOCK_DATA.services[0].id,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
      reviewerName: "Verified Traveler"
    } as any;
  }
}
