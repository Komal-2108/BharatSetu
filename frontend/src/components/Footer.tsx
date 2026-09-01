"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Globe, MessageSquare } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Footer() {
  const { t, language, toggleLanguage } = useApp();

  return (
    <footer className="bg-charcoal dark:bg-card-dark text-white border-t border-charcoal-light/30 pt-14 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* TOP MISSION STATEMENT & ABOUT BHARATSETU */}
        <div className="bg-sand-dark/30 rounded-3xl p-8 border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-terracotta to-amber-glow text-white flex items-center justify-center font-serif font-extrabold text-xl shadow-glow">
              𑁍
            </div>
            <h3 className="font-serif font-extrabold text-2xl text-white">About BharatSetu</h3>
          </div>

          <p className="text-xs text-white/80 leading-relaxed max-w-4xl">
            BharatSetu is a hyperlocal trust and booking platform connecting travelers with India&apos;s unorganized travel and service economy — local homestays, temple guides, pilgrimage operators, and heritage artisans who&apos;ve always run their business on WhatsApp and word-of-mouth, but never had a place to be discovered and trusted online.
          </p>

          <p className="text-xs text-white/80 leading-relaxed max-w-4xl">
            We verify every vendor, confirm every booking instantly over WhatsApp, and only allow reviews from real completed trips — because trust shouldn&apos;t be a guessing game when you&apos;re booking a homestay in a town you&apos;ve never visited.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8 border-b border-charcoal-light/40">
          
          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-terracotta uppercase tracking-wider">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-white/80 font-medium">
              <li><Link href="/services?category=homestay" className="hover:text-terracotta transition-colors">🏡 Heritage Homestays</Link></li>
              <li><Link href="/services?category=guide" className="hover:text-terracotta transition-colors">🚩 Temple & Heritage Guides</Link></li>
              <li><Link href="/services?category=package" className="hover:text-terracotta transition-colors">🕉️ Pilgrimage Packages</Link></li>
              <li><Link href="/services?category=artisan" className="hover:text-terracotta transition-colors">🎨 Artisan Workshops</Link></li>
              <li><Link href="/blog" className="hover:text-terracotta transition-colors">📖 Travel Journal / Blog</Link></li>
            </ul>
          </div>

          {/* Vendors & Partners */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-terracotta uppercase tracking-wider">
              Vendor Portal
            </h4>
            <ul className="space-y-2 text-white/80 font-medium">
              <li><Link href="/become-vendor" className="hover:text-terracotta transition-colors">Become a Host</Link></li>
              <li><Link href="/vendor/services/new" className="hover:text-terracotta transition-colors">List Your Service</Link></li>
              <li><Link href="/vendor/dashboard" className="hover:text-terracotta transition-colors">Vendor Dashboard</Link></li>
              <li><Link href="/login" className="hover:text-terracotta transition-colors">Vendor Verification</Link></li>
            </ul>
          </div>

          {/* Trust Guarantee */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-sage uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sage" /> Trust Guarantee
            </h4>
            <p className="text-white/70 leading-relaxed text-[11px]">
              Every listed host passes government ID document verification. Customer bookings are confirmed directly via Twilio WhatsApp Gateway.
            </p>
          </div>

          {/* Language & Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-terracotta uppercase tracking-wider">
              Language & Support
            </h4>
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-terracotta transition-colors"
            >
              <Globe className="w-4 h-4 text-terracotta" />
              <span>Language: {language === "en" ? "English" : "हिन्दी"}</span>
            </button>
            <p className="text-[11px] text-white/60 pt-2">
              WhatsApp Support: +91 98765 43210
            </p>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 BharatSetu Platform. Built for Local Indian Vendors & Travelers.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta" /> for Bharat
          </p>
        </div>
      </div>
    </footer>
  );
}
