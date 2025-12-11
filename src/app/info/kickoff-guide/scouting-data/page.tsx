import { NavbarServerConfig } from "@/components/NavbarServerConfig";
import { Database, ClipboardList, BarChart3, Users, ArrowLeft, ExternalLink, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ScoutingDataPage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
            <NavbarServerConfig />

            <main className="container mx-auto px-4 py-12 max-w-5xl">
                <Link
                    href="/info/kickoff-guide"
                    className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Kickoff Guide
                </Link>

                <header className="mb-12 space-y-4">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-4">
                        <Database className="w-6 h-6" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                        Scouting & Data Analysis
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl">
                        Collect, analyze, and leverage data to make informed strategic decisions. Data-driven teams win championships.
                    </p>
                </header>

                {/* Overview */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-3xl font-bold mb-6">Why Scouting Matters</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg">
                            Scouting is the process of <strong>collecting and analyzing data</strong> about teams at a competition. It informs your match strategy, alliance selection, and gameplay decisions.
                        </p>
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-2xl text-white my-6">
                            <p className="text-xl font-bold mb-2">📊 The Scouting Pipeline</p>
                            <p className="mb-0">
                                <strong>Collect Data</strong> (objective, subjective, pit) → <strong>Process & Calculate</strong> (OPR, EPA, pickability) → <strong>View & Analyze</strong> (viewer tools) → <strong>Create Outputs</strong> (picklist, match strategy, playbook)
                            </p>
                        </div>
                    </div>
                </section>

                {/* Types of Data Collection */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardList className="w-8 h-8 text-blue-500" />
                        <h2 className="text-3xl font-bold">Three Types of Data Collection</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Objective */}
                        <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border-2 border-blue-300 dark:border-blue-700">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                                <h3 className="text-2xl font-bold">Objective Collection (Quantitative)</h3>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Hard numbers and countable facts. This is the foundation of data-driven strategy.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2">What to Track:</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Game pieces scored (by location: low/mid/high)</li>
                                        <li>• Game pieces picked up (but not scored)</li>
                                        <li>• Autonomous points earned</li>
                                        <li>• End-game actions (climb level, hang points)</li>
                                        <li>• Incap status (was robot disabled/broken?)</li>
                                        <li>• Fouls committed</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">How to Collect:</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Dedicated scout per robot (6 scouts per match)</li>
                                        <li>• Paper forms or digital apps (e.g., Tableau, custom apps)</li>
                                        <li>• Tally marks for quick counting</li>
                                        <li>• Video review for accuracy</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Subjective */}
                        <div className="p-6 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border-2 border-purple-300 dark:border-purple-700">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                                <h3 className="text-2xl font-bold">Subjective Collection (Qualitative)</h3>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Observations and judgments that can't be easily quantified. Provides context to the numbers.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2">What to Track:</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Speed (slow, medium, fast)</li>
                                        <li>• Driver awareness & skill</li>
                                        <li>• Defense capability (aggressive, passive, none)</li>
                                        <li>• Reliability (did mechanisms fail?)</li>
                                        <li>• Cycle time (fast, average, slow)</li>
                                        <li>• Autonomous consistency</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">Rating Scales:</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• 1-5 scale (1 = poor, 5 = excellent)</li>
                                        <li>• Low/Medium/High categories</li>
                                        <li>• Yes/No checkboxes</li>
                                        <li>• Free-form notes for standout observations</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Pit */}
                        <div className="p-6 bg-cyan-50 dark:bg-cyan-950/20 rounded-2xl border-2 border-cyan-300 dark:border-cyan-700">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold">3</div>
                                <h3 className="text-2xl font-bold">Pit Collection (Technical Specs)</h3>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Information gathered by visiting teams in the pit area. Reveals robot capabilities before they compete.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2">What to Collect:</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Drivetrain type (tank, mecanum, swerve)</li>
                                        <li>• Motor types and counts (Falcons, NEOs)</li>
                                        <li>• Mechanism types (intake, shooter, climber)</li>
                                        <li>• Robot weight and dimensions</li>
                                        <li>• Programming language (Java, C++, Python)</li>
                                        <li>• Photos of robot (all angles)</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">Pit Scouting Tips:</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Be polite and respectful</li>
                                        <li>• Ask open-ended questions</li>
                                        <li>• Take detailed photos</li>
                                        <li>• Note any unique features</li>
                                        <li>• Ask about autonomous capabilities</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Calculated Metrics */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3 mb-6">
                        <BarChart3 className="w-8 h-8 text-purple-500" />
                        <h2 className="text-3xl font-bold">Key Calculated Metrics</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            Raw data is useful, but <strong>calculated metrics</strong> provide deeper insights by normalizing performance across different alliance partners and opponents.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                            <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h3 className="text-xl font-bold mb-3">OPR (Offensive Power Rating)</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                    Estimates how many points a team contributes to their alliance's score on average.
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                                    <strong>Formula:</strong> Solve a system of linear equations using alliance scores and team compositions across all matches.
                                </p>
                            </div>

                            <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800">
                                <h3 className="text-xl font-bold mb-3">DPR (Defensive Power Rating)</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                    Estimates how many points a team prevents the opposing alliance from scoring.
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                                    <strong>Formula:</strong> Similar to OPR, but calculated from opponent alliance scores.
                                </p>
                            </div>

                            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                                <h3 className="text-xl font-bold mb-3">EPA (Expected Points Added)</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                    Predicts a team's contribution to alliance score, accounting for opponent strength. More accurate than OPR.
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                                    <strong>Used by:</strong> Statbotics for rankings and match predictions.
                                </p>
                            </div>

                            <div className="p-6 bg-yellow-50 dark:bg-yellow-950/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                                <h3 className="text-xl font-bold mb-3">ELO Rating</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                    Relative skill level score based on wins and losses. Higher ELO = stronger team.
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                                    <strong>Note:</strong> Borrowed from chess; adjusts based on opponent strength.
                                </p>
                            </div>

                            <div className="p-6 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                <h3 className="text-xl font-bold mb-3">CCWM (Contributed Calculation to Win Margin)</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                    Calculated as <code className="text-xs bg-white dark:bg-neutral-800 px-1 py-0.5 rounded">OPR - DPR</code>. Gives credit to defensive play.
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                                    <strong>Why it matters:</strong> Recognizes that defense contributes to winning.
                                </p>
                            </div>

                            <div className="p-6 bg-cyan-50 dark:bg-cyan-950/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                                <h3 className="text-xl font-bold mb-3">Pickability</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                    Custom metric combining objective data, subjective ratings, and calculated stats to rank teams for alliance selection.
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                                    <strong>Custom formula:</strong> Each team defines their own based on strategy.
                                </p>
                            </div>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-xl border-l-4 border-purple-500">
                            <p className="font-semibold text-purple-900 dark:text-purple-100 mb-1">📈 Which Metric to Use?</p>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-0">
                                <strong>EPA</strong> is generally the most accurate for predictions. <strong>OPR</strong> is simpler and widely used. <strong>Pickability</strong> is best for alliance selection because it incorporates your specific strategy needs.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Data Workflow */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="w-8 h-8 text-orange-500" />
                        <h2 className="text-3xl font-bold">From Data to Decisions</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            Scouting data flows through a pipeline from collection to actionable outputs:
                        </p>

                        <div className="relative my-8">
                            <div className="space-y-4">
                                {[
                                    {
                                        step: "1. Collect",
                                        description: "Scouts gather objective, subjective, and pit data during matches and pit visits.",
                                        color: "blue"
                                    },
                                    {
                                        step: "2. Process",
                                        description: "Data is entered into a database or spreadsheet. Calculate OPR, EPA, CCWM, and pickability scores.",
                                        color: "purple"
                                    },
                                    {
                                        step: "3. View",
                                        description: "Use a viewer tool (custom app, Tableau dashboard, or spreadsheet) to visualize team performance.",
                                        color: "cyan"
                                    },
                                    {
                                        step: "4. Analyze",
                                        description: "Identify top performers, complementary robots, and strategic matchups.",
                                        color: "emerald"
                                    },
                                    {
                                        step: "5. Create Outputs",
                                        description: "Generate picklist (ranked teams for alliance selection) and match playbooks (strategy for each match).",
                                        color: "orange"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className={`flex items-start gap-4 p-5 bg-${item.color}-50 dark:bg-${item.color}-950/20 rounded-xl border border-${item.color}-200 dark:border-${item.color}-800`}>
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 flex items-center justify-center text-white font-bold shadow-lg`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{item.step}</h4>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-0">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Picklist & Match Strategy */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="w-8 h-8 text-emerald-500" />
                        <h2 className="text-3xl font-bold">Picklist & Match Strategy</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h3 className="text-2xl font-bold mb-4">The Picklist</h3>
                        <p>
                            A <strong>picklist</strong> is a ranked list of teams you'd want to pick (or be picked by) for alliance selection. It's created by combining:
                        </p>
                        <ul className="space-y-2">
                            <li><strong>Quantitative metrics:</strong> OPR, EPA, scoring averages</li>
                            <li><strong>Qualitative observations:</strong> Reliability, driver skill, defense</li>
                            <li><strong>Strategic fit:</strong> Does this robot complement our capabilities?</li>
                            <li><strong>Pit scouting:</strong> Technical specs and autonomous capabilities</li>
                        </ul>

                        <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl border-l-4 border-emerald-500 my-6">
                            <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">💡 Picklist Pro Tips</p>
                            <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1 mb-0">
                                <li>• Rank teams by <strong>pickability</strong>, not just OPR</li>
                                <li>• Consider <strong>reliability</strong>—a consistent mid-tier robot beats an unreliable top-tier robot</li>
                                <li>• Look for <strong>complementary skills</strong>—don't pick three identical robots</li>
                                <li>• Update your picklist throughout the event as teams improve or break</li>
                            </ul>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Match Strategy (Playbook)</h3>
                        <p>
                            Before each qualification match, create a simple <strong>playbook</strong>:
                        </p>
                        <ul className="space-y-2">
                            <li><strong>Autonomous plan:</strong> Who scores where? Who goes for bonus objectives?</li>
                            <li><strong>TeleOp roles:</strong> Who plays offense? Who plays defense?</li>
                            <li><strong>End-game plan:</strong> Who climbs/hangs? Timing and positioning?</li>
                            <li><strong>Opponent analysis:</strong> What are their strengths/weaknesses? How do we counter them?</li>
                        </ul>

                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border-l-4 border-blue-500 mt-4">
                            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">🤝 Communication is Key</p>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-0">
                                Share your playbook with alliance partners before the match. A coordinated alliance beats three individual robots every time.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Resources */}
                <section className="mb-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 shadow-xl text-white">
                    <h2 className="text-3xl font-bold mb-6">Essential Scouting Resources</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <a
                            href="https://www.thebluealliance.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
                        >
                            <h3 className="font-bold text-lg mb-2">The Blue Alliance</h3>
                            <p className="text-sm text-neutral-100">
                                Match data, team stats, event schedules, and video archives. The #1 resource for FRC data.
                            </p>
                        </a>
                        <a
                            href="https://www.statbotics.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
                        >
                            <h3 className="font-bold text-lg mb-2">Statbotics</h3>
                            <p className="text-sm text-neutral-100">
                                Advanced analytics using EPA. Predict match outcomes, team rankings, and event winners.
                            </p>
                        </a>
                        <a
                            href="https://www.chiefdelphi.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
                        >
                            <h3 className="font-bold text-lg mb-2">Chief Delphi</h3>
                            <p className="text-sm text-neutral-100">
                                Community discussions, scouting app recommendations, and strategy threads.
                            </p>
                        </a>
                    </div>
                </section>

                {/* Next Steps */}
                <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href="/info/kickoff-guide"
                            className="group p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400">← Back to Guide Home</span>
                                <ExternalLink className="w-5 h-5 opacity-50" />
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Return to the main Kickoff Guide to explore other topics.
                            </p>
                        </Link>
                        <Link
                            href="/info/strategy"
                            className="group p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Strategy Overview →</span>
                                <ExternalLink className="w-5 h-5 opacity-50" />
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Quick reference for competition structure and FRC vocabulary.
                            </p>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
