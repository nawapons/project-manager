"use client"
import { Loader } from "lucide-react";
import { useGetMembers } from "../../member/api/use-get-members";
import { useGetProjects } from "../../projects/api/use-get-projects"
import { Card, CardContent } from "@/components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { CreateTaskForm } from "./task-add-form";
import { useGetProjectMembers } from "@/features/projects/api/use-get-project-member";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useGetCurrent } from "@/features/auth/api/use-get-current";
import { useState } from "react";

export const CreateTaskFormWrapper = ({
    onCancel
}) => {
    const workspaceId = useWorkspaceId();
    const [selectedProjectId, setSelectedProjectId] = useState(useProjectId());
    const { data: user, isLoading: isLoadingUser } = useGetCurrent();
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
    const { data: projectMembers, isLoading: isLoadingProjectMembers } = useGetProjectMembers({ 
        projectId: selectedProjectId ?? '' 
    });
    const { data: workspaceMembers, isLoading: isLoadingWorkspaceMembers } = useGetMembers({ 
        workspaceId 
    });

    // Process the data after the hooks are called
    const members = selectedProjectId ? projectMembers : workspaceMembers;
    const isLoadingMembers = selectedProjectId ? isLoadingProjectMembers : isLoadingWorkspaceMembers;
    const projectOptions = projects?.map((project) => ({
        id: project.id,
        name: project.name,
        imageUrl: project.imageUrl
    }))
    const memberOptions = selectedProjectId
        ? members?.map((member) => ({
            id: member.id,
            userId: member.userId,
            name: member.profiles.fullname,
            imageUrl: member.profiles.imageUrl,
        }))
        : members
            ?.filter((member) => member.userId === user?.userId)
            .map((member) => ({
                id: member.id,
                userId: member.userId,
                name: member.profiles.fullname,
                imageUrl: member.profiles.imageUrl,
            }));
    const isLoading = isLoadingProjects || isLoadingUser

    const handleProjectChange = (projectId) => {
        setSelectedProjectId(projectId);
    }
    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }
    return (
        <CreateTaskForm
            onCancel={onCancel}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []}
            onProjectChange={handleProjectChange}
        />
    )
}