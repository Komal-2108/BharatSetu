"use client";

import React, { useState } from "react";
import { Star, X, CheckCircle2, ShieldCheck } from "lucide-react";
import { createReview } from "@/lib/api";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  serviceTitle: string;
  onSuccess?: () => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  bookingId,
  serviceTitle,
  onSuccess
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorMsg("Please enter your review feedback.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      await createReview(bookingId, rating, comment);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden border-2 border-border shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sage bg-sage-light px-2 py-0.5 rounded border border-sage/30 inline-block mb-1">
              ✓ Verified Completed Trip
            </span>
            <h3 className="font-serif font-bold text-lg text-charcoal">Leave Verified Review</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-charcoal-light hover:bg-sand">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-charcoal-light/70">
          Review for <b className="text-charcoal">{serviceTitle}</b>
        </p>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Rating Stars */}
          <div className="space-y-1 text-center">
            <label className="text-xs font-bold text-charcoal block">Rating Score</label>
            <div className="flex items-center justify-center gap-2 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition-transform hover:scale-125 ${
                    star <= rating ? "text-amber-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal block">Your Experience Feedback</label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell other travelers about the local hospitality, guide knowledge, or homestay atmosphere..."
              className="w-full px-3.5 py-2.5 bg-sand/40 border border-border rounded-xl text-xs font-medium text-charcoal resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-serif font-bold text-sm py-3 rounded-xl shadow-warm flex items-center justify-center gap-2 transition-all"
          >
            {submitting ? "Publishing Review..." : "Submit Verified Review"}
          </button>
        </form>

      </div>
    </div>
  );
}
