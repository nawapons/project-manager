import { getProject } from "@/app/(dashboard)/workspaces/[workspaceId]/projects/query";
import { EditProjectForm } from "@/components/projects/project-edit-form";

const ProjectSettingsPage = async ({ params }) => {
    const initialValues = await getProject({
        projectId: params.projectId
    });
    return (
        <div className="w-full lg:max-w-xl">
            <EditProjectForm initialValues={initialValues}/>
        </div>
    )
}
export default ProjectSettingsPage;