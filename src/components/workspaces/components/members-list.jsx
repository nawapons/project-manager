"use client"
import { Button } from "@/components/ui/button"
import { useWorkspaceId } from "../hooks/use-workspace-id"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { useGetMembers } from "@/components/member/api/use-get-members"
import { Fragment } from "react"
import { MemberAvatar } from "@/components/member/components/member-avatar"
import { MoreVerticalIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import axios from "axios"
import { toast } from "sonner"
import { useConfirm } from "@/hooks/use-confirm"
import { useRouter } from "next/navigation"
import { useDeleteMember } from "@/components/member/api/use-delete-member"
import { useEditMember } from "@/components/member/api/use-edit-members"
export const MembersList = () => {
    const router = useRouter()
    const workspaceId = useWorkspaceId()

    const { data: members, isLoading: isMemberLoading } = useGetMembers({ workspaceId })
    const { mutate: updateMember, isLoading: isUpdattingMember } = useEditMember()
    const { mutate: deleteMember, isLoading: isDeletingMember } = useDeleteMember()
    const [DeleteDialog, confirm] = useConfirm(
        "Remove member?",
        "This member will be removed from this workspace",
        "destructive"
    )

    const handleUpdate = async (memberId, role) => {
        updateMember({
            memberId, role
        })
    }
    const handleDelete = async (memberId) => {
        const ok = await confirm()
        if (!ok) return;
        deleteMember({
            param: { memberId: memberId }
        })
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <DeleteDialog />
            <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                <Button variant="secondary" size="sm" asChild>
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className="size-4 mr-2" />
                        Back
                    </Link>
                </Button>
                <CardTitle className="text-xl font-bold">
                    Members List
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <SeparatorDotted />
            </div>
            <CardContent className="p-7">
                {isMemberLoading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    members.length > 0 ? (
                        members.map((member, index) => (
                            <Fragment key={member.id}>
                                <div className="flex items-center gap-2">
                                    <MemberAvatar
                                        className="size-10"
                                        fallbackClassName="text-lg"
                                        name={member.profiles.fullname} />
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium">{member.profiles.fullname}</p>
                                        <p className="text-xs text-muted-foreground">{member.profiles.email}</p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="ml-auto"
                                                variant="secondary"
                                                size="icon">
                                                <MoreVerticalIcon className="size-4 text-muted-foreground " />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="bottom" align="end">
                                            <DropdownMenuItem className="font-medium" onClick={() => handleUpdate(member.id, "ADMIN")} disabled={member.role === "ADMIN"}>
                                                Set as Administrator
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="font-medium" onClick={() => handleUpdate(member.id, "MEMBER")} disabled={member.role === "MEMBER"}>
                                                Set as Member
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="font-medium text-amber-700" onClick={() => handleDelete(member.id)}>
                                                Remove {member.profiles.fullname}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                {index < members.length - 1 && (
                                    <Separator className="my-2.5" />
                                )}
                            </Fragment>
                        ))
                    ) : (
                        <div className="text-center">No members found</div>
                    )
                )}
            </CardContent>
        </Card>
    )
}