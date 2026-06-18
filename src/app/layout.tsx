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
    title: 'Sistema de Chamados',
    description: 'Sistema de gerenciamento de chamados',
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
