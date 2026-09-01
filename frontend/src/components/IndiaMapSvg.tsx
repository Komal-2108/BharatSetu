"use client";

import React from "react";

export default function IndiaMapSvg() {
  const pins = [
    { name: "Ujjain", cx: 160, cy: 190, label: "Mahakal Temple" },
    { name: "Omkareshwar", cx: 165, cy: 215, label: "Island Homestay" },
    { name: "Rishikesh", cx: 195, cy: 100, label: "Ganga Yoga" },
    { name: "Varanasi", cx: 270, cy: 175, label: "Boat & Aarti" },
    { name: "Pachmarhi", cx: 195, cy: 220, label: "Gond Art" }
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto h-64 sm:h-72 opacity-25 dark:opacity-20 pointer-events-none select-none overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full stroke-terracotta dark:stroke-terracotta-glow"
      >
        {/* Hand-drawn stylized India coastline outline */}
        <path
          d="M 195 60 C 180 80, 150 90, 140 110 C 130 130, 110 150, 110 180 C 110 210, 130 240, 150 270 C 170 300, 195 350, 195 370 C 195 350, 220 300, 240 270 C 260 240, 280 210, 280 180 C 280 150, 260 130, 250 110 C 240 90, 210 80, 195 60 Z"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="animate-pulse"
        />

        {/* Outer regional hub connector lines */}
        <path
          d="M 160 190 L 165 215 L 195 220 L 270 175 L 195 100 L 160 190"
          strokeWidth="1.5"
          strokeDasharray="2 3"
          className="stroke-sage opacity-70"
        />

        {/* Pulsing Dotted Hub Pins */}
        {pins.map((p, i) => (
          <g key={p.name}>
            {/* Outer expanding ripple */}
            <circle
              cx={p.cx}
              cy={p.cy}
              r="12"
              className="fill-terracotta/20 animate-ping"
              style={{ animationDuration: `${2 + i * 0.4}s` }}
            />
            {/* Inner pin dot */}
            <circle cx={p.cx} cy={p.cy} r="5" className="fill-terracotta stroke-white stroke-2" />
          </g>
        ))}
      </svg>
    </div>
  );
}
