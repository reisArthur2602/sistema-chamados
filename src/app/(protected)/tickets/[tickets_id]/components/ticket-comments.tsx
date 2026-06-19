'use client';

import type { StatusChamado } from '@/app/generated/enums';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDateTime } from '@/utils/format-date';
import { getInitials } from '@/utils/get-initials';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { deleteComment } from '../actions/delete-comment';
import { getComments } from '../actions/get-comments';
import { TicketCommentForm } from './ticket-comment-form';

interface TicketCommentsProps {
    chamadoId: string;
    status: StatusChamado;
    currentUserId: string;
}

export function TicketComments({ chamadoId, status, currentUserId }: TicketCommentsProps) {
    const queryClient = useQueryClient();
    const [isPending, startTransition] = useTransition();

    const { data: comentarios = [], isLoading } = useQuery({
        queryKey: ['comments', chamadoId],
        queryFn: () => getComments(chamadoId),
        staleTime: 30_000,
    });

    const podeComentar = status === 'em_atendimento' || status === 'resolvido';

    function handleDelete(comentarioId: string) {
        startTransition(async () => {
            try {
                await deleteComment(comentarioId);
                queryClient.invalidateQueries({ queryKey: ['comments', chamadoId] });
            } catch {
                toast.error('Erro ao apagar comentário.');
            }
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">
                    Comentários
                    {comentarios.length > 0 && (
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                            ({comentarios.length})
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex gap-3">
                                    <Skeleton className="size-8 shrink-0 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-3.5 w-32" />
                                        <Skeleton className="h-3.5 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : comentarios.length === 0 ? (
                        <p className="py-4 text-center text-sm text-muted-foreground">
                            Nenhum comentário ainda.
                        </p>
                    ) : (
                        comentarios.map((c) => {
                            const isOwn = c.usuario.id === currentUserId;

                            return (
                                <div
                                    key={c.id}
                                    className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <Avatar className="size-8 shrink-0 self-end">
                                        <AvatarFallback className="text-xs">
                                            {getInitials(c.usuario.nome)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className={`flex max-w-[75%] flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}>
                                        <div className={`flex items-center gap-1.5 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <span className="text-xs font-medium">
                                                {isOwn ? 'Você' : c.usuario.nome}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDateTime(c.criadoEm)}
                                            </span>
                                            {!c.apagado && isOwn && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    className="text-muted-foreground hover:text-destructive"
                                                    disabled={isPending}
                                                    onClick={() => handleDelete(c.id)}
                                                >
                                                    <Trash2Icon className="size-3" />
                                                    <span className="sr-only">Apagar comentário</span>
                                                </Button>
                                            )}
                                        </div>

                                        <div
                                            className={`rounded-2xl px-3.5 py-2 text-sm ${
                                                isOwn
                                                    ? 'rounded-tr-sm bg-primary text-primary-foreground'
                                                    : 'rounded-tl-sm bg-muted text-muted-foreground'
                                            } ${c.apagado ? 'italic opacity-60' : ''}`}
                                        >
                                            {c.apagado ? 'Mensagem apagada.' : c.mensagem}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <Separator />

                {podeComentar ? (
                    <TicketCommentForm chamadoId={chamadoId} />
                ) : (
                    <p className="py-2 text-center text-sm text-muted-foreground">
                        {status === 'aberto'
                            ? 'O chamado precisa ser aceito antes de comentar.'
                            : 'Não é possível comentar em um chamado encerrado.'}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
