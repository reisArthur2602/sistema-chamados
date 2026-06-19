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
            abertoPor: { select: { id: true, nome: true, usuario: true } },
            atribuidoPara: { select: { id: true, nome: true, usuario: true } },
            comentarios: {
                select: {
                    id: true,
                    mensagem: true,
                    criadoEm: true,
                    usuario: { select: { id: true, nome: true, usuario: true } },
                },
                orderBy: { criadoEm: 'asc' },
            },
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
        chamado.abertoPor.id !== session.id &&
        chamado.atribuidoPara?.id !== session.id
    ) {
        notFound();
    }

    return chamado;
}
