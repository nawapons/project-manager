import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"

export async function GET(request) {
    try {
        const url = new URL(request.url)
        const workspaceId = url.searchParams.get("workspaceId")
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const userId = (await supabase.auth.getUser()).data.user.id
        if (!workspaceId) {
            return NextResponse.json({ message: "Missing workspaceId!" }, { status: 401 })
        }
        const { data: members } = await supabase.from("projects_members").select("*").eq("userId", userId)
        if (!members) {
            return NextResponse.json({ data: [] }, { status: 200 })
        }
        const projectIds = members.map((member) => member.projectsId)
        // const { data: member } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", workspaceId)
        // if (!member) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        // }

        const { data, error } = await supabase.from("projects").select(`*,projects_members(profiles(fullname,imageUrl))`).in("id", projectIds).eq("workspacesId", workspaceId).order("created_at", { ascending: false })
        // const newProjectIds = data.map((project) => project.id)
        // const { data: projectMembers } = await supabase.from("projects-members").select("*").in("projectsId", newProjectIds)
        if (error) return null;
        // console.log(projectMembers)
        return NextResponse.json({ data: data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to get project!" }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const body = await request.formData();
        const name = body.get("form[name]")
        const workspacesId = body.get("form[workspaceId]")
        const image = body.get("form[image]")
        const userId = (await supabase.auth.getUser()).data.user.id

        const { data: workspaceMembers } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", workspacesId)
        if (workspaceMembers[0].role !== "ADMIN") {
            return NextResponse.json({ message: "You are now allowed to create project" }, { status: 401 })
        }
        
        const { data: checkExists } = await supabase.from('projects').select('*').eq('name', name).eq('workspacesId', workspacesId)
        if (checkExists.length > 0) {
            return NextResponse.json({ message: "project is already exists" }, { status: 401 })
        }
        const {data: checkTotalProjects} = await supabase.from('projects').select('*').eq('workspacesId', workspacesId)
        if(checkTotalProjects.length >= 8){
            return NextResponse.json({ message: "You can create only 8 projects per workspace!" }, { status: 401 })
        }

        let imageUrl
        const newImageName = uuidv4()

        if (image instanceof File) {
            const { error } = await supabase.storage.from('projects').upload(newImageName, image)
            if (error) {
                return NextResponse.json({ message: "upload file failed" }, { status: 401 })
            }
            const { data } = supabase.storage.from('projects').getPublicUrl(newImageName)
            imageUrl = data.publicUrl
        }
        const { data: newProject, error: insertError } = await supabase.from('projects').insert({
            workspacesId,
            name,
            imageUrl: imageUrl
        }).select()
        const { error: insertMemberError } = await supabase.from('projects_members').insert({
            projectsId: newProject[0].id,
            userId: userId,
            role: "ADMIN"
        })
        if (insertError || insertMemberError) {
            return NextResponse.json({ message: "add new project failed" }, { status: 401 })
        }
        return NextResponse.json({ data: newProject }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed to create project!" }, { status: 500 })
    }
}

export async function PATCH(request) {
    const body = await request.formData();
    const name = body.get("form[name]")
    const image = body.get("form[image]")
    const projectId = body.get("param[projectId]")
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;
    const { data: existingProject } = await supabase.from("projects").select("*").eq("id", projectId)

    const { data: member } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", existingProject[0].workspacesId)

    if (!member) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    let imageUrl

    if (image === null || image instanceof File) {
        const { data: projectData, error: projectError } = await supabase
            .from("projects")
            .select("imageUrl")
            .eq("id", projectId)
            .single();

        if (projectError) {
            return NextResponse.json({ message: "Failed to fetch project data" }, { status: 500 });
        }

        if (projectData?.imageUrl) {
            const urlPath = projectData.imageUrl.split("/");
            const filePath = urlPath[urlPath.length - 1];
            const { error: deleteError } = await supabase.storage.from("projects").remove([filePath]);

            if (deleteError) {
                return NextResponse.json({ message: "Failed to delete old image" }, { status: 500 });
            }
        }
    }

    const newImageName = uuidv4()

    if (image instanceof File) {
        if (image.size > 1048576) {
            return NextResponse.json({ message: "File size should not exceed 1MB" }, { status: 400 });
        }
        const { error } = await supabase.storage.from('projects').upload(newImageName, image)
        if (error) {
            return NextResponse.json({ message: "upload file failed" }, { status: 200 })
        }
        const { data } = supabase.storage.from('projects').getPublicUrl(newImageName)
        imageUrl = data.publicUrl
    } else {
        imageUrl = image
    }

    const { data: project } = await supabase.from("projects").update({
        name: name,
        imageUrl: imageUrl
    }).eq("id", projectId).select()
    return NextResponse.json({ data: project, success: true }, { status: 200 })
}

export async function DELETE(request) {
    try {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore)
        const userId = (await supabase.auth.getUser()).data.user.id
        const url = new URL(request.url);
        const projectId = url.searchParams.get('projectId');

        const { data: existingProject } = await supabase.from("projects").select("*").eq("id", projectId)

        const { data: member } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", existingProject[0].workspacesId)
        if (!member) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        await supabase.from("projects").delete().eq("id", projectId)
        return NextResponse.json({ data: { id: existingProject[0].id } }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Delete project failed, try again..." }, { status: 500 })
    }
}