import type { Metadata } from 'next';
import { LoginForm } from './components/login-form';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Acesse seus chamados.',
};

export default function LoginPage() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
            <div className="bg-dot-grid absolute inset-0 opacity-50" />
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{
                    background:
                        'radial-gradient(circle, color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)',
                }}
            />
            <div className="relative z-10 w-full max-w-sm">
                <LoginForm />
            </div>
        </main>
    );
}
