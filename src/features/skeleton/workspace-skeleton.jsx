import { Skeleton } from "@/components/ui/skeleton"

export const WorkspaceSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3 animate-pulse">
            <Skeleton className="h-[36px] w-[232px] rounded-xl" />
        </div>
    )
}