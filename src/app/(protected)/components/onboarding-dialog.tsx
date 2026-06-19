'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LogoFull } from '@/components/logo';
import { cn } from '@/lib/utils';
import {
    BellIcon,
    CheckCircle2Icon,
    ChevronRightIcon,
    LayoutDashboardIcon,
    MessageSquareIcon,
    PlusCircleIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ONBOARDING_KEY = 'nexo_onboarding_v1';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

interface Step {
    icon?: React.ReactNode;
    title: string;
    description: string;
    isWelcome?: boolean;
}

const steps: Step[] = [
    {
        isWelcome: true,
        title: 'Bem-vindo ao Nexo',
        description: 'Seu sistema de chamados. Abra, acompanhe e resolva solicitações em um só lugar.',
    },
    {
        icon: <PlusCircleIcon className="size-5 text-primary" />,
        title: 'Abra um chamado',
        description: 'Clique em "Novo Chamado", descreva o problema e aguarde a equipe aceitar.',
    },
    {
        icon: <LayoutDashboardIcon className="size-5 text-primary" />,
        title: 'Acompanhe o status',
        description: 'Veja todos os seus chamados e filtre por status na página de Chamados.',
    },
    {
        icon: <MessageSquareIcon className="size-5 text-primary" />,
        title: 'Comente e interaja',
        description: 'Após aceito, troque mensagens no chamado para agilizar o atendimento.',
    },
    {
        icon: <BellIcon className="size-5 text-primary" />,
        title: 'Ative as notificações',
        description: 'Seja avisado em tempo real sobre atualizações e comentários nos seus chamados.',
    },
];

interface OnboardingDialogProps {
    usuarioId: string;
}

export function OnboardingDialog({ usuarioId }: OnboardingDialogProps) {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [notifLoading, setNotifLoading] = useState(false);
    const [notifDone, setNotifDone] = useState(false);
    const [supported, setSupported] = useState(false);

    const isLast = current === steps.length - 1;
    const step = steps[current];

    useEffect(() => {
        const completed = localStorage.getItem(ONBOARDING_KEY);
        if (!completed) setOpen(true);
        setSupported('serviceWorker' in navigator && 'PushManager' in window);
    }, []);

    function dismiss() {
        localStorage.setItem(ONBOARDING_KEY, '1');
        setOpen(false);
    }

    function next() {
        if (isLast) dismiss();
        else setCurrent((c) => c + 1);
    }

    async function activateNotifications() {
        if (!supported) { dismiss(); return; }
        setNotifLoading(true);
        try {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                toast.error('Permissão negada pelo navegador.');
                return;
            }
            const reg = await navigator.serviceWorker.ready;
            const sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
                ),
            });
            const json = sub.toJSON();
            await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ endpoint: json.endpoint, keys: json.keys, usuarioId }),
            });
            setNotifDone(true);
            setTimeout(dismiss, 1600);
        } catch {
            toast.error('Erro ao ativar notificações.');
        } finally {
            setNotifLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
            <DialogContent
                className="gap-0 overflow-hidden p-0 sm:max-w-sm"
                onInteractOutside={(e) => e.preventDefault()}
                showCloseButton={false}
            >
                {notifDone ? (
                    <div className="flex flex-col items-center gap-3 py-12">
                        <CheckCircle2Icon className="size-12 text-green-500" />
                        <p className="font-medium">Notificações ativadas!</p>
                    </div>
                ) : (
                    <>
                        {/* Welcome step */}
                        {step.isWelcome ? (
                            <div className="flex flex-col items-center gap-5 px-8 pb-2 pt-10 text-center">
                                <LogoFull size={36} className="text-xl" />
                                <div>
                                    <h2 className="text-lg font-semibold">{step.title}</h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            /* Regular steps */
                            <div className="flex flex-col gap-3 px-6 pb-2 pt-8">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                                    {step.icon}
                                </div>
                                <div>
                                    <h2 className="font-semibold">{step.title}</h2>
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col gap-2 p-6 pt-4">
                            {isLast && supported && (
                                <Button
                                    onClick={activateNotifications}
                                    disabled={notifLoading}
                                    className="w-full"
                                >
                                    <BellIcon className="size-4" />
                                    {notifLoading ? 'Ativando...' : 'Ativar notificações'}
                                </Button>
                            )}
                            <Button
                                variant={isLast ? 'outline' : 'default'}
                                onClick={next}
                                className="w-full"
                            >
                                {isLast ? 'Fazer depois' : (
                                    <>
                                        Próximo
                                        <ChevronRightIcon className="size-4" />
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Progress + counter */}
                        <div className="flex flex-col items-center gap-2 pb-5">
                            <div className="flex gap-1.5">
                                {steps.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrent(i)}
                                        className={cn(
                                            'rounded-full transition-all duration-300',
                                            i === current
                                                ? 'w-4 h-1.5 bg-primary'
                                                : 'size-1.5 bg-muted-foreground/30',
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground/60">
                                {current + 1} / {steps.length}
                            </span>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
