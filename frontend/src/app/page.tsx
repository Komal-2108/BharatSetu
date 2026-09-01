"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  MapPin, 
  Filter, 
  ArrowRight, 
  PlusCircle, 
  Quote
} from "lucide-react";
import { SEED_MOCK_DATA } from "@/lib/mockData";
import ServiceCard from "@/components/ServiceCard";
import VerifiedBadge from "@/components/VerifiedBadge";
import { useApp } from "@/context/AppContext";
import { 
  HeroIndiaMapIllustration, 
  DiscoverStepIllustration, 
  BookStepIllustration, 
  TrustStepIllustration,
  WaveDivider 
} from "@/components/Illustrations";
import AnimatedStatCounter from "@/components/AnimatedStatCounter";

export default function LandingHomePage() {
  const router = useRouter();
  const { t } = useApp();

  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.append("location", searchLocation);
    if (searchCategory && searchCategory !== "all") params.append("category", searchCategory);
    router.push(`/services?${params.toString()}`);
  };

  // Top 6 Featured Services
  const featuredServices = SEED_MOCK_DATA.services.slice(0, 6);

  // Vendor Spotlight Post
  const spotlightBlogs = SEED_MOCK_DATA.blogPosts.slice(0, 2);

  return (
    <div className="space-y-16 pb-16 overflow-hidden">
      
      {/* 1. HERO SECTION WITH HERO MAP ILLUSTRATION */}
      <section className="relative bg-sand/40 dark:bg-card-dark/40 py-12 sm:py-20 border-b border-border/60 dark:border-border-dark">
        
        {/* Subtle Background Diya / Sparkle Dots Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-15 dark:opacity-10 bg-[radial-gradient(#C1653D_1.5px,transparent_1.5px)] [background-size:28px_28px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Microcopy & Search Bar */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 bg-white dark:bg-card-dark px-4 py-2 rounded-full border border-border dark:border-border-dark shadow-xs">
              <VerifiedBadge variant="compact" text="Hyperlocal Trust Platform" />
              <span className="text-[11px] font-bold text-charcoal dark:text-gray-200">100% WhatsApp Verified</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal dark:text-white leading-[1.12] tracking-tight">
                Connect Directly with India&apos;s Authentic Local Hosts
              </h1>
              
              {/* Human Emotional Microcopy Anchor */}
              <p className="text-xs sm:text-sm font-semibold text-terracotta dark:text-terracotta-glow italic">
                &ldquo;Built by travelers, for the guides and hosts who make Indian journeys unforgettable.&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-charcoal-light/80 dark:text-gray-300 max-w-xl leading-relaxed">
                Book verified heritage homestays, temple guides, sacred pilgrimage packages, and weaver workshops with instant WhatsApp confirmations.
              </p>
            </div>

            {/* SEARCH BAR WIDGET */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white dark:bg-card-dark p-3 rounded-3xl border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard grid grid-cols-1 sm:grid-cols-12 gap-3"
            >
              {/* Location Input */}
              <div className="sm:col-span-5 relative flex items-center">
                <MapPin className="w-5 h-5 text-terracotta absolute left-3.5" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Where in India? (e.g. Ujjain, Rishikesh)"
                  className="w-full pl-11 pr-3 py-3 bg-sand/30 dark:bg-sand-dark/50 border border-border dark:border-border-dark rounded-2xl text-xs font-bold text-charcoal dark:text-white focus:outline-none focus:border-terracotta"
                />
              </div>

              {/* Category Select */}
              <div className="sm:col-span-4 relative flex items-center">
                <Filter className="w-4 h-4 text-terracotta absolute left-3.5" />
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-sand/30 dark:bg-sand-dark/50 border border-border dark:border-border-dark rounded-2xl text-xs font-bold text-charcoal dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="all">✨ All Services</option>
                  <option value="homestay">🏡 Homestays</option>
                  <option value="package">🕉️ Pilgrimage Packages</option>
                  <option value="guide">🚩 Temple Guides</option>
                  <option value="artisan">🎨 Artisans</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full h-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-xs py-3 px-4 rounded-2xl shadow-lift transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

          </div>

          {/* Right Column: Hand-Drawn Animated India Map Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroIndiaMapIllustration />
          </div>

        </div>
      </section>

      {/* 2. "HOW BHARATSETU WORKS" — 3-STEP ILLUSTRATED STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-card-dark rounded-3xl p-8 sm:p-10 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-8">
          
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold text-terracotta uppercase tracking-wider">Simple & Transparent</span>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-charcoal dark:text-white">
              How BharatSetu Works
            </h2>
            <p className="text-xs text-charcoal-light/70 dark:text-gray-400">
              No middleman markup — connect with real verified local hosts in three quick steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="space-y-4 text-center sm:text-left p-5 rounded-2xl bg-sand/40 dark:bg-sand-dark/40 border border-border/60 dark:border-border-dark hover:border-terracotta/40 transition-colors">
              <div className="flex items-center gap-3">
                <DiscoverStepIllustration />
                <span className="font-serif font-extrabold text-2xl text-terracotta">01</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal dark:text-white">1. Discover Local Hosts</h3>
              <p className="text-xs text-charcoal-light/80 dark:text-gray-300 leading-relaxed">
                Find hidden riverfront homestays, licensed temple guides, and traditional weaver workshops near your destination.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 text-center sm:text-left p-5 rounded-2xl bg-sand/40 dark:bg-sand-dark/40 border border-border/60 dark:border-border-dark hover:border-terracotta/40 transition-colors">
              <div className="flex items-center gap-3">
                <BookStepIllustration />
                <span className="font-serif font-extrabold text-2xl text-sage">02</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal dark:text-white">2. Instant WhatsApp Booking</h3>
              <p className="text-xs text-charcoal-light/80 dark:text-gray-300 leading-relaxed">
                Select your travel dates and group size. Booking confirmations are delivered directly to your WhatsApp with host contact info.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 text-center sm:text-left p-5 rounded-2xl bg-sand/40 dark:bg-sand-dark/40 border border-border/60 dark:border-border-dark hover:border-terracotta/40 transition-colors">
              <div className="flex items-center gap-3">
                <TrustStepIllustration />
                <span className="font-serif font-extrabold text-2xl text-amber-gold">03</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal dark:text-white">3. Travel with 100% Trust</h3>
              <p className="text-xs text-charcoal-light/80 dark:text-gray-300 leading-relaxed">
                Every host is document-verified by our safety team, and reviews are strictly locked to real completed trips.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. BROWSE BY CATEGORY — VISUAL CARDS WITH ILLUSTRATED ACCENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-terracotta uppercase tracking-wider">Services We Provide</span>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-charcoal dark:text-white">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-terracotta hover:underline flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Homestays */}
          <div className="transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1">
            <Link
              href="/services?category=homestay"
              className="group relative block h-72 rounded-3xl overflow-hidden border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard"
            >
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80"
                alt="Homestays"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end text-white space-y-1">
                <span className="text-2xl">🏡</span>
                <h3 className="font-serif font-bold text-xl">Heritage Homestays</h3>
                <p className="text-xs text-white/80">Authentic family homes & riverfront stays</p>
              </div>
            </Link>
          </div>

          {/* Card 2: Pilgrimage Packages */}
          <div className="transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1">
            <Link
              href="/services?category=package"
              className="group relative block h-72 rounded-3xl overflow-hidden border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard"
            >
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80"
                alt="Packages"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end text-white space-y-1">
                <span className="text-2xl">🕉️</span>
                <h3 className="font-serif font-bold text-xl">Pilgrimage Packages</h3>
                <p className="text-xs text-white/80">Char Dham, Khatu Shyam & Temple circuits</p>
              </div>
            </Link>
          </div>

          {/* Card 3: Temple Guides */}
          <div className="transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1">
            <Link
              href="/services?category=guide"
              className="group relative block h-72 rounded-3xl overflow-hidden border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard"
            >
              <img
                src="https://images.unsplash.com/photo-1609946682042-870e6728416b?w=800&auto=format&fit=crop&q=80"
                alt="Guides"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end text-white space-y-1">
                <span className="text-2xl">🚩</span>
                <h3 className="font-serif font-bold text-xl">Local Temple Guides</h3>
                <p className="text-xs text-white/80">Verified storytellers & darshan assistance</p>
              </div>
            </Link>
          </div>

          {/* Card 4: Artisans */}
          <div className="transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1">
            <Link
              href="/services?category=artisan"
              className="group relative block h-72 rounded-3xl overflow-hidden border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard"
            >
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80"
                alt="Artisans"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-end text-white space-y-1">
                <span className="text-2xl">🎨</span>
                <h3 className="font-serif font-bold text-xl">Artisans & Crafts</h3>
                <p className="text-xs text-white/80">Direct weaver workshops & handlooms</p>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* 4. FEATURED LISTINGS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-terracotta uppercase tracking-wider">Popular Experiences</span>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-charcoal dark:text-white">
              Featured Verified Listings
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 bg-sand dark:bg-card-dark text-charcoal dark:text-white px-4 py-2 rounded-xl border border-border dark:border-border-dark text-xs font-bold hover:border-terracotta transition-colors"
          >
            <span>View All ({SEED_MOCK_DATA.services.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service as any} />
          ))}
        </div>
      </section>

      {/* 5. TRUST SECTION WITH SOFT SAGE-TINTED BACKGROUND & ANIMATED STAT COUNTERS */}
      <section className="relative">
        <WaveDivider />
        <div className="bg-[#7A9471]/10 dark:bg-card-dark/70 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
            
            <div className="max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-sage uppercase tracking-wider">Hyperlocal Reliability</span>
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-charcoal dark:text-white">
                Why Travelers & Hosts Trust BharatSetu
              </h2>
            </div>

            {/* ANIMATED STAT COUNT-UP CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white dark:bg-card-dark p-6 rounded-3xl border-2 border-border dark:border-border-dark shadow-warm space-y-1">
                <AnimatedStatCounter value={150} suffix="+" />
                <span className="text-xs font-bold text-charcoal-light dark:text-gray-300 block">Verified Local Hosts</span>
              </div>

              <div className="bg-white dark:bg-card-dark p-6 rounded-3xl border-2 border-border dark:border-border-dark shadow-warm space-y-1">
                <AnimatedStatCounter value={2000} suffix="+" />
                <span className="text-xs font-bold text-charcoal-light dark:text-gray-300 block">Bookings Confirmed</span>
              </div>

              <div className="bg-white dark:bg-card-dark p-6 rounded-3xl border-2 border-border dark:border-border-dark shadow-warm space-y-1">
                <span className="font-serif font-extrabold text-3xl sm:text-4xl text-terracotta block">Instant</span>
                <span className="text-xs font-bold text-charcoal-light dark:text-gray-300 block">WhatsApp Alerts</span>
              </div>

              <div className="bg-white dark:bg-card-dark p-6 rounded-3xl border-2 border-border dark:border-border-dark shadow-warm space-y-1">
                <AnimatedStatCounter value={12} suffix="+" />
                <span className="text-xs font-bold text-charcoal-light dark:text-gray-300 block">States Covered</span>
              </div>

            </div>
          </div>
        </div>
        <WaveDivider flip />
      </section>

      {/* 6. VENDOR SPOTLIGHT — ILLUSTRATED SPEECH BUBBLE QUOTE LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-[11px] font-bold text-terracotta uppercase tracking-wider">Vendor Spotlight</span>
          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-charcoal dark:text-white">
            Stories from the Field
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {spotlightBlogs.map((post) => (
            <div key={post.id} className="relative bg-white dark:bg-card-dark rounded-3xl p-6 border-2 border-border dark:border-border-dark shadow-warm space-y-4">
              
              <div className="flex items-center gap-4">
                {/* Vendor Avatar in Circular Decorative Frame */}
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-terracotta p-0.5 shrink-0">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-charcoal dark:text-white">{post.author}</h4>
                  <span className="text-[11px] text-terracotta font-bold block">{post.category}</span>
                </div>
              </div>

              {/* Speech-Bubble Quote Container */}
              <div className="relative bg-sand/50 dark:bg-sand-dark/50 p-5 rounded-2xl border border-border/80 dark:border-border-dark space-y-2">
                <Quote className="w-5 h-5 text-terracotta/40" />
                <p className="text-xs text-charcoal-light/90 dark:text-gray-200 leading-relaxed italic">
                  &ldquo;{post.excerpt}&rdquo;
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-xs font-bold text-terracotta hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Read full story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 7. "BECOME A VENDOR" CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-terracotta to-amber-600 text-white rounded-3xl p-8 sm:p-12 shadow-warm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              For Homestay Hosts, Guides & Artisans
            </span>
            <h2 className="font-serif font-extrabold text-3xl text-white">
              Are you a local service provider?
            </h2>
            <p className="text-xs text-white/90 leading-relaxed">
              Have a homestay, guiding service, or craft to share? List it on BharatSetu in minutes and start receiving direct WhatsApp bookings.
            </p>
          </div>

          <Link
            href="/become-vendor"
            className="inline-flex items-center gap-2 bg-white text-charcoal font-serif font-bold text-sm px-6 py-4 rounded-2xl shadow-lift hover:bg-sand transition-all hover:scale-105 shrink-0 justify-center"
          >
            <PlusCircle className="w-5 h-5 text-terracotta" />
            <span>List Your Service</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
