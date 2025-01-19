"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useConfirm } from "@/hooks/use-confirm"
import axios from "axios"
import { CircleAlert } from "lucide-react"
import { PencilIcon } from "lucide-react"
import { TrashIcon } from "lucide-react"
import { ExternalLinkIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { useDeleteTask } from "../api/use-delete-task"
import { useEditTaskModal } from "../hooks/use-edit-task"

export const TaskActions = ({ id, projectId, children }) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { open } = useEditTaskModal()
    const { mutate: deleteTask, isPending: delettingTask } = useDeleteTask();
    const [ConfirmDialog, confirmDelete] = useConfirm(
        "Delete task",
        "This action cannot be undone.",
        "destructive"
    )

    const handleDelete = async () => {
        const ok = await confirmDelete();
        if (!ok) return;

        deleteTask({
            param: { taskId: id }
        })
    }

    const onOpenTask = () => {
        router.push(`/workspaces/${workspaceId}/tasks/${id}`)
    }
    const onOpenProject = () => {
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
    }
    return (
        <div className="flex justify-end">
            <ConfirmDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                        onClick={onOpenTask}
                        disabled={false}
                        className="font-medium p-[10px]">
                        <CircleAlert className="size-4 mr-2 stroke-2" />
                        Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onOpenProject}
                        disabled={false}
                        className="font-medium p-[10px]">
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => open(id)}
                        disabled={false}
                        className="font-medium p-[10px]">
                        <PencilIcon className="size-4 mr-2 stroke-2" />
                        Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        disabled={delettingTask}
                        className="text-amber-700 focus:text-amber-700 font-medium p-[10px]">
                        <TrashIcon className="size-4 mr-2 stroke-2" />
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}