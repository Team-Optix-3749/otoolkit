import { NavbarServerConfig } from "@/components/NavbarServerConfig";
import { BookOpen, Trophy, Cpu, Database, Shield, Globe } from "lucide-react";

export default function StrategyGuidePage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
            <NavbarServerConfig />

            <main className="container mx-auto px-4 py-12 max-w-5xl">
                {/* Header */}
                <header className="mb-16 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                        FRC Strategy & Design
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        The comprehensive guide to mastering the First Robotics Competition, from competition structure to advanced strategic design.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-12 space-y-12">

                        {/* Competition Structure */}
                        <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-3 mb-6">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                                <h2 className="text-3xl font-bold">Competition Structure</h2>
                            </div>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p>
                                    The FRC season is a rigorous journey divided into distinct phases: <strong>Offseason</strong> (May-Dec) for training, <strong>Build Season</strong> (Jan-Feb), and <strong>Competition Season</strong> (Mar-Apr) culminating in Regionals and Champs.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                    <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-2xl">
                                        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Review Qualifications (Quals)</h3>
                                        <p className="text-neutral-600 dark:text-neutral-400">Teams are randomly paired. The goal is to seed first by earning <strong>Ranking Points (RPs)</strong>.</p>
                                        <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>Win: 2 RP</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>Tie: 1 RP</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Bonus: +2 RP possible</li>
                                        </ul>
                                    </div>
                                    <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-2xl">
                                        <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Playoffs (Elims)</h3>
                                        <p className="text-neutral-600 dark:text-neutral-400">Double elimination bracket. Alliances are formed via a serpentine draft by the top 8 seeds.</p>
                                        <div className="mt-4 text-sm font-medium text-neutral-500">Prioritizes purely winning matches over bonus objectives.</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Strategic Design */}
                        <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-3 mb-6">
                                <Cpu className="w-8 h-8 text-purple-500" />
                                <h2 className="text-3xl font-bold">Strategic Design</h2>
                            </div>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p>
                                    Effective robot design starts with strategy. The golden rules of FRC engineering are:
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>KISS (Keep It Simple, Silly):</strong> Simple equals robust. Function over form.</li>
                                    <li><strong>Steal from the best, invent the rest:</strong> Analyze top teams and game history.</li>
                                    <li><strong>Fail Faster:</strong> Iterate constantly. A robot "finished" on Day 29 allows for critical driver practice.</li>
                                </ul>

                                <h3 className="text-xl font-bold mt-8 mb-4">Mechanisms & Drivetrains</h3>
                                <div className="grid md:grid-cols-3 gap-4 not-prose mb-8">
                                    <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl">
                                        <div className="font-bold mb-1">Tank / West Coast</div>
                                        <div className="text-sm text-neutral-500">Great pushing power and traction. Simple to build and code.</div>
                                    </div>
                                    <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl">
                                        <div className="font-bold mb-1">Mecanum</div>
                                        <div className="text-sm text-neutral-500">Omnidirectional movement but low traction. Vulnerable to defense.</div>
                                    </div>
                                    <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl">
                                        <div className="font-bold mb-1">Swerve</div>
                                        <div className="text-sm text-neutral-500">Top tier maneuverability and traction. Complex code and high cost.</div>
                                    </div>
                                </div>
                                <p>
                                    <strong>Game Object Processing</strong> typically follows the cycle: Acquisition &rarr; Manipulation &rarr; Storage &rarr; Elevation &rarr; Positioning &rarr; Release.
                                </p>
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-purple-900 dark:text-purple-100 font-medium mt-4">
                                    💡 Pro Tip: Optimize your "Acquisition Zone" with rolly-grabbers and continuous intakes. "Touch it, own it!"
                                </div>
                            </div>
                        </section>

                        {/* Data & Calculations */}
                        <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-3 mb-6">
                                <Database className="w-8 h-8 text-emerald-500" />
                                <h2 className="text-3xl font-bold">Data & Analytics</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 prose prose-lg dark:prose-invert max-w-none">
                                <div>
                                    <h3 className="mt-0">Scouting Types</h3>
                                    <ul className="space-y-1">
                                        <li><strong>Objective:</strong> Quantitative data (Points scored, missed shots).</li>
                                        <li><strong>Subjective:</strong> Qualitative data (Driver awareness, speed, defense).</li>
                                        <li><strong>Pit:</strong> Technical specs (Motor types, drivetrain, weight).</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="mt-0">Key Metrics</h3>
                                    <ul className="space-y-1">
                                        <li><strong>EPA:</strong> Expected Points Added (Predicted contribution).</li>
                                        <li><strong>OPR:</strong> Offensive Power Rating.</li>
                                        <li><strong>DPR:</strong> Defensive Power Rating.</li>
                                        <li><strong>CCWM:</strong> Calculated Contribution to Win Margin.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Defense */}
                            <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                                <div className="flex items-center gap-3 mb-6">
                                    <Shield className="w-8 h-8 text-rose-500" />
                                    <h2 className="text-2xl font-bold">Defense</h2>
                                </div>
                                <div className="prose prose-neutral dark:prose-invert">
                                    <p>
                                        Defense is a critical match strategy, often used by "lower tier" robots to disrupt powerful alliances.
                                    </p>
                                    <strong className="block mb-2">Effective Tactics:</strong>
                                    <ul className="grid grid-cols-1 gap-2">
                                        <li className="bg-rose-50 dark:bg-rose-900/10 p-2 rounded-md">🚧 Cutting off field choke points</li>
                                        <li className="bg-rose-50 dark:bg-rose-900/10 p-2 rounded-md">⏱️ Slowing opponent cycles</li>
                                        <li className="bg-rose-50 dark:bg-rose-900/10 p-2 rounded-md">🛡️ Blocking shots or bumping</li>
                                        <li className="bg-rose-50 dark:bg-rose-900/10 p-2 rounded-md">📦 Hoarding game pieces</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Resources */}
                            <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                                <div className="flex items-center gap-3 mb-6">
                                    <Globe className="w-8 h-8 text-cyan-500" />
                                    <h2 className="text-2xl font-bold">Resources</h2>
                                </div>
                                <div className="space-y-4">
                                    <a href="https://www.chiefdelphi.com" target="_blank" rel="noopener noreferrer" className="block group p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors">
                                        <div className="font-bold text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Chief Delphi</div>
                                        <div className="text-sm text-neutral-500">The premier online forum for FRC discussion and community help.</div>
                                    </a>
                                    <a href="https://www.thebluealliance.com" target="_blank" rel="noopener noreferrer" className="block group p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors">
                                        <div className="font-bold text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">The Blue Alliance</div>
                                        <div className="text-sm text-neutral-500">Comprehensive match results, event data, and video archives.</div>
                                    </a>
                                    <a href="https://www.statbotics.io" target="_blank" rel="noopener noreferrer" className="block group p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors">
                                        <div className="font-bold text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Statbotics</div>
                                        <div className="text-sm text-neutral-500">Advanced analytics and EPA predictions for teams and matches.</div>
                                    </a>
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}