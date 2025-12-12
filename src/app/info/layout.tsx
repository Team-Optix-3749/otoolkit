import React from "react";
import { NavbarServerConfig } from "@/components/NavbarServerConfig";
import { InfoSidebar } from "@/components/info/InfoSidebar";

export const metadata = {
  title: "Info",
};

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <NavbarServerConfig />

      <div className="flex">
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="h-full border-r border-border pr-4">
            <InfoSidebar />
          </div>
        </aside>

        <div className="flex-1 px-6 py-8">
          <div className="max-w-5xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
