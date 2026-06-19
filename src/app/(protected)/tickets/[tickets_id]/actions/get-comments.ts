'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';
import { notFound } from 'next/navigation';

export type TicketComment = {
    id: string;
    mensagem: string;
    apagado: boolean;
    criadoEm: Date;
    usuario: { id: string; nome: string; usuario: string };
};

export async function getComments(chamadoId: string): Promise<TicketComment[]> {
    const session = await requireAuth();

    const chamado = await prisma.chamado.findUnique({
        where: { id: chamadoId, ativo: true },
        select: { abertoPorId: true, atribuidoParaId: true },
    });

    if (!chamado) notFound();

    if (
        session.role === 'Membro' &&
        chamado.abertoPorId !== session.id &&
        chamado.atribuidoParaId !== session.id
    ) {
        notFound();
    }

    return prisma.comentario.findMany({
        where: { chamadoId },
        select: {
            id: true,
            mensagem: true,
            apagado: true,
            criadoEm: true,
            usuario: { select: { id: true, nome: true, usuario: true } },
        },
        orderBy: { criadoEm: 'asc' },
    });
}
