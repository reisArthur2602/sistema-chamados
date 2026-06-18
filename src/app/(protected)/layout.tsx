import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PropsWithChildren } from 'react';
import { AppHeader } from './components/app-header';
import { ProtectedSidebar } from './components/app-sidebar';

const ProtectedLayout = ({ children }: PropsWithChildren) => {
    return (
        <TooltipProvider delayDuration={0}>
            <SidebarProvider>
                <ProtectedSidebar />
                <SidebarInset>
                    <AppHeader />
                    <main className="flex flex-1 flex-col p-4">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
};

export default ProtectedLayout;
