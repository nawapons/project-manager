import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id
    const url = new URL(request.url);
    const workspaceId = url.searchParams.get('workspaceId');
    const { data: member } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", workspaceId)
    if (!member || member[0].role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    // const {data: workspace} = await supabase.from("workspaces").select("*").eq("id",workspaceId)
    // console.log("WORKSPACE=>",workspace)
    // if(workspace[0].imageUrl !== null || workspace[0].imageUrl !== ""){
    //     await supabase.storage.from("workspaces").remove([workspace[0].imageUrl])
    // }
    const { error } = await supabase.from("workspaces").delete().eq("id", workspaceId)
    if (error) return NextResponse.json({ message: error.message }, { status: 401 })
    return NextResponse.json({ data: { id: workspaceId } }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Delete workspace failed, try again..." }, { status: 500 })
  }
}