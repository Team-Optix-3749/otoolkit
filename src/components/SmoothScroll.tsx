"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    let lastScrollTop = 0;
    let ticking = false;

    const handlePreferenceChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };

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
    mediaQuery.addEventListener("change", handlePreferenceChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handlePreferenceChange);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);

  return null;
}

