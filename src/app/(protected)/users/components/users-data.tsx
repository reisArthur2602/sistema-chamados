import { UsuarioRow } from './users-columns';
import { UsersTable } from './users-table';

async function getUsuarios(): Promise<UsuarioRow[]> {
    return [];
}

export const UsersData = async () => {
    const usuarios = await getUsuarios();
    return <UsersTable data={usuarios} />;
};
