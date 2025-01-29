import { createTaskSchema } from "@/schema/taskSchema";
import { supabaseAdmin } from "@/utils/supabase/authAdmin";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const declareValue = createTaskSchema.safeParse(body.json)
    const { name, status, workspacesId, projectsId, startDate, dueDate, assigneeId } = declareValue.data
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id

    const member = await supabase.from("members").select("*").eq("userId", userId)
    if (!member) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const { data: highestPositionTask } = await supabase.from("tasks")
        .select()
        .eq("status", status)
        .eq("workspacesId", workspacesId)
        .order("position", { ascending: true })
        .limit(1)

    const newPosition =
        highestPositionTask && highestPositionTask.length > 0
            ? highestPositionTask[0].position + 1000
            : 1000;
    const { data: task, error } = await supabase.from("tasks").insert({
        name: name,
        status: status,
        workspacesId: workspacesId,
        projectsId: projectsId,
        startDate: startDate,
        dueDate: dueDate,
        assigneeId: assigneeId,
        position: newPosition
    }).select()
    if (error) {
        return NextResponse.json({ message: error.message }, { status: 401 })
    }
    return NextResponse.json({ data: task, success: true }, { status: 200 })
}
export async function GET(request) {
    const url = new URL(request.url);
    const workspaceId = url.searchParams.get('workspaceId');
    const projectId = url.searchParams.get("projectId")
    const status = url.searchParams.get("status")
    const search = url.searchParams.get("search")
    const assigneeId = url.searchParams.get("assigneeId")
    const startDate = url.searchParams.get("startDate")
    const dueDate = url.searchParams.get("dueDate")
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id
    const member = await supabase.from("projects_members").select("*").eq("userId", userId)
    if (!member) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const oneAssigneeIds = member.data.map((memberOne) => memberOne.id)
    let query = supabase
        .from("tasks")
        .select("*")
        .eq("workspacesId", workspaceId)
        .order("created_at", { ascending: false });
    if (projectId) query = query.eq("projectsId", projectId);
    if (status) query = query.eq("status", status);
    if (assigneeId) query = query.eq("assigneeId", assigneeId);
    if (startDate) query = query.eq("startDate", startDate);
    if (dueDate) query = query.eq("dueDate", dueDate);
    if (search) query = query.like("name", search);
    if (!projectId) query = query.in("assigneeId", oneAssigneeIds)
    // Execute the query
    const { data: tasks } = await query;
    const projectsIds = tasks.map((task) => task.projectsId)
    const assigneeIds = tasks.map((task) => task.assigneeId)
    const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .in("id", projectsIds.length > 0 ? projectsIds : []);

    const { data: members } = await supabase
        .from("projects_members")
        .select("*")
        .in("id", assigneeIds.length > 0 ? assigneeIds : []);

    const assignees = await Promise.all(
        members.map(async (member) => {
            const { data: user } = await supabase.from("profiles").select("*").eq("id", member.userId)
            // const user = await supabaseAdmin.auth.admin.getUserById(member.userId)
            // const user = await supabase.auth.admin.getUserById(member.userId)
            return {
                ...member, name: user[0].fullname, email: user[0].email,imageUrl: user[0].imageUrl
                // ...member, name: user.data.user.user_metadata.full_name, email: user.data.user.email
            }
        })
    )
    const populatedTasks = tasks.map((task) => {
        const project = projects.find((project) => project.id === task.projectsId)
        const assignee = assignees.find((assignee) => assignee.id === task.assigneeId)
        return {
            ...task, project, assignee,
        }
    })
    return NextResponse.json({ data: populatedTasks }, { status: 200 })
}
export async function DELETE(request) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id
    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');

    const { data: task } = await supabase.from("tasks").select("*").eq("id", taskId)
    const member = await supabase.from("members").select("*").eq("workspacesId", task[0].workspacesId).eq("userId", userId)
    if (!member) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    await supabase.from("tasks").delete().eq("id", taskId)
    return NextResponse.json({ data: { id: task[0].id }, success: true }, { status: 200 })
}
export async function PATCH(request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id
    const body = await request.json();
    const declareValue = createTaskSchema.partial().parse(body.json)
    const { name, status, description, projectsId, startDate, dueDate, assigneeId } = declareValue
    const taskId = body.params.taskId
    const { data: existingTask } = await supabase.from("tasks").select("*").eq("id", taskId)

    const member = await supabase.from("projects_members").select("*").eq("projectsId", existingTask[0].projectsId).eq("userId", userId)
    if (!member) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const { data: task } = await supabase.from("tasks").update({
        name: name,
        status: status,
        projectsId: projectsId,
        startDate: startDate,
        dueDate: dueDate,
        assigneeId: assigneeId,
        description: description,
    }).eq("id", taskId).select()
    return NextResponse.json({ data: task }, { status: 200 })

}