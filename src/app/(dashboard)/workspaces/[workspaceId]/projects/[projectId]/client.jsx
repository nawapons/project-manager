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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import { useGetProjectMembers } from "@/features/projects/api/use-get-project-member";
import { useGetCurrent } from "@/features/auth/api/use-get-current";
export const ProjectIdClient = () => {
    const workspaceId = useWorkspaceId();
    const projectId = useProjectId();
    const { data: user, isLoading: isLoadingUser } = useGetCurrent();
    const { data: members, isLoading: isLoadingMembers } = useGetProjectMembers({ projectId })
    const { data: project, isLoading: isLoadingProject } = useGetProject({ projectId })
    const { data: analytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics({ projectId })
    const isLoading = isLoadingProject || isLoadingAnalytics || isLoadingMembers || isLoadingUser;
    if (isLoading) {
        return <PageLoader />
    }
    if (!project) {
        s
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
                        {shownAvatars.map((member, index) =>
                        (
                            <TooltipProvider key={index + 1}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Avatar
                                            className={cn("text-sm bg-neutral-200 font-medium text-neutral-500 h-7 w-7 shrink-0 overflow-hidden mr-1.5 rounded-full flex flex-row -space-x-5 -space-y-5 hover:z-10", "hover:z-10")}
                                        >
                                            <AvatarImage src={member.profiles.imageUrl} alt="logo-profile" />
                                            <AvatarFallback>
                                                {member.profiles.fullname.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        {/* <MemberAvatar
                                            className={cn("text-sm h-7 w-7 shrink-0 overflow-hidden mr-1.5 rounded-full flex flex-row -space-x-5 -space-y-5 hover:z-10")}
                                            name={member.profiles.fullname} /> */}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{member.profiles.fullname}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                        {hiddenAvatars.length ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Avatar className="h-7 w-7 text-sm bg-neutral-200 font-medium text-neutral-500" key="Excesive avatars">
                                            <AvatarFallback>
                                                +{members.length - shownAvatars.length}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {hiddenAvatars.map((name, index) => (
                                            <p key={index}>{name.profiles.fullname}</p>
                                        ))}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        ) : null}
                    </div>
                </div>
                <div>
                    {members.find((member) => member.userId === user.userId)?.role === "ADMIN" && (
                        <Button className="" variant="secondary" size="sm" asChild>
                            <Link href={`/workspaces/${project[0].workspacesId}/projects/${project[0].id}/settings`}>
                                <PencilIcon className="size-4 mr-2" />
                                Edit Project
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
            {analytics ? (
                <Analytics data={analytics} />
            ) : null}
            <TaskViewSwitcher hideProjectFilter memberData={members} />
        </div>
    )
}