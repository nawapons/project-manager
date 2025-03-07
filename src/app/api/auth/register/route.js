import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { fullname, email, password } = body.values

        const cookieStore = cookies()
        const supabase = createClient(cookieStore)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullname
                },
            },
        })
        if (error) {
            return NextResponse.json({ message: error.message }, { status: 200 })
        }
     
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 401 })
    }
}