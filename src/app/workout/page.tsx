import Link from "next/link";
import Image from "next/image";
import { Dumbbell, Heart, Users, User, ArrowRight, AppWindow, Zap, BarChart } from "lucide-react";

// --- Mocked Components/Props (Replace with your actual components) ---
// Note: In a real project, these imports would be uncommented.
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`p-8 rounded-xl border border-white/10 ${className}`} style={{ background: '#111' }}>
        {children}
    </div>
);
const Button = ({ children, href, className, variant = 'solid' }: { children: React.ReactNode, href: string, className?: string, variant?: 'solid' | 'outline' }) => (
    <Link 
        href={href} 
        className={`inline-flex items-center justify-center p-3 rounded-lg font-bold text-lg transition-colors ${className}`}
        style={{ 
            background: variant === 'solid' ? 'var(--orange)' : 'transparent', 
            color: variant === 'solid' ? 'var(--white)' : 'var(--gold)', 
            border: variant === 'outline' ? '2px solid var(--gold)' : 'none' 
        }}
    >
        {children}
    </Link>
);
// --------------------------------------------------------------------


export default function WorkoutPage() {
    return (
        // Use a wrapping div with dark theme styles based on your screenshots
        <div className="min-h-screen py-16" style={{ background: 'var(--black)', color: 'var(--white)' }}>
            
            {/* 1. Hero Section: Focus on the App/Digital Experience */}
            <header className="container mx-auto px-4 text-center pt-16 pb-24">
                <p className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
                    Your Digital Fitness Hub
                </p>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 max-w-4xl mx-auto leading-tight">
                    Access <span style={{ color: 'var(--orange)' }}>World-Class</span> Training from Anywhere
                </h1>
                <p className="text-xl max-w-3xl mx-auto mb-10" style={{ color: 'var(--muted)' }}>
                    Seamlessly integrate your gym workouts with our digital programs, guided classes, and personalized tracking tools.
                </p>
                <div className="flex justify-center gap-4">
                    <Button href="/app-download" variant="solid">
                        Get The Workout App
                        <AppWindow className="ml-2 h-5 w-5" />
                    </Button>
                    <Button href="/contact" variant="outline">
                        Start Free Trial
                    </Button>
                </div>
            </header>

            {/* 2. Comprehensive Fitness Programs (From /gyms page) */}
            <section className="py-20" style={{ background: '#0b0b0b' }}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'var(--orange)' }}>
                            Training Programs
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Comprehensive Fitness Programs
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto mt-4" style={{ color: 'var(--muted)' }}>
                            Structured programs designed by experts to help you reach your goals faster.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Program Card 1: Strength Training */}
                        <Card>
                            <div className="flex flex-col items-center text-center space-y-4">
                                <Dumbbell className="h-10 w-10 p-2 rounded-full" style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)' }} />
                                <h3 className="text-xl font-bold">Strength Training</h3>
                                <p className="text-muted-foreground text-sm" style={{ color: 'var(--muted)' }}>
                                    Build muscle, increase strength, and transform your physique with our comprehensive strength programs.
                                </p>
                                <Link href="/programs/strength" className="flex items-center text-sm font-semibold" style={{ color: 'var(--orange)' }}>
                                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </Card>

                        {/* Program Card 2: Cardio & HIIT */}
                        <Card>
                            <div className="flex flex-col items-center text-center space-y-4">
                                <Heart className="h-10 w-10 p-2 rounded-full" style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)' }} />
                                <h3 className="text-xl font-bold">Cardio & HIIT</h3>
                                <p className="text-muted-foreground text-sm" style={{ color: 'var(--muted)' }}>
                                    Burn fat, boost endurance, and improve cardiovascular health with high-intensity training.
                                </p>
                                <Link href="/programs/cardio" className="flex items-center text-sm font-semibold" style={{ color: 'var(--orange)' }}>
                                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </Card>

                        {/* Program Card 3: Group Fitness */}
                        <Card>
                            <div className="flex flex-col items-center text-center space-y-4">
                                <Users className="h-10 w-10 p-2 rounded-full" style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)' }} />
                                <h3 className="text-xl font-bold">Group Fitness</h3>
                                <p className="text-muted-foreground text-sm" style={{ color: 'var(--muted)' }}>
                                    Join energizing group classes including Yoga, Zumba, CrossFit, and more.
                                </p>
                                <Link href="/programs/group" className="flex items-center text-sm font-semibold" style={{ color: 'var(--orange)' }}>
                                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </Card>

                        {/* Program Card 4: Personal Training */}
                        <Card>
                            <div className="flex flex-col items-center text-center space-y-4">
                                <User className="h-10 w-10 p-2 rounded-full" style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)' }} />
                                <h3 className="text-xl font-bold">Personal Training</h3>
                                <p className="text-muted-foreground text-sm" style={{ color: 'var(--muted)' }}>
                                    One-on-one coaching with certified trainers for personalized attention and results.
                                </p>
                                <Link href="/programs/personal" className="flex items-center text-sm font-semibold" style={{ color: 'var(--orange)' }}>
                                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 3. Workout App Features (Expanding on "Workout App" service) */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>
                                Go Digital
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                The Fitflix App: Your Pocket Personal Trainer
                            </h2>
                            <p className="text-lg mb-8" style={{ color: 'var(--muted)' }}>
                                Take your fitness journey wherever you go. Our app offers on-demand classes, personalized workout planners, and real-time progress tracking.
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <Zap className="h-6 w-6 mt-1" style={{ color: 'var(--orange)' }} />
                                    <div>
                                        <h4 className="font-semibold text-white">1000+ Minutes of Content</h4>
                                        <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                            Full library of on-demand classes from Yoga to advanced HiiT, led by certified trainers.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <BarChart className="h-6 w-6 mt-1" style={{ color: 'var(--orange)' }} />
                                    <div>
                                        <h4 className="font-semibold text-white">Progress Tracking & Analytics</h4>
                                        <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                            Monitor your performance, set goals, and view detailed metrics to stay motivated.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Users className="h-6 w-6 mt-1" style={{ color: 'var(--orange)' }} />
                                    <div>
                                        <h4 className="font-semibold text-white">Community Challenges</h4>
                                        <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                            Join fitness challenges and connect with the Fitflix community.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <Button href="/app-download" variant="solid">
                                    Download Now
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Image Placeholder */}
                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
                            <Image 
                                src="/assets/workout-app-mockup.png" // Placeholder image for app screenshot
                                alt="Fitflix Workout App Interface"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}