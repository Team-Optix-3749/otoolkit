import { NavbarServerConfig } from "@/components/NavbarServerConfig";
import { Trophy, Shield, Eye, TrendingUp, ArrowLeft, ExternalLink, Target, Users } from "lucide-react";
import Link from "next/link";

export default function CompetitionSeasonPage() {
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
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mb-4">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                        Competition Season
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl">
                        Execute your strategy on the field. Master quals, playoffs, alliance selection, and continuous improvement between events.
                    </p>
                </header>

                {/* Overview */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-3xl font-bold mb-6">Competition Season Overview</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg">
                            Competition season runs from <strong>March through April</strong>, culminating in the FIRST Championship. Most teams attend 1-2 Regional competitions or District events.
                        </p>
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-2xl text-white my-6">
                            <p className="text-xl font-bold mb-2">🏆 The Goal</p>
                            <p className="mb-0">
                                Win matches, earn Ranking Points, seed high for playoffs, form a strong alliance, and advance to Championships. But remember: <strong>your robot will keep evolving</strong> throughout the season.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Watch Other Competitions */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Eye className="w-8 h-8 text-blue-500" />
                        <h2 className="text-3xl font-bold">Watch Other Competitions</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            Before your first event, watch other regionals to see how the game is actually played. Theory meets reality on the competition field.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
                            <div className="p-5 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h3 className="font-bold text-lg mb-2">Twitch Streams</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Watch live matches on FIRST's official Twitch channels. See strategies in real-time.
                                </p>
                            </div>
                            <div className="p-5 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                <h3 className="font-bold text-lg mb-2">The Blue Alliance</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Access match videos, scores, and statistics from every event worldwide.
                                </p>
                            </div>
                            <div className="p-5 bg-cyan-50 dark:bg-cyan-950/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                                <h3 className="font-bold text-lg mb-2">Chief Delphi</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Read event threads for insights, robot reveals, and strategy discussions.
                                </p>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            <li><strong>FUN (FIRST Updates Now):</strong> Weekly show covering FRC news and highlights</li>
                            <li><strong>Gamesense:</strong> Strategic analysis and commentary on the current game</li>
                            <li><strong>Behind the Bumpers:</strong> YouTube series featuring top team interviews</li>
                        </ul>
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border-l-4 border-blue-500 mt-4">
                            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">🔍 What to Look For</p>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-0">
                                Pay attention to: effective defensive strategies, common robot failures, successful autonomous routines, and which mechanisms are dominating. <strong>"Steal from the best!"</strong>
                            </p>
                        </div>
                    </div>
                </section>

                {/* During Competition */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Target className="w-8 h-8 text-purple-500" />
                        <h2 className="text-3xl font-bold">During Competition: Continuous Improvement</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            Your robot will <strong>still change</strong> in-between regionals and even <strong>during</strong> regionals. Expect to make repairs, adjustments, and improvements on the fly.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Review and Reflect</h3>
                        <p>After each match (and each day), ask:</p>
                        <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
                            <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                                <h4 className="font-bold mb-2">Durability</h4>
                                <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                    <li>• What broke or wore out?</li>
                                    <li>• Which mechanisms are fragile?</li>
                                    <li>• Can we reinforce weak points?</li>
                                </ul>
                            </div>
                            <div className="p-5 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h4 className="font-bold mb-2">Functionality</h4>
                                <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                    <li>• What worked well?</li>
                                    <li>• What underperformed?</li>
                                    <li>• Can we simplify or improve?</li>
                                </ul>
                            </div>
                            <div className="p-5 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                <h4 className="font-bold mb-2">Alliance Cohesion</h4>
                                <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                    <li>• How did we complement partners?</li>
                                    <li>• What roles did we fill?</li>
                                    <li>• What gaps remain?</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Changing Level of Play</h3>
                        <p>
                            Keep in mind the <strong>changing level of play</strong> at different events. Week 1 regionals are less competitive than Week 6. Championship-level play is significantly more intense.
                        </p>
                        <ul className="space-y-2">
                            <li><strong>Early events:</strong> More experimental robots, less refined strategies, more opportunities for upsets</li>
                            <li><strong>Late events:</strong> Robots are battle-tested, strategies are optimized, competition is fierce</li>
                            <li><strong>Championships:</strong> Only the best teams, highest level of play, defense is critical</li>
                        </ul>
                        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-xl border-l-4 border-purple-500 mt-4">
                            <p className="font-semibold text-purple-900 dark:text-purple-100 mb-1">📈 Adapt Your Strategy</p>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-0">
                                What works at Week 1 might not work at Championships. Be prepared to adjust your strategy, practice new skills, and even modify your robot between events.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Defense */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-8 h-8 text-red-500" />
                        <h2 className="text-3xl font-bold">Defense: The Great Equalizer</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            Defense is a critical strategy where a team <strong>protects or stops opponents</strong> from scoring. It's often used by "lower-tier" robots to help stronger teammates and disorganize opposing alliances.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Types of Defense</h3>
                        <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                            <div className="p-5 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800">
                                <h4 className="font-bold text-lg mb-3">🚧 Cutting Off Field Areas</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Block choke points, narrow passages, or high-traffic zones to slow opponent cycles and force them to take longer routes.
                                </p>
                            </div>
                            <div className="p-5 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-800">
                                <h4 className="font-bold text-lg mb-3">⏱️ Slowing Cycles</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Follow opponents and impede their movement. Even a few extra seconds per cycle adds up over a 2.5-minute match.
                                </p>
                            </div>
                            <div className="p-5 bg-yellow-50 dark:bg-yellow-950/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                                <h4 className="font-bold text-lg mb-3">🛡️ Blocking Shots / Bumping</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Position yourself between shooters and goals. Gentle bumps (within rules) can disrupt aiming and timing.
                                </p>
                            </div>
                            <div className="p-5 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-800">
                                <h4 className="font-bold text-lg mb-3">📦 Hoarding Game Pieces</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Collect game pieces and hold them (or move them away from opponents) to deny scoring opportunities.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Historical Examples</h3>
                        <ul className="space-y-2">
                            <li><strong>2022 Rapid React:</strong> Blocking opponents from reaching cargo, defending the terminal</li>
                            <li><strong>2018 Power UP:</strong> Preventing opponents from reaching the scale or switch</li>
                            <li><strong>2023 Charged Up:</strong> Blocking access to the charging station during end-game</li>
                        </ul>

                        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border-l-4 border-red-500 mt-6">
                            <p className="font-semibold text-red-900 dark:text-red-100 mb-1">⚠️ Play Clean</p>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-0">
                                Defense is legal and strategic, but <strong>know the rules</strong>. Avoid penalties for pinning (holding an opponent in place too long), ramming, or damaging other robots. Good defense is persistent but fair.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Alliance Selection */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="w-8 h-8 text-cyan-500" />
                        <h2 className="text-3xl font-bold">Alliance Selection Strategy</h2>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>
                            After qualification matches, the top 8 seeds become <strong>alliance captains</strong> and draft their alliance partners in a serpentine format.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4">The Drafting Process</h3>
                        <ol className="space-y-2">
                            <li><strong>First Pick:</strong> Alliance captains (seeds 1-8) select their first partner in order (1st seed picks first, 8th seed picks last)</li>
                            <li><strong>Second Pick:</strong> Order reverses—8th seed picks first, 1st seed picks last (serpentine)</li>
                            <li><strong>Third Pick (Champs only):</strong> Back to original order for a third alliance member</li>
                        </ol>

                        <h3 className="text-2xl font-bold mt-8 mb-4">Strategic Drafting Techniques</h3>
                        <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                            <div className="p-5 bg-cyan-50 dark:bg-cyan-950/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                                <h4 className="font-bold text-lg mb-3">Complementary Picks</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                    Choose robots that fill gaps in your capabilities. If you're a high-goal specialist, pick a low-goal scorer or defender.
                                </p>
                                <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                    <li>• <strong>First Pick:</strong> Rare skills, high-level scorer</li>
                                    <li>• <strong>Second Pick:</strong> Simpler tasks, defense</li>
                                    <li>• <strong>Third Pick:</strong> Counter-robot to expected opponents</li>
                                </ul>
                            </div>
                            <div className="p-5 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                <h4 className="font-bold text-lg mb-3">Advanced Tactics</h4>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                    High-level strategic moves to gain an edge:
                                </p>
                                <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                    <li>• <strong>Scorching:</strong> Invite a top seed to decline, denying them to other alliances</li>
                                    <li>• <strong>Strongest Opponent:</strong> Pick the best remaining robot to prevent opponents from getting them</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-cyan-50 dark:bg-cyan-950/20 p-4 rounded-xl border-l-4 border-cyan-500 mt-4">
                            <p className="font-semibold text-cyan-900 dark:text-cyan-100 mb-1">🎯 Locking First</p>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-0">
                                The 1st seed's goal is often to "lock first"—secure the #1 ranking early to make an informed pick decision before other captains. This provides maximum flexibility in alliance selection.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Match Strategy */}
                <section className="mb-12 bg-gradient-to-br from-yellow-600 to-orange-700 rounded-3xl p-8 shadow-xl text-white">
                    <h2 className="text-3xl font-bold mb-6">Match Strategy & Playbook</h2>
                    <div className="prose prose-lg prose-invert max-w-none">
                        <p className="text-lg">
                            Before each match, create a <strong>playbook</strong>—a simple plan for what each robot will do during autonomous and teleop.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20">
                                <h3 className="text-xl font-bold mb-3">Autonomous (15 sec)</h3>
                                <ul className="text-sm space-y-1 text-neutral-100">
                                    <li>• Who scores in auto?</li>
                                    <li>• Who goes for bonus objectives?</li>
                                    <li>• Avoid collisions—assign lanes</li>
                                </ul>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20">
                                <h3 className="text-xl font-bold mb-3">TeleOp (2:15)</h3>
                                <ul className="text-sm space-y-1 text-neutral-100">
                                    <li>• Who plays offense (scoring)?</li>
                                    <li>• Who plays defense?</li>
                                    <li>• Who goes for end-game climb/hang?</li>
                                </ul>
                            </div>
                        </div>
                        <p>
                            Communicate with your alliance partners before the match. A coordinated alliance beats three individual robots every time.
                        </p>
                    </div>
                </section>

                {/* Next Steps */}
                <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href="/info/kickoff-guide/scouting-data"
                            className="group p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Scouting & Data →</span>
                                <ExternalLink className="w-5 h-5 opacity-50" />
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Learn how to collect data and build picklists for alliance selection.
                            </p>
                        </Link>
                        <Link
                            href="/info/strategy"
                            className="group p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400">Strategy Overview →</span>
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
