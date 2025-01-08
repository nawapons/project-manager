"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWorkspaceId } from "@/components/workspaces/hooks/use-workspace-id"
import { useConfirm } from "@/hooks/use-confirm"
import axios from "axios"
import { CircleAlert } from "lucide-react"
import { PencilIcon } from "lucide-react"
import { TrashIcon } from "lucide-react"
import { ExternalLinkIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const TaskActions = ({ id, projectId, children }) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [ConfirmDialog,confirmDelete] = useConfirm(
        "Delete task",
        "This action cannot be undone.",
        "destructive"
    )
    const [isPending,setIsPending] = useState(false)

    const handleDelete = async () => {
        setIsPending(true)
        const ok = await confirmDelete()
        if (!ok) return;
        const response = await axios.delete("/api/task/", {
            params: {
                taskId: id
            }
        })
        if (response.data.success) {
            toast.success("Task deleted successfully")
            router.refresh()
        } else {
            toast.error(response.data.message)
        }
        setIsPending(false)
    }

    const onOpenTask = () => {
        router.push(`/workspaces/${workspaceId}/tasks/${id}`)
    }
    const onOpenProject = () => {
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
    }
    return (
        <div className="flex justify-end">
            <ConfirmDialog/>
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
                        onClick={() => { }}
                        disabled={false}
                        className="font-medium p-[10px]">
                        <PencilIcon className="size-4 mr-2 stroke-2" />
                        Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        disabled={isPending}
                        className="text-amber-700 focus:text-amber-700 font-medium p-[10px]">
                        <TrashIcon className="size-4 mr-2 stroke-2" />
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}