import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export const getProject = async ({ projectId }) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id
    const { data: project } = await supabase.from("projects").select("*").eq("id", projectId)
    const { data: member } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", project[0].workspacesId)
    if (!member) throw new Error("Unauthorized")
    return project;

}