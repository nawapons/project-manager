import { supabaseAdmin } from "@/utils/supabase/authAdmin"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const currentUser = await supabase.auth.getUser()
        const url = new URL(request.url);
        const taskId = url.searchParams.get('taskId');

        const { data: task } = await supabase.from("tasks").select("*").eq("id", taskId)
        const { data: currentMember } = await supabase.from("members").select("*").eq("workspacesId", task[0].workspacesId).eq("userId", currentUser.data.user.id)
        if (!currentMember) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

        const { data: project } = await supabase.from("projects").select("*").eq("id", task[0].projectsId)
        const { data: member } = await supabase.from("members").select("*").eq("id", task[0].assigneeId)
        const user = await supabaseAdmin.auth.admin.getUserById(member[0].userId)
        const assignee = {
            ...member, name: user.data.user.user_metadata.full_name, email: user.data.user.email
        }
        return NextResponse.json({ data: { ...task, project, assignee } }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}