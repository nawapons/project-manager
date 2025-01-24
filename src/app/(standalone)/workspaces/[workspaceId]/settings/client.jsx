"use client";

import { PageError } from "@/features/page-error";
import { PageLoader } from "@/features/page-loader";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { EditWorkspaceForm } from "@/features/workspaces/components/workspace-edit-form";

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