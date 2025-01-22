import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const url = new URL(request.url)
        const projectId = url.searchParams.get("projectId")
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const userId = (await supabase.auth.getUser()).data.user.id
        const { data: member } = await supabase.from("projects-members").select("*").eq("userId", userId).eq("projectsId", projectId)
        if (!member) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { data: members } = await supabase.from("projects-members").select(`*,profiles(fullname,email)`).eq("projectsId", projectId)
        console.log(projectId,"BACKEND")
        console.log(members,"BACKEND")
        return NextResponse.json({ data: members }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to get member!" }, { status: 500 })
    }
}
export async function POST(request) {
    const body = await request.json();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore)
    const { userId, projectId } = body;
    if (!userId || !projectId) return NextResponse.json({ message: "Invalid data" }, { status: 401 })
    const { data: checkExists } = await supabase.from("projects-members").select("*").eq("userId", userId).eq("projectsId", projectId)
    if (checkExists.length > 0) return NextResponse.json({ message: "This user is already in this project!" }, { status: 401 })
    const { data: newMember, error: insertError } = await supabase.from("projects-members").insert({ userId: userId, projectsId: projectId, role: "MEMBER" })
    if (insertError) return NextResponse.json({ message: "Failed to add member to project!" }, { status: 401 })
    return NextResponse.json({ data: newMember }, { status: 200 })
}
export async function PATCH(request) {
    try {
        const body = await request.json();
        const { memberId, role } = body
        const cookieStore = cookies();
        const supabase = createClient(cookieStore)
        const userId = (await supabase.auth.getUser()).data.user.id

        const { data: memberToUpdate } = await supabase.from("projects-members").select("*").eq("id", memberId)
        const { data: allMembersInProjects } = await supabase.from("projects-members").select("*").eq("projectsId", memberToUpdate[0].projectsId)

        const { data: member } = await supabase.from("projects-members").select("*").eq("projectsId", memberToUpdate[0].projectsId).eq("userId", userId)
        if (!member) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (member[0].role !== "ADMIN") {
            return NextResponse.json({ message: "You are not admin" }, { status: 401 });
        }
        if (allMembersInProjects.length === 1) {
            return NextResponse.json({ message: "Cannot change role the last member!" }, { status: 401 });
        }
        await supabase.from("projects-members").update({
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
        const { data: memberToDelete } = await supabase.from("projects-members").select("*").eq("id", memberId)
        const { data: member } = await supabase.from("projects-members").select("*").eq("projectsId", memberToDelete[0].projectsId).eq("userId", userId)
        if (!member) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if(memberToDelete[0].userId === userId){
            return NextResponse.json({ message: "Cannot delete yourself!" }, { status: 401 });
        }
        if (member[0].id !== memberToDelete[0].id && member[0].role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await supabase.from("projects-members").delete().eq("id", memberId)
        return NextResponse.json({ data: { id: memberToDelete[0].id }, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete member!" }, { status: 500 })
    }
} 