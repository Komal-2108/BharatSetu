"use client";

import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCancel: (reason: string) => void;
  bookingId: string;
}

export default function CancelModal({
  isOpen,
  onClose,
  onConfirmCancel,
  bookingId
}: CancelModalProps) {
  const [reason, setReason] = useState("Date Conflict / Rescheduled");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden border-2 border-border shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-serif font-bold text-base text-charcoal">Cancel Booking Request</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-charcoal-light hover:bg-sand">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-charcoal-light/70">
          Please select a cancellation reason for Booking Reference <b className="font-mono text-terracotta">#{bookingId.slice(0, 8).toUpperCase()}</b>:
        </p>

        <div className="space-y-2 text-xs">
          {[
            "Date Conflict / Rescheduled",
            "Customer Requested Cancellation",
            "Service Unavailable on Date",
            "Weather / Travel Interruption",
            "Other Reason"
          ].map((r) => (
            <label
              key={r}
              className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer font-medium transition-all ${
                reason === r ? "bg-red-50 border-red-300 text-red-900" : "bg-sand/30 border-border text-charcoal"
              }`}
            >
              <input
                type="radio"
                name="reason"
                checked={reason === r}
                onChange={() => setReason(r)}
                className="accent-terracotta"
              />
              <span>{r}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-xs font-bold text-charcoal hover:bg-sand"
          >
            Go Back
          </button>
          <button
            onClick={() => {
              onConfirmCancel(reason);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
          >
            Confirm Cancellation
          </button>
        </div>

      </div>
    </div>
  );
}
