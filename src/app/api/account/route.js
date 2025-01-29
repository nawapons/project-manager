import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
export async function PATCH(request) {
    const body = await request.formData();
    // const { fullname } = body
    const fullname = body.get("form[fullname]")
    const image = body.get("form[image]")
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    let imageUrl
    const newImageName = uuidv4()
    if (image instanceof File) {
        if (image.size > 1048576) {
            return NextResponse.json({ message: "File size should not exceed 1MB" }, { status: 401 })
        }
        const { error } = await supabase.storage.from('profiles').upload(newImageName, image)
        if (error) {
            return NextResponse.json({ message: "upload file failed" }, { status: 200 })
        }
        const { data } = supabase.storage.from('profiles').getPublicUrl(newImageName)
        imageUrl = data.publicUrl
    } else {
        imageUrl = image
    }

    await supabase.auth.updateUser({
        data: { full_name: fullname },
    })

    await supabase.from("profiles").update({
        fullname: fullname,
        imageUrl: imageUrl
    }).eq("id", userId)
    const { data } = await supabase.auth.refreshSession();
    return NextResponse.json({ data: data }, { status: 200 })
}