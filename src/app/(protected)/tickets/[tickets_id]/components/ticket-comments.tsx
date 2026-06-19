import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDateTime } from '@/utils/format-date';
import { getInitials } from '@/utils/get-initials';
import type { TicketDetail } from '../actions/get-ticket';
import { TicketCommentForm } from './ticket-comment-form';
import type { StatusChamado } from '@/app/generated/enums';

interface TicketCommentsProps {
    chamadoId: string;
    status: StatusChamado;
    comentarios: TicketDetail['comentarios'];
}

export function TicketComments({ chamadoId, status, comentarios }: TicketCommentsProps) {
    const podecomentar = status === 'em_atendimento' || status === 'resolvido';
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
                <div className="space-y-5">
                    {comentarios.length === 0 ? (
                        <p className="py-4 text-center text-sm text-muted-foreground">
                            Nenhum comentário ainda.
                        </p>
                    ) : (
                        comentarios.map((c) => (
                            <div key={c.id} className="flex gap-3">
                                <Avatar className="size-8 shrink-0">
                                    <AvatarFallback className="text-xs">
                                        {getInitials(c.usuario.nome)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">
                                            {c.usuario.nome}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDateTime(c.criadoEm)}
                                        </span>
                                    </div>
                                    <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                                        {c.mensagem}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Separator />
                {podecomentar ? (
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
