import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRightLeft, LayoutDashboard, AreaChart, Trophy } from "lucide-react";

const features = [
    {
        icon: <ArrowRightLeft className="w-8 h-8 text-primary" />,
        title: "Simulated Trading",
        description: "Buy and sell virtual cryptocurrencies using real-time simulated market data.",
    },
    {
        icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
        title: "Portfolio Dashboard",
        description: "Track your holdings, transactions, and performance with a comprehensive dashboard.",
    },
    {
        icon: <AreaChart className="w-8 h-8 text-primary" />,
        title: "Interactive Charts",
        description: "Analyze market trends with our interactive and customizable price charts.",
    },
    {
        icon: <Trophy className="w-8 h-8 text-primary" />,
        title: "Compete and Conquer",
        description: "Climb the leaderboard, compete with other players, and prove your trading skills.",
    },
];

export function Features() {
    return (
        <section className="py-20 sm:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        All-In-One Trading Playground
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        CryptoVerse Trader provides everything you need to learn, practice, and compete in the world of crypto trading.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-card/80 border-border/50 hover:border-primary/50 hover:shadow-[0_0_25px_-5px_hsl(var(--accent))] transition-all duration-300 transform hover:-translate-y-1">
                            <CardHeader className="items-center text-center md:items-start md:text-left">
                                <div className="mb-4 p-3 rounded-full bg-primary/10 border border-primary/20">
                                    {feature.icon}
                                </div>
                                <CardTitle className="font-headline">{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
