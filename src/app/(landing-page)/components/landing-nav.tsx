import { Button } from '@/components/ui/button';
import { LogoFull } from '@/components/logo';
import Link from 'next/link';

export function LandingNav() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                <LogoFull size={26} />
                <Button asChild size="sm">
                    <Link href="/login">Entrar</Link>
                </Button>
            </div>
        </header>
    );
}
