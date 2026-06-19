'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';

export async function deleteComment(comentarioId: string) {
    const session = await requireAuth();

    const comentario = await prisma.comentario.findUniqueOrThrow({
        where: { id: comentarioId },
        select: { usuarioId: true },
    });

    if (comentario.usuarioId !== session.id) {
        throw new Error('Sem permissão para apagar este comentário.');
    }

    await prisma.comentario.update({
        where: { id: comentarioId },
        data: { apagado: true },
    });
}
