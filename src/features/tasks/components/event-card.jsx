import { MemberAvatar } from "@/features/member/components/member-avatar"
import { MemberAvatarStack } from "@/features/member/components/member-avatar-stack"
import { ProjectAvatar } from "@/features/projects/components/project-avatar"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { cn } from "@/lib/utils"
import { TaskStatus } from "@/schema/taskSchema"
import { useRouter } from "next/navigation"


const statusColorMap = { //receive status value
    [TaskStatus.BACKLOG]: "border-pink-500 bg-amber-50",
    [TaskStatus.TODO]: "border-red-500 bg-amber-50",
    [TaskStatus.IN_PROGRESS]: "border-yellow-500 bg-amber-50",
    [TaskStatus.IN_REVIEW]: "border-blue-500 bg-amber-50",
    [TaskStatus.DONE]: "border-emerald-500 bg-amber-50"
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
        <div className="px-2">
            <div onClick={onClick} className={cn(
                "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition"
                , statusColorMap[status]
            )}>
                <div className="flex items-center gap-x-2">
                    <MemberAvatarStack imageUrl={assignee?.imageUrl} name={assignee?.name} />
                    <div className="size-1 rounded-full bg-neutral-300"/>
                    <p>{title}</p>
                </div>
                {/* <div className="flex items-center gap-x-1">
                    <MemberAvatar name={assignee?.name}/>
                    <div className="size-1 rounded-full bg-neutral-300"/>
                    <ProjectAvatar name={project?.name} image={project?.imageUrl}/>
                </div> */}
            </div>
        </div>
    )
}