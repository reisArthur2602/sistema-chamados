import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LogoMark } from '@/components/logo';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';



export function LandingHero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
            {/* Dot grid */}
            <div className="bg-dot-grid absolute inset-0 opacity-60" />

            {/* Gradient blob */}
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{
                    background:
                        'radial-gradient(circle, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%)',
                }}
            />

            <div className="relative z-10 max-w-2xl space-y-8">
                {/* Status badges */}
                

                {/* Logo mark — decorativo */}
                <div className="animate-in fade-in zoom-in-75 duration-700 animation-delay-100 [animation-fill-mode:both] flex justify-center">
                    <div className="relative">
                        <div
                            className="absolute inset-0 rounded-2xl blur-xl"
                            style={{
                                background: 'color-mix(in oklch, var(--primary) 35%, transparent)',
                            }}
                        />
                        <LogoMark size={64} className="relative drop-shadow-lg" />
                    </div>
                </div>

                {/* Headline */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 animation-delay-200 [animation-fill-mode:both] space-y-4">
                    <h1 className="font-title text-4xl font-semibold tracking-tight sm:text-5xl">
                        Gerencie chamados com{' '}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage:
                                    'linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 70%, oklch(0.85 0.15 85)))',
                            }}
                        >
                            simplicidade
                        </span>
                        .
                    </h1>
                    <p className="mx-auto max-w-lg text-base text-muted-foreground sm:text-lg">
                        Uma plataforma centralizada para abrir, acompanhar e resolver
                        solicitações internas — com notificações em tempo real.
                    </p>
                </div>

                {/* CTA */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 animation-delay-300 [animation-fill-mode:both]">
                    <Button asChild size="lg" className="shadow-lg">
                        <Link href="/login">
                            Acessar o sistema
                            <ArrowRightIcon className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
}
