'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontalIcon, PencilIcon, ShieldIcon, UserCheckIcon, UserXIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { toggleUserRole } from '../actions/toggle-user-role';
import { toggleUserStatus } from '../actions/toggle-user-status';
import type { UserRow } from './users-columns';
import { UpsertUserDialog } from './upsert-user-dialog';

interface UserActionsProps {
    user: UserRow;
    currentUserId: string;
}

export function UserActions({ user, currentUserId }: UserActionsProps) {
    const [editOpen, setEditOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const isSelf = user.id === currentUserId;

    function handleToggleRole() {
        startTransition(async () => {
            try {
                await toggleUserRole(user.id);
                const next = user.role === 'Admin' ? 'Membro' : 'Admin';
                toast.success(`Papel alterado para ${next}.`);
            } catch {
                toast.error('Erro ao alterar papel.');
            }
        });
    }

    function handleToggleStatus() {
        startTransition(async () => {
            try {
                await toggleUserStatus(user.id);
                toast.success(user.ativo ? 'Usuário desativado.' : 'Usuário reativado.');
            } catch (e) {
                toast.error(e instanceof Error ? e.message : 'Erro ao alterar status.');
            }
        });
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" disabled={isPending}>
                        <MoreHorizontalIcon />
                        <span className="sr-only">Ações</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                    <DropdownMenuItem onClick={() => setEditOpen(true)}>
                        <PencilIcon />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleToggleRole} disabled={isSelf}>
                        <ShieldIcon />
                        {user.role === 'Admin' ? 'Tornar Membro' : 'Tornar Admin'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={handleToggleStatus}
                        disabled={isSelf}
                    >
                        {user.ativo ? <UserXIcon /> : <UserCheckIcon />}
                        {user.ativo ? 'Desativar' : 'Reativar'}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <UpsertUserDialog user={user} open={editOpen} onOpenChange={setEditOpen} />
        </>
    );
}
