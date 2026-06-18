import type { Role } from '@/app/generated/enums';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDownIcon, MoreHorizontalIcon, PencilIcon, ShieldIcon, UserXIcon } from 'lucide-react';

export type UsuarioRow = {
    id: string;
    nome: string;
    usuario: string;
    role: Role;
    ativo: boolean;
    criadoEm: Date;
};

const roleConfig: Record<Role, { label: string; className: string }> = {
    Admin: {
        label: 'Admin',
        className:
            'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400',
    },
    Membro: {
        label: 'Membro',
        className: '',
    },
};

export const usuarioColumns: ColumnDef<UsuarioRow>[] = [
    {
        accessorKey: 'nome',
        header: ({ column }) => (
            <Button
                variant="ghost"
                size="sm"
                className="-ml-3"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Nome
                <ArrowUpDownIcon className="size-3.5" />
            </Button>
        ),
        cell: ({ row }) => <span className="font-medium">{row.getValue('nome')}</span>,
    },
    {
        accessorKey: 'usuario',
        header: 'Usuário',
        cell: ({ row }) => (
            <span className="font-mono text-xs text-muted-foreground">
                @{row.getValue('usuario')}
            </span>
        ),
    },
    {
        accessorKey: 'role',
        header: 'Papel',
        cell: ({ row }) => {
            const { label, className } = roleConfig[row.getValue<Role>('role')];
            return (
                <Badge variant="outline" className={className}>
                    {label}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'ativo',
        header: 'Status',
        cell: ({ row }) => {
            const ativo = row.getValue<boolean>('ativo');
            return ativo ? (
                <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400"
                >
                    Ativo
                </Badge>
            ) : (
                <Badge variant="outline" className="text-muted-foreground">
                    Inativo
                </Badge>
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
                    <DropdownMenuItem>
                        <PencilIcon />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ShieldIcon />
                        Alterar papel
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                        <UserXIcon />
                        {row.original.ativo ? 'Desativar' : 'Reativar'}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
