"use client"
import { Loader } from "lucide-react";
import { useGetMembers } from "../member/api/use-get-members";
import { getProjects, useGetProject } from "../projects/api/use-get-projects"
import { Card, CardContent } from "../ui/card";
import { useWorkspaceId } from "../workspaces/hooks/use-workspace-id"
import { useEffect, useState } from "react";
import { CreateTaskForm } from "./task-add-form";

export const CreateTaskFormWrapper = ({
    onCancel
}) => {
    const workspaceId = useWorkspaceId();
    const [projectOptions, setProjectOptions] = useState([])
    const [memberOptions, setMemberOptions] = useState([])
    const [isLoadingProject, setIsLoadingProject] = useState(true)
    const [isLoadingMember, setIsLoadingMember] = useState(true)
    const fetchProjects = async () => {
        try {
            const projectResults = await getProjects({ workspaceId });
            const projects = projectResults?.map((result) => ({
                id: result.id,
                name: result.name,
                imageUrl: result.imageUrl
            }));
            setProjectOptions(projects);
        } catch (error) {
            throw new Error(error.message)
        } finally {
            setIsLoadingProject(false)
        }
    }
    const fetchMembers = async () => {
        try {
            const memberResults = await useGetMembers({ workspaceId });
            const members = memberResults?.map((member) => ({
                id: member.id,
                name: member.profiles.fullname,
            }))
            setMemberOptions(members);
        } catch (error) {
            throw new Error(error.message)
        } finally {
            setIsLoadingMember(false)
        }
    }
    useEffect(() => {
        fetchProjects();
        fetchMembers();
    }, [])

    const isLoading = isLoadingProject || isLoadingMember

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