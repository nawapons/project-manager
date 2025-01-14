import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const url = new URL(request.url)
    const workspaceId = url.searchParams.get("workspaceId")
    const userId = (await supabase.auth.getUser()).data.user.id

    const { data: member } = await supabase.from("members").select("*").eq("workspacesId", workspaceId).eq("userId", userId)
    if (!member) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const { data: workspace } = await supabase.from("workspaces").select("*").eq("id", workspaceId)
    console.log(workspace)
    return NextResponse.json({ data: workspace }, { status: 200 })
}