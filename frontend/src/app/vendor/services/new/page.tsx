"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Image as ImageIcon, MapPin, Tag, Calendar, DollarSign, Send, Sparkles } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";
import AiDescModal from "@/components/AiDescModal";
import { ServiceData } from "@/lib/mockData";

export default function AddNewServicePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "homestay",
    description: "",
    price: "",
    location: "",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000",
    dateInput: "2026-09-05, 2026-09-06, 2026-09-07, 2026-09-08"
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const available_dates = formData.dateInput
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    // Get Active Vendor Session
    let activeVendor: any = { id: "v1", name: "Ramesh Sharma" };
    try {
      const saved = localStorage.getItem("bharatsetu_vendor") || localStorage.getItem("bharatsetu_user");
      if (saved) activeVendor = JSON.parse(saved);
    } catch (e) {
      // fallback
    }

    const activeVendorId = activeVendor.id || "v1";
    const activeVendorName = activeVendor.name || "Ramesh Sharma";

    // Construct New Service Object
    const newService: any = {
      id: `s-custom-${Date.now()}`,
      vendorId: activeVendorId,
      vendor_id: activeVendorId,
      vendorName: activeVendorName,
      vendor_name: activeVendorName,
      title: formData.title,
      category: formData.category,
      price: parseFloat(formData.price) || 1500,
      priceUnit: formData.category === "homestay" ? "per night" : "per person",
      location: formData.location,
      description: formData.description,
      included: ["Verified Local Host", "24/7 Support", "Instant WhatsApp Booking"],
      images: [formData.imageUrl || "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000"],
      rating: 5.0,
      reviewCount: 1,
      availableDates: available_dates,
      available_dates: available_dates,
      vendor: activeVendor
    };

    // Save into localStorage
    try {
      const existing = localStorage.getItem("bharatsetu_custom_services");
      const list: any[] = existing ? JSON.parse(existing) : [];
      list.unshift(newService);
      localStorage.setItem("bharatsetu_custom_services", JSON.stringify(list));
    } catch (e) {
      console.error("Failed to save custom service locally", e);
    }

    // Try posting to backend API as well
    try {
      const token = localStorage.getItem("bharatsetu_token");
      await fetch("http://localhost:8000/api/v1/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newService)
      });
    } catch (err) {
      // API call failure ignored for local mock demo
    } finally {
      setLoading(false);
      router.push("/vendor/dashboard");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      
      <Link
        href="/vendor/dashboard"
        className="inline-flex items-center gap-2 text-xs font-bold text-charcoal dark:text-gray-200 hover:text-terracotta transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="bg-white dark:bg-card-dark rounded-3xl p-8 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-6">
        
        <div className="border-b border-border dark:border-border-dark pb-4 flex items-start justify-between">
          <div>
            <VerifiedBadge variant="compact" text="Verified Service Listing" />
            <h1 className="font-serif font-extrabold text-3xl text-charcoal dark:text-white pt-2">
              Create New Service Listing
            </h1>
            <p className="text-xs text-charcoal-light/70 dark:text-gray-400">
              Publish your local experience or stay on BharatSetu for travelers across India.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Service Title */}
          <div className="space-y-1">
            <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-terracotta" /> Service Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Mahakal Darshan Heritage Stay & Temple Walk"
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Category */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal dark:text-white">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
              >
                <option value="homestay">🏡 Heritage Homestay</option>
                <option value="guide">🚩 Local Temple Guide</option>
                <option value="package">🕉️ Pilgrimage Package</option>
                <option value="artisan">🎨 Artisan Workshop</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label className="font-bold text-charcoal dark:text-white flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-terracotta" /> Price (₹ INR)
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 1800"
                className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
              />
            </div>

          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-terracotta" /> Location / City
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Ujjain, Madhya Pradesh"
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
            />
          </div>

          {/* Description & AI Generator */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-bold text-charcoal dark:text-white">Detailed Description</label>
              
              {/* AI GENERATOR TRIGGER */}
              <button
                type="button"
                onClick={() => setAiModalOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-terracotta bg-terracotta-light dark:bg-terracotta/20 px-2.5 py-1 rounded-lg border border-terracotta/30 hover:bg-terracotta hover:text-white transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Magic Write with Bharat AI
              </button>
            </div>

            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your authentic offering, inclusions, and experience..."
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white resize-none"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-terracotta" /> Cover Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              required
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
            />
          </div>

          {/* Available Dates */}
          <div className="space-y-1">
            <label className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-terracotta" /> Available Booking Dates (Comma separated YYYY-MM-DD)
            </label>
            <input
              type="text"
              name="dateInput"
              required
              value={formData.dateInput}
              onChange={handleChange}
              placeholder="2026-09-05, 2026-09-06, 2026-09-07"
              className="w-full px-3.5 py-2.5 bg-sand/40 dark:bg-sand-dark/60 border border-border dark:border-border-dark rounded-xl font-medium text-charcoal dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-sm py-3.5 px-4 rounded-2xl shadow-lift transition-all flex items-center justify-center gap-2 mt-6"
          >
            {loading ? "Publishing Service..." : "Publish Service Listing"}
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

      {/* AI DESCRIPTION MODAL */}
      <AiDescModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialTitle={formData.title}
        category={formData.category}
        location={formData.location}
        onSelectDescription={(generatedCopy) => setFormData({ ...formData, description: generatedCopy })}
      />

    </div>
  );
}
