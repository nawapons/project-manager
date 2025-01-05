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
            return NextResponse.json({ message: "Missing workspaceId!" }, { status: 400 })
        }
        const { data: member } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", workspaceId)

        if (!member) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { data: projects } = await supabase.from("projects").select("*").eq("workspacesId", workspaceId).order("created_at", { ascending: false })
        return NextResponse.json({ data: projects }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to get project!" }, { status: 500 })
    }
}

export async function POST(request){
    try{
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
    
        const body = await request.formData();
        const name = body.get("finalValues[name]")
        const workspacesId = body.get("finalValues[workspaceId]")
        const image = body.get("finalValues[image]")
        let imageUrl
        const newImageName = uuidv4()
    
        if (image instanceof File) {
            const { error } = await supabase.storage.from('projects').upload(newImageName, image)
            if (error) {
                console.log('error, upload file failed', error)
                return NextResponse.json({ message: "upload file failed" }, { status: 200 })
            }
            const { data } = supabase.storage.from('projects').getPublicUrl(newImageName)
            imageUrl = data.publicUrl
        }
    
        const { data: checkExists } = await supabase.from('projects').select('*').eq('name', name).eq('workspacesId', workspacesId)
        console.log(checkExists)
        if (checkExists.length > 0) {
            return NextResponse.json({ message: "project is already exists" }, { status: 200 })
        }
        const { data: newWorkspace, error: insertError } = await supabase.from('projects').insert({
            workspacesId,
            name,
            imageUrl: imageUrl
        }).select()
        if (insertError) {
            console.log('insert Error', insertError)
            return NextResponse.json({ message: "add new project failed" }, { status: 200 })
        }
        return NextResponse.json({ data: newWorkspace, success: true }, { status: 200 })
    }catch(error){
        return NextResponse.json({message: "Failed to create project!"}, {status: 500})
    }
}