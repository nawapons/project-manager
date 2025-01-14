import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request) {
  const url = new URL(request.url)
  const projectId = url.searchParams.get("projectId")
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const userId = (await supabase.auth.getUser()).data.user.id

  const { data: project } = await supabase.from("projects").select("*").eq("id", projectId)

  const { data: member } = await supabase.from("members").select("*").eq("workspacesId", project[0].workspacesId).eq("userId", userId)
  if (!member) return NextResponse.json({ message: "Unzuthorized" }, { status: 401 })
  return NextResponse.json({ data: project }, { status: 200 })
}