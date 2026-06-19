'use client';

import { Button } from '@/components/ui/button';
import { BellIcon, BellOffIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

interface PushSubscriptionButtonProps {
    // TODO: passar o usuarioId real da sessão autenticada
    usuarioId: string;
}

export function PushSubscriptionButton({ usuarioId }: PushSubscriptionButtonProps) {
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            setLoading(false);
            return;
        }

        setSupported(true);

        navigator.serviceWorker
            .register('/sw.js')
            .then(async (reg) => {
                const sub = await reg.pushManager.getSubscription();
                if (sub) {
                    const json = sub.toJSON();
                    await fetch('/api/push/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            endpoint: json.endpoint,
                            keys: json.keys,
                            usuarioId,
                        }),
                    });
                    setSubscribed(true);
                }
            })
            .finally(() => setLoading(false));
    }, [usuarioId]);

    async function toggle() {
        setLoading(true);
        try {
            const reg = await navigator.serviceWorker.ready;

            if (subscribed) {
                const sub = await reg.pushManager.getSubscription();
                if (sub) {
                    await sub.unsubscribe();
                    await fetch('/api/push/subscribe', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ endpoint: sub.endpoint }),
                    });
                }
                setSubscribed(false);
                toast.success('Notificações desativadas.');
            } else {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    toast.error('Permissão de notificação negada pelo navegador.');
                    return;
                }

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
                    body: JSON.stringify({
                        endpoint: json.endpoint,
                        keys: json.keys,
                        usuarioId,
                    }),
                });

                setSubscribed(true);
                toast.success('Notificações ativadas!');
            }
        } catch {
            toast.error('Erro ao configurar notificações.');
        } finally {
            setLoading(false);
        }
    }

    if (!supported) return null;

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggle}
            disabled={loading}
            title={subscribed ? 'Desativar notificações' : 'Ativar notificações'}
        >
            {subscribed ? (
                <BellIcon className="size-4" />
            ) : (
                <BellOffIcon className="size-4" />
            )}
        </Button>
    );
}
