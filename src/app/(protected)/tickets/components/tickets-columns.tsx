import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { StatusChamado } from '@/generated/enums';
import { formatDate } from '@/utils/format-date';
import { statusConfig } from '@/utils/status-config';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDownIcon, ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

export type TicketRow = {
    id: string;
    titulo: string;
    status: StatusChamado;
    criadoEm: Date;
    abertoPor: { nome: string };
    atribuidoPara: { nome: string } | null;
    openedByMe: boolean;
    assignedToMe: boolean;
};

export const ticketColumns: ColumnDef<TicketRow>[] = [
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
        cell: ({ row }) => {
            const { openedByMe, abertoPor } = row.original;
            return (
                <div className="flex items-center gap-2">
                    {openedByMe ? (
                        <Badge variant="secondary" className="text-xs">
                            Você
                        </Badge>
                    ) : (
                        <span className="text-sm text-muted-foreground">{abertoPor.nome}</span>
                    )}
                </div>
            );
        },
    },
    {
        id: 'atribuidoPara',
        header: 'Atribuído para',
        cell: ({ row }) => {
            const { assignedToMe, atribuidoPara } = row.original;
            if (!atribuidoPara) return <span className="text-muted-foreground">—</span>;
            return (
                <div className="flex items-center gap-2">
                    {assignedToMe ? (
                        <Badge variant="secondary" className="text-xs">
                            Você
                        </Badge>
                    ) : (
                        <span className="text-sm text-muted-foreground">{atribuidoPara.nome}</span>
                    )}
                </div>
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
            <span className="text-sm text-muted-foreground">
                {formatDate(row.getValue<string>('criadoEm'))}
            </span>
        ),
    },
    {
        id: 'actions',
        size: 48,
        cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`/tickets/${row.original.id}`}>
                            <ArrowUpRightIcon className="size-4" />
                            <span className="sr-only">Ver chamado</span>
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Ver chamado</TooltipContent>
            </Tooltip>
        ),
    },
];
