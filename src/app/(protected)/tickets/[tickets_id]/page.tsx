import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTicketTitle } from './actions/get-ticket-title';
import { TicketDetailData } from './components/ticket-detail-data';
import TicketDetailSuspense from './components/ticket-detail-suspense';

export const revalidate = 300;

interface Props {
    params: Promise<{ tickets_id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tickets_id } = await params;
    const titulo = await getTicketTitle(tickets_id);
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
