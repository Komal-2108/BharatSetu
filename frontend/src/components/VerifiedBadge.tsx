import React from "react";
import { Check, ShieldCheck, Award, Sparkles } from "lucide-react";

interface VerifiedBadgeProps {
  variant?: "stamp" | "inline" | "compact" | "tier";
  tier?: "Gold" | "Silver" | "Bronze" | "New" | string;
  text?: string;
  className?: string;
}

export default function VerifiedBadge({
  variant = "stamp",
  tier = "Gold",
  text,
  className = ""
}: VerifiedBadgeProps) {
  const tierColors: Record<string, string> = {
    Gold: "bg-amber-100 text-amber-900 border-amber-400 shadow-amber-200/50",
    Silver: "bg-slate-100 text-slate-800 border-slate-300 shadow-slate-200/50",
    Bronze: "bg-orange-100 text-orange-900 border-orange-300 shadow-orange-200/50",
    New: "bg-emerald-100 text-emerald-900 border-emerald-300 shadow-emerald-200/50"
  };

  const tierIcons: Record<string, string> = {
    Gold: "🥇",
    Silver: "🥈",
    Bronze: "🥉",
    New: "🌱"
  };

  if (variant === "tier") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold shadow-xs ${
          tierColors[tier] || tierColors.Gold
        } ${className}`}
        title="Trust Tier based on verified completed bookings & high rating score"
      >
        <span className="text-sm">{tierIcons[tier] || "🏅"}</span>
        <span>{tier} Verified Provider</span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-sage-light text-sage border border-sage/30 ${className}`}>
        <Check className="w-3 h-3 stroke-[3]" />
        Verified
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sage bg-sage/10 px-2.5 py-1 rounded-md border border-sage/20 ${className}`}>
        <ShieldCheck className="w-4 h-4 text-sage" />
        {text || "Verified Vendor"}
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-light text-sage border-2 border-dashed border-sage font-bold text-xs uppercase tracking-wider shadow-sm transition-transform hover:scale-105 ${className}`}
      title="BharatSetu Authenticated & Identity Verified Local Provider"
    >
      <div className="w-4 h-4 rounded-full bg-sage text-white flex items-center justify-center">
        <Check className="w-2.5 h-2.5 stroke-[3]" />
      </div>
      <span>{text || "Verified Provider"}</span>
    </div>
  );
}
