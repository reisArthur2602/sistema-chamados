const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, max: number, windowMs: number): boolean {
    const now = Date.now();

    if (store.size > 1000) {
        for (const [k, v] of store) {
            if (now >= v.resetAt) store.delete(k);
        }
    }

    const entry = store.get(key);

    if (!entry || now >= entry.resetAt) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return true;
    }

    if (entry.count >= max) return false;

    entry.count++;
    return true;
}
