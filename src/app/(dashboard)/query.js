import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
export const getWorkspaces = async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id

    const members = await supabase.from("members").select("*").eq("userId", userId)
    const workspacesIds = members.data.map((member)=>member.workspacesId)

    const workspaces = await supabase.from("workspaces").select("*").in("id", workspacesIds)
    return workspaces
}
