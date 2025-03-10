import { useGetProjects } from "../../projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useGetMembers } from "../../member/api/use-get-members"
import { DatePicker } from "../../date-picker"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    CircleCheckIcon,
    CircleDashedIcon,
    CircleDotDashedIcon,
    CircleDotIcon,
    CircleIcon,
    ListChecksIcon
} from "lucide-react"
import { TaskStatus } from "@/schema/taskSchema"
import { useTaskFilters } from "../hooks/use-task-filters"
import { UserIcon } from "lucide-react"
import { FolderIcon } from "lucide-react"
import { useProjectId } from "@/features/projects/hooks/use-project-id"
import { useGetProjectMembers } from "@/features/projects/api/use-get-project-member"
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
export const DataFilters = ({ hideProjectFilter,memberData }) => {
    const workspaceId = useWorkspaceId()
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
    // const { data: members, isLoading: isLoadingMembers } =  useGetMembers({ workspaceId }) 
    const projectOptions = projects?.map((project) => ({
        value: project.id,
        label: project.name
    }))
    const memberOptions = memberData?.map((member) => ({
        value: member.id,
        label: member.profiles.fullname,
    }))
    
    const [{
        status, assigneeId, projectId, dueDate,
    }, setFilters] = useTaskFilters();
    
    const onStatusChange = (value) => {
        setFilters({ status: value === "all" ? null : value })
    }
    const onAssigneeChange = (value) => {
        setFilters({ assigneeId: value === "all" ? null : value })
    }
    const onProjectChange = (value) => {
        setFilters({ projectId: value === "all" ? null : value })
    }
    
    const isLoading = isLoadingProjects
    if (isLoading) return null;
 
    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select
                defaultValue={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}>
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListChecksIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All status" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All status</SelectItem>
                    <SelectSeparator />
                    <SelectItem value={TaskStatus.BACKLOG}>
                        <div className="flex items-center gap-x-2">
                            {statusIconMap[TaskStatus.BACKLOG]} Backlog
                        </div>
                    </SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>
                        <div className="flex items-center gap-x-2">
                            {statusIconMap[TaskStatus.IN_PROGRESS]} In Progress
                        </div>
                    </SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>
                        <div className="flex items-center gap-x-2">
                            {statusIconMap[TaskStatus.IN_REVIEW]} In Review
                        </div>
                    </SelectItem>
                    <SelectItem value={TaskStatus.TODO}>
                        <div className="flex items-center gap-x-2">
                            {statusIconMap[TaskStatus.TODO]} Todo
                        </div>
                    </SelectItem>
                    <SelectItem value={TaskStatus.DONE}>
                        <div className="flex items-center gap-x-2">
                            {statusIconMap[TaskStatus.DONE]} Done
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            {hideProjectFilter && (
                <Select
                    defaultValue={assigneeId ?? undefined}
                    onValueChange={(value) => onAssigneeChange(value)}>
                    <SelectTrigger className="w-full lg:w-auto h-8">
                        <div className="flex items-center pr-2">
                            <UserIcon className="size-4 mr-2" />
                            <SelectValue placeholder="All assignees" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All assignees</SelectItem>
                        <SelectSeparator />
                        {memberOptions?.map((member) => (
                            <SelectItem key={member.value} value={member.value}>
                                {member.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
            {!hideProjectFilter && (
                <Select
                    defaultValue={projectId ?? undefined}
                    onValueChange={(value) => onProjectChange(value)}>
                    <SelectTrigger className="w-full lg:w-auto h-8">
                        <div className="flex items-center pr-2">
                            <FolderIcon className="size-4 mr-2" />
                            <SelectValue placeholder="All projects" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All projects</SelectItem>
                        <SelectSeparator />
                        {projectOptions?.map((project) => (
                            <SelectItem key={project.value} value={project.value}>
                                {project.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
            <DatePicker
                placeholder="Due date"
                className="h-8 w-full lg:w-auto"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) => {
                    setFilters({ dueDate: date ? date.toISOString() : null })
                }}>
            </DatePicker>
        </div>
    )
}