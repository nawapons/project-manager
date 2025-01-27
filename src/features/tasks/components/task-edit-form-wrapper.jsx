"use client"
import { Loader } from "lucide-react";
import { useGetMembers } from "../../member/api/use-get-members";
import { useGetProjects } from "../../projects/api/use-get-projects"
import { Card, CardContent } from "@/components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useGetTask } from "../api/use-get-task";
import { EditTaskForm } from "./task-edit-form";
import { useState, useEffect } from "react";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useGetCurrent } from "@/features/auth/api/use-get-current";
import { useGetProjectMembers } from "@/features/projects/api/use-get-project-member";

export const EditTaskFormWrapper = ({
    onCancel, id
}) => {
    const workspaceId = useWorkspaceId();
    const { data: user, isLoading: isLoadingUser } = useGetCurrent();
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    
    const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
        taskId: id,
    });

    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
    const { data: projectMembers, isLoading: isLoadingProjectMembers } = useGetProjectMembers({ 
        projectId: selectedProjectId ?? '' 
    });
    const { data: workspaceMembers, isLoading: isLoadingWorkspaceMembers } = useGetMembers({ 
        workspaceId 
    });

    // Process the data after the hooks are called
    const members = selectedProjectId ? projectMembers : workspaceMembers;
    const isLoadingMembers = selectedProjectId ? isLoadingProjectMembers : isLoadingWorkspaceMembers;

    // Set initial project ID when task data is loaded
    useEffect(() => {
        if (initialValues && initialValues[0]?.projectsId) {
            setSelectedProjectId(initialValues[0].projectsId);
        }
    }, [initialValues]);

    const projectOptions = projects?.map((project) => ({
        id: project.id,
        name: project.name,
        imageUrl: project.imageUrl
    }));

    const memberOptions = selectedProjectId
        ? members?.map((member) => ({
            id: member.id,
            name: member.profiles.fullname,
        }))
        : members
            ?.filter((member) => member.userId === user?.userId)
            .map((member) => ({
                id: member.id,
                name: member.profiles.fullname,
            }));

    const isLoading = isLoadingProjects || isLoadingTask || isLoadingMembers || isLoadingUser;

    const handleProjectChange = (projectId) => {
        setSelectedProjectId(projectId);
    };

    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    if (!initialValues) return null;

    return (
        <EditTaskForm
            onCancel={onCancel}
            projectOptions={projectOptions ?? []}
            memberOptions={memberOptions ?? []}
            initialValues={initialValues}
            onProjectChange={handleProjectChange}
        />
    );
}