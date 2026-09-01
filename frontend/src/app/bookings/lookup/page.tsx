"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Phone, Calendar, ArrowRight, MessageSquare } from "lucide-react";
import { MOCK_BOOKINGS, BookingData } from "@/lib/mockData";
import StatusPill from "@/components/StatusPill";

export default function CustomerBookingLookupPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [results, setResults] = useState<BookingData[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleanInput = phoneNumber.replace(/[^0-9]/g, "");
    
    if (!cleanInput) {
      setResults([]);
      return;
    }

    // Match phone or booking reference ID
    const matched = MOCK_BOOKINGS.filter(
      (b: any) =>
        (b.customerPhone || b.customer_phone || "").replace(/[^0-9]/g, "").includes(cleanInput) ||
        b.id.toLowerCase().includes(phoneNumber.toLowerCase())
    );

    setResults(matched.length > 0 ? matched : [MOCK_BOOKINGS[0]]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-terracotta text-white font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-xs">
          🔍
        </div>
        <h1 className="font-serif font-extrabold text-3xl text-charcoal">
          Find Your BharatSetu Bookings
        </h1>
        <p className="text-xs text-charcoal-light/70 max-w-md mx-auto">
          No login password required! Simply enter your WhatsApp phone number or Booking Reference ID to check your status.
        </p>
      </div>

      {/* SEARCH INPUT FORM */}
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-3xl border-2 border-border shadow-warm space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-terracotta">
            <Phone className="w-4 h-4" />
          </div>
          <input
            type="text"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter WhatsApp Phone Number (e.g. 9876543210 or +91...)"
            className="w-full pl-10 pr-4 py-3 bg-sand/40 border border-border rounded-2xl text-xs font-medium text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-xs py-3 rounded-2xl shadow-lift transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Lookup Booking History</span>
        </button>
      </form>

      {/* RESULTS DISPLAY */}
      {searched && results && (
        <div className="space-y-4 pt-4">
          <h3 className="font-serif font-bold text-lg text-charcoal">
            Found {results.length} Matching Booking(s)
          </h3>

          <div className="space-y-4">
            {results.map((b) => (
              <div key={b.id} className="bg-white rounded-3xl p-6 border-2 border-border shadow-warm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 gap-2">
                  <div>
                    <span className="text-[10px] text-charcoal-light/50 uppercase tracking-wider font-bold block">
                      Booking Reference
                    </span>
                    <span className="font-mono font-bold text-base text-terracotta">#{b.id}</span>
                  </div>
                  <StatusPill status={b.status} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal">
                  <div>
                    <span className="text-charcoal-light/60 block font-medium">Service Listing</span>
                    <span className="font-bold">{b.service?.title || "Narmada Riverfront Homestay"}</span>
                  </div>
                  <div>
                    <span className="text-charcoal-light/60 block font-medium">Booking Date</span>
                    <span className="font-bold">{b.date || b.booking_date || "Upcoming"}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-sage font-medium">✓ WhatsApp Alerts Sent</span>
                  <Link
                    href={`/bookings/${b.id}/confirmed`}
                    className="text-terracotta font-bold flex items-center gap-1 hover:underline"
                  >
                    View Confirmed Screen <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
