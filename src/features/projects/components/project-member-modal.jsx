"use client"
import { ResponsiveModal } from "../../dashboard/responsive-modal";
import { useAddProjectMemberModal } from "../hooks/use-project-member-modal";
import { AddProjectMemberFromWrapper } from "./project-member-add-form-wrapper";

export const AddProjectMemberModal = () => {
    const { isOpen, setIsOpen, close } = useAddProjectMemberModal()

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <AddProjectMemberFromWrapper onCancel={close} />
        </ResponsiveModal>
    )
}