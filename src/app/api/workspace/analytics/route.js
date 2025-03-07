import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { endOfMonth, startOfMonth, subMonths } from "date-fns"
import { TaskStatus } from "@/schema/taskSchema"

export async function GET(request) {
    const url = new URL(request.url)
    const workspaceId = url.searchParams.get("workspaceId")
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id

    const { data: member } = await supabase.from("members").select("*").eq("workspacesId", workspaceId).eq("userId", userId)
    if (!member) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const {data: projectMember} = await supabase.from("projects_members").select("*").eq("userId",userId)
    const assigneeIds = projectMember.map((projectMember) => projectMember.id)
    console.log(assigneeIds)
    const now = new Date()
    const thisMonthStart = startOfMonth(now)
    const thisMonthEnd = endOfMonth(now)
    const lastMonthStart = startOfMonth(subMonths(now, 1))
    const lastMonthEnd = endOfMonth(subMonths(now, 1))

    // Current month task counts
    const { count: thisMonthTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId", workspaceId).in("assigneeId", assigneeIds).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
    const { count: thisMonthAssignedTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId", workspaceId).eq("assigneeId", member[0].id).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
    const { count: thisMonthIncompleteTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId", workspaceId).in("assigneeId", assigneeIds).neq("status", TaskStatus.DONE).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
    const { count: thisMonthCompleteTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId", workspaceId).in("assigneeId", assigneeIds).eq("status", TaskStatus.DONE).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
    const { count: thisMonthOverdueTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId", workspaceId).in("assigneeId", assigneeIds).neq("status", TaskStatus.DONE).lt("dueDate", now.toISOString()).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())

    // Previous month task counts
    const { count: lastMonthTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId", workspaceId).in("assigneeId", assigneeIds).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())
    const { count: lastMonthAssignedTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId", workspaceId).in("assigneeId", assigneeIds).eq("assigneeId", member[0].id).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())
    const { count: lastMonthIncompleteTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId", workspaceId).in("assigneeId", assigneeIds).neq("status", TaskStatus.DONE).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())
    const { count: lastMonthCompleteTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId", workspaceId).in("assigneeId", assigneeIds).eq("status", TaskStatus.DONE).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())
    const { count: lastMonthOverdueTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId", workspaceId).in("assigneeId", assigneeIds).neq("status", TaskStatus.DONE).lt("dueDate", now.toISOString()).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())

    console.log({
        data: {
            thisMonth: {
                taskCount: thisMonthTasksCount,
                assignedTaskCount: thisMonthAssignedTasksCount,
                completeTaskCount: thisMonthCompleteTasksCount,
                incompleteTaskCount: thisMonthIncompleteTasksCount,
                overdueTaskCount: thisMonthOverdueTasksCount,
            },
            lastMonth: {
                taskCount: lastMonthTasksCount,
                assignedTaskCount: lastMonthAssignedTasksCount,
                completeTaskCount: lastMonthCompleteTasksCount,
                incompleteTaskCount: lastMonthIncompleteTasksCount,
                overdueTaskCount: lastMonthOverdueTasksCount,
            },
        },
    })
    return NextResponse.json({
        data: {
            thisMonth: {
                taskCount: thisMonthTasksCount,
                assignedTaskCount: thisMonthAssignedTasksCount,
                completeTaskCount: thisMonthCompleteTasksCount,
                incompleteTaskCount: thisMonthIncompleteTasksCount,
                overdueTaskCount: thisMonthOverdueTasksCount,
            },
            lastMonth: {
                taskCount: lastMonthTasksCount,
                assignedTaskCount: lastMonthAssignedTasksCount,
                completeTaskCount: lastMonthCompleteTasksCount,
                incompleteTaskCount: lastMonthIncompleteTasksCount,
                overdueTaskCount: lastMonthOverdueTasksCount,
            },
        },
    }, { status: 200 })
}

// import { createClient } from "@/utils/supabase/server"
// import { cookies } from "next/headers"
// import { NextResponse } from "next/server"
// import { endOfMonth, getDate, getMonth, getYear, startOfMonth, subMonths } from "date-fns"
// import { TaskStatus } from "@/schema/taskSchema"

// export async function GET(request) {
//     const url = new URL(request.url)
//     const workspaceId = url.searchParams.get("workspaceId")
//     const cookieStore = cookies()
//     const supabase = createClient(cookieStore)
//     const userId = (await supabase.auth.getUser()).data.user.id

//     const { data: member } = await supabase.from("members").select("*").eq("workspacesId", workspaceId).eq("userId", userId)
//     if (!member) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

//     const now = new Date();
//     const thisMonthStart = startOfMonth(now);
//     const thisMonthEnd = endOfMonth(now);
//     const lastMonthStart = startOfMonth(subMonths(now, 1));
//     const lastMonthEnd = endOfMonth(subMonths(now, 1));

//     const { count: thisMonthTasksCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId",workspaceId).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
//     const { count: lastMonthTaskCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true }).eq("workspacesId",workspaceId).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())
//     const taskCount = thisMonthTasksCount
//     const taskDifferent = taskCount - lastMonthTaskCount
    
//     const {count: thisMonthAssignedTasksCount} = await supabase.from("tasks").select("*",{ count: 'exact', head: true }).eq("workspacesId",workspaceId).eq("assigneeId", member[0].id).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
//     const {count: lastMonthAssignedTasksCount} = await supabase.from("tasks").select("*",{ count: 'exact', head: true }).eq("workspacesId",workspaceId).eq("assigneeId", member[0].id).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())

//     const assignedTaskCount = thisMonthAssignedTasksCount
//     const assignedTaskDifferent = assignedTaskCount - lastMonthAssignedTasksCount

//     const {count: thisMonthIncompleteTasksCount} = await supabase.from("tasks").select("*",{ count: 'exact', head: true }).eq("workspacesId",workspaceId).neq("status", TaskStatus.DONE).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
//     const {count: lastMonthIncompleteTasksCount} = await supabase.from("tasks").select("*",{ count: 'exact', head: true }).eq("workspacesId",workspaceId).neq("status", TaskStatus.DONE).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())

//     const incompleteTaskCount = thisMonthIncompleteTasksCount
//     const incompleteTaskDifferent = incompleteTaskCount - lastMonthIncompleteTasksCount

//     const {count: thisMonthCompleteTasksCount} = await supabase.from("tasks").select("*",{count: 'exact',head: true}).eq("workspacesId",workspaceId).eq("status", TaskStatus.DONE).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
//     const {count: lastMonthCompleteTasksCount} = await supabase.from("tasks").select("*",{count: 'exact',head: true}).eq("workspacesId",workspaceId).eq("status", TaskStatus.DONE).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())

//     const completeTaskCount = thisMonthCompleteTasksCount
//     const completeTaskDifferent = completeTaskCount - lastMonthCompleteTasksCount

//     const {count: thisMonthOverdueTasksCount} = await supabase.from("tasks").select("*",{count: 'exact',head: true}).eq("workspacesId",workspaceId).neq("status", TaskStatus.DONE).lt("dueDate", now.toISOString()).gte("created_at", thisMonthStart.toISOString()).lte("created_at", thisMonthEnd.toISOString())
//     const {count: lastMonthOverdueTasksCount} = await supabase.from("tasks").select("*",{count: 'exact',head: true}).eq("workspacesId",workspaceId).neq("status", TaskStatus.DONE).lt("dueDate", now.toISOString()).gte("created_at", lastMonthStart.toISOString()).lte("created_at", lastMonthEnd.toISOString())

//     const overdueTaskCount = thisMonthOverdueTasksCount
//     const overdueTaskDifferent = overdueTaskCount - lastMonthOverdueTasksCount

//     console.log({
//         taskCount, taskDifferent,
//         assignedTaskCount, assignedTaskDifferent,
//         completeTaskCount, completeTaskDifferent,
//         incompleteTaskCount, incompleteTaskDifferent,
//         overdueTaskCount, overdueTaskDifferent
//     },)
//     return NextResponse.json({
//         data: {
//             taskCount, taskDifferent,
//             assignedTaskCount, assignedTaskDifferent,
//             completeTaskCount, completeTaskDifferent,
//             incompleteTaskCount, incompleteTaskDifferent,
//             overdueTaskCount, overdueTaskDifferent
//         },
//     }, { status: 200 })
// }