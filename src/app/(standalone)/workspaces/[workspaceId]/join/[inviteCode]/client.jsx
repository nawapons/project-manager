"use client";

import { PageError } from "@/features/page-error";
import { PageLoader } from "@/features/page-loader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { JoinWorkspaceForm } from "@/features/workspaces/components/workspace-join-form";

export const WorkspaceJoinClient = () => {
    const workspaceId = useWorkspaceId();
    const { data: initialValues, isLoading } = useGetWorkspaceInfo({ workspaceId });
    if (isLoading) return <PageLoader />
    if (!initialValues) return <PageError message="workspace not found" />
    return (
        <div className="w-full lg:max-w-xl">
            <JoinWorkspaceForm initialsValues={initialValues} />
        </div>
    )
}