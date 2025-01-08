import { supabaseAdmin } from "@/utils/supabase/authAdmin"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const currentUser = await supabase.auth.getUser()

    const { taskId } = request.query
    console.log(taskId)

    const { data: task } = await supabase.from("tasks").select("*").eq("id", taskId)
    const { data: currentMember } = await supabase.from("members").select("*").eq("workspacesId", task[0].workspacesId).eq("userId", currentUser.data.user.id)

    if (!currentMember) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const { data: project } = await supabase.from("zprojects").select("*").eq("id", task[0].projectId)
    const { data: member } = await supabase.from("members").select("*").eq("userId", task[0].assigneeId)

    const { data: user } = await supabaseAdmin.auth.admin.getUserById(member[0].userId)

    const assignee = {
        ...member, name: user.data.user.user_metadata.name, email: user.data.user.email
    }
    return NextResponse.json({ data: { ...task, project, assignee } })
}