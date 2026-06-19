import 'dotenv/config';

import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

const usuarios = [
    { usuario: 'admin', nome: 'Admin', role: 'Admin' as const },
    { usuario: 'galeao', nome: 'Galeão', role: 'Membro' as const },
    { usuario: 'roma', nome: 'Roma', role: 'Membro' as const },
    { usuario: 'financeiro', nome: 'Financeiro', role: 'Membro' as const },
    { usuario: 'escritorio', nome: 'Escritório', role: 'Membro' as const },
    { usuario: 'master', nome: 'Master', role: 'Membro' as const },
];

async function main() {
    for (const u of usuarios) {
        const senhaHash = await hash(u.usuario, 10);

        await prisma.usuario.upsert({
            where: { usuario: u.usuario },
            update: {},
            create: {
                nome: u.nome,
                usuario: u.usuario,
                senhaHash,
                role: u.role,
            },
        });

        console.log(`✓ ${u.usuario} (${u.role})`);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
