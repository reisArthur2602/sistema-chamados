'use server';

import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/utils/require-permission';
import { revalidatePath } from 'next/cache';

export async function toggleUserRole(id: string) {
    await requirePermission(['Admin']);

    const user = await prisma.usuario.findUniqueOrThrow({
        where: { id },
        select: { role: true },
    });

    await prisma.usuario.update({
        where: { id },
        data: { role: user.role === 'Admin' ? 'Membro' : 'Admin' },
    });

    revalidatePath('/users');
}
