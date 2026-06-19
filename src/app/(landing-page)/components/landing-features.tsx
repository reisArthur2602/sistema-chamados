import { Card, CardContent } from '@/components/ui/card';
import { BellIcon, ShieldCheckIcon, TicketIcon } from 'lucide-react';
import type { ElementType } from 'react';

const features: { icon: ElementType; title: string; description: string }[] = [
    {
        icon: TicketIcon,
        title: 'Chamados centralizados',
        description:
            'Abra, acompanhe e resolva solicitações em um painel unificado com histórico completo de cada chamado.',
    },
    {
        icon: BellIcon,
        title: 'Notificações em tempo real',
        description:
            'Receba alertas no navegador quando um chamado for aberto, atualizado ou receber um comentário.',
    },
    {
        icon: ShieldCheckIcon,
        title: 'Controle de acesso',
        description:
            'Papéis de Admin e Membro garantem que cada usuário veja e faça apenas o que precisa.',
    },
];

export function LandingFeatures() {
    return (
        <section className="relative border-t px-6 py-20">
            <div className="mx-auto max-w-5xl space-y-12">
                <div className="text-center">
                    <h2 className="font-title text-2xl font-semibold tracking-tight">
                        Tudo que sua equipe precisa
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Simples de usar, fácil de acompanhar.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {features.map(({ icon: Icon, title, description }) => (
                        <Card
                            key={title}
                            className="group relative overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                        >
                            <div
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                style={{
                                    background:
                                        'radial-gradient(circle at top left, color-mix(in oklch, var(--primary) 8%, transparent), transparent 60%)',
                                }}
                            />
                            <CardContent className="relative space-y-3 pt-6">
                                <div
                                    className="flex size-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                        background:
                                            'color-mix(in oklch, var(--primary) 12%, transparent)',
                                    }}
                                >
                                    <Icon className="size-5 text-primary" />
                                </div>
                                <h3 className="font-title text-sm font-semibold">{title}</h3>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
