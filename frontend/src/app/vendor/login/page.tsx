"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";
import { MOCK_VENDORS, VendorData } from "@/lib/mockData";
import VerifiedBadge from "@/components/VerifiedBadge";

export default function VendorLoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (vendor: VendorData) => {
    setLoading(true);
    // Save active vendor profile in localStorage
    localStorage.setItem("bharatsetu_vendor", JSON.stringify(vendor));
    localStorage.setItem("bharatsetu_token", `token-${vendor.id}`);
    
    setTimeout(() => {
      router.push("/vendor/dashboard");
    }, 400);
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      setErrorMsg("Please enter your registered phone number.");
      return;
    }

    // 1. Check pre-existing mock vendors
    const foundMock = Object.values(MOCK_VENDORS).find((v) => v.phone === cleanPhone || v.phone.includes(cleanPhone));
    if (foundMock) {
      handleLogin(foundMock);
      return;
    }

    // 2. Check locally saved registered vendors
    try {
      const savedRegs = localStorage.getItem("bharatsetu_registered_vendors");
      if (savedRegs) {
        const regVendors: VendorData[] = JSON.parse(savedRegs);
        const foundReg = regVendors.find((v) => v.phone === cleanPhone);
        if (foundReg) {
          handleLogin(foundReg);
          return;
        }
      }
    } catch (e) {
      // fallback
    }

    // 3. If new number, create a unique new account for this exact phone
    const newAccount: VendorData = {
      id: `vnd-${cleanPhone.replace(/[^0-9]/g, "").slice(-6) || Date.now().toString().slice(-4)}`,
      name: `Vendor (${cleanPhone})`,
      phone: cleanPhone,
      email: `vendor_${cleanPhone.slice(-4)}@bharatsetu.in`,
      business_type: "homestay",
      city: "Ujjain",
      state: "Madhya Pradesh",
      description: "Newly registered hyperlocal provider on BharatSetu.",
      verified: true,
      language_pref: "hi",
      trust_tier: "Gold",
      completed_bookings_count: 0,
      joined_date: "Sep 2026",
      id_document_status: "verified"
    };

    handleLogin(newAccount);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      {/* HEADER BRANDING */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-terracotta text-white flex items-center justify-center font-serif font-extrabold text-2xl mx-auto shadow-lift">
          𑁍
        </div>
        <h1 className="font-serif font-extrabold text-3xl text-charcoal dark:text-white">
          Vendor Portal Login
        </h1>
        <p className="text-xs text-charcoal-light/70 dark:text-gray-400">
          Manage your listed services, view customer bookings & instant WhatsApp notifications.
        </p>
      </div>

      {/* LOGIN CARD FORM */}
      <div className="bg-white dark:bg-card-dark rounded-3xl p-6 sm:p-8 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-6">
        
        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmitCustom} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-terracotta" />
              Registered Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 99887 76655"
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl text-xs font-medium text-charcoal dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-terracotta" />
              Password / OTP Pin
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl text-xs font-medium text-charcoal dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-sm py-3.5 px-4 rounded-2xl shadow-lift transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {loading ? "Signing in..." : "Login to Vendor Dashboard"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* DEMO QUICK ACCOUNTS SELECTOR */}
        <div className="pt-4 border-t border-border dark:border-border-dark space-y-3">
          <span className="text-[11px] font-bold text-charcoal-light/60 dark:text-gray-400 uppercase tracking-wider block text-center">
            ⚡ Quick Demo Accounts (Click to Login)
          </span>

          <div className="space-y-2">
            {Object.values(MOCK_VENDORS).map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => handleLogin(v)}
                className="w-full text-left p-3 rounded-2xl bg-sand/40 dark:bg-sand-dark/40 border border-border dark:border-border-dark hover:border-terracotta transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-charcoal dark:text-white group-hover:text-terracotta">
                      {v.name}
                    </span>
                    <VerifiedBadge variant="tier" tier={v.trust_tier} />
                  </div>
                  <span className="text-[10px] text-charcoal-light/70 dark:text-gray-400 block">
                    {v.city}, {v.state} • {v.business_type}
                  </span>
                </div>

                <span className="text-xs font-bold text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
                  Login →
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* NEW VENDOR REGISTRATION PROMPT */}
      <div className="text-center text-xs text-charcoal-light/80 dark:text-gray-400">
        New local vendor?{" "}
        <Link href="/vendor/register" className="font-bold text-terracotta hover:underline">
          Register & Get Verified Badge →
        </Link>
      </div>

    </div>
  );
}
