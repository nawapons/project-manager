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
import { useGetMembers } from "@/features/member/api/use-get-members";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { MemberAvatar } from "@/features/member/components/member-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
export const ProjectIdClient = () => {
    const workspaceId = useWorkspaceId();
    const projectId = useProjectId();
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })
    const { data: project, isLoading: isLoadingProject } = useGetProject({ projectId })
    const { data: analytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics({ projectId })
    const isLoading = isLoadingProject || isLoadingAnalytics || isLoadingMembers;
    if (isLoading) {
        return <PageLoader />
    }
    if (!project) {
        return <PageError message="Project not found!" />
    }
    const maxAvatarsAmount = 3
    const shownAvatars = members.slice(0, maxAvatarsAmount);
    const hiddenAvatars = members.slice(maxAvatarsAmount);
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <ProjectAvatar className="size-8" image={project[0].imageUrl} name={project[0].name} />
                    <p className="text-lg font-semibold">{project[0].name}</p>
                    <div className="flex flex-row -space-x-5 -space-y-0">
                        {shownAvatars.map((member) =>
                        (
                            <MemberAvatar
                                className="relative text-sm h-7 w-7 shrink-0 overflow-hidden mr-1.5 rounded-full flex flex-row -space-x-5 -space-y-5 hover:z-10"
                                name={member.profiles.fullname} />
                        ))}
                        {hiddenAvatars.length ? (
                            <Avatar className="" key="Excesive avatars">
                                <AvatarFallback>
                                    +{members.length - shownAvatars.length}
                                </AvatarFallback>
                            </Avatar>
                        ) : null}
                    </div>

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