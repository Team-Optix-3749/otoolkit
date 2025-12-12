import { NavbarServerConfig } from "@/components/NavbarServerConfig";
import { InfoSidebar } from "@/components/info/InfoSidebar";
import Link from "next/link";
import { BookOpen, Rocket, ClipboardList, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function InfoIndexPage() {
  const cards = [
    { title: "Kickoff Guide", href: "/info/kickoff-guide", desc: "All kickoff topics: strategy, build season, scouting, and more.", icon: Rocket },
    { title: "Strategy Overview", href: "/info/strategy", desc: "Quick reference for competition structure and drafting strategies.", icon: BookOpen },
    { title: "Scouting & Data", href: "/info/kickoff-guide/scouting-data", desc: "How to collect and use data to improve match outcomes.", icon: ClipboardList },
    { title: "Build Season", href: "/info/kickoff-guide/build-season", desc: "Guides and timelines for an effective build season.", icon: Calendar },
    { title: "Privacy & Policies", href: "/info/privacy", desc: "Information about data use and privacy policies.", icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavbarServerConfig />
      
      <div className="flex">
        <InfoSidebar />
        
        <main className="flex-1 ml-64">
          {/* Hero Section */}
          <section className="border-b border-border bg-gradient-to-b from-background to-card/20">
            <div className="container mx-auto px-8 py-24 max-w-4xl">
              <div className="text-center space-y-6">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                  Never miss the <span className="text-primary">info</span> again.
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Comprehensive guides and resources for FRC teams. Everything you need to know about strategy, build season, scouting, and competition.
                </p>
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <Button asChild size="lg" className="text-base">
                    <Link href="/info/kickoff-guide">
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-base">
                    <Link href="/info/strategy">View Strategy Guide</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="container mx-auto px-8 py-16 max-w-6xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Getting Started</h2>
              <p className="text-muted-foreground">Explore our comprehensive guides and resources</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Link key={i} href={c.href}>
                    <Card className="h-full hover:border-primary/50 transition-colors group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary shrink-0">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                              {c.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {c.desc}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
