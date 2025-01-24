"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useConfirm } from "@/hooks/use-confirm"
import { TrashIcon } from "lucide-react"
import { useDeleteComment } from "../api/use-delete-comment"

export const CommentActions = ({ id, children }) => {
    const { mutate: deleteComment, isPending: delettingComment } = useDeleteComment();
    const [ConfirmDialog, confirmDelete] = useConfirm(
        "Delete comment",
        "This action cannot be undone.",
        "destructive"
    )

    const handleDelete = async () => {
        const ok = await confirmDelete();
        if (!ok) return;

        deleteComment({
            param: { commentId: id }
        })
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
                        onClick={handleDelete}
                        disabled={delettingComment}
                        className="text-amber-700 focus:text-amber-700 font-medium p-[10px]">
                        <TrashIcon className="size-4 mr-2 stroke-2" />
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}