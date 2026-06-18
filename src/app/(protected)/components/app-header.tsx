'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { PushSubscriptionButton } from './push-subscription-button';

export function AppHeader() {
    return (
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <div className="ml-auto">
                {/* TODO: passar usuarioId real da sessão */}
                <PushSubscriptionButton usuarioId="placeholder" />
            </div>
        </header>
    );
}
