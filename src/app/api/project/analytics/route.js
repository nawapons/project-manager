import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { endOfMonth, getDate, getYear, startOfMonth, subMonths } from "date-fns"
import { TaskStatus } from "@/schema/taskSchema"

export async function GET(request) {
    const url = new URL(request.url)
    const projectId = url.searchParams.get("projectId")
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id

    const { data: project } = await supabase.from("projects").select("*").eq("id", projectId)

    const { data: member } = await supabase.from("projects-members").select("*").eq("projectsId", project[0].id).eq("userId", userId)
    if (!member) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1))
    const lastMonthEnd = endOfMonth(subMonths(now, 1))

    const { count: thisMonthTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("projectsId", projectId).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
    const { count: lastMonthTaskCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("projectsId", projectId).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())
    const taskCount = thisMonthTasksCount
    const taskDifferent = taskCount - lastMonthTaskCount

    const {count: thisMonthAssignedTasksCount} = await supabase.from("tasks").select("*",{ count: 'exact', head: true }).eq("projectsId", projectId).eq("assigneeId", member[0].id).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
    const {count: lastMonthAssignedTasksCount} = await supabase.from("tasks").select("*",{ count: 'exact', head: true }).eq("projectsId", projectId).eq("assigneeId", member[0].id).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())

    const assignedTaskCount = thisMonthAssignedTasksCount
    const assignedTaskDifferent = assignedTaskCount - lastMonthAssignedTasksCount

    const {count: thisMonthIncompleteTasksCount} = await supabase.from("tasks").select("*",{ count: 'exact', head: true }).eq("projectsId", projectId).neq("status", TaskStatus.DONE).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
    const {count: lastMonthIncompleteTasksCount} = await supabase.from("tasks").select("*",{ count: 'exact', head: true }).eq("projectsId", projectId).neq("status", TaskStatus.DONE).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())

    const incompleteTaskCount = thisMonthIncompleteTasksCount
    const incompleteTaskDifferent = incompleteTaskCount - lastMonthIncompleteTasksCount

    const {count: thisMonthCompleteTasksCount} = await supabase.from("tasks").select("*",{count: 'exact',head: true}).eq("projectsId", projectId).eq("status", TaskStatus.DONE).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
    const {count: lastMonthCompleteTasksCount} = await supabase.from("tasks").select("*",{count: 'exact',head: true}).eq("projectsId", projectId).eq("status", TaskStatus.DONE).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())

    const completeTaskCount = thisMonthCompleteTasksCount
    const completeTaskDifferent = completeTaskCount - lastMonthCompleteTasksCount

    const {count: thisMonthOverdueTasksCount} = await supabase.from("tasks").select("*",{count: 'exact',head: true}).eq("projectsId", projectId).neq("status", TaskStatus.DONE).lt("dueDate", now.toISOString()).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
    const {count: lastMonthOverdueTasksCount} = await supabase.from("tasks").select("*",{count: 'exact',head: true}).eq("projectsId", projectId).neq("status", TaskStatus.DONE).lt("dueDate", now.toISOString()).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())

    const overdueTaskCount = thisMonthOverdueTasksCount
    const overdueTaskDifferent = overdueTaskCount - lastMonthOverdueTasksCount

    return NextResponse.json({
        data: {
            taskCount, taskDifferent,
            assignedTaskCount, assignedTaskDifferent,
            completeTaskCount, completeTaskDifferent,
            incompleteTaskCount, incompleteTaskDifferent,
            overdueTaskCount, overdueTaskDifferent
        },
    }, { status: 200 })
}