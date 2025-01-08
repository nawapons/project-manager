"use client"
import { PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { SeparatorDotted } from "../ui/separator-dotted"
import { useGetTasks } from "./api/use-get-tasks"
import { useCreateTaskModal } from "./hooks/use-create-task"
import { useWorkspaceId } from "../workspaces/hooks/use-workspace-id"
import { useEffect, useState } from "react"
import { useQueryState } from "nuqs"
import { Loader } from "lucide-react"
import { DataFilters } from "./data-filters"
import { useTaskFilters } from "./hooks/use-task-filters"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"

export const TaskViewSwitcher = () => {
    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    })
    const [{
        status, assigneeId, projectId, dueDate,
    }] = useTaskFilters();
    const workspaceId = useWorkspaceId()
    const { open, } = useCreateTaskModal();
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId, projectId, status, assigneeId, dueDate })

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
                <DataFilters />
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
                            {JSON.stringify(tasks)}
                        </TabsContent>
                        <TabsContent value="calendar" className="mt-0">
                            {JSON.stringify(tasks)}
                        </TabsContent>
                    </>
                )}

            </div>
        </Tabs>

    )
}