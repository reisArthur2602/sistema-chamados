import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { StatusChamado } from '@/generated/enums';
import { formatDateTime } from '@/utils/format-date';
import { statusConfig } from '@/utils/status-config';

interface TicketInfoProps {
    status: StatusChamado;
    abertoPor: { nome: string };
    atribuidoPara: { nome: string } | null;
    criadoEm: Date;
    atualizadoEm: Date;
}

export function TicketInfo({
    status,
    abertoPor,
    atribuidoPara,
    criadoEm,
    atualizadoEm,
}: TicketInfoProps) {
    const { label, className } = statusConfig[status];

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="space-y-1.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Status
                    </p>
                    <Badge variant="outline" className={className}>
                        {label}
                    </Badge>
                </div>

                <Separator />

                <div className="space-y-1.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Aberto por
                    </p>
                    <p>{abertoPor.nome}</p>
                </div>

                <div className="space-y-1.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Atribuído para
                    </p>
                    <p className={atribuidoPara ? '' : 'text-muted-foreground'}>
                        {atribuidoPara?.nome ?? 'Não atribuído'}
                    </p>
                </div>

                <Separator />

                <div className="space-y-1.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Criado em
                    </p>
                    <p className="text-muted-foreground">{formatDateTime(criadoEm)}</p>
                </div>

                <div className="space-y-1.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Atualizado em
                    </p>
                    <p className="text-muted-foreground">{formatDateTime(atualizadoEm)}</p>
                </div>
            </CardContent>
        </Card>
    );
}
