"use client"
import { ResponsiveModal } from "../dashboard/responsive-modal"
import { useCreateWorkspaceModal } from "./hooks/use-create-workspace"
import { CreateWorkspaceForm } from "./workspace-add-form"
export const WorkspaceAddModal = () => {
    const { isOpen, setIsOpen, close } = useCreateWorkspaceModal()
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close} />
        </ResponsiveModal>
    )
}