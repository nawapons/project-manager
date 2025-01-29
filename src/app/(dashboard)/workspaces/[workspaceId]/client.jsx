"use client"
import { Analytics } from "@/features/analytics"
import { useGetMembers } from "@/features/member/api/use-get-members"
import { MemberAvatar } from "@/features/member/components/member-avatar"
import { PageError } from "@/features/page-error"
import { PageLoader } from "@/features/page-loader"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { ProjectAvatar } from "@/features/projects/components/project-avatar"
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project"
import { useGetTasks } from "@/features/tasks/api/use-get-tasks"
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { formatDistanceToNow } from "date-fns"
import { SettingsIcon } from "lucide-react"
import { CalendarIcon } from "lucide-react"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { TaskStatus } from "@/schema/taskSchema"
import { CircleDashedIcon } from "lucide-react"
import { CircleIcon } from "lucide-react"
import { CircleDotDashedIcon } from "lucide-react"
import { CircleDotIcon } from "lucide-react"
import { CircleCheckIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn, snakeCaseToTitleCase } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetProjectMembers } from "@/features/projects/api/use-get-project-member"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const WorkspaceIdClient = () => {
    const workspaceId = useWorkspaceId()

    const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics({ workspaceId })
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId })
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
    const isLoading = isLoadingAnalytics || isLoadingTasks || isLoadingProjects || isLoadingMembers
    if (isLoading) {
        return <PageLoader />
    }
    if (!analytics || !tasks || !projects || !members) {
        return <PageError message="Failed to load workspace data" />
    }

    return (
        <div className="h-full flex flex-col space-y-4">
            <Analytics data={analytics} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <TaskList data={tasks} total={tasks.length} />
                <ProjectList data={projects} total={projects.length} />
                <MemberList data={members} total={members.length} />
            </div>
        </div>
    )
}
const statusIconMap = {
    [TaskStatus.BACKLOG]: (
        <CircleDashedIcon className="size-[18px] text-pink-400" />
    ),
    [TaskStatus.TODO]: (
        <CircleIcon className="size-[18px] text-red-400" />
    ),
    [TaskStatus.IN_PROGRESS]: (
        <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
    ),
    [TaskStatus.IN_REVIEW]: (
        <CircleDotIcon className="size-[18px] text-blue-400" />
    ),
    [TaskStatus.DONE]: (
        <CircleCheckIcon className="size-[18px] text-emerald-400" />
    ),
}
export const TaskList = ({ data, total }) => {
    const workspaceId = useWorkspaceId()
    const { open: createTask } = useCreateTaskModal()
    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-card rounded-lg p-4  border text-card-foreground shadow ">
                <div className="flex items-center justify-between space-y-1.5 pb-4">
                    <p className="text-lg font-semibold">
                        Tasks ({total})
                    </p>
                    <Button variant="muted" size="icon" onClick={createTask}>
                        <PlusIcon className="size-4 text-neutral-400" />
                    </Button>
                </div>
                {/* <SeparatorDotted className="my-4" /> */}
                <ul className="flex flex-col gap-y-2">
                    {data.slice(0, 5).map((task) =>
                    (
                        <li key={task.id}>
                            <Link href={`/workspaces/${workspaceId}/tasks/${task.id}`}>
                                <Card className="shadow-none rounded-lg hover:opacity-75 transition h-fit">
                                    <CardContent className="pt-3 pl-4 pb-3">
                                        <div className="grid gap-2 grid-cols-3">
                                            {/* Left Content */}
                                            <div className="col-span-2">
                                                <p className="text-md font-medium truncate">{task.name}</p>
                                                <div className="flex items-center gap-x-2">
                                                    <ProjectAvatar className="size-5" image={task.project?.imageUrl} name={task.project?.name} />
                                                    <p className="text-sm">{task.project?.name}</p>
                                                    <div className="size-1 rounded-full bg-emerald-300" />
                                                    <div className="text-sm text-muted-foreground flex items-center">
                                                        <CalendarIcon className="size-3 mr-1" />
                                                        <span className="truncate">{formatDistanceToNow(new Date(task.dueDate))}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Content (Status Icon) */}
                                            <div className="flex justify-end items-center">
                                                <Badge variant={task.status}>{snakeCaseToTitleCase(task.status)}</Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No tasks found
                    </li>
                </ul>
                <Button variant="muted" className="mt-4 w-full" asChild>
                    <Link href={`/workspaces/${workspaceId}/tasks`}>
                        Show All
                    </Link>
                </Button>
            </div>
        </div>
    )
}
export const ProjectList = ({ data, total }) => {
    const workspaceId = useWorkspaceId()
    const { open: createProject } = useCreateProjectModal()
    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-card border rounded-lg p-4 text-card-foreground shadow">
                <div className="flex items-center justify-between pb-5">
                    <p className="text-lg font-semibold">
                        Project ({total})
                    </p>
                    <Button variant="secondary" size="icon" onClick={createProject}>
                        <PlusIcon className="size-4 text-neutral-400" />
                    </Button>
                </div>
                <ScrollArea className={data.length > 5 ? "h-[440px]" : data.length === 0 ? "h-[78px]" : "h-auto"}>
                    <ul className="grid grid-cols-1 lg:grid-cols-1 gap-y-2">
                        {
                            data.map((project) => {
                                const maxAvatarsAmount = 3
                                const shownAvatars = project.projects_members.slice(0, maxAvatarsAmount);
                                const hiddenAvatars = project.projects_members.slice(maxAvatarsAmount);
                                return (
                                    <li key={project.id}>
                                        <Link href={`/workspaces/${workspaceId}/projects/${project.id}`}>
                                            <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                                <CardContent className="p-3 gap-x-2.5">
                                                    <div className="grid gap-2 grid-cols-3">
                                                        <div className="col-span-2">

                                                            <div className="flex items-center gap-x-2">
                                                                <ProjectAvatar
                                                                    className="size-12"
                                                                    fallbackClassname="text-lg"
                                                                    name={project.name}
                                                                    image={project.imageUrl} />
                                                                <p className="text-lg font-medium truncate">
                                                                    {project.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end items-center">
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
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </li>
                                )
                            })}
                        <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                            No projects found
                        </li>
                    </ul>
                </ScrollArea>
            </div>
        </div>
    )
}
export const MemberList = ({ data, total }) => {
    const workspaceId = useWorkspaceId()
    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-card border rounded-lg p-4 text-card-foreground shadow">
                <div className="flex items-center justify-between pb-5 space-y-1.5">
                    <p className="text-lg font-semibold">
                        Members ({total})
                    </p>
                    <Button asChild variant="secondary" size="icon">
                        <Link href={`/workspaces/${workspaceId}/members`}>
                            <SettingsIcon className="size-4 text-neutral-400" />
                        </Link>
                    </Button>
                </div>
                <div className="p-2">
                    <div className="space-y-8">
                        {data.map((member) => (
                            <div className="flex items-center" key={member.id}>
                                <MemberAvatar
                                    className="size-9"
                                    imageUrl={member.profiles.imageUrl}
                                    name={member.profiles.fullname} />
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{member.profiles.fullname}</p>
                                    <p className="text-sm text-muted-foreground">{member.profiles.email}</p>
                                </div>
                                <Badge className={`ml-auto ${member.role === "ADMIN" ? "bg-amber-500 hover:bg-amber-400" : "bg-blue-600 hover:bg-blue-500"}`}>{member.role}</Badge>
                            </div>

                        ))}
                    </div>
                </div>
                {/* <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((member) => (
                        <li key={member.id}>
                            <Card className="shadow-none rounded-lg overflow-hidden">
                                <CardContent className="p-4 flex flex-col items-center gap-x-2">
                                    <MemberAvatar
                                        className="size-12"
                                        imageUrl={member.profiles.imageUrl}
                                        name={member.profiles.fullname} />
                                    <div className="flex flex-col items-center overflow-hidden">
                                        <p className="text-lg font-medium line-clamp-1">
                                            {member.profiles.fullname}
                                        </p>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {member.profiles.email}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No member found
                    </li>
                </ul> */}
            </div>
        </div>
    )
}