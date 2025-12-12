import { NavbarServerConfig } from "@/components/NavbarServerConfig";
import { InfoSidebar } from "@/components/info/InfoSidebar";
import { Database, ClipboardList, BarChart3, Users, ExternalLink, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function ScoutingDataPage() {
    return (
        <div className="min-h-screen bg-background">
            <NavbarServerConfig />

            <div className="flex">
                <InfoSidebar />
                
                <main className="flex-1 ml-64">
                    {/* Header */}
                    <section className="border-b border-border">
                        <div className="container mx-auto px-8 py-16 max-w-4xl">
                            <div className="mb-4">
                                <span className="text-sm font-medium text-muted-foreground">Core concepts</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                                Scouting & Data Analysis
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                                Collect, analyze, and leverage data to make informed strategic decisions. Data-driven teams win championships.
                            </p>
                        </div>
                    </section>

                    <div className="container mx-auto px-8 py-12 max-w-4xl space-y-12">

                        {/* Overview */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6">Why Scouting Matters</h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-lg">
                                    Scouting is the process of <strong>collecting and analyzing data</strong> about teams at a competition. It informs your match strategy, alliance selection, and gameplay decisions.
                                </p>
                                <div className="bg-card border border-border p-6 rounded-lg my-6">
                                    <p className="text-xl font-bold mb-2">📊 The Scouting Pipeline</p>
                                    <p className="mb-0 text-muted-foreground">
                                        <strong>Collect Data</strong> (objective, subjective, pit) → <strong>Process & Calculate</strong> (OPR, EPA, pickability) → <strong>View & Analyze</strong> (viewer tools) → <strong>Create Outputs</strong> (picklist, match strategy, playbook)
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Types of Data Collection */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <ClipboardList className="w-6 h-6 text-primary" />
                                <h2 className="text-3xl font-bold">Three Types of Data Collection</h2>
                            </div>

                            <div className="space-y-8">
                                {/* Objective */}
                                <Card className="border-2">
                                <CardContent className="p-6">
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
                                    <ul className="text-sm space-y-1 text-muted-foreground">
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
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>• Dedicated scout per robot (6 scouts per match)</li>
                                        <li>• Paper forms or digital apps (e.g., Tableau, custom apps)</li>
                                        <li>• Tally marks for quick counting</li>
                                        <li>• Video review for accuracy</li>
                                    </ul>
                                </div>
                            </div>
                                </CardContent>
                            </Card>

                            {/* Subjective */}
                            <Card className="border-2">
                                <CardContent className="p-6">
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
                                    <ul className="text-sm space-y-1 text-muted-foreground">
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
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>• 1-5 scale (1 = poor, 5 = excellent)</li>
                                        <li>• Low/Medium/High categories</li>
                                        <li>• Yes/No checkboxes</li>
                                        <li>• Free-form notes for standout observations</li>
                                    </ul>
                                </div>
                            </div>
                                </CardContent>
                            </Card>

                            {/* Pit */}
                            <Card className="border-2">
                                <CardContent className="p-6">
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
                                    <ul className="text-sm space-y-1 text-muted-foreground">
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
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>• Be polite and respectful</li>
                                        <li>• Ask open-ended questions</li>
                                        <li>• Take detailed photos</li>
                                        <li>• Note any unique features</li>
                                        <li>• Ask about autonomous capabilities</li>
                                    </ul>
                                </div>
                            </div>
                                </CardContent>
                            </Card>
                            </div>
                        </section>

                        {/* Calculated Metrics */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <BarChart3 className="w-6 h-6 text-primary" />
                                <h2 className="text-3xl font-bold">Key Calculated Metrics</h2>
                            </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            Raw data is useful, but <strong>calculated metrics</strong> provide deeper insights by normalizing performance across different alliance partners and opponents.
                        </p>

                            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-3">OPR (Offensive Power Rating)</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Estimates how many points a team contributes to their alliance's score on average.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            <strong>Formula:</strong> Solve a system of linear equations using alliance scores and team compositions across all matches.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-3">DPR (Defensive Power Rating)</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Estimates how many points a team prevents the opposing alliance from scoring.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            <strong>Formula:</strong> Similar to OPR, but calculated from opponent alliance scores.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-3">EPA (Expected Points Added)</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Predicts a team's contribution to alliance score, accounting for opponent strength. More accurate than OPR.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            <strong>Used by:</strong> Statbotics for rankings and match predictions.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-3">ELO Rating</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Relative skill level score based on wins and losses. Higher ELO = stronger team.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            <strong>Note:</strong> Borrowed from chess; adjusts based on opponent strength.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-3">CCWM (Contributed Calculation to Win Margin)</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Calculated as <code className="text-xs bg-muted px-1 py-0.5 rounded">OPR - DPR</code>. Gives credit to defensive play.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            <strong>Why it matters:</strong> Recognizes that defense contributes to winning.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-3">Pickability</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Custom metric combining objective data, subjective ratings, and calculated stats to rank teams for alliance selection.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            <strong>Custom formula:</strong> Each team defines their own based on strategy.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="bg-card border border-border p-4 rounded-lg">
                                <p className="font-semibold mb-1">📈 Which Metric to Use?</p>
                                <p className="text-muted-foreground mb-0">
                                    <strong>EPA</strong> is generally the most accurate for predictions. <strong>OPR</strong> is simpler and widely used. <strong>Pickability</strong> is best for alliance selection because it incorporates your specific strategy needs.
                                </p>
                            </div>
                    </div>
                </section>

                        {/* Data Workflow */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <TrendingUp className="w-6 h-6 text-primary" />
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
                                    <Card key={index}>
                                        <CardContent className="p-5">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold shadow-lg">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-lg mb-1">{item.step}</h4>
                                                    <p className="text-sm text-muted-foreground mb-0">{item.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                        {/* Picklist & Match Strategy */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="w-6 h-6 text-primary" />
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

                            <div className="bg-card border border-border p-5 rounded-lg my-6">
                                <p className="font-semibold mb-2">💡 Picklist Pro Tips</p>
                                <ul className="text-sm text-muted-foreground space-y-1 mb-0">
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

                            <div className="bg-card border border-border p-4 rounded-lg mt-4">
                                <p className="font-semibold mb-1">🤝 Communication is Key</p>
                                <p className="text-muted-foreground mb-0">
                                    Share your playbook with alliance partners before the match. A coordinated alliance beats three individual robots every time.
                                </p>
                            </div>
                            </div>
                        </section>

                        {/* Resources */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6">Essential Scouting Resources</h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                <a
                                    href="https://www.thebluealliance.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-5 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-colors"
                                >
                                    <h3 className="font-semibold text-lg mb-2">The Blue Alliance</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Match data, team stats, event schedules, and video archives. The #1 resource for FRC data.
                                    </p>
                                </a>
                                <a
                                    href="https://www.statbotics.io"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-5 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-colors"
                                >
                                    <h3 className="font-semibold text-lg mb-2">Statbotics</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Advanced analytics using EPA. Predict match outcomes, team rankings, and event winners.
                                    </p>
                                </a>
                                <a
                                    href="https://www.chiefdelphi.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-5 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-colors"
                                >
                                    <h3 className="font-semibold text-lg mb-2">Chief Delphi</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Community discussions, scouting app recommendations, and strategy threads.
                                    </p>
                                </a>
                            </div>
                        </section>

                        {/* Next Steps */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Link
                                    href="/info/kickoff-guide"
                                    className="group block p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-lg group-hover:text-primary transition-colors">← Back to Guide Home</span>
                                        <ExternalLink className="w-5 h-5 opacity-50" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Return to the main Kickoff Guide to explore other topics.
                                    </p>
                                </Link>
                                <Link
                                    href="/info/strategy"
                                    className="group block p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-lg group-hover:text-primary transition-colors">Strategy Overview →</span>
                                        <ExternalLink className="w-5 h-5 opacity-50" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Quick reference for competition structure and FRC vocabulary.
                                    </p>
                                </Link>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
