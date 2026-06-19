'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { PushSubscriptionButton } from './push-subscription-button';

interface AppHeaderProps {
    usuarioId: string;
}

export function AppHeader({ usuarioId }: AppHeaderProps) {
    return (
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <div className="ml-auto">
                <PushSubscriptionButton usuarioId={usuarioId} />
            </div>
        </header>
    );
}
