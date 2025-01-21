"use client"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SendHorizonal } from "lucide-react"
import { MemberAvatar } from "@/features/member/components/member-avatar"
import { date } from "zod"
export const TaskComment = ({ user }) => {
    console.log("userdata", user)
    return (
        <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">
                    Comment
                </p>
            </div>
            <SeparatorDotted className="my-4" />
            <div className="flex items-start gap-3 mb-3">
                <MemberAvatar className="size-8" fallbackClassName="text-xs" name={user.full_name} />
                <div className="grid gap-1.5 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="text-md">{user.full_name}</p>
                        <p className="text-xs text-gray-500 ">2 hours</p>
                    </div>
                    <p className="text-sm text-pretty text-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quos, minima laborum, tempore praesentium esse molestias dolorum perspiciatis similique soluta repellendus earum ipsam illum voluptatem, architecto molestiae aut placeat nemo?</p>
                </div>
            </div>
            <div className="flex items-start gap-3 mb-3">
                <MemberAvatar className="size-8" fallbackClassName="text-xs" name={user.full_name} />
                <div className="grid gap-1.5 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="text-md">{user.full_name}</p>
                        <p className="text-xs text-gray-500 ">2 hours</p>
                    </div>
                    <p className="text-sm text-pretty text-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quos, minima laborum, tempore praesentium esse molestias dolorum perspiciatis similique soluta repellendus earum ipsam illum voluptatem, architecto molestiae aut placeat nemo?</p>
                </div>
            </div>
            <div className="flex w-full max-w-full items-center space-x-3">
                <MemberAvatar className="size-8" fallbackClassName="text-xs" name={user.full_name} />
                <Input type="text" name="comment" placeholder="Write comment" />
                <Button variant="primary"><SendHorizonal className="size-16" /></Button>
            </div>
        </div>
    )
}