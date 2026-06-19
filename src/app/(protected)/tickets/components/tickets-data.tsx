import { getSession } from '@/utils/session';
import { getTickets } from '../actions/get-tickets';
import { TicketsTable } from './tickets-table';

export async function TicketsData() {
    const [tickets, session] = await Promise.all([getTickets(), getSession()]);
    return <TicketsTable data={tickets} currentUserId={session!.id} />;
}
