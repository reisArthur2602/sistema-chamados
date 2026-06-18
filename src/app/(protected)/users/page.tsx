import { Suspense } from 'react';
import { CreateUserDialog } from './components/create-user-dialog';
import { UsersData } from './components/users-data';
import UsersSuspense from './components/users-suspense';

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <h1 className="font-title text-2xl font-semibold tracking-tight">Usuários</h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie os usuários e permissões do sistema.
                    </p>
                </div>
                <CreateUserDialog />
            </div>

            <Suspense fallback={<UsersSuspense />}>
                <UsersData />
            </Suspense>
        </div>
    );
}
