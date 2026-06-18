'use client';

import type { StatusChamado } from '@/app/generated/enums';
import { Button } from '@/components/ui/button';
import { CheckIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

interface TicketActionsProps {
    id: string;
    status: StatusChamado;
}

export function TicketActions({ id: _id, status }: TicketActionsProps) {
    async function handleAction(next: StatusChamado) {
        // TODO: server action — atualizar status do chamado
        const labels: Partial<Record<StatusChamado, string>> = {
            em_atendimento: 'em atendimento',
            resolvido: 'finalizado',
            fechado: 'aprovado',
            cancelado: 'cancelado',
        };
        toast.success(`Chamado ${labels[next]}.`);
    }

    if (status === 'aberto') {
        return (
            <Button onClick={() => handleAction('em_atendimento')}>
                <CheckIcon className="size-4" />
                Aceitar chamado
            </Button>
        );
    }

    if (status === 'em_atendimento') {
        return (
            <Button onClick={() => handleAction('resolvido')}>
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
                    onClick={() => handleAction('cancelado')}
                >
                    <XIcon className="size-4" />
                    Cancelar
                </Button>
                <Button onClick={() => handleAction('fechado')}>
                    <CheckIcon className="size-4" />
                    Aprovar
                </Button>
            </div>
        );
    }

    return null;
}
