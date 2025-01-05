import { generateInviteCode } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
export async function POST(request) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const body = await request.formData();
    const name = body.get("finalValues[name]")
    const image = body.get("finalValues[image]")
    const userId = (await supabase.auth.getUser()).data.user.id
    let imageUrl

    const newImageName = uuidv4()
    const inviteCode = generateInviteCode(6)

    if (image instanceof File) {
        const { error } = await supabase.storage.from('workspaces').upload(newImageName, image)
        if (error) {
            console.log('error, upload file failed', error)
            return NextResponse.json({ message: "upload file failed" }, { status: 200 })
        }
        const { data } = supabase.storage.from('workspaces').getPublicUrl(newImageName)
        imageUrl = data.publicUrl
    }
    const { data: checkExists } = await supabase.from('workspaces').select('*').eq('name', name).eq('userId', userId)
    if (checkExists.length > 0) {
        return NextResponse.json({ message: "workspace is already exists" }, { status: 200 })
    }
    const { data: newWorkspace, error: insertError } = await supabase.from('workspaces').insert({
        userId,
        name,
        inviteCode,
        imageUrl: imageUrl
    }).select()

    await supabase.from("members").insert({
        workspacesId : newWorkspace[0].id,
        userId,
        role: "ADMIN"
    })
    
    if (insertError) {
        console.log('insert Error', insertError)
        return NextResponse.json({ message: "add new workspace failed" }, { status: 200 })
    }
    return NextResponse.json({ data: newWorkspace, success: true }, { status: 200 })
}