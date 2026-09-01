"use client";

import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, XCircle, FileText, ArrowLeft } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";
import { MOCK_VENDORS } from "@/lib/mockData";

export default function AdminVerificationPortalPage() {
  const [vendorsList, setVendorsList] = useState([
    {
      id: "vnd-new-1",
      name: "Gopiram Malvi Homestays",
      phone: "+91 97554 32100",
      email: "gopiram@omkareshwar.in",
      category: "Homestay",
      city: "Omkareshwar, MP",
      docUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
      status: "pending"
    },
    {
      id: "vnd-new-2",
      name: "Pandit Kameshwar Shastri",
      phone: "+91 98221 12345",
      email: "kameshwar@varanasi.in",
      category: "Temple Guide",
      city: "Varanasi, UP",
      docUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
      status: "pending"
    }
  ]);

  const handleAction = (id: string, newStatus: "verified" | "rejected") => {
    setVendorsList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="bg-charcoal text-white rounded-3xl p-8 border border-charcoal-light/30 flex items-center justify-between shadow-2xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sage bg-sage/20 px-3 py-1 rounded-full border border-sage/40">
            <ShieldCheck className="w-4 h-4" /> Admin Portal
          </div>
          <h1 className="font-serif font-extrabold text-3xl text-white pt-1">
            Vendor KYC & Identity Verification Approvals
          </h1>
          <p className="text-xs text-white/70">
            Review uploaded Aadhaar/ID documents and issue verified ink-stamp trust badges
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif font-bold text-xl text-charcoal">
          Pending Approval Queue ({vendorsList.filter(v => v.status === "pending").length})
        </h2>

        <div className="space-y-4">
          {vendorsList.map((v) => (
            <div key={v.id} className="bg-white rounded-3xl p-6 border-2 border-border shadow-warm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-terracotta bg-terracotta-light px-2 py-0.5 rounded">
                  {v.category}
                </span>
                <h3 className="font-serif font-bold text-lg text-charcoal">{v.name}</h3>
                <p className="text-xs text-charcoal-light/70">{v.city}</p>
                <p className="text-[11px] text-charcoal-light/60">{v.phone} • {v.email}</p>
              </div>

              <div className="md:col-span-5">
                <span className="text-xs font-bold text-charcoal block mb-1">Uploaded KYC Document Preview:</span>
                <div className="w-full h-24 rounded-xl overflow-hidden border border-border bg-sand relative">
                  <img src={v.docUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white text-xs font-bold gap-1">
                    <FileText className="w-4 h-4" /> Aadhaar Document Uploaded
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 text-right">
                {v.status === "pending" ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAction(v.id, "verified")}
                      className="w-full bg-sage hover:bg-sage-dark text-white font-bold text-xs py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Issue Verified Badge
                    </button>
                    <button
                      onClick={() => handleAction(v.id, "rejected")}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs py-2 rounded-xl border border-red-200"
                    >
                      Reject KYC
                    </button>
                  </div>
                ) : (
                  <div className="inline-block text-center">
                    {v.status === "verified" ? (
                      <VerifiedBadge variant="stamp" text="Approved & Active" />
                    ) : (
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
                        KYC Rejected
                      </span>
                    )}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
