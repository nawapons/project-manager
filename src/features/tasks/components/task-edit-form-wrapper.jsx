import { Loader } from "lucide-react";
import { useGetMembers } from "../../member/api/use-get-members";
import { useGetProjects } from "../../projects/api/use-get-projects"
import { Card, CardContent } from "../../../components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { CreateTaskForm } from "./task-add-form";
import { useGetTask } from "../api/use-get-task";
import { EditTaskForm } from "./task-edit-form";
export const EditTaskFormWrapper = ({
    onCancel, id
}) => {
    const workspaceId = useWorkspaceId();
    const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
        taskId: id, 
    })
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })
    const projectOptions = projects?.map((project) => ({
        id: project.id,
        name: project.name,
        imageUrl: project.imageUrl
    }))
    const memberOptions = members?.map((member) => ({
        id: member.id,
        name: member.profiles.fullname,
    }))
    const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask
    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }
    if (!initialValues) return null;

    return (
        <EditTaskForm
            onCancel={onCancel}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []}
            initialValues={initialValues}
        />
    )
}