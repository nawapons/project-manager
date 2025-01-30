import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(request) {
    const body = await request.formData();
    const fullname = body.get("form[fullname]");
    const image = body.get("form[image]");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    let imageUrl;

    if (image === null || image instanceof File) {
        const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("imageUrl")
            .eq("id", userId)
            .single();

        if (profileError) {
            return NextResponse.json({ message: "Failed to fetch profile data" }, { status: 500 });
        }

        if (profileData?.imageUrl) {
            const urlPath = profileData.imageUrl.split("/");
            const filePath = urlPath[urlPath.length - 1];
            const { error: deleteError } = await supabase.storage.from("profiles").remove([filePath]);

            if (deleteError) {
                return NextResponse.json({ message: "Failed to delete old image" }, { status: 500 });
            }
        }
    }


    const newImageName = uuidv4();
    if (image instanceof File) {

        if (image.size > 1048576) {
            return NextResponse.json({ message: "File size should not exceed 1MB" }, { status: 400 });
        }
        const { error: uploadError } = await supabase.storage.from('profiles').upload(newImageName, image);
        if (uploadError) {
            return NextResponse.json({ message: "Failed to upload file" }, { status: 500 });
        }
        const { data: publicUrlData } = await supabase.storage.from('profiles').getPublicUrl(newImageName);
        imageUrl = publicUrlData.publicUrl;
    } else {
        imageUrl = image;
    }

    const { error: updateUserError } = await supabase.auth.updateUser({
        data: { full_name: fullname },
    });

    if (updateUserError) {
        return NextResponse.json({ message: "Failed to update user data" }, { status: 500 });
    }

    const { error: updateProfileError } = await supabase
        .from("profiles")
        .update({
            fullname: fullname,
            imageUrl: imageUrl
        })
        .eq("id", userId);

    if (updateProfileError) {
        return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
    }

    const { data: sessionData, error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) {
        return NextResponse.json({ message: "Failed to refresh session" }, { status: 500 });
    }

    return NextResponse.json({ data: sessionData }, { status: 200 });
}