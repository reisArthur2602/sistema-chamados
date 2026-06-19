import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { logout } from '@/utils/logout';
import { getSession } from '@/utils/session';
import { PropsWithChildren } from 'react';
import { AppHeader } from './components/app-header';
import { ProtectedSidebar } from './components/app-sidebar';

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
    const session = await getSession();
    if (!session) return await logout();

    return (
        <TooltipProvider delayDuration={0}>
            <SidebarProvider>
                <ProtectedSidebar session={session} />
                <SidebarInset>
                    <AppHeader usuarioId={session.id} />
                    <main className="flex flex-1 flex-col p-4">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
};

export default ProtectedLayout;
