import { Skeleton } from "@/components/ui/skeleton"
export function AccountSkeleton() {
    return (
        <div className="flex flex-col space-y-3 animate-pulse">
            <Skeleton className="h-[248px] w-[672px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[672px]" />
                <Skeleton className="h-4 w-[672px]" />
            </div>
        </div>
    )
}