import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone',
    reactCompiler: true,
    onDemandEntries: {
        maxInactiveAge: 60 * 60 * 1000, // 1 hora
        pagesBufferLength: 5,
    },
    experimental: {
        optimizePackageImports: ['@shadcn/ui', 'lucide-react'],
    },
};

export default nextConfig;
