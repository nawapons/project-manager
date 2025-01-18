"use client"
import { Analytics } from "@/components/analytics"
import { useGetMembers } from "@/components/member/api/use-get-members"
import { MemberAvatar } from "@/components/member/components/member-avatar"
import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"
import { useGetProjects } from "@/components/projects/api/use-get-projects"
import { ProjectAvatar } from "@/components/projects/components/project-avatar"
import { useCreateProjectModal } from "@/components/projects/hooks/use-create-project"
import { useGetTasks } from "@/components/tasks/api/use-get-tasks"
import { useCreateTaskModal } from "@/components/tasks/hooks/use-create-task"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { useGetWorkspaceAnalytics } from "@/components/workspaces/api/use-get-workspace-analytics"
import { useWorkspaceId } from "@/components/workspaces/hooks/use-workspace-id"
import { formatDistanceToNow } from "date-fns"
import { SettingsIcon } from "lucide-react"
import { CalendarIcon } from "lucide-react"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export const WorkspaceIdClient = () => {
    const workspaceId = useWorkspaceId()

    const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics({ workspaceId })
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId })
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })
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
                <MemberList data={members} total={members.length}/>
            </div>
        </div>
    )
}
export const TaskList = ({ data, total }) => {
    const workspaceId = useWorkspaceId()
    const { open: createTask } = useCreateTaskModal()
    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        Tasks ({total})
                    </p>
                    <Button variant="muted" size="icon" onClick={createTask}>
                        <PlusIcon className="size-4 text-neutral-400" />
                    </Button>
                </div>
                <SeparatorDotted className="my-4" />
                <ul className="flex flex-col gap-y-4">
                    {data.map((task) => (
                        <li key={task.id}>
                            <Link href={`/workspaces/${workspaceId}/tasks/${task.id}`}>
                                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                    <CardContent className="p-4">
                                        <p className="text-lg font-medium truncate">{task.name}</p>
                                        <div className="flex items-center gap-x-2">
                                            <p>{task.project?.name}</p>
                                            <div className="size-1 rounded-full bg-neutral-300" />
                                            <div className="text-sm text-muted-foreground flex items-center">
                                                <CalendarIcon className="size-3 mr-1" />
                                                <span className="truncate">{formatDistanceToNow(new Date(task.dueDate))}</span>
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
            <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        Project ({total})
                    </p>
                    <Button variant="secondary" size="icon" onClick={createProject}>
                        <PlusIcon className="size-4 text-neutral-400" />
                    </Button>
                </div>
                <SeparatorDotted className="my-4" />
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.map((project) => (
                        <li key={project.id}>
                            <Link href={`/workspaces/${workspaceId}/project/${project.id}`}>
                                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                    <CardContent className="p-4 flex items-center gap-x-2.5">
                                        <ProjectAvatar
                                            className="size-12"
                                            fallbackClassname="text-lg"
                                            name={project.name}
                                            image={project.imageUrl} />
                                        <p className="text-lg font-medium truncate">
                                            {project.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No projects found
                    </li>
                </ul>
            </div>
        </div>
    )
}
export const MemberList = ({ data, total }) => {
    const workspaceId = useWorkspaceId()
    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">
                        Members ({total})
                    </p>
                    <Button asChild variant="secondary" size="icon">
                        <Link href={`/workspaces/${workspaceId}/members`}>
                            <SettingsIcon className="size-4 text-neutral-400" />
                        </Link>
                    </Button>
                </div>
                <SeparatorDotted className="my-4" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((member) => (
                        <li key={member.id}>
                            <Card className="shadow-none rounded-lg overflow-hidden">
                                <CardContent className="p-4 flex flex-col items-center gap-x-2">
                                    <MemberAvatar
                                        className="size-12"
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
                </ul>
            </div>
        </div>
    )
}