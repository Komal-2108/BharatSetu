"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function LiveActivityTicker() {
  const activities = [
    { name: "Ramesh S.", action: "booked a homestay in Rishikesh", time: "2m ago", icon: "🏡" },
    { name: "Pandit Anand", action: "got identity verified in Varanasi", time: "5m ago", icon: "🛡️" },
    { name: "Priya P.", action: "left a 5★ review for Mahakal Guide", time: "8m ago", icon: "⭐" },
    { name: "Sunita R.", action: "reserved Gond Art masterclass", time: "14m ago", icon: "🎨" },
    { name: "Shivram Stays", action: "opened 4 new slots in Omkareshwar", time: "18m ago", icon: "⚡" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activities.length]);

  const current = activities[currentIndex];

  return (
    <div className="inline-flex items-center gap-2 bg-sand/80 dark:bg-card-dark/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border dark:border-border-dark text-xs text-charcoal dark:text-gray-200 shadow-xs transition-all duration-300">
      <span className="w-2 h-2 rounded-full bg-sage animate-pulse shrink-0" />
      <span className="text-sm">{current.icon}</span>
      <p className="truncate max-w-[280px] sm:max-w-md font-medium text-[11px] sm:text-xs">
        <b className="font-semibold text-charcoal dark:text-white">{current.name}</b> {current.action}
      </p>
      <span className="text-[10px] text-charcoal-light/60 dark:text-gray-400 font-mono shrink-0 ml-1">
        {current.time}
      </span>
    </div>
  );
}
