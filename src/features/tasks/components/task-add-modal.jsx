"use client"
import { ResponsiveModal } from "../../dashboard/responsive-modal";
import { useCreateTaskModal } from "../hooks/use-create-task";
import { CreateTaskFormWrapper } from "./task-add-form-wrapper";

export const CreateTaskModal = () => {
    const { isOpen, setIsOpen, close } = useCreateTaskModal()

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateTaskFormWrapper onCancel={close} />
        </ResponsiveModal>
    )
}