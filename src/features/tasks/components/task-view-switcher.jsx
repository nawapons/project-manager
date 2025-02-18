"use client"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { useGetTasks } from "../api/use-get-tasks"
import { useCreateTaskModal } from "../hooks/use-create-task"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useCallback } from "react"
import { useQueryState } from "nuqs"
import { Loader } from "lucide-react"
import { DataFilters } from "./data-filters"
import { useTaskFilters } from "../hooks/use-task-filters"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { DataKanban } from "./data-kanban"
import { useBulkEditTasks } from "../api/use-bulk-edit-tasks"
import { DataCalendar } from "./data-calendar"
import { useProjectId } from "../../projects/hooks/use-project-id"
import { useGetCurrent } from "@/features/auth/api/use-get-current"
import { PageLoader } from "@/features/page-loader"

export const TaskViewSwitcher = ({ hideProjectFilter, memberData }) => {
    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    })
    const workspaceId = useWorkspaceId()
    const paramsProjectId = useProjectId();
    const [{
        status, assigneeId, projectId, dueDate,
    }] = useTaskFilters();
    const { open, } = useCreateTaskModal();
    const { mutate: bulkUpdate } = useBulkEditTasks()
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId, projectId: paramsProjectId || projectId, status, assigneeId, dueDate })
    const onKanbanChange = useCallback((tasks) => {
        bulkUpdate({
            json: { tasks }
        })
    }, [bulkUpdate])
    return (
        <Tabs
            defaultValue={view}
            onValueChange={setView}
            className="flex-1 w-full border rounded-lg"
        >
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                            Table
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        variant="primary"
                        size="sm" className="w-full lg:w-auto">
                        <PlusIcon />
                        New
                    </Button>
                </div>
                <SeparatorDotted className="my-4" />
                <DataFilters hideProjectFilter={hideProjectFilter} memberData={memberData} />
                <SeparatorDotted className="my-4" />
                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-5 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <TabsContent value="table" className="mt-0">
                            <DataTable columns={columns} data={tasks?.length ? tasks : []} />
                        </TabsContent>
                        <TabsContent value="kanban" className="mt-0">
                            <DataKanban onChange={onKanbanChange} data={tasks?.length ? tasks : []} />
                        </TabsContent>
                        <TabsContent value="calendar" className="mt-0 h-full pb-4">
                            <DataCalendar data={tasks?.length ? tasks : []} />
                        </TabsContent>
                    </>
                )}

            </div>
        </Tabs>

    )
}