'use server';

import { sendPushToUser } from '@/lib/web-push';
import type { PushPayload } from '@/lib/web-push';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';
import { revalidatePath } from 'next/cache';

export async function createComment(chamadoId: string, mensagem: string) {
    const session = await requireAuth();

    await prisma.comentario.create({
        data: {
            chamadoId,
            usuarioId: session.id,
            mensagem,
        },
    });

    revalidatePath(`/tickets/${chamadoId}`);

    const ticket = await prisma.chamado.findUnique({
        where: { id: chamadoId },
        select: { titulo: true, abertoPorId: true, atribuidoParaId: true },
    });

    if (!ticket) return;

    const payload: PushPayload = {
        title: 'Novo comentário no chamado',
        body: `"${ticket.titulo}" — ${mensagem.slice(0, 100)}`,
        url: `/tickets/${chamadoId}`,
    };

    const targets = new Set<string>();
    if (ticket.abertoPorId !== session.id) targets.add(ticket.abertoPorId);
    if (ticket.atribuidoParaId && ticket.atribuidoParaId !== session.id) {
        targets.add(ticket.atribuidoParaId);
    }

    Promise.allSettled([...targets].map((userId) => sendPushToUser(userId, payload)));
}
