"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavbarServerConfig } from "@/components/NavbarServerConfig";
import ServerToaster from "@/components/ServerToaster";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CodeTerminal } from "@/components/CodeTerminal";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { HorizontalScrollSection } from "@/components/HorizontalScrollSection";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Typewriter } from "@/components/Typewriter";
import { DynamicBackground } from "@/components/DynamicBackground";
import { BarChart3, ClipboardList, Users, Code2, Zap, Shield, Rocket, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  return (
    <main className="min-h-screen bg-background snap-scroll overflow-x-hidden relative">
      <DynamicBackground />
      <SmoothScroll />
      <NavbarServerConfig setDefaultExpanded={false} />
      <ServerToaster
        message="Welcome to the new Optix Toolkit."
        type="info"
      />

      {/* Chapter 01: Hero */}
      <section
        ref={(el) => { sectionsRef.current.hero = el; }}
        id="hero"
        className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 relative snap-section overflow-hidden"
      >
        {/* Parallax Background Pattern */}
        <ParallaxBackground speed={0.3} className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
        </ParallaxBackground>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <AnimatedGradient className="w-full">
            <div className="space-y-12">
              <ScrollReveal direction="down" delay={0}>
                <div className="mb-6 flex items-center justify-center gap-4">
                </div>
                <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-[-0.02em] leading-[0.9]">
                  <span className="bg-gradient-to-r from-primary via-green-500 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_200%] block">
                    Optix
                  </span>
                  <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%] block mt-2">
                    Toolkit
                  </span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={300}>
                <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                  <Typewriter 
                    text="Streamlining FRC operations with powerful tools for outreach, scouting, and team management."
                    speed={30}
                    delay={800}
                  />
                </p>
              </ScrollReveal>
            </div>
          </AnimatedGradient>
          
          <ScrollReveal direction="up" delay={500}>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mt-16 justify-center">
              <Button asChild size="lg" className="min-w-[180px] text-lg h-14 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                <Link href="/outreach">Outreach</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[180px] text-lg h-14 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                <Link href="/scouting">Scouting</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>

        <ScrollIndicator />
      </section>

      {/* Chapter 02: Features - Horizontal Scroll */}
      <section
        ref={(el) => { sectionsRef.current.features = el; }}
        id="features"
        className="min-h-screen w-full flex flex-col justify-center px-4 py-20 md:py-32 relative snap-section"
      >
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal direction="up" className="text-center mb-20">
            <div className="mb-6 flex items-center justify-center gap-4">
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <Typewriter text="Everything You Need" speed={80} delay={200} />
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <Typewriter text="Powerful tools designed specifically for FRC teams" speed={40} delay={1200} />
            </p>
          </ScrollReveal>

          {/* Horizontal Scroll Container */}
          <div className="mb-8">
            <HorizontalScrollSection className="horizontal-scroll" showControls={false}>
              <div className="flex gap-8 min-w-full md:min-w-0">
                <div className="snap-item min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] flex-shrink-0">
                  <Card className="group h-full bg-card/70 backdrop-blur-lg border border-foreground/10 hover:border-primary/40 transition-all duration-700 hover:shadow-2xl p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-all duration-500">
                        <ClipboardList className="w-8 h-8 text-foreground fill-foreground" />
                      </div>
                      <CardTitle className="text-2xl font-bold">Outreach</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground/90 leading-relaxed text-base">
                        Track hours, manage events, and monitor member participation effortlessly. Keep your team organized and compliant with comprehensive outreach tracking.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="snap-item min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] flex-shrink-0">
                  <Card className="group h-full bg-card/70 backdrop-blur-lg border border-foreground/10 hover:border-primary/40 transition-all duration-700 hover:shadow-2xl p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-all duration-500">
                        <BarChart3 className="w-8 h-8 text-foreground fill-foreground" />
                      </div>
                      <CardTitle className="text-2xl font-bold">Scouting</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground/90 leading-relaxed text-base">
                        Real-time data collection and analysis for better match strategy. Make informed decisions with comprehensive scouting data and analytics.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="snap-item min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] flex-shrink-0">
                  <Card className="group h-full bg-card/70 backdrop-blur-lg border border-foreground/10 hover:border-primary/40 transition-all duration-700 hover:shadow-2xl p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-all duration-500">
                        <Users className="w-8 h-8 text-foreground fill-foreground" />
                      </div>
                      <CardTitle className="text-2xl font-bold">Management</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground/90 leading-relaxed text-base">
                        Easy administration tools for team leaders and mentors. Streamline operations and focus on what matters most.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </HorizontalScrollSection>
          </div>

          <div className="text-center mt-12">
            <span className="text-sm text-muted-foreground uppercase tracking-wider flex items-center justify-center gap-2">
              <span>Scroll to explore</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Swipe right →</span>
            </span>
          </div>
        </div>
      </section>

      {/* Chapter 03: Capabilities */}
      <section
        ref={(el) => { sectionsRef.current.capabilities = el; }}
        id="capabilities"
        className="min-h-screen w-full flex flex-col justify-center px-4 py-20 md:py-32 relative snap-section"
      >
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal direction="up" className="text-center mb-24">
            <div className="mb-6 flex items-center justify-center gap-4">
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <Typewriter text="Built for Excellence" speed={80} delay={200} />
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <Typewriter text="Every detail crafted to help your team succeed" speed={40} delay={1200} />
            </p>
          </ScrollReveal>

          {/* Horizontal Scroll for Capabilities */}
          <HorizontalScrollSection className="mb-12" showControls={false}>
            <div className="flex gap-8">
              <div className="snap-item min-w-[90vw] md:min-w-[60vw] lg:min-w-[45vw] flex-shrink-0">
                <ScrollReveal direction="up" delay={0}>
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                      <Code2 className="w-6 h-6 text-foreground fill-foreground" />
                      Developer Experience
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                      Built with modern technologies for the best developer experience
                    </p>
                  </div>
                  <CodeTerminal />
                </ScrollReveal>
              </div>

              <div className="snap-item min-w-[90vw] md:min-w-[60vw] lg:min-w-[45vw] flex-shrink-0">
                <div className="grid gap-6 h-full">
                  <ScrollReveal direction="left" delay={0}>
                    <Card className="h-full bg-card/60 backdrop-blur-md border-muted/40 hover:border-primary/50 transition-all duration-300 p-8">
                      <CardHeader className="p-0 mb-4">
                        <Rocket className="w-10 h-10 text-foreground fill-foreground mb-3" />
                        <CardTitle className="text-xl font-bold">Rapid Development</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-muted-foreground text-base leading-relaxed">
                          Get started in minutes with our intuitive interface and comprehensive documentation. No complex setup required.
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal direction="left" delay={100}>
                    <Card className="h-full bg-card/60 backdrop-blur-md border-muted/40 hover:border-primary/50 transition-all duration-300 p-8">
                      <CardHeader className="p-0 mb-4">
                        <Target className="w-10 h-10 text-foreground fill-foreground mb-3" />
                        <CardTitle className="text-xl font-bold">Data-Driven Decisions</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-muted-foreground text-base leading-relaxed">
                          Make strategic decisions based on real data. Our analytics tools provide insights that matter.
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </HorizontalScrollSection>
        </div>
      </section>

      {/* Chapter 04: Stats */}
      <section
        ref={(el) => { sectionsRef.current.stats = el; }}
        id="stats"
        className="min-h-screen w-full flex flex-col justify-center px-4 py-20 md:py-32 relative snap-section border-t border-border"
      >
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal direction="up" className="text-center mb-24">
            <div className="mb-6 flex items-center justify-center gap-4">
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <Typewriter text="Performance & Reliability" speed={80} delay={200} />
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <Typewriter text="Built to handle the demands of competitive robotics" speed={40} delay={1200} />
            </p>
          </ScrollReveal>

          <HorizontalScrollSection showControls={false}>
            <div className="flex gap-8">
              <div className="snap-item min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] flex-shrink-0">
                <ScrollReveal direction="up" delay={0}>
                  <div className="text-center p-8 rounded-xl bg-card/60 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-300 h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6 hover:bg-primary/20 transition-colors">
                      <Zap className="w-8 h-8 text-foreground fill-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Built with Next.js 15 and optimized for performance. Experience blazing fast load times.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              <div className="snap-item min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] flex-shrink-0">
                <ScrollReveal direction="up" delay={100}>
                  <div className="text-center p-8 rounded-xl bg-card/60 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-300 h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6 hover:bg-primary/20 transition-colors">
                      <Shield className="w-8 h-8 text-foreground fill-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Secure & Reliable</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Enterprise-grade security with PocketBase backend. Your data is safe and protected.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              <div className="snap-item min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] flex-shrink-0">
                <ScrollReveal direction="up" delay={200}>
                  <div className="text-center p-8 rounded-xl bg-card/60 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-300 h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6 hover:bg-primary/20 transition-colors">
                      <TrendingUp className="w-8 h-8 text-foreground fill-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Always Improving</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Continuously updated with new features and improvements based on team feedback.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </HorizontalScrollSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-auto snap-section">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Team Optix 3749</p>
          <div className="flex gap-6">
            <Link href="https://github.com/SlushEE0/otoolkit" className="hover:text-foreground transition-colors">
              GitHub
            </Link>
            <Link href="/info/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
