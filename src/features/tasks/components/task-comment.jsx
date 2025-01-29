"use client"
import { format } from "date-fns"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SendHorizonal } from "lucide-react"
import { MemberAvatar } from "@/features/member/components/member-avatar"
import { useCreateTaskComment } from "../api/use-create-task-comment"
import { useGetTaskComment } from "../api/use-get-task-comment"
import { Loader } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { CommentActions } from "./comment-actions"
import { useGetCurrent } from "@/features/auth/api/use-get-current"
export const TaskComment = ({ user, taskId }) => {
    const { data: userData } = useGetCurrent();
    const { mutate, isPending } = useCreateTaskComment()
    const { data: comments, isLoading: isLoadingComments } = useGetTaskComment({ taskId: taskId });
    const [value, setValue] = useState()
    const onSubmit = async () => {
        mutate({
            message: value, taskId: taskId,
        }, {
            onSuccess: () => {
                setValue("")
            }
        })
    }
    return (
        <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                    Comment
                </p>
            </div>
            <SeparatorDotted className="my-4" />
            {isLoadingComments ? (
                <div className="flex items-center justify-center max-h-full mb-4">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </div>
            ) : (
                comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="flex items-start gap-3 mb-3">
                            <MemberAvatar className="size-8" fallbackClassName="text-xs" imageUrl={comment.member.imageUrl} name={comment.member.fullname} />
                            <div className="grid gap-1.5 flex-1">
                                <div className="flex items-start justify-between gap-x-2">
                                    <div className="flex items-center justify-start gap-x-2">
                                        <p className="text-md">{comment.member.fullname}</p>
                                        <p className="text-xs text-gray-500 ">{format(comment.created_at, "PPP")}</p>
                                    </div>
                                    {comment.member.id === userData.userId ? (
                                        <CommentActions id={comment.id}>
                                            <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
                                        </CommentActions>
                                    ) : null
                                    }
                                </div>
                                <p className="text-sm text-pretty text-gray-900">{comment.message}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 p-5 text-center">No comments yet.</p>
                )
            )
            }
            <div className="flex w-full max-w-full items-center space-x-3">
                <MemberAvatar className="size-8" fallbackClassName="text-xs" imageUrl={user.imageUrl} name={user.fullname} />
                <Input value={value} onChange={((e) => setValue(e.target.value))} type="text" name="comment" placeholder="Write comment" />
                <Button onClick={onSubmit} disabled={isPending} variant="primary"><SendHorizonal className="size-16" /></Button>
            </div>
        </div >
    )
}