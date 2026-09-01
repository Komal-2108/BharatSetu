"use client";

import React from "react";

/**
 * Hero India Map Hand-Drawn SVG Illustration
 * Features floating landmark pins connected by a dashed route line
 */
export function HeroIndiaMapIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] flex items-center justify-center p-4">
      
      {/* Background Decorative Sparkle Dots & Diya Trail */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 500 400" fill="none">
        <circle cx="60" cy="80" r="3" fill="#C1653D" />
        <circle cx="420" cy="120" r="4" fill="#7A9471" />
        <circle cx="100" cy="320" r="2.5" fill="#2B2B2B" />
        <circle cx="380" cy="280" r="3.5" fill="#C1653D" />
        <path d="M 50 150 Q 150 80 250 160 T 450 120" stroke="#C1653D" strokeWidth="1.5" strokeDasharray="4 6" />
      </svg>

      <svg viewBox="0 0 450 380" fill="none" className="w-full h-full drop-shadow-md">
        
        {/* Soft Organic India Landmass Silhouette */}
        <path
          d="M 180 50 C 230 40 280 80 300 110 C 330 140 350 180 330 220 C 310 260 270 300 230 330 C 200 350 170 320 160 280 C 140 250 110 200 120 150 C 130 100 150 60 180 50 Z"
          fill="#FDFAF5"
          stroke="#E5E0D8"
          strokeWidth="3"
          className="dark:fill-card-dark dark:stroke-border-dark"
        />

        {/* Dotted Connecting Route Lines */}
        <path
          d="M 170 120 Q 210 180 220 220 T 260 280"
          stroke="#C1653D"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* PIN 1: HIMALAYAS / RISHIKESH (NORTH) */}
        <g className="animate-float-slow">
          <ellipse cx="200" cy="90" rx="10" ry="4" fill="#2B2B2B" opacity="0.15" />
          <g transform="translate(182, 45)">
            <rect x="0" y="0" width="36" height="36" rx="12" fill="#7A9471" />
            <path d="M 10 26 L 18 10 L 26 26 Z" fill="white" />
            <path d="M 18 10 L 22 17 L 18 20 L 14 17 Z" fill="#C1653D" />
          </g>
          <rect x="168" y="85" width="64" height="18" rx="6" fill="#2B2B2B" />
          <text x="200" y="97" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
            Rishikesh
          </text>
        </g>

        {/* PIN 2: UJJAIN / MP (CENTRAL) */}
        <g className="animate-float-delayed">
          <ellipse cx="210" cy="200" rx="10" ry="4" fill="#2B2B2B" opacity="0.15" />
          <g transform="translate(192, 155)">
            <rect x="0" y="0" width="36" height="36" rx="12" fill="#C1653D" />
            <path d="M 18 8 L 28 24 L 8 24 Z" fill="white" />
            <rect x="15" y="24" width="6" height="6" fill="#2B2B2B" />
            <circle cx="18" cy="14" r="2" fill="#C1653D" />
          </g>
          <rect x="180" y="195" width="60" height="18" rx="6" fill="#C1653D" />
          <text x="210" y="207" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
            Ujjain
          </text>
        </g>

        {/* PIN 3: RAJASTHAN (WEST) */}
        <g className="animate-float-slow">
          <ellipse cx="140" cy="170" rx="10" ry="4" fill="#2B2B2B" opacity="0.15" />
          <g transform="translate(122, 125)">
            <rect x="0" y="0" width="36" height="36" rx="12" fill="#E6A15C" />
            <path d="M 10 24 V 16 L 14 12 L 18 16 L 22 12 L 26 16 V 24 Z" fill="white" />
          </g>
          <rect x="110" y="165" width="60" height="18" rx="6" fill="#2B2B2B" />
          <text x="140" y="177" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
            Jaisalmer
          </text>
        </g>

        {/* PIN 4: KERALA (SOUTH) */}
        <g className="animate-float-delayed">
          <ellipse cx="230" cy="300" rx="10" ry="4" fill="#2B2B2B" opacity="0.15" />
          <g transform="translate(212, 255)">
            <rect x="0" y="0" width="36" height="36" rx="12" fill="#7A9471" />
            <path d="M 18 28 V 16 M 18 16 C 14 12 10 14 10 14 M 18 16 C 22 12 26 14 26 14 M 18 16 C 16 10 20 8 20 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <rect x="200" y="295" width="60" height="18" rx="6" fill="#7A9471" />
          <text x="230" y="307" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
            Alleppey
          </text>
        </g>

      </svg>
    </div>
  );
}

/**
 * 3-Step Illustrated Icons for "How BharatSetu Works"
 */
export function DiscoverStepIllustration() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16">
      <rect width="80" height="80" rx="24" fill="#FDFAF5" className="dark:fill-sand-dark" />
      <path d="M 20 25 L 40 18 L 60 25 V 58 L 40 50 L 20 58 Z" stroke="#E5E0D8" strokeWidth="2" fill="none" />
      <path d="M 40 18 V 50" stroke="#E5E0D8" strokeWidth="2" strokeDasharray="2 2" />
      <circle cx="48" cy="38" r="14" fill="#C1653D" />
      <circle cx="48" cy="38" r="8" fill="white" />
      <line x1="54" y1="44" x2="64" y2="54" stroke="#C1653D" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function BookStepIllustration() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16">
      <rect width="80" height="80" rx="24" fill="#FDFAF5" className="dark:fill-sand-dark" />
      <rect x="22" y="16" width="36" height="50" rx="8" fill="#2B2B2B" />
      <rect x="26" y="22" width="28" height="38" rx="4" fill="white" />
      <path d="M 32 30 C 32 26 44 26 44 30 C 44 34 38 34 36 37 L 33 37 L 34 34 C 32 33 32 31 32 30 Z" fill="#25D366" />
      <circle cx="40" cy="30" r="1.5" fill="white" />
      <circle cx="44" cy="30" r="1.5" fill="white" />
    </svg>
  );
}

export function TrustStepIllustration() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16">
      <rect width="80" height="80" rx="24" fill="#FDFAF5" className="dark:fill-sand-dark" />
      <circle cx="40" cy="38" r="22" fill="#7A9471" />
      <circle cx="40" cy="38" r="17" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="30" y="32" width="20" height="16" rx="3" fill="white" />
      <path d="M 36 32 V 28 C 36 26 44 26 44 28 V 32" stroke="white" strokeWidth="2" />
      <path d="M 35 40 L 39 44 L 46 35" stroke="#7A9471" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Organic Wave Section Divider
 */
export function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
      <svg className="relative block w-full h-10 text-sand/60 dark:text-card-dark/40" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
