import { generateInviteCode } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
export async function POST(request) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const body = await request.formData();
    const name = body.get("form[name]")
    const image = body.get("form[image]")
    const userId = (await supabase.auth.getUser()).data.user.id
    let imageUrl

    const newImageName = uuidv4()
    const inviteCode = generateInviteCode(6)

    if (image instanceof File) {
        const { error } = await supabase.storage.from('workspaces').upload(newImageName, image)
        if (error) {
            return NextResponse.json({ error: "upload file failed" }, { status: 401 })
        }
        const { data } = supabase.storage.from('workspaces').getPublicUrl(newImageName)
        imageUrl = data.publicUrl
    }
    const { data: checkExists } = await supabase.from('workspaces').select('*').eq('name', name).eq('userId', userId)
    if (checkExists.length > 0) {
        return NextResponse.json({ error: "workspace is already exists" }, { status: 401 })
    }
    const { data: newWorkspace, error: insertError } = await supabase.from('workspaces').insert({
        userId,
        name,
        inviteCode,
        imageUrl: imageUrl
    }).select()

    await supabase.from("members").insert({
        workspacesId: newWorkspace[0].id,
        userId,
        role: "ADMIN"
    })

    if (insertError) {
        return NextResponse.json({ error: "add new workspace failed" }, { status: 500 })
    }
    return NextResponse.json({ data: newWorkspace }, { status: 200 })
}