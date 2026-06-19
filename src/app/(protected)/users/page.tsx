import { requirePermission } from '@/utils/require-permission';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { UpsertUserDialog } from './components/upsert-user-dialog';
import { UsersData } from './components/users-data';
import UsersSuspense from './components/users-suspense';

export const metadata: Metadata = {
    title: 'Usuários',
    description: 'Gerencie os usuários e permissões do sistema.',
};

export default async function UsersPage() {
    await requirePermission(['Admin']);
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="font-title text-2xl font-semibold tracking-tight">Usuários</h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie os usuários e permissões do sistema.
                    </p>
                </div>
                <UpsertUserDialog />
            </div>

            <Suspense fallback={<UsersSuspense />}>
                <UsersData />
            </Suspense>
        </div>
    );
}
