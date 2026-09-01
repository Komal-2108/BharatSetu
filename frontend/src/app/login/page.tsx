"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Lock, ArrowRight, ShieldCheck, User } from "lucide-react";
import { useApp, UserRoleProfile } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useApp();

  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDemoLogin = (role: "customer" | "vendor", name: string, phone: string) => {
    setLoading(true);

    const userProfile: UserRoleProfile = {
      id: role === "vendor" ? "v1" : "c1",
      name,
      phone,
      email: `${role === "vendor" ? "ramesh" : "anjali"}@bharatsetu.in`,
      role,
      verified: true,
      trustTier: role === "vendor" ? "Gold" : undefined
    };

    loginUser(userProfile);

    setTimeout(() => {
      setLoading(false);
      if (role === "vendor") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/");
      }
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail || !password) {
      setErrorMsg("Please enter phone/email and password.");
      return;
    }

    setLoading(true);

    // Default auto-detect login
    const isVendorInput = phoneOrEmail.includes("98765") || phoneOrEmail.toLowerCase().includes("vendor");
    const userProfile: UserRoleProfile = {
      id: isVendorInput ? "v1" : `c-${Date.now().toString().slice(-4)}`,
      name: isVendorInput ? "Ramesh Sharma" : "Customer User",
      phone: phoneOrEmail,
      email: phoneOrEmail.includes("@") ? phoneOrEmail : `user_${phoneOrEmail.slice(-4)}@bharatsetu.in`,
      role: isVendorInput ? "vendor" : "customer",
      verified: true,
      trustTier: isVendorInput ? "Gold" : undefined
    };

    loginUser(userProfile);

    setTimeout(() => {
      setLoading(false);
      if (userProfile.role === "vendor") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/");
      }
    }, 400);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-terracotta to-amber-glow text-white flex items-center justify-center font-serif font-extrabold text-2xl mx-auto shadow-lift">
          𑁍
        </div>
        <h1 className="font-serif font-extrabold text-3xl text-charcoal dark:text-white">
          Welcome Back to BharatSetu
        </h1>
        <p className="text-xs text-charcoal-light/70 dark:text-gray-400">
          Login to manage bookings, wishlist, or vendor listings
        </p>
      </div>

      <div className="bg-white dark:bg-card-dark rounded-3xl p-6 sm:p-8 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-6">
        
        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="space-y-1">
            <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-terracotta" />
              Phone Number or Email
            </label>
            <input
              type="text"
              required
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              placeholder="e.g. +91 99001 12233 or anjali@gmail.com"
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-terracotta" />
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-sm py-3.5 px-4 rounded-2xl shadow-lift transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            {loading ? "Logging in..." : "Login to Account"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-CLICK DEMO LOGIN ACCOUNTS */}
        <div className="pt-4 border-t border-border dark:border-border-dark space-y-3">
          <span className="text-[11px] font-bold text-charcoal-light/60 dark:text-gray-400 uppercase tracking-wider block text-center">
            ⚡ Quick Demo Logins
          </span>

          <div className="grid grid-cols-1 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoLogin("customer", "Anjali Verma", "+919900112233")}
              className="p-3 rounded-2xl bg-sand/40 dark:bg-sand-dark/40 border border-border dark:border-border-dark hover:border-terracotta transition-all flex items-center justify-between text-left group"
            >
              <div>
                <span className="font-bold text-charcoal dark:text-white group-hover:text-terracotta block">
                  🧳 Anjali Verma (Customer)
                </span>
                <span className="text-[10px] text-charcoal-light/70 dark:text-gray-400">
                  Customer view • My Bookings & Wishlist
                </span>
              </div>
              <span className="font-bold text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
                Login →
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("vendor", "Ramesh Sharma", "+919876543210")}
              className="p-3 rounded-2xl bg-sand/40 dark:bg-sand-dark/40 border border-border dark:border-border-dark hover:border-terracotta transition-all flex items-center justify-between text-left group"
            >
              <div>
                <span className="font-bold text-charcoal dark:text-white group-hover:text-terracotta block flex items-center gap-1.5">
                  🛡️ Ramesh Sharma (Vendor • Gold Tier)
                </span>
                <span className="text-[10px] text-charcoal-light/70 dark:text-gray-400">
                  Vendor view • Manage Listings & Incoming Bookings
                </span>
              </div>
              <span className="font-bold text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
                Login →
              </span>
            </button>
          </div>
        </div>

        <div className="pt-2 text-center text-xs text-charcoal-light/70 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-bold text-terracotta hover:underline">
            Sign Up here →
          </Link>
        </div>

      </div>

    </div>
  );
}
