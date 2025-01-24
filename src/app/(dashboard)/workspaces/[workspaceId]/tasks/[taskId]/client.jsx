"use client"

import { PageLoader } from "@/features/page-loader"
import { PageError } from "@/features/page-error"
import { useGetTask } from "@/features/tasks/api/use-get-task"
import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumbs"
import { TaskDescription } from "@/features/tasks/components/task-description"
import { TaskOverview } from "@/features/tasks/components/task-overview"
import { useTaskId } from "@/features/tasks/hooks/use-task-id"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { TaskComment } from "@/features/tasks/components/task-comment"
import { useGetCurrent } from "@/features/auth/api/use-get-current"


export const TaskIdClient = () => {
    const taskId = useTaskId()
    const { data: user, isLoading: isLoadingUser } = useGetCurrent();
    const { data, isLoading } = useGetTask({ taskId })
    if (isLoading || isLoadingUser) {
        return <PageLoader />
    }
    if (!data || !user) {
        return <PageError message="Task not found" />
    }
    return (
        <p className="flex flex-col">
            <TaskBreadcrumbs project={data.project[0]} task={data[0]} />
            <SeparatorDotted className="my-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TaskOverview task={data} />
                <TaskDescription task={data} />
                <TaskComment user={user} taskId={data[0].id} />
            </div>
        </p>
    )
}