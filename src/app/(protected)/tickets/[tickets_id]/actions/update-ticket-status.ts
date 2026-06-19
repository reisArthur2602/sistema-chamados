'use server';

import type { StatusChamado } from '@/app/generated/enums';
import { sendPushToUser } from '@/lib/web-push';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';
import { statusConfig } from '@/utils/status-config';
import { revalidatePath } from 'next/cache';

export async function updateTicketStatus(id: string, status: StatusChamado) {
    await requireAuth();

    const ticket = await prisma.chamado.update({
        where: { id },
        data: { status },
        select: { titulo: true, abertoPorId: true },
    });

    revalidatePath('/tickets');

    sendPushToUser(ticket.abertoPorId, {
        title: 'Seu chamado foi atualizado',
        body: `"${ticket.titulo}" — ${statusConfig[status].label}`,
        url: `/tickets/${id}`,
    }).catch(() => {});
}
