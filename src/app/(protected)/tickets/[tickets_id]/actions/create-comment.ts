'use server';

import type { PushPayload } from '@/lib/web-push';
import { sendPushToUser } from '@/lib/web-push';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';

export async function createComment(chamadoId: string, mensagem: string) {
    const session = await requireAuth();

    const ticket = await prisma.chamado.findUniqueOrThrow({
        where: { id: chamadoId },
        select: { status: true, titulo: true, abertoPorId: true, atribuidoParaId: true },
    });

    if (ticket.status !== 'em_atendimento' && ticket.status !== 'resolvido') {
        throw new Error('Não é possível comentar neste chamado.');
    }

    await prisma.comentario.create({
        data: { chamadoId, usuarioId: session.id, mensagem },
    });

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

    await Promise.allSettled([...targets].map((userId) => sendPushToUser(userId, payload)));
}
