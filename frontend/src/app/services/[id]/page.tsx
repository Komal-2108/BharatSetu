"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  MapPin, 
  Star, 
  Calendar as CalendarIcon, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  ArrowLeft, 
  Send, 
  MessageSquare, 
  Share2, 
  Eye, 
  Clock, 
  Sparkles, 
  Check, 
  Globe,
  Users,
  CreditCard,
  ArrowRight
} from "lucide-react";
import { getServiceById, createBooking } from "@/lib/api";
import { ServiceData } from "@/lib/mockData";
import VerifiedBadge from "@/components/VerifiedBadge";
import RouteProgress from "@/components/RouteProgress";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { useApp } from "@/context/AppContext";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params?.id as string;
  const { t, user } = useApp();

  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Booking Flow Steps (Step 1: Trip details, Step 2: Your details, Step 3: Review & confirm)
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [selectedDate, setSelectedDate] = useState("");
  const [peopleOrNights, setPeopleOrNights] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");

  const [customerName, setCustomerName] = useState(user?.name || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");

  const [paymentChoice, setPaymentChoice] = useState<"pay_on_arrival" | "advance_paid">("pay_on_arrival");
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!serviceId) return;
      setLoading(true);
      const data = await getServiceById(serviceId);
      if (data) {
        setService(data);
        if (data.availableDates && data.availableDates.length > 0) {
          setSelectedDate(data.availableDates[0]);
        } else if (data.available_dates && data.available_dates.length > 0) {
          setSelectedDate(data.available_dates[0]);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [serviceId]);

  // Sync user details if logged in
  useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.name);
      if (!customerPhone) setCustomerPhone(user.phone);
      if (!customerEmail) setCustomerEmail(user.email);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-charcoal-light font-medium text-sm">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-charcoal dark:text-white mb-4">Service Listing Not Found</h2>
        <Link href="/" className="inline-flex items-center gap-2 bg-terracotta text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to All Listings
        </Link>
      </div>
    );
  }

  const basePrice = service.price;
  const totalPrice = basePrice * peopleOrNights;
  const isHomestay = service.category === "homestay";
  const vendorPhone = service.vendor?.phone || "+919876543210";

  const handleStep1Next = () => {
    if (!selectedDate) {
      setErrorMsg("Please select an available date.");
      return;
    }
    setErrorMsg("");
    setBookingStep(2);
  };

  const handleStep2Next = () => {
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setErrorMsg("Please fill in your name, phone, and email.");
      return;
    }
    setErrorMsg("");
    setBookingStep(3);
  };

  const handleFinalBookingSubmit = async () => {
    if (!agreedTerms) {
      setErrorMsg("Please agree to the cancellation policy terms.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const newBooking = await createBooking({
        service_id: service.id,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        booking_date: selectedDate,
        people: isHomestay ? undefined : peopleOrNights,
        nights: isHomestay ? peopleOrNights : undefined,
        special_requests: specialRequests,
        payment_status: paymentChoice,
        total_price: totalPrice
      });

      router.push(`/bookings/${newBooking.id}/confirmed`);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit booking request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Progress bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border dark:border-border-dark pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-charcoal dark:text-gray-200 hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Listings
        </Link>

        <div className="w-full md:w-auto">
          <RouteProgress
            steps={[
              { id: 1, label: "Step 1: Trip Details" },
              { id: 2, label: "Step 2: Your Details" },
              { id: 3, label: "Step 3: Review & Confirm" }
            ]}
            currentStep={bookingStep}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Gallery & Rich Service Content */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* IMAGE GALLERY */}
          <div className="space-y-3">
            <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-sand dark:bg-card-dark border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard relative">
              <img
                src={service.images[selectedImageIndex] || service.images[0]}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <VerifiedBadge variant="tier" tier={service.vendor?.trustTier || service.vendor_trust_tier || "Gold"} />
              </div>
            </div>

            {/* Thumbnails */}
            {service.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {service.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx ? "border-terracotta scale-95 shadow-md" : "border-border dark:border-border-dark opacity-70"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SERVICE HEADER */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-charcoal-light/70 dark:text-gray-400">
              <div className="flex items-center gap-1 font-semibold">
                <MapPin className="w-4 h-4 text-terracotta" />
                <span>{service.location}</span>
                <span>•</span>
                <span className="capitalize font-bold text-terracotta">{service.category}</span>
              </div>
              <span className="text-amber-500 font-bold">★ {service.rating || service.avg_rating || 4.8} ({service.reviewCount || service.total_reviews || 23} reviews)</span>
            </div>

            <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-charcoal dark:text-white leading-tight">
              {service.title}
            </h1>
          </div>

          {/* VENDOR CARD */}
          <div className="bg-sand/60 dark:bg-card-dark rounded-3xl p-5 border border-border dark:border-border-dark flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-terracotta text-white font-serif font-bold text-lg flex items-center justify-center shadow-xs">
                {service.vendor?.name ? service.vendor.name.charAt(0) : "V"}
              </div>
              <div>
                <h4 className="font-bold text-sm text-charcoal dark:text-white flex items-center gap-1.5">
                  {service.vendor?.name || service.vendor_name}
                  <VerifiedBadge variant="tier" tier={service.vendor?.trustTier || service.vendor_trust_tier || "Gold"} />
                </h4>
                <p className="text-xs text-charcoal-light/70 dark:text-gray-400">
                  Member since {service.vendor?.memberSince || "2023-04-12"} • {service.vendor?.responseTime || "Responds in 2h"}
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${vendorPhone.replace(/[^0-9]/g, "")}?text=Namaste!%20Inquiring%20about%20${encodeURIComponent(service.title)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-950 text-[#25D366] font-bold text-xs px-3.5 py-2 rounded-xl border border-green-200 dark:border-green-800 hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Pre-chat on WhatsApp
            </a>
          </div>

          {/* DESCRIPTION & INCLUSIONS */}
          <div className="space-y-4 pt-2">
            <h3 className="font-serif font-bold text-lg text-charcoal dark:text-white">Experience Description</h3>
            <p className="text-charcoal-light/80 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {service.description}
            </p>

            {/* Included items */}
            {((service.included && service.included.length > 0) || service.inclusions) && (
              <div className="bg-sand/40 dark:bg-card-dark p-5 rounded-3xl border border-border dark:border-border-dark space-y-3">
                <h3 className="font-serif font-bold text-base text-charcoal dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sage" /> What&apos;s Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {(service.included || service.inclusions || []).map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-charcoal dark:text-gray-200">
                      <span className="w-4 h-4 rounded-full bg-sage-light text-sage flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Details Table */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {service.duration && (
                <div className="p-3.5 rounded-2xl bg-sand/40 dark:bg-card-dark border border-border space-y-0.5">
                  <span className="text-charcoal-light/60 font-bold block">⏱️ Duration</span>
                  <span className="font-bold text-charcoal dark:text-white">{service.duration}</span>
                </div>
              )}
              {service.groupSize && (
                <div className="p-3.5 rounded-2xl bg-sand/40 dark:bg-card-dark border border-border space-y-0.5">
                  <span className="text-charcoal-light/60 font-bold block">👥 Group Size</span>
                  <span className="font-bold text-charcoal dark:text-white">{service.groupSize}</span>
                </div>
              )}
              {service.languages && (
                <div className="p-3.5 rounded-2xl bg-sand/40 dark:bg-card-dark border border-border space-y-0.5">
                  <span className="text-charcoal-light/60 font-bold block">🗣️ Languages</span>
                  <span className="font-bold text-charcoal dark:text-white">{service.languages.join(", ")}</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: 3-STEP INTERACTIVE BOOKING WIDGET */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white dark:bg-card-dark rounded-3xl p-6 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-6">
            
            {/* PRICE HEADER */}
            <div className="flex items-baseline justify-between border-b border-border dark:border-border-dark pb-4">
              <div>
                <span className="text-xs text-charcoal-light/60 dark:text-gray-400 font-medium block">Price per booking</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif font-extrabold text-3xl text-charcoal dark:text-white">
                    ₹{basePrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-charcoal-light/70 dark:text-gray-400 font-sans">
                    /{service.priceUnit || (isHomestay ? "per night" : "per person")}
                  </span>
                </div>
              </div>
              <VerifiedBadge variant="compact" text="WhatsApp Confirm" />
            </div>

            {errorMsg && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 font-semibold">
                {errorMsg}
              </div>
            )}

            {/* STEP 1: TRIP DETAILS */}
            {bookingStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-base text-charcoal dark:text-white flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-terracotta" /> Step 1: Select Date & Group Size
                </h3>

                <AvailabilityCalendar
                  availableDates={service.availableDates || service.available_dates || ["2026-09-05", "2026-09-06"]}
                  selectedDate={selectedDate}
                  onSelectDate={(d) => setSelectedDate(d)}
                />

                {/* Group size / Nights selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal dark:text-white flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-terracotta" />
                    {isHomestay ? "Number of Nights" : "Number of Guests"}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPeopleOrNights(Math.max(1, peopleOrNights - 1))}
                      className="w-10 h-10 rounded-xl bg-sand dark:bg-sand-dark border border-border dark:border-border-dark font-bold text-base"
                    >
                      -
                    </button>
                    <span className="font-serif font-bold text-lg text-charcoal dark:text-white w-8 text-center">
                      {peopleOrNights}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPeopleOrNights(peopleOrNights + 1)}
                      className="w-10 h-10 rounded-xl bg-sand dark:bg-sand-dark border border-border dark:border-border-dark font-bold text-base"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal dark:text-white">Special Requests (Optional)</label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Vegetarian meals only, early check-in"
                    className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl text-xs text-charcoal dark:text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleStep1Next}
                  className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-sm py-3.5 px-4 rounded-2xl shadow-lift transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
                >
                  <span>Continue to Customer Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: YOUR DETAILS */}
            {bookingStep === 2 && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-charcoal dark:text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-terracotta" /> Step 2: Customer Contact Info
                  </h3>
                  <button onClick={() => setBookingStep(1)} className="text-[11px] text-terracotta font-bold underline">
                    ← Edit Date
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-charcoal dark:text-white">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Anjali Verma"
                    className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-charcoal dark:text-white">WhatsApp Phone Number (For Confirmations)</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 99001 12233"
                    className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-charcoal dark:text-white">Email Address</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. anjali@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleStep2Next}
                  className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-sm py-3.5 px-4 rounded-2xl shadow-lift transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
                >
                  <span>Review Booking & Pricing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 3: REVIEW & CONFIRM */}
            {bookingStep === 3 && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-charcoal dark:text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-terracotta" /> Step 3: Review & Payment Choice
                  </h3>
                  <button onClick={() => setBookingStep(2)} className="text-[11px] text-terracotta font-bold underline">
                    ← Edit Info
                  </button>
                </div>

                {/* Summary Box */}
                <div className="bg-sand/60 dark:bg-sand-dark/60 p-4 rounded-2xl border border-border dark:border-border-dark space-y-2">
                  <div className="flex justify-between font-bold text-charcoal dark:text-white">
                    <span>{service.title}</span>
                    <span>₹{basePrice}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-light/70 dark:text-gray-400">
                    <span>Date: <b>{selectedDate}</b></span>
                    <span>Qty: <b>x{peopleOrNights}</b></span>
                  </div>
                  <div className="border-t border-border dark:border-border-dark pt-2 flex justify-between font-serif font-extrabold text-base text-terracotta dark:text-terracotta-glow">
                    <span>Total Amount:</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Payment Option Toggle */}
                <div className="space-y-2">
                  <label className="font-bold text-charcoal dark:text-white block">Payment Choice for Demo</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentChoice("pay_on_arrival")}
                      className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                        paymentChoice === "pay_on_arrival" ? "border-terracotta bg-terracotta-light/30 text-terracotta" : "border-border text-charcoal dark:text-gray-300"
                      }`}
                    >
                      💵 Pay on Arrival
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentChoice("advance_paid")}
                      className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                        paymentChoice === "advance_paid" ? "border-terracotta bg-terracotta-light/30 text-terracotta" : "border-border text-charcoal dark:text-gray-300"
                      }`}
                    >
                      💳 Advance Paid
                    </button>
                  </div>
                </div>

                {/* Terms checkbox */}
                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 accent-terracotta"
                  />
                  <span className="text-charcoal-light/80 dark:text-gray-300">
                    I agree to the vendor&apos;s cancellation policy ({service.cancellationPolicy || "Free cancellation up to 24 hours before"}).
                  </span>
                </label>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleFinalBookingSubmit}
                  className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-base py-3.5 px-6 rounded-2xl shadow-lift transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
                >
                  {submitting ? "Confirming..." : `Confirm Booking (₹${totalPrice.toLocaleString("en-IN")})`}
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
