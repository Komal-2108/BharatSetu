"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, PlusCircle, Sparkles, CheckCircle2, PhoneCall, Building2, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function BecomeVendorPage() {
  const router = useRouter();
  const { user, loginUser } = useApp();

  const handleUpgradeToVendor = () => {
    if (user) {
      const upgraded = { ...user, role: "vendor" as const, verified: true, trustTier: "Gold" };
      loginUser(upgraded);
      router.push("/vendor/dashboard");
    } else {
      router.push("/signup");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      
      {/* HERO BANNER */}
      <div className="bg-sand/60 dark:bg-card-dark rounded-3xl p-8 sm:p-12 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard text-center space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-terracotta-light dark:bg-terracotta/20 text-terracotta dark:text-terracotta-glow px-4 py-1.5 rounded-full text-xs font-bold border border-terracotta/30">
          <Sparkles className="w-4 h-4" /> Grow Your Hyperlocal Business
        </div>

        <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-charcoal dark:text-white leading-tight">
          List Your Stays, Tours & Crafts on BharatSetu
        </h1>

        <p className="text-charcoal-light/80 dark:text-gray-300 text-base max-w-2xl mx-auto leading-relaxed">
          Connect directly with pilgrims and travelers across India. Receive customer booking requests with instant WhatsApp confirmations sent directly to your phone.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleUpgradeToVendor}
            className="bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-base px-8 py-4 rounded-2xl shadow-lift transition-all hover:scale-105 flex items-center gap-2"
          >
            <span>Upgrade to Vendor Account Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3 VALUE PROPOSITIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-border dark:border-border-dark space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-sage-light text-sage flex items-center justify-center font-bold text-xl">
            📲
          </div>
          <h3 className="font-serif font-bold text-lg text-charcoal dark:text-white">Direct WhatsApp Bookings</h3>
          <p className="text-charcoal-light/70 dark:text-gray-400 leading-relaxed">
            No complicated dashboards needed. Booking requests and confirmations arrive straight on your phone via WhatsApp.
          </p>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-border dark:border-border-dark space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
            🛡️
          </div>
          <h3 className="font-serif font-bold text-lg text-charcoal dark:text-white">Verified Trust Badge</h3>
          <p className="text-charcoal-light/70 dark:text-gray-400 leading-relaxed">
            Upload your ID document to earn Gold / Silver trust badges, building instant credibility with travelers.
          </p>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-border dark:border-border-dark space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-terracotta-light text-terracotta flex items-center justify-center font-bold text-xl">
            💰
          </div>
          <h3 className="font-serif font-bold text-lg text-charcoal dark:text-white">0% Commission Model</h3>
          <p className="text-charcoal-light/70 dark:text-gray-400 leading-relaxed">
            Keep 100% of your earnings. Direct payments on arrival or via UPI directly to your business account.
          </p>
        </div>
      </div>

    </div>
  );
}
