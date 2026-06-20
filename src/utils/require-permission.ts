import { Role } from '@/generated/enums';
import { getSession } from '@/utils/session';
import { canPermission } from './can-permission';

export const requirePermission = async (allowed: Role[]) => {
    const session = await getSession();
    if (!session) throw new Error('Usuário não autenticado');

    if (!canPermission(session.role, allowed))
        throw new Error('Usuário não possui permissão para acessar esse recurso');
};
