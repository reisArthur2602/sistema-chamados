import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

import { SESSION_COOKIE } from '@/constants';
import { env } from '@/env';
import { Role } from '@/generated/enums';
import { prisma } from '@/lib/prisma';

export type SessionPayload = {
    id: string;
    nome: string;
    usuario: string;
    role: Role;
};

export const getSession = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if (!token) return null;

    let payload: { id: string };
    try {
        payload = verify(token, env.JWT_SECRET) as { id: string };
    } catch {
        return null;
    }

    const user = await prisma.usuario.findUnique({
        where: { id: payload.id },
        select: { id: true, nome: true, usuario: true, role: true },
    });

    if (!user) cookieStore.delete(SESSION_COOKIE);

    return user;
};
