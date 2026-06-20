import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';

export type TicketDetail = NonNullable<Awaited<ReturnType<typeof getTicket>>>;

export async function getTicket(id: string) {
    const session = await requireAuth();

    const chamado = await prisma.chamado.findUnique({
        where: { id, ativo: true },
        select: {
            id: true,
            titulo: true,
            descricao: true,
            status: true,
            criadoEm: true,
            atualizadoEm: true,
            abertoPorId: true,
            abertoPor: { select: { nome: true, usuario: true } },
            atribuidoParaId: true,
            atribuidoPara: { select: { nome: true, usuario: true } },
            anexos: {
                select: {
                    id: true,
                    nomeArquivo: true,
                    caminhoArquivo: true,
                    criadoEm: true,
                    enviadoPor: { select: { id: true, nome: true } },
                },
                orderBy: { criadoEm: 'asc' },
            },
        },
    });

    if (!chamado) notFound();

    if (
        session.role === 'Membro' &&
        chamado.abertoPorId !== session.id &&
        chamado.atribuidoParaId !== session.id
    ) {
        notFound();
    }

    const { abertoPorId, atribuidoParaId, ...rest } = chamado;

    return {
        ...rest,
        openedByMe: abertoPorId === session.id,
    };
}
