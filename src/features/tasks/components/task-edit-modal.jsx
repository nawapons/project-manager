"use client"
import { ResponsiveModal } from "../../dashboard/responsive-modal";
import { useEditTaskModal } from "../hooks/use-edit-task";
import { EditTaskFormWrapper } from "./task-edit-form-wrapper";

export const EditTaskModal = () => {
    const { taskId, close } = useEditTaskModal()
    return (
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {
                taskId && (
                    <EditTaskFormWrapper id={taskId} onCancel={close} />
                )
            }
        </ResponsiveModal>
    )
}