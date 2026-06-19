'use client';

import { Button } from '@/components/ui/button';
import { AlertCircleIcon, ArrowLeftIcon, RotateCcwIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
                    <AlertCircleIcon className="size-8 text-destructive" />
                </div>

                <div className="space-y-1.5">
                    <h1 className="font-title text-2xl font-semibold tracking-tight">
                        Algo deu errado
                    </h1>
                    <p className="max-w-sm text-sm text-muted-foreground">{error.message}</p>
                </div>
            </div>

            <div className="grid gap-3 grid-cols-2">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeftIcon />
                    Voltar
                </Button>
                <Button onClick={reset}>
                    <RotateCcwIcon />
                    Tentar novamente
                </Button>
            </div>
        </div>
    );
}
