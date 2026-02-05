"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastScrollTop = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          if (!prefersReducedMotion && Math.abs(scrollTop - lastScrollTop) > 5) {
            document.documentElement.style.scrollBehavior = "smooth";
          }
          lastScrollTop = scrollTop;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);

  return null;
}

