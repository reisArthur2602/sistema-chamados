'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { getInitials } from '@/utils/get-initials';
import { logout } from '@/utils/logout';
import { ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';

interface AvatarDropdownProps {
    nome: string;
    usuario: string;
}

export function AvatarDropdown({ nome, usuario }: AvatarDropdownProps) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="size-7 shrink-0 rounded-md">
                                <AvatarImage alt={nome} />
                                <AvatarFallback className="rounded-md text-xs">
                                    {getInitials(nome)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                <span className="truncate text-sm font-medium leading-none">
                                    {nome}
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    @{usuario}
                                </span>
                            </div>
                            <ChevronsUpDownIcon className="ml-auto size-4 shrink-0" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top" align="start" className="w-56">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col gap-1">
                                <p className="font-medium">{nome}</p>
                                <p className="text-xs text-muted-foreground">@{usuario}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={() => logout()}>
                            <LogOutIcon />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
