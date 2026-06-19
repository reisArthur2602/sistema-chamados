'use server';

import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/utils/require-permission';
import { getSession } from '@/utils/session';
import { revalidatePath } from 'next/cache';

export async function toggleUserStatus(id: string) {
    await requirePermission(['Admin']);

    const session = await getSession();
    if (session?.id === id) {
        throw new Error('Você não pode desativar sua própria conta.');
    }

    const user = await prisma.usuario.findUniqueOrThrow({
        where: { id },
        select: { ativo: true },
    });

    await prisma.usuario.update({
        where: { id },
        data: { ativo: !user.ativo },
    });

    revalidatePath('/users');
}
