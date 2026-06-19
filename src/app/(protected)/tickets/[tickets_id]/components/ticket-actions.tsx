'use client';

import type { StatusChamado } from '@/app/generated/enums';
import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { updateTicketStatus } from '../actions/update-ticket-status';

const labels: Partial<Record<StatusChamado, string>> = {
    em_atendimento: 'em atendimento',
    resolvido: 'finalizado',
    fechado: 'aprovado',
    cancelado: 'cancelado',
};

interface TicketActionsProps {
    id: string;
    status: StatusChamado;
    openedById: string;
    currentUserId: string;
}

export function TicketActions({ id, status, openedById, currentUserId }: TicketActionsProps) {
    const [isPending, startTransition] = useTransition();

    function handleAction(next: StatusChamado) {
        startTransition(async () => {
            try {
                await updateTicketStatus(id, next);
                toast.success(`Chamado ${labels[next]}.`);
            } catch {
                toast.error('Erro ao atualizar status.');
            }
        });
    }

    const isOwner = currentUserId === openedById;

    if (isOwner) {
        if (status === 'fechado' || status === 'cancelado') return null;
        return (
            <Button
                variant="outline"
                className="text-destructive hover:text-destructive"
                disabled={isPending}
                onClick={() => handleAction('cancelado')}
            >
                <XIcon className="size-4" />
                Cancelar chamado
            </Button>
        );
    }

    if (status === 'aberto') {
        return (
            <Button disabled={isPending} onClick={() => handleAction('em_atendimento')}>
                <CheckIcon className="size-4" />
                Aceitar chamado
            </Button>
        );
    }

    if (status === 'em_atendimento') {
        return (
            <Button disabled={isPending} onClick={() => handleAction('resolvido')}>
                <CheckIcon className="size-4" />
                Finalizar chamado
            </Button>
        );
    }

    if (status === 'resolvido') {
        return (
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    disabled={isPending}
                    onClick={() => handleAction('cancelado')}
                >
                    <XIcon className="size-4" />
                    Cancelar
                </Button>
                <Button disabled={isPending} onClick={() => handleAction('fechado')}>
                    <CheckIcon className="size-4" />
                    Aprovar
                </Button>
            </div>
        );
    }

    return null;
}
