import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { endpoint, keys, usuarioId } = body as {
            endpoint: string;
            keys: { p256dh: string; auth: string };
            usuarioId: string;
        };

        if (!endpoint || !keys?.p256dh || !keys?.auth || !usuarioId) {
            return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
        }

        await prisma.pushSubscription.upsert({
            where: { endpoint },
            update: { p256dh: keys.p256dh, auth: keys.auth, usuarioId },
            create: {
                id: randomUUID(),
                endpoint,
                p256dh: keys.p256dh,
                auth: keys.auth,
                usuarioId,
            },
        });

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { endpoint } = await req.json();

        await prisma.pushSubscription.deleteMany({ where: { endpoint } });

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
