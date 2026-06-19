'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';

export const getUsers = async () => {
    await requireAuth();

    return prisma.usuario.findMany({
        where: { ativo: true },
        select: { id: true, nome: true },
        orderBy: { nome: 'asc' },
    });
};
