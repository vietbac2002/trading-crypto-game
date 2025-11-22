import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { hasEnvVars } from '@/lib/utils';
import { EnvVarWarning } from './env-var-warning';
import { AuthButton } from './auth-button';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="flex items-center gap-2">
           {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
        </nav>
      </div>
    </header>
  );
}
