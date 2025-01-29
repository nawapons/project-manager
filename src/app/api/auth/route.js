
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieClient = cookies();
    const supabase = createClient(cookieClient)
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const { data: userData } = await supabase.from("profiles").select("*").eq("id", user.id)
    const data = { userId: userData[0].id, ...userData[0] } 
    return NextResponse.json({ data: data }, { status: 200 }) 
}