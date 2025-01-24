import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { message, taskId } = body
    const userId = (await supabase.auth.getUser()).data.user.id

    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    if (!message || !taskId) return NextResponse.json({ message: "Invalid task data" }, { status: 401 })
    await supabase.from("comments").insert({
        userId: userId,
        message: message,
        tasksId: taskId
    })
    return NextResponse.json({ success: true }, { status: 200 })
}
export async function GET(request) {
    try {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const url = new URL(request.url);
        const taskId = url.searchParams.get('taskId');
        if (!taskId) return NextResponse.json({ message: "Invalid task Data" }, { status: 401 })
        const { data: comment } = await supabase.from("comments").select("*").eq("tasksId", taskId)
        const userIds = comment.map((member) => member.userId)
        const { data: members } = await supabase.from("profiles").select("*").in("id", userIds)
        const mergedData = comment.map((commentItem) => ({
            ...commentItem,
            member: members.find((member) => member.id === commentItem.userId) || null, // Attach the associated member or null
        }));
        return NextResponse.json({ data: mergedData }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
export async function DELETE(request) {
    try {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const url = new URL(request.url)
        const commentId = url.searchParams.get('commentId');
        if (!commentId) return NextResponse.json({ message: "Invalid comemnt Data" }, { status: 401 })
        const userId = (await supabase.auth.getUser()).data.user.id
        if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const { error } = await supabase.from("comments").delete().eq("id", commentId).eq("userId", userId)
        if (error) return NextResponse.json({ error: error }, { status: 401 })
        return NextResponse.json({  success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}