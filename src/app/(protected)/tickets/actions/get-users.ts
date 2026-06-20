'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';

export const getUsers = async () => {
    const session = await requireAuth();

    return prisma.usuario.findMany({
        where: { ativo: true, NOT: { id: session.id } },
        select: { id: true, nome: true },
        orderBy: { nome: 'asc' },
    });
};
