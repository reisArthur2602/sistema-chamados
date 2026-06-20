'use client';

import { Button } from '@/components/ui/button';
import type { StatusChamado } from '@/generated/enums';
import { useMutation } from '@tanstack/react-query';
import { CheckIcon, XIcon } from 'lucide-react';
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
    openedByMe: boolean;
}

export function TicketActions({ id, status, openedByMe }: TicketActionsProps) {
    const { mutate, isPending } = useMutation({
        mutationFn: (next: StatusChamado) => updateTicketStatus(id, next),
        onSuccess: (_, next) => toast.success(`Chamado ${labels[next]}.`),
        onError: () => toast.error('Erro ao atualizar status.'),
    });

    if (openedByMe) {
        if (status === 'fechado' || status === 'cancelado') return null;
        return (
            <Button
                variant="outline"
                className="text-destructive hover:text-destructive"
                disabled={isPending}
                onClick={() => mutate('cancelado')}
            >
                <XIcon className="size-4" />
                Cancelar chamado
            </Button>
        );
    }

    if (status === 'aberto') {
        return (
            <Button disabled={isPending} onClick={() => mutate('em_atendimento')}>
                <CheckIcon className="size-4" />
                Aceitar chamado
            </Button>
        );
    }

    if (status === 'em_atendimento') {
        return (
            <Button disabled={isPending} onClick={() => mutate('resolvido')}>
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
                    onClick={() => mutate('cancelado')}
                >
                    <XIcon className="size-4" />
                    Cancelar
                </Button>
                <Button disabled={isPending} onClick={() => mutate('fechado')}>
                    <CheckIcon className="size-4" />
                    Aprovar
                </Button>
            </div>
        );
    }

    return null;
}
