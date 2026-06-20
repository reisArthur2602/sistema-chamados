'use client';

import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../actions/get-tickets';
import TicketsSuspense from './tickets-suspense';
import { TicketsTable } from './tickets-table';

export function TicketsData() {
    const {
        data: tickets,
        isPending,
        isFetching,
    } = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
    });

    if (isPending || isFetching) return <TicketsSuspense />;

    return <TicketsTable data={tickets ?? []} />;
}
