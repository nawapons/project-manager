"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SeparatorDotted } from "../../../components/ui/separator-dotted"
import { Button } from "../../../components/ui/button"
import Link from "next/link"
import { useInviteCode } from "../hooks/use-invite-code"
import axios from "axios"
import { useWorkspaceId } from "../hooks/use-workspace-id"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useJoinWorkspace } from "../api/use-join-workspace"

export const JoinWorkspaceForm = ({ initialsValues }) => {
    const router = useRouter()
    const inviteCode = useInviteCode()
    const workspaceId = useWorkspaceId()
    const { mutate, isPending } = useJoinWorkspace()
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
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join workspace
                </CardTitle>
                <CardDescription>
                    You have invited to join <strong>{initialsValues.name}</strong>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <SeparatorDotted />
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center justify-between">
                    <Button
                        disabled={isPending}
                        asChild
                        size="lg"
                        variant="secondary"
                        className="w-full lg:w-fit">
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
                        className="w-full lg:w-fit">
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}