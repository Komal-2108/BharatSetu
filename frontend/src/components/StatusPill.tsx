import React from "react";
import { Clock, CheckCircle2, CheckCheck, XCircle } from "lucide-react";

interface StatusPillProps {
  status: "pending" | "confirmed" | "completed" | "cancelled" | string;
  className?: string;
}

export default function StatusPill({ status, className = "" }: StatusPillProps) {
  const normalized = status.toLowerCase();

  switch (normalized) {
    case "pending":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-terracotta-light text-terracotta border border-terracotta/30 ${className}`}
        >
          <Clock className="w-3.5 h-3.5" />
          Pending
        </span>
      );

    case "confirmed":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sage-light text-sage border border-sage/30 ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Confirmed
        </span>
      );

    case "completed":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-charcoal/10 text-charcoal border border-charcoal/20 ${className}`}
        >
          <CheckCheck className="w-3.5 h-3.5" />
          Completed
        </span>
      );

    case "cancelled":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 ${className}`}
        >
          <XCircle className="w-3.5 h-3.5" />
          Cancelled
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 ${className}`}>
          {status}
        </span>
      );
  }
}
