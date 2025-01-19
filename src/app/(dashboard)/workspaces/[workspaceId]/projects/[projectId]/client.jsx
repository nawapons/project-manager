"use client"
import { Analytics } from "@/features/analytics";
import { PageError } from "@/features/page-error";
import { PageLoader } from "@/features/page-loader";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import {AvatarStack} from "@/components/ui/avatar-stack";

export const ProjectIdClient = () => {
    const avatars = [
        { name: "Alice Johnson" },
        { name: "Bob Smith", }, //TODO : make member avatar
        { name: "Charlie Brown", },
        { name: "Diana Prince", },
    ];
    const projectId = useProjectId();
    const { data: project, isLoading: isLoadingProject } = useGetProject({ projectId })
    const { data: analytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics({ projectId })
    const isLoading = isLoadingProject || isLoadingAnalytics;
    if (isLoading) {
        return <PageLoader />
    }
    if (!project) {
        return <PageError message="Project not found!" />
    }
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <ProjectAvatar className="size-8" image={project[0].imageUrl} name={project[0].name} />
                    <p className="text-lg font-semibold">{project[0].name}</p>
                    <AvatarStack
                        avatars={avatars}
                        orientation="vertical" // or "vertical"
                        spacing="sm" // "sm", "md", "lg", or "xl"
                        maxAvatarsAmount={3} // Number of avatars to show before "+N"
                    />
                </div>
                <div>
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={`/workspaces/${project[0].workspacesId}/projects/${project[0].id}/settings`}>
                            <PencilIcon className="size-4 mr-2" />
                            Edit Project
                        </Link>
                    </Button>
                </div>
            </div>
            {analytics ? (
                <Analytics data={analytics} />
            ) : null}
            <TaskViewSwitcher hideProjectFilter />
        </div>
    )
}