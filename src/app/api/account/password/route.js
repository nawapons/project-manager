import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(request) {
    const body = await request.json();
    const { oldPassword, newPassword } = body
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const userId = (await supabase.auth.getUser()).data.user.id
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const verifyPassword = await supabase.rpc("verify_user_password", { password: oldPassword })
    if (verifyPassword.error) {
        return NextResponse.json({ message: "Something went wrong, try again..." }, { status: 401 })
    }
    if (verifyPassword.data === false) {
        return NextResponse.json({ message: "Current password is not correct" }, { status: 401 })
    }
    await supabase.auth.updateUser({
        password: newPassword
    })
    return NextResponse.json({ success: true }, { status: 200 })
}