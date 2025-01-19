"use client"

import { PageError } from "@/features/page-error"
import { PageLoader } from "@/features/page-loader"
import { useGetProject } from "@/features/projects/api/use-get-project"
import { useProjectId } from "@/features/projects/hooks/use-project-id"
import { EditProjectForm } from "@/features/projects/components/project-edit-form"

export const ProjectIdSettingsClient = () => {
    const projectId =useProjectId();
    const {data: initialValues,isLoading} = useGetProject({projectId});
    if(isLoading) return <PageLoader/>
    if(!initialValues) return <PageError message="Project not found"/>
    return (
        <div className="w-full lg:max-w-xl">
            <EditProjectForm initialValues={initialValues}/>
        </div>
    )
}