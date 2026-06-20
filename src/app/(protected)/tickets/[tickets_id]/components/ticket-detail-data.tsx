import { Badge } from '@/components/ui/badge';
import { statusConfig } from '@/utils/status-config';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { getTicket } from '../actions/get-ticket';
import { TicketActions } from './ticket-actions';
import { TicketComments } from './ticket-comments';
import { TicketDescription } from './ticket-description';
import { TicketInfo } from './ticket-info';

export async function TicketDetailData({ id }: { id: string }) {
    const chamado = await getTicket(id);
    const { label, className } = statusConfig[chamado.status];

    return (
        <div className="flex flex-col gap-6">
            <div>
                <Link
                    href="/tickets"
                    className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeftIcon className="size-3.5" />
                    Chamados
                </Link>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="font-title text-2xl font-semibold tracking-tight">
                            {chamado.titulo}
                        </h1>
                        <Badge variant="outline" className={className}>
                            {label}
                        </Badge>
                    </div>
                    <TicketActions
                        id={chamado.id}
                        status={chamado.status}
                        openedByMe={chamado.openedByMe}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <TicketDescription descricao={chamado.descricao} />
                    <TicketComments chamadoId={chamado.id} status={chamado.status} />
                </div>
                <div className="w-full lg:w-64 lg:flex-none">
                    <TicketInfo
                        status={chamado.status}
                        abertoPor={chamado.abertoPor}
                        atribuidoPara={chamado.atribuidoPara}
                        criadoEm={chamado.criadoEm}
                        atualizadoEm={chamado.atualizadoEm}
                    />
                </div>
            </div>
        </div>
    );
}
