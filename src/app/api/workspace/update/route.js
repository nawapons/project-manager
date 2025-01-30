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
    const workspaceId = body.get("param[workspaceId]")
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;
    const { data: member } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", workspaceId)
    if (!member || member[0].role !== "ADMIN") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    let imageUrl

    if (image === null || image instanceof File) {
        const { data: workspaceData, error: workspaceError } = await supabase
            .from("workspaces")
            .select("imageUrl")
            .eq("id", workspaceId)
            .single();

        if (workspaceError) {
            return NextResponse.json({ message: "Failed to fetch workspace data" }, { status: 500 });
        }

        if (workspaceData?.imageUrl) {
            const urlPath = workspaceData.imageUrl.split("/");
            const filePath = urlPath[urlPath.length - 1];
            const { error: deleteError } = await supabase.storage.from("workspaces").remove([filePath]);

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
        const { error } = await supabase.storage.from('workspaces').upload(newImageName, image)
        if (error) {
            return NextResponse.json({ message: "upload file failed" }, { status: 200 })
        }
        const { data } = supabase.storage.from('workspaces').getPublicUrl(newImageName)
        imageUrl = data.publicUrl
    } else {
        imageUrl = image
    }
    const { data: workspace } = await supabase.from("workspaces").update({
        name: name,
        imageUrl: imageUrl
    }).eq("id", workspaceId).select()
    return NextResponse.json({ data: workspace, success: true }, { status: 200 })
}
export async function PATCH(request) {
    try {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const userId = (await supabase.auth.getUser()).data.user.id
        const body = await request.json();
        const { workspaceId } = body
        const inviteCode = generateInviteCode(6)
        const { data: member } = await supabase.from("members").select("*").eq("userId", userId).eq("workspacesId", workspaceId)
        if (!member || member[0].role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        const { data: workspace } = await supabase.from("workspaces").update({
            inviteCode: inviteCode,
        }).eq("id", workspaceId).select()
        return NextResponse.json({ data: workspace }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Reset Invite Code failed." }, { status: 500 })
    }
}