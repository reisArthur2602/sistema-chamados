import { getSession } from '@/utils/session';
import { getUsers } from '../actions/get-users';
import { CreateTicketDialog } from './create-ticket-dialog';

export async function CreateTicketDialogData() {
    const [users, session] = await Promise.all([getUsers(), getSession()]);
    const options = users.filter((u) => u.id !== session?.id);

    return <CreateTicketDialog usuarios={options} />;
}
