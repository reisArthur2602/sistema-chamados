'use server';

import type { Role } from '@/app/generated/enums';
import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/utils/require-permission';
import { revalidatePath } from 'next/cache';

export async function updateUser(id: string, data: { nome: string; role: Role }) {
    await requirePermission(['Admin']);

    await prisma.usuario.update({
        where: { id },
        data: { nome: data.nome, role: data.role },
    });

    revalidatePath('/users');
}
