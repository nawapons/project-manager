import { getWorkspace } from "@/app/(dashboard)/query";
import { EditWorkspaceForm } from "@/components/workspaces/workspace-edit-form";
import { redirect } from "next/navigation";

const WorkspaceSettingsPage = async ({
    params
}) => {
    const initialValues = await getWorkspace({workspaceId : params.workspaceId})
    if(!initialValues) redirect(`/workspaces/${params.workspaceId}`)

    return (
        <div className="w-full lg:max-w-2xl"> 
            <EditWorkspaceForm initialValues={initialValues}/>
        </div>
    )
}
export default WorkspaceSettingsPage;