"use client";

import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

interface AvailabilityCalendarProps {
  availableDates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function AvailabilityCalendar({
  availableDates,
  selectedDate,
  onSelectDate
}: AvailabilityCalendarProps) {
  const datesWindow = [
    "2026-09-04",
    "2026-09-05",
    "2026-09-06",
    "2026-09-07",
    "2026-09-08",
    "2026-09-09",
    "2026-09-10"
  ];

  return (
    <div className="bg-sand/40 dark:bg-sand-dark/60 p-4 rounded-2xl border border-border dark:border-border-dark space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-charcoal dark:text-white flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-terracotta" />
          Interactive Availability Calendar
        </span>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1 text-sage font-bold">
            <span className="w-2 h-2 rounded-full bg-sage" /> Available
          </span>
          <span className="flex items-center gap-1 text-gray-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" /> Sold Out
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center">
        {datesWindow.map((dStr) => {
          const isAvailable = availableDates.includes(dStr);
          const isSelected = selectedDate === dStr;
          const dayNum = dStr.split("-")[2];

          return (
            <button
              type="button"
              key={dStr}
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelectDate(dStr)}
              className={`p-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center border ${
                isSelected
                  ? "bg-terracotta text-white border-terracotta shadow-md scale-105"
                  : isAvailable
                  ? "bg-white dark:bg-card-dark text-charcoal dark:text-white border-sage/40 hover:border-terracotta hover:bg-terracotta-light dark:hover:bg-terracotta/20"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-50"
              }`}
            >
              <span className="text-[9px] uppercase tracking-wider font-semibold opacity-70">
                Sept
              </span>
              <span className="text-sm font-serif">{dayNum}</span>
              {isAvailable ? (
                <span className="text-[8px] font-bold text-sage mt-0.5">OPEN</span>
              ) : (
                <span className="text-[8px] font-medium text-gray-400 mt-0.5">FULL</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
