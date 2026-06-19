import { Toaster } from '@/components/ui/sonner';
import { TanstackQueryProvider } from '@/integrations/tanstack-query';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist, Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-title' });

const geist = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: {
        default: 'Nexo',
        template: '%s | Nexo',
    },
    description: 'Plataforma de atendimento e gestão de chamados internos.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pt-BR"
            className={cn('h-full', outfit.variable, geist.variable)}
            suppressHydrationWarning
        >
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TanstackQueryProvider>{children}</TanstackQueryProvider>
                    <Toaster richColors expand />
                </ThemeProvider>
            </body>
        </html>
    );
}
