'use client';

import { Button } from '@/components/ui/button';
import { AlertCircleIcon, RotateCcwIcon } from 'lucide-react';
import { type ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function DefaultFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircleIcon className="size-7 text-destructive" />
            </div>
            <div className="space-y-1">
                <h2 className="font-title text-lg font-semibold">Algo deu errado</h2>
                <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
            <Button onClick={resetErrorBoundary}>
                <RotateCcwIcon />
                Tentar novamente
            </Button>
        </div>
    );
}

interface SuspenseWithErrorProps {
    children: ReactNode;
    fallback?: ReactNode;
    errorFallback?: typeof DefaultFallback;
}

export function SuspenseWithError({ children, fallback, errorFallback }: SuspenseWithErrorProps) {
    return (
        <ErrorBoundary FallbackComponent={errorFallback ?? DefaultFallback}>
            <Suspense fallback={fallback}>
                {children}
            </Suspense>
        </ErrorBoundary>
    );
}
