"use client";

import { useEffect, useRef } from "react";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxBackground({ children, speed = 0.5, className = "" }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafPendingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return; // Skip parallax effect if reduced motion is preferred
    }

    const handleScroll = () => {
      if (!rafPendingRef.current) {
        rafPendingRef.current = true;
        rafIdRef.current = window.requestAnimationFrame(() => {
          if (ref.current) {
            const scrolled = window.scrollY;
            ref.current.style.transform = `translateY(${scrolled * speed}px)`;
          }
          rafPendingRef.current = false;
          rafIdRef.current = null;
        });
      }
    };

    if (ref.current) {
      const scrolled = window.scrollY;
      ref.current.style.transform = `translateY(${scrolled * speed}px)`;
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

