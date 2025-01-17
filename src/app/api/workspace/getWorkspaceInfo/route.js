import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const url = new URL(request.url)
    const workspaceId = url.searchParams.get("workspaceId")
    const { data: workspace } = await supabase.from("workspaces").select("*").eq("id", workspaceId)
    return NextResponse.json({ data: { id: workspace[0].id, name: workspace[0].name, imageUrl: workspace[0].imageUrl } })   
}