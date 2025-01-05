import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { workspaceId, inviteCode } = body;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        const userId = (await supabase.auth.getUser()).data.user.id
        const {data: members} = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", workspaceId)
        if (members.length > 0) {
            return NextResponse.json({ message: "Already member!" }, { status: 200 })
        }
        const { data: workspace } = await supabase.from("workspaces").select("*").eq("id", workspaceId)
        if (workspace[0].inviteCode !== inviteCode) {
            return NextResponse.json({ message: "Invalid invite code!" }, { status: 200 })
        }
        const { data } = await supabase.from("members").insert({
            workspacesId: workspaceId,
            userId: userId,
            role: "MEMBER",
        }).select()
        return NextResponse.json({ id: data[0].workspacesId,success: true }, { status: 200 })
    } catch (error){
        console.log(error)
        return NextResponse.json({ message: "Failed to join workspace!" }, { status: 200 })
    }
}