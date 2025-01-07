import { useEffect, useState } from "react"
import { getProjects } from "../projects/api/use-get-projects"
import { useWorkspaceId } from "../workspaces/hooks/use-workspace-id"
import { useGetMembers } from "../member/api/use-get-members"
import { DatePicker } from "../date-picker"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ListChecksIcon } from "lucide-react"
import { TaskStatus } from "@/schema/taskSchema"
import { useTaskFilters } from "./hooks/use-task-filters"
import { UserIcon } from "lucide-react"
import { FolderIcon } from "lucide-react"
export const DataFilters = ({ hideProjectFilter }) => {
    const workspaceId = useWorkspaceId()
    const [projectOptions, setProjectOptions] = useState([])
    const [isLoadingProjects, setIsLoadingProjects] = useState(true)
    const [memberOptions, setMemberOptions] = useState([])
    const [isLoadingMembers, setIsLoadingMembers] = useState(true)
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

    const fetchProjects = async () => {
        try {
            const projectResults = await getProjects({ workspaceId });
            const projects = projectResults?.map((result) => ({
                value: result.id,
                label: result.name,
            }));
            setProjectOptions(projects);
        } catch (error) {
            throw new Error(error.message)
        } finally {
            setIsLoadingProjects(false)
        }
    }
    const fetchMembers = async () => {
        try {
            const memberResults = await useGetMembers({ workspaceId });
            const members = memberResults?.map((member) => ({
                value: member.id,
                label: member.profiles.fullname,
            }))
            setMemberOptions(members);
        } catch (error) {
            throw new Error(error.message)
        } finally {
            setIsLoadingMembers(false)
        }
    }

    useEffect(() => {
        fetchProjects()
        fetchMembers()
    }, [])

    const isLoading = isLoadingProjects || isLoadingMembers;
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
                    <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>In progress</SelectItem>
                    <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                    <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                    <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                </SelectContent>
            </Select>
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
                    {memberOptions?.map((member)=>(
                        <SelectItem key={member.value} value={member.value}>
                            {member.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
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
                    {projectOptions?.map((project)=>(
                        <SelectItem key={project.value} value={project.value}>
                            {project.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}