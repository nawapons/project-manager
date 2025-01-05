import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const url = new URL(request.url)
        const workspaceId = url.searchParams.get("workspaceId")
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        const userId = (await supabase.auth.getUser()).data.user.id
        const { data: member } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", workspaceId)
        console.log(member)
        if (!member) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { data: members } = await supabase.from("members").select(`*,profiles(fullname,email)`).eq("workspacesId", workspaceId)
        return NextResponse.json({ data: members }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to get member!" }, { status: 500 })
    }
}
export async function PATCH(request) {
    try {
        const body = await request.json();
        const { memberId, role } = body
        const cookieStore = cookies();
        const supabase = createClient(cookieStore)
        const userId = (await supabase.auth.getUser()).data.user.id

        const { data: memberToUpdate } = await supabase.from("members").select("*").eq("id", memberId)
        const { data: allMembersInWorkspace } = await supabase.from("members").select("*").eq("workspacesId", memberToUpdate[0].workspacesId)

        const { data: member } = await supabase.from("members").select("*").eq("workspacesId", memberToUpdate[0].workspacesId).eq("userId", userId)
        if (!member) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (member[0].role !== "ADMIN") {
            return NextResponse.json({ message: "You are not admin" }, { status: 200 });
        }
        if (allMembersInWorkspace.total === 1) {
            return NextResponse.json({ message: "Cannot change role the last member!" }, { status: 200 });
        }
        await supabase.from("members").update({
            role: role
        }).eq("id", memberId)
        return NextResponse.json({ message: "Member status updated!", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to update member!" }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const userId = (await supabase.auth.getUser()).data.user.id
        const url = new URL(request.url)
        const memberId = url.searchParams.get("memberId")

        const { data: memberToDelete } = await supabase.from("members").select("*").eq("id", memberId)
        const { data: allMembersInWorkspace } = await supabase.from("members").select("*").eq("workspacesId", memberToDelete[0].workspacesId)

        const { data: member } = await supabase.from("members").select("*").eq("workspacesId", memberToDelete[0].workspacesId).eq("userId", userId)
        if (!member) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (member[0].id !== memberToDelete[0].id && member[0].role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 200 });
        }
        await supabase.from("members").delete().eq("id", memberId)
        return NextResponse.json({ data: { id: memberToDelete[0].id }, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete member!" }, { status: 200 })
    }
} 