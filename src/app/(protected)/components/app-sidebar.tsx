'use client';

import { LogoMark } from '@/components/logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { type SessionPayload } from '@/utils/session';
import { TicketIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AvatarDropdown } from './avatar-dropdown';

const navItems = [
    { label: 'Chamados', href: '/tickets', icon: TicketIcon, roles: ['Admin', 'Membro'] },
    { label: 'Usuários', href: '/users', icon: UsersIcon, roles: ['Admin'] },
] as const;

interface ProtectedSidebarProps {
    session: SessionPayload;
}

export function ProtectedSidebar({ session }: ProtectedSidebarProps) {
    const pathname = usePathname();

    const filteredNav = navItems.filter((item) =>
        (item.roles as readonly string[]).includes(session.role)
    );

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="bg-transparent!">
                            <Link href="/tickets">
                                <LogoMark size={32} />
                                <span className="font-title font-semibold">Nexo</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {filteredNav.map(({ label, href, icon: Icon }) => (
                                <SidebarMenuItem key={href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={
                                            pathname === href || pathname.startsWith(href + '/')
                                        }
                                        tooltip={label}
                                        className="bg-transparent!"
                                    >
                                        <Link href={href}>
                                            <Icon />
                                            <span>{label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <AvatarDropdown nome={session.nome} usuario={session.usuario} />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
