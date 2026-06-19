import { getSession } from '@/utils/session';
import { getUsers } from '../actions/get-users';
import { UsersTable } from './users-table';

export async function UsersData() {
    const [users, session] = await Promise.all([getUsers(), getSession()]);
    return <UsersTable data={users} currentUserId={session!.id} />;
}
