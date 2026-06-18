import { Suspense } from 'react';
import { CreateTicketDialog } from './components/create-ticket-dialog';
import { TicketsData } from './components/tickets-data';
import TicketsSuspense from './components/tickets-suspense';

// TODO: passar usuarios para CreateTicketDialog via server component quando Prisma estiver configurado
export default function TicketsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <h1 className="font-title text-2xl font-semibold tracking-tight">Chamados</h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie e acompanhe todos os chamados do sistema.
                    </p>
                </div>
                <CreateTicketDialog usuarios={[]} />
            </div>

            <Suspense fallback={<TicketsSuspense />}>
                <TicketsData />
            </Suspense>
        </div>
    );
}
