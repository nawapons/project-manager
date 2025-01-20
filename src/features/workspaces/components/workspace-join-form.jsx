"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useInviteCode } from "../hooks/use-invite-code"
import { useWorkspaceId } from "../hooks/use-workspace-id"
import { useRouter } from "next/navigation"
import { useJoinWorkspace } from "../api/use-join-workspace"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetMembers } from "@/features/member/api/use-get-members"
import { PageLoader } from "@/features/page-loader"
export const JoinWorkspaceForm = ({ initialsValues }) => {
    const router = useRouter()
    const inviteCode = useInviteCode()
    const workspaceId = useWorkspaceId()
    const { mutate, isPending } = useJoinWorkspace()
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })
    console.log("display initialsValue", initialsValues)
    console.log("display member", members)
    if(isLoadingMembers) {
        return <PageLoader/>
    }
    const onSubmit = async () => {
        mutate({
            workspaceId, inviteCode
        }, {
            onSuccess: (response) => {
                router.push(`/workspaces/${response.id}`)
            }
        })
    }
    return (
        <Card className="w-full max-w-lg mx-auto rounded-lg shadow-lg border border-gray-200 bg-white">
            <CardHeader className="p-6 text-center">
                <CardTitle className="text-3xl font-extrabold text-gray-800 mb-4">
                    Join Workspace
                </CardTitle>
                <CardDescription className="mt-6">
                    <div className="flex flex-col items-center gap-3">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={initialsValues.imageUrl} alt="Profile Image" />
                            <AvatarFallback className="bg-gray-300 text-gray-700 text-xl font-semibold">
                                {initialsValues.name[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <strong className="text-lg text-gray-900">{initialsValues.name}</strong>
                        <p className="text-sm text-gray-600">
                            You have been invited to join a workspace
                        </p>
                        <small className="text-sm text-muted-foreground">
                            {members.length} members join in this workspace
                        </small>
                    </div>
                </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <Button
                        disabled={isPending}
                        asChild
                        size="lg"
                        variant="secondary"
                        className="w-full lg:w-auto px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md">
                        <Link href="/">
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={isPending}
                        size="lg"
                        type="button"
                        variant="primary"
                        className="w-full lg:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md">
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>

    )
}