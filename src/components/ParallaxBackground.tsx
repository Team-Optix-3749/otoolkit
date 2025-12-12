"use client";

import { useEffect, useRef } from "react";

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxBackground({ children, speed = 0.5, className = "" }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.scrollY;
        ref.current.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

