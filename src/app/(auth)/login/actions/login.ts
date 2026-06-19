'use server';

import { SESSION_COOKIE } from '@/constants';
import { env } from '@/env';
import { checkRateLimit } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

interface LoginInput {
    usuario: string;
    senha: string;
}

export async function login(input: LoginInput) {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] ?? headersList.get('x-real-ip') ?? 'unknown';

    const allowed = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
    if (!allowed) {
        return { ok: false, message: 'Muitas tentativas. Tente novamente em 15 minutos.' };
    }

    const user = await prisma.usuario.findUnique({
        where: { usuario: input.usuario },
        select: { id: true, nome: true, role: true, senhaHash: true, ativo: true },
    });

    if (!user || !user.ativo) {
        return { ok: false, message: 'Credenciais inválidas' };
    }

    const senhaValida = await compare(input.senha, user.senhaHash);
    if (!senhaValida) {
        return { ok: false, message: 'Credenciais inválidas' };
    }

    const token = sign({ id: user.id, nome: user.nome, role: user.role }, env.JWT_SECRET, {
        expiresIn: '8h',
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8,
        path: '/',
    });

    return { ok: true, message: 'Login realizado com sucesso!' };
}
