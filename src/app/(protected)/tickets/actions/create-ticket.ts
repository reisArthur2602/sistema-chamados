'use server';

import { sendPushToUser } from '@/lib/web-push';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';
import { revalidatePath } from 'next/cache';

interface CreateTicketInput {
    titulo: string;
    descricao: string;
    atribuidoParaId?: string;
}

export async function createTicket(input: CreateTicketInput) {
    const session = await requireAuth();

    const ticket = await prisma.chamado.create({
        data: {
            titulo: input.titulo,
            descricao: input.descricao,
            abertoPorId: session.id,
            atribuidoParaId: input.atribuidoParaId ?? null,
        },
        select: { id: true, titulo: true, atribuidoParaId: true },
    });

    revalidatePath('/tickets');

    if (ticket.atribuidoParaId) {
        sendPushToUser(ticket.atribuidoParaId, {
            title: 'Novo chamado atribuído a você',
            body: ticket.titulo,
            url: `/tickets/${ticket.id}`,
        }).catch(() => {});
    }
}
