'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';

export async function getTickets() {
    const session = await requireAuth();

    const tickets = await prisma.chamado.findMany({
        where: {
            ativo: true,
            ...(session.role === 'Membro' && {
                OR: [{ abertoPorId: session.id }, { atribuidoParaId: session.id }],
            }),
        },
        select: {
            id: true,
            titulo: true,
            status: true,
            criadoEm: true,
            abertoPorId: true,
            abertoPor: { select: { nome: true } },
            atribuidoParaId: true,
            atribuidoPara: { select: { nome: true } },
        },
        orderBy: { criadoEm: 'desc' },
    });

    return tickets.map(({ abertoPorId, atribuidoParaId, ...ticket }) => ({
        ...ticket,
        openedByMe: abertoPorId === session.id,
        assignedToMe: atribuidoParaId === session.id,
    }));
}
