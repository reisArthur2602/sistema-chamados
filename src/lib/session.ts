import { env } from '@/env';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface SessionPayload {
    id: string;
    nome: string;
    role: 'Admin' | 'Membro';
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) return null;

    try {
        return verify(token, env.JWT_SECRET) as SessionPayload;
    } catch {
        return null;
    }
}
