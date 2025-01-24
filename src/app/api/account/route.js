import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(request) {
    const body = await request.json();
    const { fullname } = body
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    await supabase.auth.updateUser({
        data: { full_name: fullname },
    })
    await supabase.from("profiles").update({
        fullname: fullname
    }).eq("id", userId)
    const { data } = await supabase.auth.refreshSession();
    return NextResponse.json({ data: data }, { status: 200 })
}