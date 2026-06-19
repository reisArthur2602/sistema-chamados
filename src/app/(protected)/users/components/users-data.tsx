import { getUsers } from '../actions/get-users';
import { UsersTable } from './users-table';

export async function UsersData() {
    const users = await getUsers();
    return <UsersTable data={users} />;
}
