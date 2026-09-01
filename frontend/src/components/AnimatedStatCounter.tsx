"use client";

import React, { useEffect, useState, useRef } from "react";

interface AnimatedStatCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedStatCounter({ value, suffix = "", duration = 1.5 }: AnimatedStatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = value;
    const totalSteps = 40;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, value, duration]);

  return (
    <span ref={ref} className="font-serif font-extrabold text-3xl sm:text-4xl text-terracotta">
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}
