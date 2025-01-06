import { createTaskSchema } from "@/schema/taskSchema";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const data = createTaskSchema.safeParse(body)
    // const cookieStore = cookies()
    // const supabase = createClient(cookieStore)
    // const userId = (await supabase.auth.getUser()).data.user.id
    const { name, status, workspacesId, projectsId, dueDate, assigneeId } = data
    return NextResponse.json({ data: data }, { status: 200 })
}