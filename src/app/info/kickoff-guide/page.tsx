import React from "react";
import { BookOpen, Cpu, Wrench, Calendar, Trophy, Database, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
    {
        title: "Strategic Design",
        description: "Learn the golden rules of FRC design, from 'Keep it Simple' to 'Steal from the Best'. Master the art of analyzing games and building winning strategies.",
        icon: Rocket,
        href: "/info/kickoff-guide/strategic-design",
    },
    {
        title: "Mechanism Design",
        description: "Deep dive into drivetrains, intakes, shooters, and elevators. Understand motors vs pneumatics, game piece processing, and device alignment.",
        icon: Cpu,
        href: "/info/kickoff-guide/mechanism-design",
    },
    {
        title: "Build Season",
        description: "Navigate the intense 6-week build period. From kickoff analysis to prototyping deadlines, learn how to manage time and iterate rapidly.",
        icon: Wrench,
        href: "/info/kickoff-guide/build-season",
    },
    {
        title: "Competition Season",
        description: "Master quals, playoffs, and alliance selection. Learn defensive strategies, match preparation, and how to adapt between regionals.",
        icon: Trophy,
        href: "/info/kickoff-guide/competition-season",
    },
    {
        title: "Scouting & Data",
        description: "Collect objective, subjective, and pit data. Calculate OPR, EPA, and CCWM. Build picklists and create winning match strategies.",
        icon: Database,
        href: "/info/kickoff-guide/scouting-data",
    },
    {
        title: "FRC Strategy Overview",
        description: "Quick reference guide covering competition structure, ranking points, robot tiers, drafting strategies, and essential FRC vocabulary.",
        icon: BookOpen,
        href: "/info/strategy",
    }
];

export default function KickoffGuidePage() {
    return (
                <main>
                    {/* Header */}
                    <section className="border-b border-border">
                        <div className="py-16">
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                                FRC Kickoff Guide
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                                Your comprehensive resource for dominating the FIRST Robotics Competition. From strategic design to competition day execution.
                            </p>
                        </div>
                    </section>

                    {/* Introduction */}
                    <section className="py-12">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed mb-4">
                                The FIRST Robotics Competition is the ultimate high school robotics challenge. In just <strong>6 weeks</strong>, teams design, build, and program a robot to compete in an alliance-based game that changes every year.
                            </p>
                            <p className="text-lg leading-relaxed mb-6">
                                Success in FRC requires more than just building a robot—it demands <strong>strategic thinking</strong>, <strong>efficient design</strong>, <strong>data-driven decisions</strong>, and <strong>seamless teamwork</strong>. This guide will walk you through every phase of the season, from kickoff to championships.
                            </p>
                            <div className="bg-card border border-border rounded-lg p-6 mt-6">
                                <p className="font-semibold text-lg mb-2">Golden Rule #5: Fail Faster!</p>
                                <p className="text-muted-foreground mb-0">
                                    The best teams finish their robot by Day 29, leaving precious time for driver practice. Remember: <strong>good drivers are better than good robots</strong>.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Guide Sections Grid */}
                    <section className="py-12">
                        <h2 className="text-3xl font-bold mb-8">Explore the Guide</h2>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {sections.map((section, index) => {
                                const Icon = section.icon;
                                return (
                                    <Link key={index} href={section.href} className="block">
                                        <Card className="h-full hover:border-primary/50 transition-colors group">
                                            <CardContent className="p-6">
                                                <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-primary/10 text-primary">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2 flex items-center justify-between group-hover:text-primary transition-colors">
                                                    {section.title}
                                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {section.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* Resources Section */}
                    <section className="py-12">
                        <h2 className="text-3xl font-bold mb-6">Essential Resources</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a
                                href="https://gm0.org/en/latest/docs/start-here.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-colors"
                            >
                                <div className="font-semibold mb-1">Game Manual 0</div>
                                <div className="text-sm text-muted-foreground">Comprehensive FRC knowledge base</div>
                            </a>
                            <a
                                href="https://www.projectb.net.au/resources/robot-mechanisms/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-colors"
                            >
                                <div className="font-semibold mb-1">FRC Mechanism Library</div>
                                <div className="text-sm text-muted-foreground">Visual reference for robot mechanisms</div>
                            </a>
                            <a
                                href="https://www.youtube.com/watch?v=Y9B0Khob0Xk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-colors"
                            >
                                <div className="font-semibold mb-1">Karthik's Lecture</div>
                                <div className="text-sm text-muted-foreground">Legendary FRC strategy talk</div>
                            </a>
                            <a
                                href="https://www.youtube.com/watch?v=j-wOaF65cTU"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-colors"
                            >
                                <div className="font-semibold mb-1">Strategic Design Workshop</div>
                                <div className="text-sm text-muted-foreground">Mike's fall workshop on design</div>
                            </a>
                        </div>
                    </section>
                </main>
    );
}
