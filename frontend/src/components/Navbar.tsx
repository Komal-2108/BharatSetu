"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Compass, 
  PlusCircle, 
  Menu, 
  X, 
  ShieldCheck, 
  Heart, 
  Globe, 
  Moon, 
  Sun,
  User,
  LogOut,
  ChevronDown,
  BookOpen,
  Bell,
  MapPin,
  Home,
  Flag,
  Palette,
  Package
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme, language, toggleLanguage, t, wishlist, user, logoutUser } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isVendor = user?.role === "vendor";

  return (
    <header className="sticky top-0 z-50 bg-base/95 dark:bg-base-dark/95 backdrop-blur-xl border-b border-border/80 dark:border-border-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* BRAND LOGO */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-terracotta to-amber-glow text-white flex items-center justify-center font-serif font-extrabold text-xl shadow-glow group-hover:rotate-6 transition-transform">
              𑁍
            </div>
            <div>
              <span className="font-serif font-extrabold text-2xl tracking-tight text-charcoal dark:text-white block leading-none">
                Bharat<span className="text-terracotta dark:text-terracotta-glow">Setu</span>
              </span>
              <span className="text-[10px] font-sans font-semibold tracking-widest text-charcoal-light/80 dark:text-gray-400 uppercase block mt-1">
                {t.brandSubtitle || "HYPERLOCAL TRAVEL & TRUST"}
              </span>
            </div>
          </Link>

          {/* MAIN ESSENTIAL DESKTOP NAV ITEMS */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-charcoal dark:text-gray-200">
            
            {/* 1. EXPLORE DROPDOWN ▾ */}
            <div className="relative">
              <button
                onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                className="flex items-center gap-1.5 py-2 hover:text-terracotta transition-colors font-bold text-xs"
              >
                <Compass className="w-4 h-4 text-terracotta" />
                <span>Explore</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${exploreDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {exploreDropdownOpen && (
                <div 
                  onMouseLeave={() => setExploreDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-60 bg-white dark:bg-card-dark rounded-2xl border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard py-2 z-50 animate-fadeIn"
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-charcoal-light/60 dark:text-gray-400 border-b border-border dark:border-border-dark mb-1">
                    Categories & Maps
                  </div>

                  <Link
                    href="/services?category=homestay"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-sand dark:hover:bg-sand-dark text-charcoal dark:text-white transition-colors"
                  >
                    <Home className="w-4 h-4 text-terracotta" />
                    <div>
                      <span className="font-bold block">Homestays</span>
                      <span className="text-[10px] text-charcoal-light/70 dark:text-gray-400">Authentic local stays & rooms</span>
                    </div>
                  </Link>

                  <Link
                    href="/services?category=package"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-sand dark:hover:bg-sand-dark text-charcoal dark:text-white transition-colors"
                  >
                    <Package className="w-4 h-4 text-terracotta" />
                    <div>
                      <span className="font-bold block">Pilgrimage Packages</span>
                      <span className="text-[10px] text-charcoal-light/70 dark:text-gray-400">Sacred yatras & group tours</span>
                    </div>
                  </Link>

                  <Link
                    href="/services?category=guide"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-sand dark:hover:bg-sand-dark text-charcoal dark:text-white transition-colors"
                  >
                    <Flag className="w-4 h-4 text-terracotta" />
                    <div>
                      <span className="font-bold block">Local Guides</span>
                      <span className="text-[10px] text-charcoal-light/70 dark:text-gray-400">Verified temple storytellers</span>
                    </div>
                  </Link>

                  <Link
                    href="/services?category=artisan"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-sand dark:hover:bg-sand-dark text-charcoal dark:text-white transition-colors"
                  >
                    <Palette className="w-4 h-4 text-terracotta" />
                    <div>
                      <span className="font-bold block">Artisans</span>
                      <span className="text-[10px] text-charcoal-light/70 dark:text-gray-400">Handloom crafts & workshops</span>
                    </div>
                  </Link>

                  <div className="border-t border-border dark:border-border-dark my-1" />

                  <Link
                    href="/services"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-sand dark:hover:bg-sand-dark text-terracotta font-bold"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>View Map & All Services →</span>
                  </Link>
                </div>
              )}
            </div>

            {/* 2. STORIES / TRAVEL JOURNAL */}
            <Link
              href="/blog"
              className="hover:text-terracotta transition-colors py-2 flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-terracotta" />
              <span>Stories</span>
            </Link>

          </nav>

          {/* RIGHT SIDE ACTIONS: [🌐 हिन्दी] [♡] [🔔] [Profile/Login] [List Your Service] */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* 3. Vernacular Language Toggle [🌐 हिन्दी] */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 bg-sand/80 dark:bg-card-dark px-3 py-1.5 rounded-xl border border-border dark:border-border-dark text-xs font-bold text-charcoal dark:text-white hover:border-terracotta transition-all active:scale-95"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-terracotta" />
              <span>{language === "en" ? "हिन्दी" : "English"}</span>
            </button>

            {/* 4. Wishlist Icon Only [♡] */}
            <Link
              href="/wishlist"
              className="p-2 rounded-xl bg-sand/80 dark:bg-card-dark border border-border dark:border-border-dark text-charcoal dark:text-white hover:text-terracotta transition-all active:scale-95 relative"
              title="My Wishlist"
            >
              <Heart className="w-4 h-4 text-terracotta fill-terracotta/10 hover:fill-terracotta" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* 5. Notification Bell Icon [🔔] */}
            <button
              onClick={() => alert("WhatsApp booking notifications active.")}
              className="p-2 rounded-xl bg-sand/80 dark:bg-card-dark border border-border dark:border-border-dark text-charcoal dark:text-white hover:text-terracotta transition-all active:scale-95 relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-charcoal dark:text-gray-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sage animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sage" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-sand/80 dark:bg-card-dark border border-border dark:border-border-dark text-charcoal dark:text-white hover:text-terracotta transition-all active:scale-95"
              title="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-gold" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* 6. PROFILE / AUTH DROPDOWN */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 bg-sand/80 dark:bg-card-dark p-1.5 pl-3 rounded-xl border border-border dark:border-border-dark text-xs font-bold text-charcoal dark:text-white hover:border-terracotta transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-[11px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="truncate max-w-[90px]">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-charcoal-light/60" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-card-dark rounded-2xl border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard py-2 text-xs z-50">
                    <div className="px-4 py-2 border-b border-border dark:border-border-dark">
                      <span className="font-bold block text-charcoal dark:text-white truncate">{user.name}</span>
                      <span className="text-[10px] text-terracotta font-semibold uppercase block">
                        Role: {user.role} {user.verified ? "• Verified 🛡️" : ""}
                      </span>
                    </div>

                    {isVendor ? (
                      <>
                        <Link
                          href="/vendor/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-sand dark:hover:bg-sand-dark font-medium text-charcoal dark:text-gray-200"
                        >
                          🛡️ Vendor Dashboard
                        </Link>
                        <Link
                          href="/vendor/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-sand dark:hover:bg-sand-dark font-medium text-charcoal dark:text-gray-200"
                        >
                          📋 My Listed Services
                        </Link>
                        <Link
                          href="/vendor/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-sand dark:hover:bg-sand-dark text-[11px] text-sage font-bold"
                        >
                          ✓ Verification Status: Gold Tier
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/bookings/lookup"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-sand dark:hover:bg-sand-dark font-medium text-charcoal dark:text-gray-200"
                        >
                          🔍 Find My Bookings
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-sand dark:hover:bg-sand-dark font-medium text-charcoal dark:text-gray-200"
                        >
                          ♡ My Wishlist ({wishlist.length})
                        </Link>
                      </>
                    )}

                    <div className="border-t border-border dark:border-border-dark mt-1 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logoutUser();
                          router.push("/");
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-950 flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-charcoal text-white dark:bg-white dark:text-charcoal font-bold text-xs px-4 py-2 rounded-xl shadow-xs hover:scale-105 transition-transform"
              >
                Login / Sign Up
              </Link>
            )}

            {/* 7. LIST YOUR SERVICE BUTTON */}
            <Link
              href={isVendor ? "/vendor/services/new" : "/become-vendor"}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-terracotta to-terracotta-dark text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-warm hover:scale-105 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>List Your Service</span>
            </Link>

          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-sand dark:bg-card-dark border border-border text-charcoal dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border dark:border-border-dark bg-base dark:bg-base-dark px-4 pt-3 pb-6 space-y-3 text-xs font-bold">
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block py-2">
            🧭 Explore All Listings & Map
          </Link>
          <Link href="/services?category=homestay" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-charcoal-light">
            🏡 Homestays
          </Link>
          <Link href="/services?category=package" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-charcoal-light">
            🕉️ Pilgrimage Packages
          </Link>
          <Link href="/services?category=guide" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-charcoal-light">
            🚩 Local Guides
          </Link>
          <Link href="/services?category=artisan" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-charcoal-light">
            🎨 Artisans
          </Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-terracotta">
            📖 Stories / Travel Journal
          </Link>
          <Link href="/bookings/lookup" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sage">
            🔍 Find My Bookings
          </Link>
          {!user ? (
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-terracotta">
              🔑 Login / Sign Up
            </Link>
          ) : (
            <button onClick={() => { logoutUser(); setMobileMenuOpen(false); }} className="block py-2 text-red-500">
              🚪 Logout ({user.name})
            </button>
          )}
        </div>
      )}
    </header>
  );
}
