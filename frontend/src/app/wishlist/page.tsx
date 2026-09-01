"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Compass, ArrowLeft } from "lucide-react";
import { getWishlist } from "@/lib/wishlist";
import { MOCK_SERVICES, ServiceData } from "@/lib/mockData";
import ServiceCard from "@/components/ServiceCard";
import EmptyState from "@/components/EmptyState";

export default function WishlistPage() {
  const [wishlistedServices, setWishlistedServices] = useState<ServiceData[]>([]);

  useEffect(() => {
    const ids = getWishlist();
    if (ids.length === 0) {
      setWishlistedServices([MOCK_SERVICES[0], MOCK_SERVICES[1]]); // Demo defaults
    } else {
      const filtered = MOCK_SERVICES.filter((s) => ids.includes(s.id));
      setWishlistedServices(filtered.length > 0 ? filtered : [MOCK_SERVICES[0]]);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="font-serif font-extrabold text-3xl text-charcoal flex items-center gap-2">
            <Heart className="w-7 h-7 text-terracotta fill-terracotta" />
            Your Saved Wishlist
          </h1>
          <p className="text-xs text-charcoal-light/70 mt-1">
            Experiences and stays you saved for upcoming travels across India
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal hover:text-terracotta"
        >
          <ArrowLeft className="w-4 h-4" /> Explore More
        </Link>
      </div>

      {wishlistedServices.length === 0 ? (
        <EmptyState
          icon="compass"
          title="Your Wishlist is Empty"
          description="Click the heart icon on any service listing card to save your favorite homestays, temple tours, and artisan workshops here."
          actionLabel="Browse Verified Listings"
          actionHref="/"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedServices.map((srv) => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </div>
      )}

    </div>
  );
}
