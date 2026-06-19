'use server';

import type { StatusChamado } from '@/app/generated/enums';
import { prisma } from '@/lib/prisma';
import { sendPushToUser } from '@/lib/web-push';
import { requireAuth } from '@/utils/require-auth';
import { statusConfig } from '@/utils/status-config';
import { revalidatePath } from 'next/cache';

export async function updateTicketStatus(id: string, status: StatusChamado) {
    const session = await requireAuth();

    const ticket = await prisma.chamado.update({
        where: { id },
        data: { status },
        select: { titulo: true, abertoPorId: true, atribuidoParaId: true },
    });

    revalidatePath('/tickets');
    revalidatePath(`/tickets/${id}`);

    const targets = new Set<string>();
    if (ticket.abertoPorId !== session.id) targets.add(ticket.abertoPorId);
    if (ticket.atribuidoParaId && ticket.atribuidoParaId !== session.id) {
        targets.add(ticket.atribuidoParaId);
    }

    Promise.allSettled(
        [...targets].map((userId) =>
            sendPushToUser(userId, {
                title: 'Chamado atualizado',
                body: `"${ticket.titulo}" — ${statusConfig[status].label}`,
                url: `/tickets/${id}`,
            }),
        ),
    );
}
