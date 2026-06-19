import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/utils/require-auth';

export async function getTickets() {
    const session = await requireAuth();

    return prisma.chamado.findMany({
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
            abertoPor: { select: { id: true, nome: true } },
            atribuidoPara: { select: { id: true, nome: true } },
        },
        orderBy: { criadoEm: 'desc' },
    });
}
