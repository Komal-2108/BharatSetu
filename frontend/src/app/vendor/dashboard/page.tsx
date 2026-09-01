"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Calendar,
  Compass,
  User,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Edit,
  ShieldCheck,
  RefreshCw,
  TrendingUp,
  Award,
  Star,
  LogOut
} from "lucide-react";
import { updateBookingStatus } from "@/lib/api";
import { SEED_MOCK_DATA, ServiceData, BookingData, VendorData } from "@/lib/mockData";
import StatusPill from "@/components/StatusPill";
import VerifiedBadge from "@/components/VerifiedBadge";
import EmptyState from "@/components/EmptyState";
import CancelModal from "@/components/CancelModal";
import ReviewModal from "@/components/ReviewModal";
import { useApp } from "@/context/AppContext";

export default function VendorDashboardPage() {
  const router = useRouter();
  const { user } = useApp();

  const [currentVendor, setCurrentVendor] = useState<VendorData>(SEED_MOCK_DATA.vendors[0] as any);
  const [activeTab, setActiveTab] = useState<"bookings" | "services">("services");
  const [allServices, setAllServices] = useState<ServiceData[]>(SEED_MOCK_DATA.services as any);
  const [allBookings, setAllBookings] = useState<BookingData[]>(SEED_MOCK_DATA.bookings as any);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Modals state
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<string | null>(null);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<BookingData | null>(null);

  // Route Guard & Session + Custom Services Loader Init
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("bharatsetu_user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.role === "customer") {
          alert("This page is for vendors only.");
          router.push("/");
          return;
        }
      }

      const savedVendor = localStorage.getItem("bharatsetu_vendor") || localStorage.getItem("bharatsetu_user");
      if (savedVendor) {
        const parsed = JSON.parse(savedVendor);
        setCurrentVendor(parsed);
      }

      // Load locally created custom services
      const savedCustomServices = localStorage.getItem("bharatsetu_custom_services");
      if (savedCustomServices) {
        const customList: ServiceData[] = JSON.parse(savedCustomServices);
        setAllServices([...customList, ...(SEED_MOCK_DATA.services as any)]);
      }
    } catch (e) {
      console.warn("Failed to load vendor session or custom services");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("bharatsetu_user");
    localStorage.removeItem("bharatsetu_vendor");
    localStorage.removeItem("bharatsetu_token");
    router.push("/login");
  };

  // Filter listings & bookings strictly for CURRENT LOGGED-IN VENDOR
  const vendorServices = allServices.filter((s: any) => {
    return (
      s.vendorId === currentVendor.id ||
      s.vendor_id === currentVendor.id ||
      s.vendorName === currentVendor.name ||
      s.vendor_name === currentVendor.name
    );
  });

  const vendorBookings = allBookings.filter((b: any) => {
    if (b.service) {
      return b.service.vendorId === currentVendor.id || b.service.vendor_id === currentVendor.id;
    }
    return vendorServices.some((s) => s.id === b.serviceId || s.id === b.service_id);
  });

  const handleStatusChange = async (bookingId: string, newStatus: string, reason?: string) => {
    setUpdatingId(bookingId);
    try {
      await updateBookingStatus(bookingId, newStatus);
      setAllBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, status: newStatus as any, cancellation_reason: reason }
            : b
        )
      );
    } catch (err: any) {
      setAllBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, status: newStatus as any, cancellation_reason: reason }
            : b
        )
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Analytics Calculations
  const completedBookings = vendorBookings.filter((b) => b.status === "completed");
  const estimatedRevenue = completedBookings.reduce((sum, b) => sum + (b.totalPrice || b.service?.price || 1200), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* VENDOR PROFILE HEADER BAR */}
      <div className="bg-white dark:bg-card-dark rounded-3xl p-6 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard flex flex-col md:flex-row md:items-center justify-between gap-6">

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-terracotta text-white font-serif font-extrabold text-2xl flex items-center justify-center shadow-lift shrink-0">
            {currentVendor.name ? currentVendor.name.charAt(0) : "V"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-2xl text-charcoal dark:text-white">
                {currentVendor.name}
              </h1>
              <VerifiedBadge variant="tier" tier={currentVendor.trustTier || (currentVendor as any).trust_tier || "Gold"} />
            </div>
            <p className="text-xs text-charcoal-light/70 dark:text-gray-400 mt-0.5">
              {currentVendor.location ||
                ((currentVendor as any).city && (currentVendor as any).state
                  ? `${(currentVendor as any).city}, ${(currentVendor as any).state}`
                  : (currentVendor as any).city || (currentVendor as any).state || "Verified Service Host")} • Vendor ID: <code className="font-mono text-terracotta">{currentVendor.id}</code>
            </p>
          </div>
        </div>

        {/* PROFILE ACTIONS */}
        <div className="flex items-center gap-3">

          <Link
            href="/vendor/services/new"
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-warm transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Service
          </Link>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl border border-border dark:border-border-dark text-charcoal dark:text-white hover:bg-red-50 dark:hover:bg-red-950 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Log Out"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span>Logout</span>
          </button>

        </div>

      </div>

      {/* VENDOR METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-card-dark rounded-2xl p-4 border border-border dark:border-border-dark shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-charcoal-light/60 dark:text-gray-400 font-bold uppercase tracking-wider block">Estimated Earnings</span>
            <span className="font-serif font-extrabold text-2xl text-charcoal dark:text-white">₹{estimatedRevenue.toLocaleString("en-IN")}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sage-light text-sage flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-2xl p-4 border border-border dark:border-border-dark shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-charcoal-light/60 dark:text-gray-400 font-bold uppercase tracking-wider block">My Listed Services</span>
            <span className="font-serif font-extrabold text-2xl text-charcoal dark:text-white">{vendorServices.length} Listings</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-terracotta-light text-terracotta flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-2xl p-4 border border-border dark:border-border-dark shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-charcoal-light/60 dark:text-gray-400 font-bold uppercase tracking-wider block">Trust Level</span>
            <span className="font-bold text-base text-amber-600 dark:text-amber-400">🥇 {currentVendor.trustTier || "Gold"} Tier</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 flex items-center justify-center font-bold text-xs">
            100%
          </div>
        </div>
      </div>

      {/* DASHBOARD NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-border dark:border-border-dark pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab("services")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === "services" ? "bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-xs" : "text-charcoal-light dark:text-gray-400 hover:bg-sand dark:hover:bg-sand-dark"
            }`}
        >
          <Compass className="w-4 h-4 text-terracotta" />
          Listed Services ({vendorServices.length})
        </button>

        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === "bookings" ? "bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-xs" : "text-charcoal-light dark:text-gray-400 hover:bg-sand dark:hover:bg-sand-dark"
            }`}
        >
          <Calendar className="w-4 h-4 text-terracotta" />
          Incoming Bookings ({vendorBookings.length})
        </button>
      </div>

      {/* TAB 1: MY SERVICES */}
      {activeTab === "services" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-xl text-charcoal dark:text-white">
              Listed Services for {currentVendor.name}
            </h2>
            <Link
              href="/vendor/services/new"
              className="text-xs font-bold text-terracotta hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" /> Add Another Service
            </Link>
          </div>

          {vendorServices.length === 0 ? (
            <EmptyState
              icon="compass"
              title={`No Services Listed for ${currentVendor.name}`}
              description="Create your first hyperlocal listing to start receiving customer bookings."
              actionLabel="Create New Service Listing"
              actionHref="/vendor/services/new"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vendorServices.map((srv: any) => (
                <div key={srv.id} className="bg-white dark:bg-card-dark rounded-3xl p-5 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-4 flex flex-col justify-between">
                  <div className="flex gap-4">
                    <img
                      src={srv.images?.[0] || "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600"}
                      alt=""
                      className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-border dark:border-border-dark"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta-light dark:bg-terracotta/20 px-2 py-0.5 rounded">
                        {srv.category}
                      </span>
                      <h3 className="font-serif font-bold text-base text-charcoal dark:text-white line-clamp-1">{srv.title}</h3>
                      <div className="font-serif font-bold text-sm text-charcoal dark:text-white pt-1">
                        ₹{srv.price?.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border dark:border-border-dark flex items-center justify-between text-xs">
                    <span className="text-charcoal-light/60 dark:text-gray-400 font-medium">Available: <b>{(srv.availableDates || srv.available_dates || []).length} slots</b></span>
                    <Link href={`/services/${srv.id}`} className="text-terracotta font-semibold hover:underline">
                      Preview Listing →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INCOMING BOOKINGS INBOX */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-xl text-charcoal dark:text-white">
              Customer Bookings for {currentVendor.name}
            </h2>
            <span className="text-xs text-charcoal-light/60 dark:text-gray-400">
              📲 Confirmations trigger Twilio WhatsApp notifications
            </span>
          </div>

          {vendorBookings.length === 0 ? (
            <EmptyState
              icon="calendar"
              title={`No Bookings Yet for ${currentVendor.name}`}
              description="You have no customer booking requests matching your listed services."
              actionLabel="Add Service Listing"
              actionHref="/vendor/services/new"
            />
          ) : (
            <div className="bg-white dark:bg-card-dark rounded-3xl border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-charcoal dark:text-gray-200">
                  <tbody className="divide-y divide-border dark:divide-border-dark">
                    {vendorBookings.map((b: any) => (
                      <tr key={b.id} className="hover:bg-sand/20 dark:hover:bg-sand-dark/20 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-terracotta">
                          #{b.id.toUpperCase()}
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-bold block text-sm">{b.customerName || b.customer_name}</span>
                          <span className="text-[11px] text-charcoal-light/70 dark:text-gray-400 block">{b.customerPhone || b.customer_phone}</span>
                        </td>

                        <td className="py-4 px-4 font-medium max-w-xs truncate">
                          {b.service?.title || vendorServices[0]?.title || "Local Experience"}
                        </td>

                        <td className="py-4 px-4 font-semibold text-charcoal dark:text-white">
                          {b.date || b.booking_date}
                        </td>

                        <td className="py-4 px-4">
                          <StatusPill status={b.status} />
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            {b.status === "pending" && (
                              <>
                                <button
                                  disabled={updatingId === b.id}
                                  onClick={() => handleStatusChange(b.id, "confirmed")}
                                  className="bg-sage hover:bg-sage-dark text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-xs transition-all flex items-center gap-1"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Confirm
                                </button>

                                <button
                                  disabled={updatingId === b.id}
                                  onClick={() => {
                                    setSelectedBookingForCancel(b.id);
                                    setCancelModalOpen(true);
                                  }}
                                  className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 font-medium text-[11px] px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-800"
                                >
                                  Cancel
                                </button>
                              </>
                            )}

                            {b.status === "confirmed" && (
                              <button
                                disabled={updatingId === b.id}
                                onClick={() => handleStatusChange(b.id, "completed")}
                                className="bg-charcoal text-white dark:bg-white dark:text-charcoal font-bold text-[11px] px-3 py-1.5 rounded-lg"
                              >
                                Mark Completed
                              </button>
                            )}

                            {b.status === "completed" && (
                              <span className="text-[10px] text-sage font-bold">✓ Trip Completed</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CANCELLATION MODAL */}
      {selectedBookingForCancel && (
        <CancelModal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          bookingId={selectedBookingForCancel}
          onConfirmCancel={(reason) => handleStatusChange(selectedBookingForCancel, "cancelled", reason)}
        />
      )}

    </div>
  );
}
