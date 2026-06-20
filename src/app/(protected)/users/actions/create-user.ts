'use server';

import type { Role } from '@/generated/enums';
import { prisma } from '@/lib/prisma';
import { requirePermission } from '@/utils/require-permission';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

export async function createUser(data: {
    nome: string;
    usuario: string;
    role: Role;
    senha: string;
}) {
    await requirePermission(['Admin']);

    const senhaHash = await bcrypt.hash(data.senha, 12);

    await prisma.usuario.create({
        data: {
            id: randomUUID(),
            nome: data.nome,
            usuario: data.usuario,
            senhaHash,
            role: data.role,
        },
    });

    revalidatePath('/users');
}
