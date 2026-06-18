import type { Metadata } from 'next';
import { LoginForm } from './components/login-form';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Acesse o sistema com suas credenciais.',
};

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <LoginForm />
        </main>
    );
}
