"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MessageSquare, Calendar, Download, ArrowRight, ShieldCheck, Home } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";
import RouteProgress from "@/components/RouteProgress";

export default function BookingConfirmedPage() {
  const params = useParams();
  const bookingId = (params?.id as string) || "BK-1001";

  const [bookingDate, setBookingDate] = useState("2026-09-05");
  const [serviceTitle, setServiceTitle] = useState("Mahakaleshwar Temple Guide — Half Day");

  // .ICS Calendar Download Generator
  const handleAddToCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BharatSetu//Booking Calendar//EN
BEGIN:VEVENT
UID:${bookingId}@bharatsetu.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${bookingDate.replace(/-/g, "")}T090000Z
DTEND:${bookingDate.replace(/-/g, "")}T130000Z
SUMMARY:${serviceTitle} - BharatSetu Booking
DESCRIPTION:Your hyperlocal travel booking #${bookingId} is confirmed. Please show your WhatsApp confirmation on arrival.
LOCATION:Ujjain, Madhya Pradesh
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bharatsetu-booking-${bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      
      {/* Route Progress indicator finished */}
      <RouteProgress
        steps={[
          { id: 1, label: "Trip Details" },
          { id: 2, label: "Your Details" },
          { id: 3, label: "Confirm Booking" }
        ]}
        currentStep={3}
      />

      {/* CONFIRMATION CARD */}
      <div className="bg-white dark:bg-card-dark rounded-3xl p-8 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard text-center space-y-6">
        
        {/* Animated Stamp Checkmark */}
        <div className="w-20 h-20 rounded-full bg-sage-light text-sage flex items-center justify-center mx-auto shadow-lift animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="inline-block bg-sage-light text-sage text-xs font-bold px-3 py-1 rounded-full border border-sage/30 uppercase tracking-wider">
            Booking Confirmed & Verified
          </span>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-charcoal dark:text-white">
            Trip Reservation Complete!
          </h1>
          <p className="text-xs text-charcoal-light/70 dark:text-gray-400">
            Booking ID: <code className="font-mono font-bold text-terracotta text-sm">#{bookingId.toUpperCase()}</code>
          </p>
        </div>

        {/* WHATSAPP PHONE MOCKUP PREVIEW */}
        <div className="bg-sand/60 dark:bg-sand-dark/60 rounded-3xl p-6 border border-border dark:border-border-dark text-left space-y-3 max-w-md mx-auto">
          <div className="flex items-center justify-between border-b border-border dark:border-border-dark pb-2">
            <span className="font-bold text-xs text-[#25D366] flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> WhatsApp Notification Preview
            </span>
            <span className="text-[10px] text-charcoal-light/60 font-mono">Just Now</span>
          </div>

          <div className="bg-[#DCF8C6] dark:bg-green-950/90 text-charcoal dark:text-white p-3.5 rounded-2xl text-xs space-y-1.5 shadow-xs">
            <p className="font-bold">Namaste! 🙏 Your BharatSetu booking is confirmed!</p>
            <p className="text-[11px] leading-relaxed">
              <b>Service:</b> {serviceTitle}<br />
              <b>Date:</b> {bookingDate}<br />
              <b>Host Contact:</b> +91 98765 43210 (Ramesh Sharma)<br />
              <b>Booking Ref:</b> #{bookingId.slice(0, 8).toUpperCase()}
            </p>
            <span className="text-[9px] text-charcoal-light/60 dark:text-gray-400 block text-right">Sent via Twilio WhatsApp Gateway</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          
          {/* Add to Calendar Button */}
          <button
            onClick={handleAddToCalendar}
            className="inline-flex items-center gap-2 bg-sand dark:bg-card-dark hover:bg-border text-charcoal dark:text-white font-bold text-xs px-5 py-3 rounded-2xl border border-border dark:border-border-dark shadow-xs transition-all hover:scale-105"
          >
            <Calendar className="w-4 h-4 text-terracotta" />
            <span>Add to Calendar (.ics)</span>
            <Download className="w-3.5 h-3.5" />
          </button>

          <Link
            href="/bookings/lookup"
            className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-xs px-6 py-3 rounded-2xl shadow-lift transition-all hover:scale-105"
          >
            <span>View All My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

      </div>

    </div>
  );
}
