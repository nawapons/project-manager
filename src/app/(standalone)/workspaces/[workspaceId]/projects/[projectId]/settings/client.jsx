"use client"

import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"
import { useGetProject } from "@/components/projects/api/use-get-project"
import { useProjectId } from "@/components/projects/hooks/use-project-id"
import { EditProjectForm } from "@/components/projects/project-edit-form"

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