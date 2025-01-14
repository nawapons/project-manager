"use client"
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetProject } from "@/components/projects/api/use-get-project";
import { ProjectAvatar } from "@/components/projects/components/project-avatar";
import { useProjectId } from "@/components/projects/hooks/use-project-id";
import { TaskViewSwitcher } from "@/components/tasks/task-view-switcher";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const ProjectIdClient = () => {
    const projectId = useProjectId();
    console.log(projectId)
    const { data,isLoading } = useGetProject({ projectId })

    if(isLoading){
        return <PageLoader/>
    }
    if(!data) {
        return <PageError message="Project not found!"/>
    }
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <ProjectAvatar className="size-8" image={data[0].imageUrl} name={data[0].name} />
                    <p className="text-lg font-semibold">{data[0].name}</p>
                </div>
                <div>
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={`/workspaces/${data[0].workspacesId}/projects/${data[0].id}/settings`}>
                            <PencilIcon className="size-4 mr-2" />
                            Edit Project
                        </Link>
                    </Button>
                </div>
            </div>
            <TaskViewSwitcher hideProjectFilter />
        </div>
    )
}