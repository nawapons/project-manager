"use client"
import { Loader } from "lucide-react";
import { useGetMembers } from "../../member/api/use-get-members";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { AddProjectMemberForm } from "./project-add-member-form";

export const AddProjectMemberFromWrapper = ({
    onCancel
}) => {
    const workspaceId = useWorkspaceId();

    // const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })
    const memberOptions = members?.map((member) => ({
        id: member.id,
        userId: member.userId,
        name: member.profiles.fullname,
        imageUrl: member.profiles.imageUrl
    }))

    const isLoading = isLoadingMembers

    if (isLoading) {
        return (
            <Card className="w-full h-[250px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        )
    }
    return (
        <AddProjectMemberForm
            onCancel={onCancel}
            memberOptions={memberOptions ?? []}
        />
    )
}