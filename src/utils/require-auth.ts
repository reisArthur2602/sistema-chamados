import { getSession } from './session';

export const requireAuth = async () => {
    const session = await getSession();
    if (!session) throw new Error('Usuário não autenticado');
    return session;
};
