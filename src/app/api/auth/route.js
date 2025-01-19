import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieClient = cookies();
    const supabase = createClient(cookieClient)
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const data = user.user_metadata
    return NextResponse.json({ data: data }, { status: 200 })
}