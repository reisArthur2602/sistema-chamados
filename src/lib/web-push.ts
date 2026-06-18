import { env } from '../../env';
import webpush from 'web-push';
import { prisma } from './prisma';

webpush.setVapidDetails(
    env.VAPID_SUBJECT,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    env.VAPID_PRIVATE_KEY,
);

export interface PushPayload {
    title: string;
    body: string;
    url?: string;
}

export async function sendPushToUser(usuarioId: string, payload: PushPayload) {
    const subscriptions = await prisma.pushSubscription.findMany({
        where: { usuarioId },
    });

    await Promise.allSettled(
        subscriptions.map((sub) =>
            webpush
                .sendNotification(
                    { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
                    JSON.stringify(payload),
                )
                .catch(async (err: { statusCode?: number }) => {
                    if (err.statusCode === 410) {
                        await prisma.pushSubscription.delete({ where: { id: sub.id } });
                    }
                }),
        ),
    );
}
