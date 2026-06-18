import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TicketDetailData } from './components/ticket-detail-data';
import TicketDetailSuspense from './components/ticket-detail-suspense';

interface Props {
    params: Promise<{ tickets_id: string }>;
}

async function getChamadoTitulo(id: string): Promise<string> {
    // TODO: return (await prisma.chamado.findUnique({ where: { id }, select: { titulo: true } }))?.titulo ?? 'Chamado';
    void id;
    return 'Chamado';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tickets_id } = await params;
    const titulo = await getChamadoTitulo(tickets_id);
    return {
        title: titulo,
        description: `Detalhes e acompanhamento do chamado: ${titulo}.`,
    };
}

export default async function TicketDetailPage({ params }: Props) {
    const { tickets_id } = await params;

    return (
        <Suspense fallback={<TicketDetailSuspense />}>
            <TicketDetailData id={tickets_id} />
        </Suspense>
    );
}
