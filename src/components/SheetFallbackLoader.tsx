"use client";

import Loader from "./Loader";

export default function SheetFallbackLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Loader />
    </div>
  );
}
