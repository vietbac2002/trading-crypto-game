import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
    const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

    return (
        <section className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                    priority
                />
            )}
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 flex flex-col items-center gap-6 p-4">
                <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl font-headline animate-fade-in-down">
                    Welcome to the Future of Trading
                </h1>
                <p className="max-w-3xl text-lg text-primary-foreground/80 md:text-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Simulate crypto trading, compete on the leaderboard, and master the markets without risking a dime.
                </p>
                <Button
                    size="lg"
                    asChild
                    className="animate-fade-in-up shadow-[0_0_15px_hsl(var(--primary))] transition-shadow hover:shadow-[0_0_25px_hsl(var(--primary))]"
                    style={{ animationDelay: '0.4s' }}
                >
                    <Link href="/protected">Get Started Now</Link>
                </Button>
            </div>
        </section>
    );
}
