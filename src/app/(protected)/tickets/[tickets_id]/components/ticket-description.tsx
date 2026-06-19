import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TicketDescriptionProps {
    descricao: string;
}

export function TicketDescription({ descricao }: TicketDescriptionProps) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Descrição</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {descricao}
                </p>
            </CardContent>
        </Card>
    );
}
