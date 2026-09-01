"use client";

import React from "react";

export default function RouteLineSvg() {
  return (
    <div className="w-full flex justify-center py-6 pointer-events-none select-none">
      <svg
        width="200"
        height="80"
        viewBox="0 0 200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-terracotta dark:stroke-terracotta-glow"
      >
        <path
          d="M 10 10 C 60 70, 140 10, 190 70"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
        <circle cx="10" cy="10" r="4" className="fill-terracotta" />
        <circle cx="190" cy="70" r="5" className="fill-sage animate-ping" />
      </svg>
    </div>
  );
}
