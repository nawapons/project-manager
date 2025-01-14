"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspace } from "@/components/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/components/workspaces/hooks/use-workspace-id";
import { EditWorkspaceForm } from "@/components/workspaces/workspace-edit-form";

export const WorkspaceSettingsClient = () => {
    const workspaceId = useWorkspaceId();
    const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId });
    if (isLoading) return <PageLoader />
    if (!initialValues) return <PageError message="workspace not found" />
    return (
        <div className="w-full lg:max-w-xl">
            <EditWorkspaceForm initialValues={initialValues[0]} />
        </div>
    )
}