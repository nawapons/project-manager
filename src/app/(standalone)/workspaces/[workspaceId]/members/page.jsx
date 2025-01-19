import { MembersList } from "@/features/workspaces/components/members-list";

const WorkspaceMembersPage = async () => {
    return (
        <div className="w-full lg:max-w-2xl">
            <MembersList/>
        </div>
    )
}
export default WorkspaceMembersPage;