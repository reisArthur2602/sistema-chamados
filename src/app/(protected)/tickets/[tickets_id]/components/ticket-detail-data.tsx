import type { StatusChamado } from '@/app/generated/enums';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TicketActions } from './ticket-actions';
import { TicketCommentForm } from './ticket-comment-form';

type ChamadoDetalhe = {
    id: string;
    titulo: string;
    descricao: string;
    status: StatusChamado;
    criadoEm: Date;
    atualizadoEm: Date;
    abertoPor: { nome: string };
    atribuidoPara: { nome: string } | null;
    comentarios: {
        id: string;
        mensagem: string;
        criadoEm: Date;
        usuario: { nome: string };
    }[];
};

const statusConfig: Record<StatusChamado, { label: string; className: string }> = {
    aberto: {
        label: 'Aberto',
        className:
            'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    },
    em_atendimento: {
        label: 'Em atendimento',
        className:
            'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    },
    resolvido: {
        label: 'Aguardando aprovação',
        className:
            'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
    },
    fechado: {
        label: 'Fechado',
        className:
            'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400',
    },
    cancelado: {
        label: 'Cancelado',
        className:
            'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400',
    },
};

// TODO: substituir pelo Prisma quando o banco estiver configurado
const mockChamado: ChamadoDetalhe = {
    id: '1',
    titulo: 'Erro ao fazer login no sistema',
    descricao:
        'O usuário relata que ao tentar efetuar login na plataforma, a tela de carregamento fica em loop infinito sem redirecionar para o dashboard.\n\nO problema foi identificado nos navegadores Chrome e Firefox. No Safari o comportamento é diferente — a página retorna um erro 403.',
    status: 'em_atendimento',
    criadoEm: new Date('2026-06-15T09:00:00'),
    atualizadoEm: new Date('2026-06-17T14:15:00'),
    abertoPor: { nome: 'João Silva' },
    atribuidoPara: { nome: 'Maria Santos' },
    comentarios: [
        {
            id: '1',
            mensagem:
                'Consegui reproduzir o problema no ambiente de desenvolvimento. Vou investigar o middleware de autenticação.',
            criadoEm: new Date('2026-06-16T10:30:00'),
            usuario: { nome: 'Maria Santos' },
        },
        {
            id: '2',
            mensagem:
                'Identificei a causa: o token JWT está expirando antes de ser validado pelo interceptor. Será corrigido ainda hoje.',
            criadoEm: new Date('2026-06-17T14:15:00'),
            usuario: { nome: 'Maria Santos' },
        },
    ],
};

async function getChamado(_id: string): Promise<ChamadoDetalhe | null> {
    // TODO: return await prisma.chamado.findUnique({
    //   where: { id: _id, ativo: true },
    //   include: {
    //     abertoPor: true,
    //     atribuidoPara: true,
    //     comentarios: { include: { usuario: true }, orderBy: { criadoEm: 'asc' } },
    //   },
    // });
    return mockChamado;
}

const dt = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

function initials(nome: string) {
    return nome
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join('');
}

export async function TicketDetailData({ id }: { id: string }) {
    const chamado = await getChamado(id);
    if (!chamado) notFound();

    const { label, className } = statusConfig[chamado.status];

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
                <Link
                    href="/tickets"
                    className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeftIcon className="size-3.5" />
                    Chamados
                </Link>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="font-title text-2xl font-semibold tracking-tight">
                            {chamado.titulo}
                        </h1>
                        <Badge variant="outline" className={className}>
                            {label}
                        </Badge>
                    </div>
                    <TicketActions id={chamado.id} status={chamado.status} />
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-6 lg:flex-row">
                {/* Left column */}
                <div className="flex min-w-0 flex-1 flex-col gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Descrição</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                                {chamado.descricao}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                                Comentários
                                {chamado.comentarios.length > 0 && (
                                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                                        ({chamado.comentarios.length})
                                    </span>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {chamado.comentarios.length === 0 ? (
                                <p className="py-4 text-center text-sm text-muted-foreground">
                                    Nenhum comentário ainda.
                                </p>
                            ) : (
                                <div className="space-y-5">
                                    {chamado.comentarios.map((c) => (
                                        <div key={c.id} className="flex gap-3">
                                            <Avatar className="size-8 shrink-0">
                                                <AvatarFallback className="text-xs">
                                                    {initials(c.usuario.nome)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">
                                                        {c.usuario.nome}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {dt.format(c.criadoEm)}
                                                    </span>
                                                </div>
                                                <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                                                    {c.mensagem}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Separator />
                            <TicketCommentForm chamadoId={chamado.id} />
                        </CardContent>
                    </Card>
                </div>

                {/* Right sidebar */}
                <div className="w-full lg:w-64 lg:flex-none">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Informações</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="space-y-1.5">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Status
                                </p>
                                <Badge variant="outline" className={className}>
                                    {label}
                                </Badge>
                            </div>

                            <Separator />

                            <div className="space-y-1.5">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Aberto por
                                </p>
                                <p>{chamado.abertoPor.nome}</p>
                            </div>

                            <div className="space-y-1.5">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Atribuído para
                                </p>
                                <p className={chamado.atribuidoPara ? '' : 'text-muted-foreground'}>
                                    {chamado.atribuidoPara?.nome ?? 'Não atribuído'}
                                </p>
                            </div>

                            <Separator />

                            <div className="space-y-1.5">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Criado em
                                </p>
                                <p className="text-muted-foreground">
                                    {dt.format(chamado.criadoEm)}
                                </p>
                            </div>

                            <div className="space-y-1.5">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Atualizado em
                                </p>
                                <p className="text-muted-foreground">
                                    {dt.format(chamado.atualizadoEm)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
