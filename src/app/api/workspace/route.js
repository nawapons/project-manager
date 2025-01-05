import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id

    const members = await supabase.from("members").select("*").eq("userId", userId)
    if(members.count === 0){
        return NextResponse.json({ data: [] }, { status: 200 })
    }
    const workspacesIds = members.data.map((member)=>member.workspacesId)

    const { data, error } = await supabase.from("workspaces").select("*").in("id", workspacesIds).order("created_at",{ascending: false})
    if (error) {
        console.log("fetch Workspaces failed", error)
        return null
    }
    return NextResponse.json({ data }, { status: 200 })
}