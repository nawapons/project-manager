import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { PencilIcon } from "lucide-react"
import { OverviewProperty } from "./overview-property"
import { MemberAvatar } from "@/components/member/components/member-avatar"
import { TaskDate } from "./task-date"
import { Badge } from "@/components/ui/badge"
import { snakeCaseToTitleCase } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEditTaskModal } from "../hooks/use-edit-task"

export const TaskOverview = ({ task }) => {
    const { open } = useEditTaskModal()
    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Overview</p>
                    <Button onClick={() => open(task[0].id)} size="sm" variant="secondary">
                        <PencilIcon className="size-4 mr-2" />
                        Edit
                    </Button>
                </div>
                <SeparatorDotted className="my-4" />
                <div className="flex flex-col gap-y-4">
                    <OverviewProperty label="Assignee">
                        <MemberAvatar name={task.assignee.name} className="size-6" />
                        <p className="text-sm font-medium">{task.assignee.name}</p>
                    </OverviewProperty>
                    <OverviewProperty label="Due Date">
                        <TaskDate value={task[0].dueDate} className="text-sm font-medium" />
                    </OverviewProperty>
                    <OverviewProperty label="Status">
                        <Badge variant={task[0].status}>
                            {snakeCaseToTitleCase(task[0].status)}
                        </Badge>
                    </OverviewProperty>
                </div>
            </div>
        </div>
    )
}