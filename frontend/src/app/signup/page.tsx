"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, Lock, Upload, Building2, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { useApp, UserRoleProfile } from "@/context/AppContext";

export default function SignupPage() {
  const router = useRouter();
  const { loginUser } = useApp();

  const [role, setRole] = useState<"customer" | "vendor">("customer");
  
  // Basic Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Inline Vendor Fields
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState<"homestay" | "guide" | "package" | "artisan">("homestay");
  const [city, setCity] = useState("Ujjain");
  const [idDocName, setIdDocName] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !password) {
      setErrorMsg("Please fill in all primary account fields.");
      return;
    }

    setLoading(true);

    const newUser: UserRoleProfile = {
      id: role === "vendor" ? `v-${Date.now().toString().slice(-4)}` : `c-${Date.now().toString().slice(-4)}`,
      name: role === "vendor" && businessName ? businessName : name,
      phone,
      email,
      role,
      verified: role === "vendor",
      trustTier: role === "vendor" ? "Gold" : undefined,
      city: role === "vendor" ? city : undefined,
      businessType: role === "vendor" ? businessType : undefined
    };

    loginUser(newUser);

    setTimeout(() => {
      setLoading(false);
      if (role === "vendor") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/");
      }
    }, 400);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-terracotta to-amber-glow text-white flex items-center justify-center font-serif font-extrabold text-2xl mx-auto shadow-lift">
          𑁍
        </div>
        <h1 className="font-serif font-extrabold text-3xl text-charcoal dark:text-white">
          Create Your BharatSetu Account
        </h1>
        <p className="text-xs text-charcoal-light/70 dark:text-gray-400">
          Join India&apos;s hyperlocal travel & service booking network
        </p>
      </div>

      <div className="bg-white dark:bg-card-dark rounded-3xl p-6 sm:p-8 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-6">
        
        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        {/* ACCOUNT TYPE SEGMENTED RADIO TOGGLE */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-charcoal dark:text-white block">
            Select Your Account Type
          </label>
          <div className="grid grid-cols-2 gap-2 bg-sand/60 dark:bg-sand-dark/60 p-1.5 rounded-2xl border border-border dark:border-border-dark">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                role === "customer"
                  ? "bg-terracotta text-white shadow-warm"
                  : "text-charcoal-light dark:text-gray-300 hover:text-charcoal"
              }`}
            >
              <span>🧳 I&apos;m a Customer</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("vendor")}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                role === "vendor"
                  ? "bg-terracotta text-white shadow-warm"
                  : "text-charcoal-light dark:text-gray-300 hover:text-charcoal"
              }`}
            >
              <span>🛡️ I&apos;m a Vendor / Host</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-terracotta" />
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Anjali Verma"
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Phone */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-terracotta" />
                WhatsApp Phone Number (Primary ID)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 99001 12233"
                className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-terracotta" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. anjali@gmail.com"
                className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
              />
            </div>

          </div>

          {/* Password */}
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

          {/* INLINE VENDOR-SPECIFIC FIELDS */}
          {role === "vendor" && (
            <div className="pt-4 border-t border-dashed border-border dark:border-border-dark space-y-4 bg-sand/30 dark:bg-sand-dark/30 p-4 rounded-2xl">
              <span className="text-[11px] font-bold text-terracotta uppercase tracking-wider block">
                🛡️ Business Onboarding Details
              </span>

              <div className="space-y-1">
                <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-terracotta" />
                  Business / Stay / Agency Name
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma Guides"
                  className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-charcoal dark:text-white">Business Type</label>
                  <select
                    value={businessType}
                    onChange={(e: any) => setBusinessType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
                  >
                    <option value="homestay">🏡 Homestay Operator</option>
                    <option value="guide">🚩 Temple / Local Guide</option>
                    <option value="package">🕉️ Pilgrimage Package Operator</option>
                    <option value="artisan">🎨 Artisan Master</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-terracotta" />
                    City / Location
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Ujjain, MP"
                    className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
                  />
                </div>
              </div>

              {/* Document Upload */}
              <div className="p-3 bg-white dark:bg-card-dark rounded-xl border border-dashed border-border dark:border-border-dark space-y-1">
                <span className="font-bold text-charcoal dark:text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-terracotta" /> Upload ID Document (Aadhaar / Trade License)
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                </span>
                <input type="file" onChange={handleFileUpload} className="text-[11px] text-charcoal dark:text-gray-300" />
                {idDocName && <span className="text-[10px] text-sage font-bold block">✓ Uploaded: {idDocName}</span>}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-sm py-3.5 px-4 rounded-2xl shadow-lift transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
          >
            {loading ? "Creating Account..." : `Sign Up as ${role === "vendor" ? "Vendor" : "Customer"}`}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="pt-2 text-center text-xs text-charcoal-light/70 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-terracotta hover:underline">
            Login here →
          </Link>
        </div>

      </div>

    </div>
  );
}
