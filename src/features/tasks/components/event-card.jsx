import {MemberAvatar} from "@/features/member/components/member-avatar"
import {ProjectAvatar} from "@/features/projects/components/project-avatar"
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {cn} from "@/lib/utils"
import {TaskStatus} from "@/schema/taskSchema"
import {useRouter} from "next/navigation"


const statusColorMap = { //receive status value
    [TaskStatus.BACKLOG]: "border-l-pink-500",
    [TaskStatus.TODO]: "border-l-red-500",
    [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
    [TaskStatus.IN_REVIEW]: "border-l-blue-500",
    [TaskStatus.DONE]: "border-l-emerald-500"
}
export const EventCard = ({
                              title,
                              assignee,
                              project,
                              status,
                              id,
                          }) => {
    const workspaceId = useWorkspaceId()
    const router = useRouter()

    const onClick = (e) => {
        e.stopPropagation();

        router.push(`/workspaces/${workspaceId}/tasks/${id}`)
    }
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="px-2">
                    <div onClick={onClick} className={cn(
                        "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition"
                        , statusColorMap[status]
                    )}>
                        <p>{title}</p>
                        <div className="flex items-center gap-x-1">
                            <MemberAvatar name={assignee?.name}/>
                            <div className="size-1 rounded-full bg-neutral-300"/>
                            <ProjectAvatar name={project?.name} image={project?.imageUrl}/>
                        </div>
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    <ProjectAvatar className="size-10" name={project?.name} image={project?.imageUrl}/>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{title}</h4>
                        <p className="text-sm">
                            The React Framework – created and maintained by @vercel.
                        </p>
                        <div className="flex items-center pt-2">

                                <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}