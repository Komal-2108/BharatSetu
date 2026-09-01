"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, MapPin, Upload, Lock, ShieldCheck, ArrowRight, Building2 } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";
import { VendorData } from "@/lib/mockData";

export default function VendorRegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    business_type: "homestay",
    city: "",
    state: "",
    description: "",
    language_pref: "hi"
  });

  const [idDocName, setIdDocName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const locationStr = formData.city && formData.state 
      ? `${formData.city}, ${formData.state}` 
      : formData.city || formData.state || "Verified Location";

    const newVendor: VendorData = {
      id: `vnd-${(formData.city || "vendor").toLowerCase().replace(/[^a-z]/g, "")}-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      business_type: formData.business_type as any,
      city: formData.city,
      state: formData.state,
      location: locationStr,
      description: formData.description,
      verified: true,
      language_pref: formData.language_pref,
      trust_tier: "Gold",
      completed_bookings_count: 0,
      joined_date: "Sep 2026",
      id_document_status: "verified"
    } as any;

    // Store active vendor in localStorage
    localStorage.setItem("bharatsetu_vendor", JSON.stringify(newVendor));
    localStorage.setItem("bharatsetu_token", `token-${newVendor.id}`);

    // Append to registered vendors list
    try {
      const existing = localStorage.getItem("bharatsetu_registered_vendors");
      const list: VendorData[] = existing ? JSON.parse(existing) : [];
      list.push(newVendor);
      localStorage.setItem("bharatsetu_registered_vendors", JSON.stringify(list));
    } catch (e) {
      // fallback
    }

    setTimeout(() => {
      setSubmitting(false);
      router.push("/vendor/dashboard");
    }, 400);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      
      {/* HEADER */}
      <div className="bg-white dark:bg-card-dark rounded-3xl p-6 sm:p-8 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-4">
        <div className="flex items-center justify-between">
          <VerifiedBadge variant="compact" text="Hyperlocal Vendor Onboarding" />
          <Link href="/vendor/login" className="text-xs font-bold text-terracotta hover:underline">
            Already registered? Login →
          </Link>
        </div>

        <h1 className="font-serif font-extrabold text-3xl text-charcoal dark:text-white">
          Become a Verified Local Vendor
        </h1>
        <p className="text-xs text-charcoal-light/80 dark:text-gray-400 leading-relaxed">
          Join BharatSetu to connect with travelers across India. Receive direct customer bookings & instant WhatsApp confirmations on your phone.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-card-dark rounded-3xl p-6 sm:p-8 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-6 text-xs">
        
        {/* Full Name */}
        <div className="space-y-1">
          <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-terracotta" />
            Full Name / Business Operator Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Pandit Gangadhar Shastri"
            className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Phone */}
          <div className="space-y-1">
            <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-terracotta" />
              WhatsApp Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 98765 43210"
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
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. gangadhar@gmail.com"
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Business Type */}
          <div className="space-y-1">
            <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-terracotta" />
              Primary Business Category
            </label>
            <select
              name="business_type"
              value={formData.business_type}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
            >
              <option value="homestay">🏡 Heritage Homestay</option>
              <option value="guide">🚩 Temple Guide / Storyteller</option>
              <option value="package">🕉️ Pilgrimage Tour Operator</option>
              <option value="artisan">🎨 Artisan / Craft Master</option>
            </select>
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-terracotta" />
              City / Location
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Ujjain, MP"
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
            />
          </div>

        </div>

        {/* Bio / Description */}
        <div className="space-y-1">
          <label className="font-bold text-charcoal dark:text-white">Business Description & Hospitality Bio</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell travelers about your experience, hospitality, and heritage offering..."
            className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white resize-none"
          />
        </div>

        {/* Aadhaar / KYC Document Upload */}
        <div className="p-4 bg-sand/40 dark:bg-sand-dark/60 rounded-2xl border border-dashed border-border dark:border-border-dark space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-terracotta" />
              Upload Government ID (Aadhaar / PAN / Trade License)
            </span>
            <ShieldCheck className="w-4 h-4 text-sage" />
          </div>
          <p className="text-[11px] text-charcoal-light/70 dark:text-gray-400">
            Required to earn the green <b className="text-sage">Verified Badge</b> on your listings.
          </p>

          <input
            type="file"
            onChange={handleFileUpload}
            className="text-xs text-charcoal dark:text-gray-300 cursor-pointer"
          />
          {idDocName && (
            <span className="text-[10px] font-bold text-sage block">✓ Uploaded: {idDocName}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-sm py-3.5 px-4 rounded-2xl shadow-lift transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
        >
          {submitting ? "Registering Account..." : "Complete Registration & Launch Dashboard"}
          <ArrowRight className="w-4 h-4" />
        </button>

      </form>

    </div>
  );
}
