import { Flame } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Logo({ className, ...props }: HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-foreground transition-opacity hover:opacity-80",
        className
      )}
      {...props}
    >
      <Flame className="h-6 w-6 text-primary shadow-[0_0_10px_hsl(var(--primary))] transition-shadow" />
      <span className="text-xl font-bold tracking-tight font-headline">
        CryptoVerse Trader
      </span>
    </Link>
  );
}
