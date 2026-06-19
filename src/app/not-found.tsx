import { Button } from '@/components/ui/button';
import { FileSearchIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                    <FileSearchIcon className="size-8 text-muted-foreground" />
                </div>
                <div className="space-y-1.5">
                    <h1 className="font-title text-2xl font-semibold tracking-tight">
                        Página não encontrada
                    </h1>
                    <p className="max-w-sm text-sm text-muted-foreground">
                        O endereço que você acessou não existe ou foi removido.
                    </p>
                </div>
            </div>
            <Button asChild>
                <Link href="/tickets">Voltar para chamados</Link>
            </Button>
        </div>
    );
}
