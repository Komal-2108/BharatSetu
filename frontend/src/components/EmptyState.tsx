import React from "react";
import { Compass, SearchX, CalendarX, PlusCircle } from "lucide-react";

interface EmptyStateProps {
  icon?: "compass" | "rickshaw" | "calendar" | "search";
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export default function EmptyState({
  icon = "rickshaw",
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className = ""
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-12 px-6 bg-sand/40 rounded-2xl border-2 border-dashed border-border ${className}`}
    >
      {/* Icon Illustration */}
      <div className="w-20 h-20 rounded-full bg-base border border-border flex items-center justify-center mb-4 shadow-sm text-charcoal">
        {icon === "rickshaw" && (
          /* Custom Charcoal Line-art Auto-Rickshaw SVG */
          <svg
            className="w-10 h-10 stroke-charcoal fill-none stroke-[1.8]"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 17h14" />
            <path d="M4 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M16 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M5 15l2 -8h7l2 4h3v4" />
            <path d="M9 7l1 -3h4" />
            <circle cx="10" cy="11" r="1" />
          </svg>
        )}

        {icon === "compass" && <Compass className="w-10 h-10 stroke-[1.5] text-terracotta" />}
        {icon === "calendar" && <CalendarX className="w-10 h-10 stroke-[1.5] text-terracotta" />}
        {icon === "search" && <SearchX className="w-10 h-10 stroke-[1.5] text-terracotta" />}
      </div>

      {/* Title & Description */}
      <h3 className="font-serif text-xl font-bold text-charcoal mb-2">{title}</h3>
      <p className="text-charcoal-light/70 text-sm max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      {actionLabel && (
        <>
          {actionHref ? (
            <a
              href={actionHref}
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-warm transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              {actionLabel}
            </a>
          ) : (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-warm transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              {actionLabel}
            </button>
          )}
        </>
      )}
    </div>
  );
}
