import { Suspense } from 'react';
import { TicketDetailData } from './components/ticket-detail-data';
import TicketDetailSuspense from './components/ticket-detail-suspense';

interface Props {
    params: Promise<{ tickets_id: string }>;
}

export default async function TicketDetailPage({ params }: Props) {
    const { tickets_id } = await params;

    return (
        <Suspense fallback={<TicketDetailSuspense />}>
            <TicketDetailData id={tickets_id} />
        </Suspense>
    );
}
