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
export const getWorkspace = async ({workspaceId}) => {
    try{
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const members = await supabase.from("members").select("*").eq("workspacesId",workspaceId)
        if(!members) return null

        const workspace = await supabase.from("workspaces").select("*").eq("id", workspaceId)
        return workspace
    }catch{
        return null
    }
}
export const getWorkspaceInfo = async ({workspaceId})=>{
    try{
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const {data:workspace} = await supabase.from("workspaces").select("*").eq("id", workspaceId)
        return {
            name: workspace[0].name
        }
    }catch{
        return null
    }
}