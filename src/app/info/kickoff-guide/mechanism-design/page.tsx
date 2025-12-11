import { NavbarServerConfig } from "@/components/NavbarServerConfig";
import { Cpu, Zap, Wind, ArrowRight, ArrowLeft, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function MechanismDesignPage() {
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
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                        <Cpu className="w-6 h-6" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                        Mechanism Design
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl">
                        Deep dive into the mechanical systems that bring your robot to life—from movement to manipulation.
                    </p>
                </header>

                {/* Movement Systems */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-3xl font-bold mb-6">Movement Systems</h2>

                    {/* Motors */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="w-7 h-7 text-yellow-500" />
                            <h3 className="text-2xl font-bold">Motors</h3>
                        </div>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p>
                                Motors are the workhorses of FRC robots, providing precise, variable control for movement and mechanisms.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-6 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                                    <h4 className="text-xl font-bold mb-3">Falcon 500</h4>
                                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                        The gold standard for FRC. Integrated motor controller, high power output, and built-in encoder.
                                    </p>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>Fast & Variable:</strong> Precise speed control from 0-100%</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>Encoders:</strong> Track position and velocity for autonomous</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span><strong>High Torque:</strong> Powerful enough for drivetrains and heavy mechanisms</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                                    <h4 className="text-xl font-bold mb-3">Other Motor Options</h4>
                                    <ul className="space-y-3 text-sm">
                                        <li>
                                            <strong className="block mb-1">NEO / NEO 550</strong>
                                            <span className="text-neutral-600 dark:text-neutral-400">Brushless motors, lighter than Falcons, popular for mechanisms</span>
                                        </li>
                                        <li>
                                            <strong className="block mb-1">CIM Motors</strong>
                                            <span className="text-neutral-600 dark:text-neutral-400">Legacy option, still used in some drivetrains</span>
                                        </li>
                                        <li>
                                            <strong className="block mb-1">775 Pro</strong>
                                            <span className="text-neutral-600 dark:text-neutral-400">Lightweight, good for low-load applications</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-xl border-l-4 border-yellow-500">
                                <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">⚡ Key Advantage</p>
                                <p className="text-neutral-700 dark:text-neutral-300 mb-0">
                                    Motors with encoders enable <strong>precision movement</strong> in autonomous—critical for accurate scoring and navigation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pneumatics */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Wind className="w-7 h-7 text-cyan-500" />
                            <h3 className="text-2xl font-bold">Pneumatics</h3>
                        </div>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p>
                                Pneumatic systems use compressed air to actuate cylinders, providing binary (extended/retracted) motion.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
                                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                                        Advantages
                                    </h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>✓ <strong>Lighter than motors</strong> for equivalent force</li>
                                        <li>✓ <strong>Consistent force</strong> regardless of battery voltage</li>
                                        <li>✓ <strong>Simple control</strong>—just on/off solenoid valves</li>
                                        <li>✓ <strong>Fast actuation</strong> for quick movements</li>
                                    </ul>
                                </div>
                                <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl border border-red-200 dark:border-red-800">
                                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                                        <XCircle className="w-6 h-6 text-red-600" />
                                        Disadvantages
                                    </h4>
                                    <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <li>✗ <strong>Limited air supply</strong>—tanks run out during matches</li>
                                        <li>✗ <strong>Binary motion only</strong>—no variable positioning</li>
                                        <li>✗ <strong>Slower refill</strong> between matches (compressor time)</li>
                                        <li>✗ <strong>Additional complexity</strong>—air tanks, regulators, tubing</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-cyan-50 dark:bg-cyan-950/20 p-4 rounded-xl border-l-4 border-cyan-500">
                                <p className="font-semibold text-cyan-900 dark:text-cyan-100 mb-1">🎯 Best Use Cases</p>
                                <p className="text-neutral-700 dark:text-neutral-300 mb-0">
                                    Pneumatics excel at <strong>binary actions</strong> like deploying/retracting mechanisms, shifting gears, or clamping. Use motors when you need variable positioning or continuous rotation.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Game Object Processing */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-3xl font-bold mb-6">Game Object Processing Pipeline</h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                        Every game piece follows a predictable journey through your robot. Design each stage intentionally.
                    </p>

                    <div className="space-y-6">
                        {[
                            {
                                step: "Acquisition",
                                description: "Capturing the game piece from the field or human player station.",
                                examples: "Roller intakes, claws, scoops, vacuum systems",
                                color: "blue"
                            },
                            {
                                step: "Manipulation",
                                description: "Adjusting orientation or position of the game piece after pickup.",
                                examples: "Rotating cones, flipping cubes, centering objects",
                                color: "purple"
                            },
                            {
                                step: "Storage",
                                description: "Holding the game piece securely while moving or waiting to score.",
                                examples: "Internal hoppers, magazine-style holders, retention mechanisms",
                                color: "cyan"
                            },
                            {
                                step: "Elevation",
                                description: "Raising the game piece to the required scoring height.",
                                examples: "Elevators (continuous/cascade), arms, telescoping mechanisms",
                                color: "emerald"
                            },
                            {
                                step: "Positioning",
                                description: "Fine-tuning placement before release—angle, distance, alignment.",
                                examples: "Turrets, wrist joints, extending arms, vision alignment",
                                color: "orange"
                            },
                            {
                                step: "Release",
                                description: "Depositing or launching the game piece into the scoring zone.",
                                examples: "Shooters, passive drops, active ejection, claw release",
                                color: "red"
                            }
                        ].map((stage, index) => (
                            <div key={index} className={`relative pl-12 pb-6 ${index !== 5 ? 'border-l-2 border-neutral-200 dark:border-neutral-800' : ''}`}>
                                <div className={`absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-${stage.color}-400 to-${stage.color}-600 flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                    {index + 1}
                                </div>
                                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-5 rounded-xl">
                                    <h3 className="text-xl font-bold mb-2">{stage.step}</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 mb-3">{stage.description}</p>
                                    <div className="text-sm">
                                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">Examples: </span>
                                        <span className="text-neutral-500 dark:text-neutral-400">{stage.examples}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-2xl text-white mt-8">
                        <p className="text-lg font-semibold mb-2">🔧 Design Tip</p>
                        <p className="mb-0">
                            Not every robot needs all six stages! Simplify where possible. For example, some games allow direct acquisition-to-release without storage or elevation.
                        </p>
                    </div>
                </section>

                {/* Common Mechanisms */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-3xl font-bold mb-6">Common FRC Mechanisms</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                name: "Drivetrains",
                                types: ["Tank/West Coast Drive", "Mecanum Drive", "Swerve Drive"],
                                description: "Foundation of robot mobility. See detailed breakdown below."
                            },
                            {
                                name: "Intakes",
                                types: ["Roller Intakes", "Claw Grippers", "Pneumatic Grabs"],
                                description: "First point of contact with game pieces. Prioritize large acquisition zones."
                            },
                            {
                                name: "Spindexer",
                                types: ["Rotating Magazine", "Indexing Wheel"],
                                description: "Prepares game pieces for the next stage—orients and queues them."
                            },
                            {
                                name: "Indexer",
                                types: ["Belt Conveyor", "Roller Chain"],
                                description: "Feeds game pieces from storage to shooter or scoring mechanism."
                            },
                            {
                                name: "Elevators",
                                types: ["Continuous Elevator", "Cascade Elevator"],
                                description: "Vertical lift systems. Cascade = multi-stage for greater height."
                            },
                            {
                                name: "Arms",
                                types: ["Single-Joint Arm", "Multi-Joint Arm"],
                                description: "Articulated mechanisms for reaching over barriers or precise placement."
                            },
                            {
                                name: "Shooters",
                                types: ["Flywheel Shooter", "Catapult", "Puncher"],
                                description: "Launch game pieces at high velocity for distance scoring."
                            },
                            {
                                name: "Climbers",
                                types: ["Winch Climber", "Telescoping Arm", "Pneumatic Hooks"],
                                description: "End-game mechanisms for hanging or climbing on structures."
                            },
                            {
                                name: "Turret",
                                types: ["Rotating Base", "Vision-Aimed Turret"],
                                description: "Allows shooter or mechanism to rotate independently of drivetrain."
                            }
                        ].map((mechanism, index) => (
                            <div key={index} className="p-5 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
                                <h3 className="text-lg font-bold mb-2">{mechanism.name}</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{mechanism.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {mechanism.types.map((type, i) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-white dark:bg-neutral-900 rounded-full border border-neutral-300 dark:border-neutral-600">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Drivetrains Deep Dive */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-3xl font-bold mb-6">Drivetrain Comparison</h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                        Your drivetrain choice fundamentally shapes your robot's capabilities. Choose based on game requirements and team expertise.
                    </p>

                    <div className="space-y-6">
                        <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border-2 border-blue-300 dark:border-blue-700">
                            <h3 className="text-2xl font-bold mb-3">Tank Drive (West Coast Drive)</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                The classic FRC drivetrain. Six wheels (or more) with center wheels dropped slightly for turning. Simple, robust, and powerful.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2 text-green-700 dark:text-green-400">✓ Strengths</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Excellent pushing power and traction</li>
                                        <li>• Simple to build and maintain</li>
                                        <li>• Easy to code (arcade or tank drive)</li>
                                        <li>• Reliable and battle-tested</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2 text-red-700 dark:text-red-400">✗ Weaknesses</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Cannot strafe (side-to-side movement)</li>
                                        <li>• Turning requires forward/backward motion</li>
                                        <li>• Less maneuverable in tight spaces</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border-2 border-purple-300 dark:border-purple-700">
                            <h3 className="text-2xl font-bold mb-3">Mecanum Drive</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Four wheels with angled rollers that enable omnidirectional movement—forward, backward, sideways, and diagonal.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2 text-green-700 dark:text-green-400">✓ Strengths</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Can move in any direction without turning</li>
                                        <li>• Great for precise positioning</li>
                                        <li>• Simpler than swerve (mechanically)</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2 text-red-700 dark:text-red-400">✗ Weaknesses</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Low traction—easily pushed by defense</li>
                                        <li>• Slower than tank or swerve</li>
                                        <li>• Vulnerable to aggressive opponents</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-2xl border-2 border-cyan-300 dark:border-cyan-700">
                            <h3 className="text-2xl font-bold mb-3">Swerve Drive ⭐</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                The pinnacle of FRC drivetrains. Each wheel can rotate independently, providing unmatched maneuverability and speed.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2 text-green-700 dark:text-green-400">✓ Strengths</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Omnidirectional movement with full traction</li>
                                        <li>• Fastest and most maneuverable option</li>
                                        <li>• Can rotate while moving in any direction</li>
                                        <li>• Dominant in modern FRC meta</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2 text-red-700 dark:text-red-400">✗ Weaknesses</p>
                                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                                        <li>• Extremely complex to code (kinematics, odometry)</li>
                                        <li>• Expensive (requires 8+ motors)</li>
                                        <li>• Difficult to build and tune</li>
                                        <li>• Requires significant team expertise</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-cyan-100 dark:bg-cyan-900/30 p-4 rounded-xl mt-4">
                                <p className="font-semibold text-cyan-900 dark:text-cyan-100 mb-1">⚠️ Recommendation</p>
                                <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-0">
                                    Only attempt swerve if your team has strong programming and mechanical expertise. A well-executed tank drive beats a poorly-executed swerve every time.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">
                        <h4 className="font-bold text-lg mb-3">Bellypan: The Foundation</h4>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            All drivetrains use a <strong>bellypan</strong>—a flat plate that houses electrical components like the Power Distribution Hub (PDH), RoboRIO, motor controllers (Falcons, Talon SRXs), and battery. Keep it organized and accessible for quick repairs!
                        </p>
                    </div>
                </section>

                {/* Device/Robot Alignment */}
                <section className="mb-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-3xl font-bold mb-6">Device/Robot Alignment</h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                        Guarantee proper placement when scoring. Alignment mechanisms reduce driver error and increase consistency.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                            <h3 className="text-xl font-bold mb-3">Physical Alignment</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Use physical features on the robot or field to orient yourself.
                            </p>
                            <ul className="text-sm space-y-2 text-neutral-600 dark:text-neutral-400">
                                <li><strong>Bumpers/Rails:</strong> Slide against field walls or structures</li>
                                <li><strong>Bracing:</strong> (2022 Rapid React) Push against fender/launchpad</li>
                                <li><strong>Guide Rails:</strong> Funnel-shaped intakes that self-center</li>
                            </ul>
                        </div>
                        <div className="p-6 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-200 dark:border-purple-800">
                            <h3 className="text-xl font-bold mb-3">Code Automation</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                Use sensors and vision to automatically align.
                            </p>
                            <ul className="text-sm space-y-2 text-neutral-600 dark:text-neutral-400">
                                <li><strong>Vision Targeting:</strong> Limelight/PhotonVision for AprilTags</li>
                                <li><strong>Odometry:</strong> Track position using encoders and gyro</li>
                                <li><strong>Limit Switches:</strong> Detect when mechanism is in position</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border-l-4 border-blue-500 mt-6">
                        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">💡 Keep It Simple!</p>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-0">
                            Physical alignment is often more reliable than code-based solutions. Start simple, add automation only if needed.
                        </p>
                    </div>
                </section>

                {/* Next Steps */}
                <section className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href="/info/kickoff-guide/build-season"
                            className="group p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400">Build Season →</span>
                                <ExternalLink className="w-5 h-5 opacity-50" />
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Learn how to manage the 6-week build timeline and prototype effectively.
                            </p>
                        </Link>
                        <Link
                            href="/info/kickoff-guide/competition-season"
                            className="group p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-yellow-500 dark:hover:border-yellow-500 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-lg group-hover:text-yellow-600 dark:group-hover:text-yellow-400">Competition Season →</span>
                                <ExternalLink className="w-5 h-5 opacity-50" />
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Master match strategy, defense, and alliance selection.
                            </p>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
