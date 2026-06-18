import { type ChamadoRow } from './tickets-columns';
import { TicketsTable } from './tickets-table';

async function getChamados(): Promise<ChamadoRow[]> {
    // TODO: substituir pelo Prisma quando o banco estiver configurado
    // return await prisma.chamado.findMany({
    //   where: { ativo: true },
    //   include: { abertoPor: true, atribuidoPara: true },
    //   orderBy: { criadoEm: 'desc' },
    // })
    return [];
}

export async function TicketsData() {
    const chamados = await getChamados();
    return <TicketsTable data={chamados} />;
}
