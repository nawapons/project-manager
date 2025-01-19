"use client"
import { ResponsiveModal } from "../../dashboard/components/responsive-modal"
import { useCreateProjectModal } from "../hooks/use-create-project"
import { CreateProjectForm } from "./project-add-form"
export const ProjectAddModal = () => {
    const { isOpen, setIsOpen, close } = useCreateProjectModal()
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateProjectForm onCancel={close} />
        </ResponsiveModal>
    )
}