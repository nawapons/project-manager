"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { PencilIcon } from "lucide-react"
import { useEditTask } from "../api/use-edit-task"
import { XIcon } from "lucide-react"

export const TaskDescription = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(task[0].description)

    const { mutate, isPending } = useEditTask();
    const handleSave = () => {
        mutate({
            json: { description: value },
            param: { taskId: task[0].id }
        })
    }
    return (
        <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                    Overview
                </p>
                <Button onClick={() => setIsEditing((prev) => !prev)} size="sm" variant="secondary">
                    {isEditing ? (
                        <XIcon className="size-4 mr-2" />
                    ) : (
                        <PencilIcon className="size-4 mr-2" />
                    )}
                    {isEditing ? "Cancel" : "Edit"}
                </Button>
            </div>
            <SeparatorDotted className="my-4" />
            {isEditing ? (
                <div className="flex flex-col gap-y-4">
                    <Textarea placeholder="Add description" value={value} row={4} onChange={((e) => setValue(e.target.value))} disabled={isPending} />
                    <Button onClick={handleSave} disabled={isPending} size="sm" className="w-fit ml-auto">{isPending ? "Saving..." : "Save Changes"}</Button>
                </div>
            ) : (
                <div>
                    {task[0].description || (
                        <span className="text-muted-foreground">
                            No description set
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}