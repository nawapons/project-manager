import { getWorkspaceInfo } from "@/app/(dashboard)/query";
import { JoinWorkspaceForm } from "@/components/workspaces/workspace-join-form";
import { redirect } from "next/navigation"

const WorkspaceJoinPage = async({params}) => {
    const initialsValues = await getWorkspaceInfo({workspaceId: params.workspaceId})
    if(!initialsValues) redirect("/")
    return(
        <div className="w-full lg:max-w-2xl">
            <JoinWorkspaceForm initialsValues={initialsValues.name}/>
        </div>
    )
}
export default WorkspaceJoinPage;