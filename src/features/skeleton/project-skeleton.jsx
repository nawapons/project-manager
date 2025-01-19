import { Skeleton } from "@/components/ui/skeleton"
export function ProjectSkeleton() {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[44px] w-[232px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[232px]" />
          <Skeleton className="h-4 w-[232px]" />
        </div>
      </div>
    )
  }