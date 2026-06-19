import type { Role } from '@/app/generated/enums';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDownIcon } from 'lucide-react';
import { UserActions } from './user-actions';

export type UserRow = {
    id: string;
    nome: string;
    usuario: string;
    role: Role;
    ativo: boolean;
    criadoEm: Date;
};

export const roleConfig: Record<Role, { label: string; className: string }> = {
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

export function createUserColumns(currentUserId: string): ColumnDef<UserRow>[] {
    return [
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
            filterFn: 'equals',
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
            filterFn: 'equals',
            cell: ({ row }) =>
                row.getValue<boolean>('ativo') ? (
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
                ),
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
                        new Date(row.getValue<string>('criadoEm')),
                    )}
                </span>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <UserActions user={row.original} currentUserId={currentUserId} />
            ),
        },
    ];
}
