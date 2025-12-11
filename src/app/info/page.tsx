import { NavbarServerConfig } from "@/components/NavbarServerConfig";
import Link from "next/link";
import { BookOpen, Rocket, ClipboardList, Calendar, ShieldCheck } from "lucide-react";

export default function InfoIndexPage() {
  const cards = [
    { title: "Kickoff Guide", href: "/info/kickoff-guide", desc: "All kickoff topics: strategy, build season, scouting, and more.", icon: Rocket },
    { title: "Strategy Overview", href: "/info/strategy", desc: "Quick reference for competition structure and drafting strategies.", icon: BookOpen },
    { title: "Scouting & Data", href: "/info/kickoff-guide/scouting-data", desc: "How to collect and use data to improve match outcomes.", icon: ClipboardList },
    { title: "Build Season", href: "/info/kickoff-guide/build-season", desc: "Guides and timelines for an effective build season.", icon: Calendar },
    { title: "Privacy & Policies", href: "/info/privacy", desc: "Information about data use and privacy policies.", icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <NavbarServerConfig />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold">Info</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">Helpful links and guides for teams</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link key={i} href={c.href} className="group block bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-600 text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold">{c.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{c.desc}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
