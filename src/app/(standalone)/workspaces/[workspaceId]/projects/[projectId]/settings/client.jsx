"use client"

import { PageError } from "@/features/page-error"
import { PageLoader } from "@/features/page-loader"
import { useGetProject } from "@/features/projects/api/use-get-project"
import { useProjectId } from "@/features/projects/hooks/use-project-id"
import { EditProjectForm } from "@/features/projects/components/project-edit-form"
import { useGetCurrent } from "@/features/auth/api/use-get-current"
import { useGetProjectMembers } from "@/features/projects/api/use-get-project-member"

export const ProjectIdSettingsClient = () => {
    const projectId = useProjectId();
    const { data: userData, isLoading: isLoadingUserData } = useGetCurrent();
    const { data: initialValues, isLoading } = useGetProject({ projectId });
    const { data: memberData, isLoading: isLoadingMemberData } = useGetProjectMembers({ projectId });
    if (isLoading || isLoadingUserData || isLoadingMemberData) return <PageLoader />
    if (!initialValues || !userData || !memberData) return <PageError message="Project not found" />
    const checkRole = memberData.find((member) => member.userId === userData.id)?.role
    if(checkRole !== "ADMIN") return <PageError message="You are not allowed to access this page"/>
    return (
        <div className="w-full lg:max-w-xl">
            <EditProjectForm initialValues={initialValues} />
        </div>
    )
}