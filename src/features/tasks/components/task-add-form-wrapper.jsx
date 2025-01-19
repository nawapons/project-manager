"use client"
import { Loader } from "lucide-react";
import { useGetMembers } from "../../member/api/use-get-members";
import { getProjects, useGetProject, useGetProjects } from "../../projects/api/use-get-projects"
import { Card, CardContent } from "../../../components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useEffect, useState } from "react";
import { CreateTaskForm } from "./task-add-form";

export const CreateTaskFormWrapper = ({
    onCancel
}) => {
    const workspaceId = useWorkspaceId();

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

    const isLoading = isLoadingProjects || isLoadingMembers

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
        />
    )
}