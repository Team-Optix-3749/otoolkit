"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth",
        isScrolling && "scroll-smooth",
        className
      )}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {children}
    </div>
  );
}

