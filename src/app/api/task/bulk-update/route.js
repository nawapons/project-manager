import { bulkTaskUpdateSchema } from "@/schema/taskSchema";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id
    const body = await request.json();
    const tasks = body.tasks
    const { data: tasksToUpdate } = await supabase.from("tasks").select("*").in("id", tasks.map((task) => task.id))
    const workspacesIds = new Set(tasksToUpdate.map(task => task.workspacesId))
    if (workspacesIds.size !== 1) {
        return NextResponse.json({ message: "All tasks must be the same workspace" }, { status: 401 })
    }
    const workspaceId = workspacesIds.values().next().value;

    const { data: member } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", workspaceId)

    if (!member) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
            const { id, status, position } = task;
            return supabase.from("tasks").update({
                status, position
            }).eq("id", id)
        })
    )
    return NextResponse.json({ data: updatedTasks }, { status: 200 })
}