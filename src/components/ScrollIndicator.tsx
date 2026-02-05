"use client";

import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">Scroll to explore</span>
      <ChevronDown className="w-5 h-5 text-muted-foreground" />
    </div>
  );
}

