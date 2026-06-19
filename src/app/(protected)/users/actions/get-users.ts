'use server';

import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/utils/require-permission';

export async function getUsers() {
    await requirePermission(['Admin']);
    return prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            usuario: true,
            role: true,
            ativo: true,
            criadoEm: true,
        },
        orderBy: { nome: 'asc' },
    });
}
