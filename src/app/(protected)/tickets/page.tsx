import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CreateTicketDialogData } from './components/create-ticket-dialog-data';
import { TicketsData } from './components/tickets-data';

export const metadata: Metadata = {
    title: 'Chamados',
    description: 'Gerencie e acompanhe todos os chamados do sistema.',
};

export default function TicketsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="font-title text-2xl font-semibold tracking-tight">Chamados</h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie e acompanhe todos os chamados do sistema.
                    </p>
                </div>
                <Suspense fallback={<Skeleton className="h-9 w-full rounded-md sm:w-36" />}>
                    <CreateTicketDialogData />
                </Suspense>
            </div>

            <TicketsData />
        </div>
    );
}
