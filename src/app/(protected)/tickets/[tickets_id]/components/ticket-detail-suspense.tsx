import { Skeleton } from '@/components/ui/skeleton';

export default function TicketDetailSuspense() {
    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
                <Skeleton className="mb-3 h-4 w-24" />
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-96" />
                        <Skeleton className="h-5 w-28 rounded-full" />
                    </div>
                    <Skeleton className="h-8 w-20 rounded-md" />
                </div>
            </div>

            {/* Body */}
            <div className="flex gap-6">
                {/* Left column */}
                <div className="flex flex-1 flex-col gap-6">
                    {/* Description card */}
                    <div className="space-y-3 rounded-lg border p-6">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>

                    {/* Comments card */}
                    <div className="space-y-5 rounded-lg border p-6">
                        <Skeleton className="h-5 w-36" />
                        {[1, 2].map((i) => (
                            <div key={i} className="flex gap-3">
                                <Skeleton className="size-8 shrink-0 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-48" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </div>
                        ))}
                        <Skeleton className="h-px w-full" />
                        <Skeleton className="h-20 w-full rounded-md" />
                        <div className="flex justify-end">
                            <Skeleton className="h-8 w-24 rounded-md" />
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="w-64 flex-none">
                    <div className="space-y-4 rounded-lg border p-6">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-px w-full" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-px w-full" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>
        </div>
    );
}
