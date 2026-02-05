"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FullScreenSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function FullScreenSection({ children, className, id }: FullScreenSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen w-full flex flex-col justify-center items-center relative snap-start",
        className
      )}
    >
      {children}
    </section>
  );
}

