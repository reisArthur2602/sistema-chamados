import { getUsers } from '../actions/get-users';
import { CreateTicketDialog } from './create-ticket-dialog';

export async function CreateTicketDialogData() {
    const users = await getUsers();
    return <CreateTicketDialog usuarios={users} />;
}
