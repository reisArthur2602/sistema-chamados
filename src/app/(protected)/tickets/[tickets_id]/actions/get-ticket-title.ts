import { prisma } from '@/lib/prisma';

export async function getTicketTitle(id: string): Promise<string> {
    const chamado = await prisma.chamado.findUnique({
        where: { id },
        select: { titulo: true },
    });
    return chamado?.titulo ?? 'Chamado';
}
