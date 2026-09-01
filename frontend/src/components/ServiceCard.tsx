"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Star, ArrowRight, Heart, MessageSquare, Flame, Eye } from "lucide-react";
import { ServiceData } from "@/lib/mockData";
import VerifiedBadge from "./VerifiedBadge";
import { useApp } from "@/context/AppContext";

interface ServiceCardProps {
  service: ServiceData;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { t, isWishlisted, toggleWishlist } = useApp();
  const liked = isWishlisted(service.id);

  // State to track image load errors and handle graceful fallbacks
  const [imgSrc, setImgSrc] = useState(
    service.images && service.images.length > 0
      ? service.images[0]
      : "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80"
  );

  const fallbackImage = "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80";

  // Mock social proof tag generator based on ID
  const isPopular = service.id.includes("1") || service.id.includes("4");
  const isTrending = service.id.includes("2") || service.id.includes("9");

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(service.id);
  };

  const categoryLabels: Record<string, string> = {
    homestay: t.homestays || "Heritage Homestay",
    guide: t.guides || "Local Temple Guide",
    package: t.packages || "Pilgrimage Package",
    artisan: t.artisans || "Artisan Craft"
  };

  const categoryColors: Record<string, string> = {
    homestay: "bg-amber-100/90 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700",
    guide: "bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700",
    package: "bg-orange-100/90 dark:bg-orange-950/80 text-orange-900 dark:text-orange-200 border-orange-300 dark:border-orange-700",
    artisan: "bg-purple-100/90 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700"
  };

  const vendorPhone = service.vendor?.phone || "+919876543210";
  const vendorName = service.vendor?.name || service.vendor_name || service.vendorName || "Verified Local Host";

  return (
    <div className="ticket-notch-container bg-card dark:bg-card-dark border-2 border-border dark:border-border-dark flex flex-col h-full group relative shadow-warm dark:shadow-darkCard transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
      
      {/* Heart Wishlist Button */}
      <button
        onClick={handleHeartClick}
        className={`absolute top-3 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-125 ${
          liked ? "bg-red-50 dark:bg-red-950 text-red-500 shadow-md" : "bg-black/30 text-white hover:bg-black/50"
        }`}
        title={liked ? "Remove from Wishlist" : "Save to Wishlist"}
      >
        <Heart className={`w-4 h-4 ${liked ? "fill-red-500 stroke-red-500" : ""}`} />
      </button>

      <Link href={`/services/${service.id}`} className="block flex-1 flex flex-col">
        {/* Card Cover Image */}
        <div className="relative w-full h-48 overflow-hidden bg-sand dark:bg-sand-dark">
          <img
            src={imgSrc}
            alt={service.title}
            onError={() => setImgSrc(fallbackImage)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Category Tag */}
          <div className="absolute bottom-3 left-3">
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-xs ${
                categoryColors[service.category] || "bg-base text-charcoal border-border"
              }`}
            >
              {categoryLabels[service.category] || service.category}
            </span>
          </div>

          {/* Verification Badge with Hover Rotate */}
          <div className="absolute top-3 right-3 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
            <VerifiedBadge variant="tier" tier={service.vendor?.trustTier || "Gold"} />
          </div>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-3 right-3 bg-charcoal/90 dark:bg-black/80 text-white font-serif font-bold text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10 shadow-sm">
            ₹{service.price.toLocaleString("en-IN")}
            <span className="text-[9px] font-sans text-white/70 font-normal ml-1">
              /{service.priceUnit || (service.category === "homestay" ? "night" : "person")}
            </span>
          </div>
        </div>

        {/* Notched Stub Divider Line */}
        <div className="relative px-5 py-2">
          <div className="border-t-2 border-dashed border-border dark:border-border-dark w-full" />
        </div>

        {/* Card Content Body */}
        <div className="p-5 pt-1 flex-1 flex flex-col justify-between space-y-3">
          <div>
            
            {/* Social Proof Live Tag */}
            {isPopular ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 mb-1.5">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" /> Booked 5 times this week
              </span>
            ) : isTrending ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-terracotta dark:text-terracotta-glow bg-terracotta-light dark:bg-terracotta/20 px-2 py-0.5 rounded border border-terracotta/30 mb-1.5">
                <Eye className="w-3 h-3" /> 8 travelers viewing right now
              </span>
            ) : null}

            {/* Location & Rating Header */}
            <div className="flex items-center justify-between text-xs text-charcoal-light/70 dark:text-gray-400 mb-1.5">
              <div className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span className="truncate max-w-[170px]">{service.location}</span>
              </div>

              {service.rating ? (
                <div className="flex items-center gap-1 font-bold text-charcoal dark:text-gray-200 bg-sand dark:bg-sand-dark px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{service.rating}</span>
                  <span className="text-[9px] text-charcoal-light/60 dark:text-gray-400">({service.reviewCount})</span>
                </div>
              ) : (
                <span className="text-[10px] text-sage font-bold">New Provider</span>
              )}
            </div>

            {/* Service Title */}
            <h3 className="font-serif font-bold text-base text-charcoal dark:text-white group-hover:text-terracotta transition-colors line-clamp-2 leading-tight">
              {service.title}
            </h3>

            <p className="text-xs text-charcoal-light/75 dark:text-gray-300 line-clamp-2 leading-relaxed mt-1.5">
              {service.description}
            </p>
          </div>

          {/* Card Footer: Vendor Name & Actions */}
          <div className="pt-3 border-t border-border/60 dark:border-border-dark flex items-center justify-between">
            <div className="text-xs">
              <span className="text-charcoal-light/50 dark:text-gray-500 block text-[9px]">Hosted with care by</span>
              <span className="font-semibold text-charcoal dark:text-gray-200 truncate block max-w-[130px]">
                {vendorName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${vendorPhone.replace(/[^0-9]/g, "")}?text=Namaste!%20Inquiring%20about%20${encodeURIComponent(service.title)}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-green-50 dark:bg-green-950 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                title={t.chatWhatsapp}
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-terracotta dark:text-terracotta-glow group-hover:translate-x-1 transition-transform">
                {t.bookTicket || "Book Now"} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
