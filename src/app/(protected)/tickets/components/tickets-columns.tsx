import type { StatusChamado } from '@/app/generated/enums';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDownIcon, EyeIcon, MoreHorizontalIcon } from 'lucide-react';
import Link from 'next/link';

export type ChamadoRow = {
    id: string;
    titulo: string;
    status: StatusChamado;
    criadoEm: Date;
    abertoPor: { nome: string };
    atribuidoPara: { nome: string } | null;
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

export const chamadoColumns: ColumnDef<ChamadoRow>[] = [
    {
        accessorKey: 'titulo',
        header: ({ column }) => (
            <Button
                variant="ghost"
                size="sm"
                className="-ml-3"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Título
                <ArrowUpDownIcon className="size-3.5" />
            </Button>
        ),
        cell: ({ row }) => (
            <Link href={`/tickets/${row.original.id}`} className="font-medium hover:underline">
                {row.getValue('titulo')}
            </Link>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const { label, className } = statusConfig[row.getValue<StatusChamado>('status')];
            return (
                <Badge variant="outline" className={className}>
                    {label}
                </Badge>
            );
        },
    },
    {
        id: 'abertoPor',
        header: 'Aberto por',
        cell: ({ row }) => row.original.abertoPor.nome,
    },
    {
        id: 'atribuidoPara',
        header: 'Atribuído para',
        cell: ({ row }) => {
            const atribuido = row.original.atribuidoPara;
            return atribuido ? (
                atribuido.nome
            ) : (
                <span className="text-muted-foreground">—</span>
            );
        },
    },
    {
        accessorKey: 'criadoEm',
        header: ({ column }) => (
            <Button
                variant="ghost"
                size="sm"
                className="-ml-3"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Criado em
                <ArrowUpDownIcon className="size-3.5" />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(
                    row.getValue<Date>('criadoEm')
                )}
            </span>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Ações</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/tickets/${row.original.id}`}>
                            <EyeIcon />
                            Ver detalhes
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
