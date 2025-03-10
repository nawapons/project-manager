import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const body = await request.json()
        const { email, password } = body.values
        const cookiesStore = cookies()
        const supabase = createClient(cookiesStore)

        const { error } = await supabase.auth.signInWithPassword({
            email, password
        })
        if (error) {
            return NextResponse.json({ message: error.message }, { status: 401 })
        }
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}