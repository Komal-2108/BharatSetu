"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Compass, Filter, MapPin, Search } from "lucide-react";
import { SEED_MOCK_DATA, ServiceData } from "@/lib/mockData";
import ServiceCard from "@/components/ServiceCard";
import EmptyState from "@/components/EmptyState";
import { useApp } from "@/context/AppContext";

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const { t } = useApp();

  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategoryFilter(cat);
  }, [searchParams]);

  // Extract unique locations dynamically
  const uniqueLocations = Array.from(
    new Set(SEED_MOCK_DATA.services.map((s) => s.location.split(",")[0].trim()))
  );

  const filtered = SEED_MOCK_DATA.services.filter((s) => {
    const matchesCat = categoryFilter === "all" || s.category === categoryFilter;
    const matchesLoc = locationFilter === "all" || s.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesLoc && matchesSearch;
  });

  const categoryTitles: Record<string, string> = {
    all: "All Verified Listings",
    homestay: "🏡 Authentic Heritage Homestays",
    package: "🕉️ Sacred Pilgrimage Packages",
    guide: "🚩 Temple Guides & Heritage Storytellers",
    artisan: "🎨 Tribal Artisans & Handloom Crafts"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER */}
      <div className="bg-sand/60 dark:bg-card-dark rounded-3xl p-8 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-4">
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-charcoal dark:text-white">
          {categoryTitles[categoryFilter] || "Hyperlocal Services"}
        </h1>
        <p className="text-xs text-charcoal-light/70 dark:text-gray-400">
          Book directly with verified local hosts with instant WhatsApp confirmations.
        </p>

        {/* SEARCH & FILTERS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          <div className="relative">
            <Search className="w-4 h-4 text-terracotta absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiences, stays, guides..."
              className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl text-xs font-medium text-charcoal dark:text-white"
            />
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 text-terracotta absolute left-3.5 top-3" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl text-xs font-medium text-charcoal dark:text-white cursor-pointer"
            >
              <option value="all">✨ All Categories</option>
              <option value="homestay">🏡 Homestays</option>
              <option value="package">🕉️ Pilgrimage Packages</option>
              <option value="guide">🚩 Temple Guides</option>
              <option value="artisan">🎨 Artisans</option>
            </select>
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-terracotta absolute left-3.5 top-3" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl text-xs font-medium text-charcoal dark:text-white cursor-pointer"
            >
              <option value="all">📍 All Destinations ({uniqueLocations.length})</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* LISTINGS GRID */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="search"
          title="No Services Found"
          description="Try resetting your category or location filters."
          actionLabel="Reset Filters"
          onAction={() => {
            setCategoryFilter("all");
            setLocationFilter("all");
            setSearchQuery("");
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service as any} />
          ))}
        </div>
      )}

    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs font-bold text-charcoal-light/70">
        Loading services...
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
