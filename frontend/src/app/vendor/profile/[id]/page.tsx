"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Mail, Calendar, Star, ShieldCheck, ArrowLeft, Award, CheckCircle2 } from "lucide-react";
import { MOCK_VENDORS, MOCK_SERVICES, MOCK_REVIEWS, ServiceData, VendorData } from "@/lib/mockData";
import VerifiedBadge from "@/components/VerifiedBadge";
import ServiceCard from "@/components/ServiceCard";

export default function VendorProfilePage() {
  const params = useParams();
  const vendorId = params?.id as string;

  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [vendorServices, setVendorServices] = useState<ServiceData[]>([]);

  useEffect(() => {
    if (!vendorId) return;
    const foundVendor = MOCK_VENDORS[vendorId] || MOCK_VENDORS["vnd-ujjain-1"];
    setVendor(foundVendor);

    const srvs = MOCK_SERVICES.filter((s) => s.vendor_id === vendorId || s.vendor_id === foundVendor.id);
    setVendorServices(srvs.length > 0 ? srvs : [MOCK_SERVICES[1]]);
  }, [vendorId]);

  if (!vendor) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-charcoal hover:text-terracotta transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Listings
      </Link>

      {/* VENDOR HERO PROFILE CARD */}
      <div className="bg-white rounded-3xl p-8 border-2 border-border shadow-warm space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-sage/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-terracotta text-white font-serif font-extrabold text-3xl flex items-center justify-center shadow-lift">
              {vendor.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif font-extrabold text-3xl text-charcoal">{vendor.name}</h1>
                <VerifiedBadge variant="tier" tier={vendor.trust_tier} />
              </div>
              <p className="text-xs text-charcoal-light/80 flex items-center gap-2 font-medium">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>{vendor.city}, {vendor.state}</span>
                <span>•</span>
                <span>Member since {vendor.joined_date}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${vendor.phone.replace(/[^0-9]/g, "")}?text=Namaste%20${encodeURIComponent(vendor.name)}!%20Inquiring%20about%20your%20services%20on%20BharatSetu.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-all hover:scale-105"
            >
              💬 WhatsApp Chat with Host
            </a>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border/80">
          <div className="bg-sand/40 p-3.5 rounded-2xl border border-border text-center">
            <span className="text-[10px] text-charcoal-light/60 font-bold uppercase tracking-wider block">Completed Trips</span>
            <span className="font-serif font-extrabold text-xl text-charcoal">{vendor.completed_bookings_count}+</span>
          </div>

          <div className="bg-sand/40 p-3.5 rounded-2xl border border-border text-center">
            <span className="text-[10px] text-charcoal-light/60 font-bold uppercase tracking-wider block">Trust Score Tier</span>
            <span className="font-bold text-sm text-terracotta block mt-0.5">{vendor.trust_tier} Level</span>
          </div>

          <div className="bg-sand/40 p-3.5 rounded-2xl border border-border text-center">
            <span className="text-[10px] text-charcoal-light/60 font-bold uppercase tracking-wider block">KYC Verification</span>
            <span className="font-bold text-xs text-sage block mt-1">✓ Aadhaar Verified</span>
          </div>

          <div className="bg-sand/40 p-3.5 rounded-2xl border border-border text-center">
            <span className="text-[10px] text-charcoal-light/60 font-bold uppercase tracking-wider block">Avg Traveler Rating</span>
            <span className="font-bold text-sm text-amber-600 block mt-0.5">⭐ 4.9 / 5.0</span>
          </div>
        </div>

        {/* BIO DESCRIPTION */}
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-base text-charcoal">About the Local Host</h3>
          <p className="text-xs text-charcoal-light/80 leading-relaxed">{vendor.description}</p>
        </div>

      </div>

      {/* ACTIVE LISTINGS BY THIS VENDOR */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-2xl text-charcoal">
          Listings by {vendor.name} ({vendorServices.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorServices.map((srv) => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </div>
      </div>

    </div>
  );
}
