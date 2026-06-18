import { Skeleton } from '@/components/ui/skeleton';

const ROWS = 8;
const COLS = 6;

export default function UsersSuspense() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-9 w-64" />

            <div className="rounded-md border">
                <div className="flex gap-4 border-b px-4 py-3">
                    {Array.from({ length: COLS }).map((_, i) => (
                        <Skeleton key={i} className="h-4 flex-1" />
                    ))}
                </div>

                {Array.from({ length: ROWS }).map((_, i) => (
                    <div key={i} className="flex gap-4 border-b px-4 py-3 last:border-0">
                        <Skeleton className="h-4 flex-2" />
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-4 w-8" />
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-40" />
                <div className="flex gap-1">
                    <Skeleton className="size-7 rounded-md" />
                    <Skeleton className="size-7 rounded-md" />
                </div>
            </div>
        </div>
    );
}
