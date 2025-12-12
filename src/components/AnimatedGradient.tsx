"use client";

export function AnimatedGradient({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 animate-gradient bg-[length:200%_200%] blur-3xl"></div>
      <div className="relative">{children}</div>
    </div>
  );
}

