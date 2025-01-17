"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspaceInfo } from "@/components/workspaces/api/use-get-workspace-info";
import { useWorkspaceId } from "@/components/workspaces/hooks/use-workspace-id";
import { JoinWorkspaceForm } from "@/components/workspaces/workspace-join-form";

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